import type { Product } from "@/data/products";
import type { OrderStatus } from "@/lib/constants";

const API = "/api";

function authHeaders() {
  const token = localStorage.getItem("admin_token");
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};

export type PersonalInfo = {
  name: string;
  address: string;
  governorate: string;
  phone1: string;
  phone2: string;
};

export type PaymentInfo = {
  method: string;
  senderPhone: string;
  amount: number;
  receiptImage: string;
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  personalInfo: PersonalInfo;
  paymentInfo: PaymentInfo;
  subtotal: number;
  deliveryFee: number;
  total: number;
};

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchBestSellers(): Promise<Product[]> {
  const res = await fetch(`${API}/best-sellers`);
  if (!res.ok) throw new Error("Failed to fetch best sellers");
  return res.json();
}

export async function toggleBestSeller(id: string): Promise<Product> {
  const res = await fetch(`${API}/best-sellers/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(
      (data as { error?: string }).error || "Failed to toggle best seller",
    );
  }
  return res.json();
}

export async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`${API}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export async function createProduct(data: Partial<Product>): Promise<Product> {
  const res = await fetch(`${API}/products`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

export async function updateProduct(
  id: string,
  data: Partial<Product>,
): Promise<Product> {
  const res = await fetch(`${API}/products/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`${API}/products/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete product");
}

export async function toggleSoldOut(
  id: string,
  soldOut: boolean,
): Promise<Product> {
  const res = await fetch(`${API}/products/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ soldOut }),
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch(`${API}/orders`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function createOrder(
  data: Omit<Order, "id" | "createdAt" | "status">,
): Promise<Order> {
  const res = await fetch(`${API}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
): Promise<Order> {
  const res = await fetch(`${API}/orders/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update order");
  return res.json();
}

export async function deleteOrder(id: string): Promise<void> {
  const res = await fetch(`${API}/orders/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete order");
}

export async function adminLogin(
  email: string,
  password: string,
): Promise<{ token: string }> {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
