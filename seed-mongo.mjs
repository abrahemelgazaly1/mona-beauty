import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// load .env
const lines = readFileSync(path.join(__dirname, ".env"), "utf-8").split("\n");
for (const line of lines) {
  const t = line.trim();
  if (!t || t.startsWith("#")) continue;
  const eq = t.indexOf("=");
  if (eq < 0) continue;
  process.env[t.slice(0, eq).trim()] = t.slice(eq + 1).trim();
}

const uri = process.env.MONGODB_URI;
const seed = JSON.parse(readFileSync(path.join(__dirname, "data/db.json"), "utf-8"));

console.log("Connecting...");
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
await client.connect();
const db = client.db("mona_beauty");

// products
const existing = await db.collection("products").countDocuments();
if (existing === 0) {
  await db.collection("products").insertMany(seed.products);
  console.log(`✅  Seeded ${seed.products.length} products`);
} else {
  console.log(`ℹ️  Products already exist: ${existing}`);
}

// clear orders
const ordersCount = await db.collection("orders").countDocuments();
console.log(`ℹ️  Orders in DB: ${ordersCount}`);

await client.close();
console.log("Done!");
