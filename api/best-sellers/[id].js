// PATCH /api/best-sellers/:id — toggle bestSeller flag (admin only)
import { dbGetProducts, dbPatchProduct } from "../_lib/db.js";
import { json, checkAuth } from "../_lib/utils.js";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return json(res, 200, {});

  if (req.method !== "PATCH") return json(res, 405, { error: "Method not allowed" });

  if (!checkAuth(req)) return json(res, 401, { error: "Unauthorized" });

  try {
    const id = req.query.id;
    if (!id) return json(res, 400, { error: "Missing product id" });

    const products = await dbGetProducts();
    const product = products.find((p) => p.id === String(id));
    if (!product) return json(res, 404, { error: "Not found" });

    const currentBest = products.filter((p) => p.bestSeller === true);
    if (!product.bestSeller && currentBest.length >= 8) {
      return json(res, 400, { error: "Maximum 8 best sellers allowed" });
    }

    const updated = await dbPatchProduct(String(id), { bestSeller: !product.bestSeller });
    return json(res, 200, updated);
  } catch (e) {
    return json(res, 400, { error: e.message });
  }
}
