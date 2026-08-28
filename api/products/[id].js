import { dbGetProduct, dbUpdateProduct, dbDeleteProduct, dbPatchProduct } from "../_lib/db.js";
import { json, parseBody, checkAuth } from "../_lib/utils.js";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return json(res, 200, {});

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const product = await dbGetProduct(id);
      if (!product) return json(res, 404, { error: "Not found" });
      return json(res, 200, product);
    } catch (e) {
      return json(res, 500, { error: e.message });
    }
  }

  if (!checkAuth(req)) return json(res, 401, { error: "Unauthorized" });

  if (req.method === "PUT") {
    try {
      const body = await parseBody(req);
      const updated = await dbUpdateProduct(id, {
        name: body.name,
        category: body.category,
        categorySlug: body.categorySlug,
        price: body.price != null ? Number(body.price) : undefined,
        images: body.images,
        description: body.description,
        usage: body.usage,
        productComponents: body.productComponents,
        soldOut: body.soldOut,
      });
      if (!updated) return json(res, 404, { error: "Not found" });
      return json(res, 200, updated);
    } catch (e) {
      return json(res, 400, { error: e.message });
    }
  }

  if (req.method === "PATCH") {
    try {
      const body = await parseBody(req);
      const updated = await dbPatchProduct(id, body);
      if (!updated) return json(res, 404, { error: "Not found" });
      return json(res, 200, updated);
    } catch (e) {
      return json(res, 400, { error: e.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      await dbDeleteProduct(id);
      return json(res, 200, { success: true });
    } catch (e) {
      return json(res, 500, { error: e.message });
    }
  }

  return json(res, 405, { error: "Method not allowed" });
}
