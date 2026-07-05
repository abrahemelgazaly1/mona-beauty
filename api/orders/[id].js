import { dbUpdateOrder, dbDeleteOrder } from "../_lib/db.js";
import { json, parseBody, checkAuth } from "../_lib/utils.js";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return json(res, 200, {});

  if (!checkAuth(req)) return json(res, 401, { error: "Unauthorized" });

  const { id } = req.query;

  if (req.method === "PATCH") {
    try {
      const body = await parseBody(req);
      const updated = await dbUpdateOrder(id, body);
      if (!updated) return json(res, 404, { error: "Not found" });
      return json(res, 200, updated);
    } catch (e) {
      return json(res, 400, { error: e.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      await dbDeleteOrder(id);
      return json(res, 200, { success: true });
    } catch (e) {
      return json(res, 500, { error: e.message });
    }
  }

  return json(res, 405, { error: "Method not allowed" });
}
