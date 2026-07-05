import express from "express";
import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import path from "path";

// ── load .env manually (no extra dependency needed in Node 20+) ──
const __dirname = path.dirname(fileURLToPath(import.meta.url));
try {
  const envPath = resolve(__dirname, ".env");
  const lines = readFileSync(envPath, "utf-8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    // take everything after the first = as the value (handles URIs with & and =)
    const val = trimmed.slice(eqIdx + 1).trim();
    process.env[key] = val; // always set, override nothing intentionally
  }
  console.log("✅  .env loaded, MONGODB_URI starts:", process.env.MONGODB_URI?.substring(0, 30));
} catch {
  console.log("ℹ️  No .env file found, using defaults");
}
import { dbGetProducts, dbGetProduct, dbCreateProduct, dbUpdateProduct, dbDeleteProduct, dbPatchProduct, dbGetOrders, dbCreateOrder, dbUpdateOrder, dbDeleteOrder } from "./api/_lib/db.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "./api/_lib/utils.js";

const app = express();
const PORT = 3001;

// ── CORS & JSON ──
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") return res.status(200).json({});
  next();
});
app.use(express.json({ limit: "20mb" }));

function checkAuth(req) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  return token === (process.env.ADMIN_TOKEN || "mona-admin-secret-token");
}

// ── AUTH ──
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ token: process.env.ADMIN_TOKEN || "mona-admin-secret-token", email });
  }
  return res.status(401).json({ error: "Invalid credentials" });
});

// ── BEST SELLERS ──
app.get("/api/best-sellers", async (_req, res) => {
  try {
    const products = await dbGetProducts();
    const best = products.filter((p) => p.bestSeller === true).slice(0, 8);
    res.json(best);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.patch("/api/best-sellers/:id", async (req, res) => {
  if (!checkAuth(req)) return res.status(401).json({ error: "Unauthorized" });
  try {
    const id = req.params.id || req.query.id;
    if (!id) return res.status(400).json({ error: "Missing product id" });
    const products = await dbGetProducts();
    const product = products.find((p) => p.id === String(id));
    if (!product) return res.status(404).json({ error: "Not found" });
    const currentBest = products.filter((p) => p.bestSeller === true);
    if (!product.bestSeller && currentBest.length >= 8) {
      return res.status(400).json({ error: "Maximum 8 best sellers allowed" });
    }
    const updated = await dbPatchProduct(String(id), { bestSeller: !product.bestSeller });
    res.json(updated);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// ── PRODUCTS ──
app.get("/api/products", async (_req, res) => {
  try { res.json(await dbGetProducts()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.post("/api/products", async (req, res) => {
  if (!checkAuth(req)) return res.status(401).json({ error: "Unauthorized" });
  try {
    const p = await dbCreateProduct(req.body);
    res.status(201).json(p);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const p = await dbGetProduct(req.params.id);
    if (!p) return res.status(404).json({ error: "Not found" });
    res.json(p);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.put("/api/products/:id", async (req, res) => {
  if (!checkAuth(req)) return res.status(401).json({ error: "Unauthorized" });
  try {
    const p = await dbUpdateProduct(req.params.id, req.body);
    if (!p) return res.status(404).json({ error: "Not found" });
    res.json(p);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

app.patch("/api/products/:id", async (req, res) => {
  if (!checkAuth(req)) return res.status(401).json({ error: "Unauthorized" });
  try {
    const p = await dbPatchProduct(req.params.id, req.body);
    if (!p) return res.status(404).json({ error: "Not found" });
    res.json(p);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

app.delete("/api/products/:id", async (req, res) => {
  if (!checkAuth(req)) return res.status(401).json({ error: "Unauthorized" });
  try {
    await dbDeleteProduct(req.params.id);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── ORDERS ──
app.get("/api/orders", async (req, res) => {
  if (!checkAuth(req)) return res.status(401).json({ error: "Unauthorized" });
  try { res.json(await dbGetOrders()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.post("/api/orders", async (req, res) => {
  try {
    const order = await dbCreateOrder(req.body);
    res.status(201).json(order);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

app.patch("/api/orders/:id", async (req, res) => {
  if (!checkAuth(req)) return res.status(401).json({ error: "Unauthorized" });
  try {
    const o = await dbUpdateOrder(req.params.id, req.body);
    if (!o) return res.status(404).json({ error: "Not found" });
    res.json(o);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

app.delete("/api/orders/:id", async (req, res) => {
  if (!checkAuth(req)) return res.status(401).json({ error: "Unauthorized" });
  try {
    await dbDeleteOrder(req.params.id);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.listen(PORT, () => {
  console.log(`✅  API server running at http://localhost:${PORT}`);
});
