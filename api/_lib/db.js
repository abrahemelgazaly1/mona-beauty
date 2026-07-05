import { MongoClient, ObjectId } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_PATH = path.join(__dirname, "../../data/db.json");

const MONGO_URI =
  process.env.MONGODB_URI ||
  "mongodb://abrahemelgazaly2_db_user:yr73CaRBPtM1xZdC@ac-orrqx8q-shard-00-00.jzbw5lw.mongodb.net:27017,ac-orrqx8q-shard-00-01.jzbw5lw.mongodb.net:27017,ac-orrqx8q-shard-00-02.jzbw5lw.mongodb.net:27017/mona_beauty?ssl=true&replicaSet=atlas-kpiqb4-shard-0&authSource=admin&retryWrites=true&w=majority";

const DB_NAME = "mona_beauty";

let client = null;
let db = null;
let mongoFailed = false;

// ── in-memory fallback ──
let memProducts = null;
let memOrders = [];

function loadSeed() {
  if (memProducts) return;
  try {
    const raw = fs.readFileSync(SEED_PATH, "utf-8");
    const seed = JSON.parse(raw);
    memProducts = seed.products || [];
    memOrders = seed.orders || [];
  } catch {
    memProducts = [];
    memOrders = [];
  }
}

async function seedIfEmpty(database) {
  const count = await database.collection("products").countDocuments();
  if (count > 0) return;
  try {
    const raw = fs.readFileSync(SEED_PATH, "utf-8");
    const seed = JSON.parse(raw);
    if (seed.products?.length) {
      await database.collection("products").insertMany(seed.products);
      console.log("✅  Seeded", seed.products.length, "products to MongoDB");
    }
  } catch (e) {
    console.warn("Seed failed:", e.message);
  }
}

async function getDb() {
  if (mongoFailed) return null;
  if (db) return db;
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DB_NAME);
    await seedIfEmpty(db);
    console.log("✅  MongoDB connected");
    return db;
  } catch (e) {
    console.warn("⚠️  MongoDB unavailable, using in-memory fallback:", e.message);
    mongoFailed = true;
    loadSeed();
    return null;
  }
}

/* ─── Helpers ─── */
function safeObjectId(id) {
  try { return new ObjectId(id); } catch { return null; }
}
function docToProduct(doc) {
  const { _id, ...rest } = doc;
  return { ...rest, id: rest.id ?? _id.toString() };
}
function docToOrder(doc) {
  const { _id, ...rest } = doc;
  return { ...rest, id: rest.id ?? _id.toString() };
}

/* ─── Products ─── */
export async function dbGetProducts() {
  const database = await getDb();
  if (!database) { loadSeed(); return [...memProducts]; }
  const docs = await database.collection("products").find({}).toArray();
  return docs.map(docToProduct);
}

export async function dbGetProduct(id) {
  const database = await getDb();
  if (!database) { loadSeed(); return memProducts.find(p => p.id === id) || null; }
  const oid = safeObjectId(id);
  const filter = oid ? { $or: [{ id }, { _id: oid }] } : { id };
  const doc = await database.collection("products").findOne(filter);
  return doc ? docToProduct(doc) : null;
}

export async function dbCreateProduct(data) {
  const database = await getDb();
  if (!database) {
    loadSeed();
    const newProd = { ...data, id: String(Date.now()), soldOut: false };
    memProducts.push(newProd);
    return newProd;
  }
  const count = await database.collection("products").countDocuments();
  const newId = String(Date.now()).slice(-8) + String(count);
  const doc = { ...data, id: newId, soldOut: false };
  await database.collection("products").insertOne(doc);
  return docToProduct(doc);
}

export async function dbUpdateProduct(id, data) {
  const database = await getDb();
  const cleanData = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined));
  if (!database) {
    loadSeed();
    const idx = memProducts.findIndex(p => p.id === id);
    if (idx === -1) return null;
    memProducts[idx] = { ...memProducts[idx], ...cleanData };
    return memProducts[idx];
  }
  // Build filter — only add _id condition if id is a valid ObjectId
  const oid = safeObjectId(id);
  const filter = oid ? { $or: [{ id }, { _id: oid }] } : { id };
  await database.collection("products").updateOne(filter, { $set: cleanData });
  const updated = await database.collection("products").findOne(filter);
  return updated ? docToProduct(updated) : null;
}

export async function dbDeleteProduct(id) {
  const database = await getDb();
  if (!database) { loadSeed(); memProducts = memProducts.filter(p => p.id !== id); return; }
  const oid = safeObjectId(id);
  const filter = oid ? { $or: [{ id }, { _id: oid }] } : { id };
  await database.collection("products").deleteOne(filter);
}

export async function dbPatchProduct(id, data) {
  return dbUpdateProduct(id, data);
}

/* ─── Orders ─── */
export async function dbGetOrders() {
  const database = await getDb();
  if (!database) { loadSeed(); return [...memOrders].reverse(); }
  const docs = await database.collection("orders").find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(docToOrder);
}

export async function dbCreateOrder(data) {
  const database = await getDb();
  const order = {
    ...data,
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  if (!database) { loadSeed(); memOrders.unshift(order); return order; }
  await database.collection("orders").insertOne(order);
  return docToOrder(order);
}

export async function dbUpdateOrder(id, data) {
  const database = await getDb();
  if (!database) {
    loadSeed();
    const idx = memOrders.findIndex(o => o.id === id);
    if (idx === -1) return null;
    memOrders[idx] = { ...memOrders[idx], ...data };
    return memOrders[idx];
  }
  const oid = safeObjectId(id);
  const filter = oid ? { $or: [{ id }, { _id: oid }] } : { id };
  await database.collection("orders").updateOne(filter, { $set: data });
  const updated = await database.collection("orders").findOne(filter);
  return updated ? docToOrder(updated) : null;
}

export async function dbDeleteOrder(id) {
  const database = await getDb();
  if (!database) { loadSeed(); memOrders = memOrders.filter(o => o.id !== id); return; }
  const oid = safeObjectId(id);
  const filter = oid ? { $or: [{ id }, { _id: oid }] } : { id };
  await database.collection("orders").deleteOne(filter);
}
