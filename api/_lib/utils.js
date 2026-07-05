export function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}

export function json(res, status, data) {
  cors(res);
  res.status(status).json(data);
}

export function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

export function checkAuth(req) {
  const auth = req.headers.authorization || "";
  const token = auth.replace("Bearer ", "");
  const expected = process.env.ADMIN_TOKEN || "mona-admin-secret-token";
  return token === expected;
}

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@monabeauty.com";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
