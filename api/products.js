import { dbGetProducts, dbCreateProduct } from "./_lib/db.js";
import { json, parseBody, checkAuth } from "./_lib/utils.js";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return json(res, 200, {});

  if (req.method === "GET") {
    try {
      const products = await dbGetProducts();
      return json(res, 200, products);
    } catch (e) {
      return json(res, 500, { error: e.message });
    }
  }

  if (req.method === "POST") {
    if (!checkAuth(req)) return json(res, 401, { error: "Unauthorized" });
    try {
      const body = await parseBody(req);
      const product = await dbCreateProduct({
        name: body.name,
        category: body.category,
        categorySlug: body.categorySlug,
        price: Number(body.price),
        images: body.images || [],
        description: body.description || "",
        usage: body.usage || "",
        soldOut: false,
      });
      return json(res, 201, product);
    } catch (e) {
      return json(res, 400, { error: e.message });
    }
  }

  return json(res, 405, { error: "Method not allowed" });
}
