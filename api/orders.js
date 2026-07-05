import { dbGetOrders, dbCreateOrder } from "./_lib/db.js";
import { json, parseBody, checkAuth } from "./_lib/utils.js";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return json(res, 200, {});

  if (req.method === "GET") {
    const auth = req.headers.authorization || "";
    const token = auth.replace("Bearer ", "");
    const expected = process.env.ADMIN_TOKEN || "mona-admin-secret-token";
    if (token !== expected) return json(res, 401, { error: "Unauthorized" });
    try {
      const orders = await dbGetOrders();
      return json(res, 200, orders);
    } catch (e) {
      return json(res, 500, { error: e.message });
    }
  }

  if (req.method === "POST") {
    try {
      const body = await parseBody(req);
      const order = await dbCreateOrder({
        items: body.items,
        personalInfo: body.personalInfo,
        paymentInfo: body.paymentInfo,
        subtotal: body.subtotal,
        deliveryFee: body.deliveryFee || 120,
        total: body.total,
      });
      return json(res, 201, order);
    } catch (e) {
      return json(res, 400, { error: e.message });
    }
  }

  return json(res, 405, { error: "Method not allowed" });
}
