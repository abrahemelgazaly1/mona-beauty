import { json, parseBody, ADMIN_EMAIL, ADMIN_PASSWORD } from "../_lib/utils.js";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return json(res, 200, {});

  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  try {
    const body = await parseBody(req);
    if (body.email === ADMIN_EMAIL && body.password === ADMIN_PASSWORD) {
      const token = process.env.ADMIN_TOKEN || "mona-admin-secret-token";
      return json(res, 200, { token, email: ADMIN_EMAIL });
    }
    return json(res, 401, { error: "Invalid credentials" });
  } catch (e) {
    return json(res, 400, { error: e.message });
  }
}
