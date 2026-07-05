// GET /api/best-sellers — return up to 8 best seller products
import { dbGetProducts } from "./_lib/db.js";
import { json } from "./_lib/utils.js";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return json(res, 200, {});

  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed" });

  try {
    const products = await dbGetProducts();
    const best = products.filter((p) => p.bestSeller === true).slice(0, 8);
    return json(res, 200, best);
  } catch (e) {
    return json(res, 500, { error: e.message });
  }
}
