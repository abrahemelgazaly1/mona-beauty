import { useState, useEffect, useRef } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  LogOut,
  Search,
  Trash2,
  Edit,
  ChevronDown,
  Package,
  ShoppingBag,
  Upload,
  X,
  Star,
} from "lucide-react";
import { categories } from "@/data/products";
import type { Product } from "@/data/products";
import type { Order } from "@/lib/api";
import {
  fetchOrders,
  updateOrderStatus,
  deleteOrder,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleSoldOut,
  toggleBestSeller,
  fileToBase64,
} from "@/lib/api";
import {
  EGYPT_GOVERNORATES,
  ORDER_STATUSES,
  DELIVERY_FEE,
} from "@/lib/constants";
import type { OrderStatus } from "@/lib/constants";
import Swal from "sweetalert2";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin — Doctor Cosmetics" }] }),
  beforeLoad: () => {
    // Block direct URL access if not logged in
    if (typeof window !== "undefined" && !localStorage.getItem("admin_token")) {
      window.location.href = "/admin/login";
    }
  },
  component: AdminDashboard,
});

/* ─── helpers ─── */
function useAdminGuard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      navigate({ to: "/admin/login" });
    }
  }, [navigate]);
}

type Tab = "add" | "manage" | "orders";

/* ═══════════════════════════════════════════════════════════ DASHBOARD */
function AdminDashboard() {
  useAdminGuard();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("add");
  const [tabBarRef, setTabBarRef] = useState<HTMLDivElement | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({
    add: null,
    manage: null,
    orders: null,
  });

  useEffect(() => {
    const el = tabRefs.current[tab];
    if (el) setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
  }, [tab, tabBarRef]);

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <span className="font-display text-lg tracking-[0.2em] sm:text-xl">
            DOCTOR COSMETICS{" "}
            <span className="text-xs font-light tracking-[0.3em] text-muted-foreground">
              ADMIN
            </span>
          </span>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.5} />{" "}
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
        {/* tab slider — scrollable on mobile */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div
            ref={setTabBarRef}
            className="relative flex border-b border-border overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {(["add", "manage", "orders"] as Tab[]).map((t) => (
              <button
                key={t}
                ref={(el) => {
                  tabRefs.current[t] = el;
                }}
                onClick={() => setTab(t)}
                className={`relative shrink-0 whitespace-nowrap px-6 py-3 text-xs uppercase tracking-[0.3em] transition-colors ${tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {t === "add"
                  ? "Add Product"
                  : t === "manage"
                    ? "Manage Products"
                    : "Orders"}
              </button>
            ))}
            <span
              className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300"
              style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {tab === "add" && (
          <AddProductTab onSaved={() => setTab("manage")} editProduct={null} />
        )}
        {tab === "manage" && (
          <ManageProductsTab onEdit={(_p) => setTab("add")} />
        )}
        {tab === "orders" && <OrdersTab />}
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ ADD PRODUCT */
function AddProductTab({
  onSaved,
  editProduct,
}: {
  onSaved: () => void;
  editProduct: Product | null;
}) {
  const [name, setName] = useState(editProduct?.name ?? "");
  const [price, setPrice] = useState(editProduct?.price?.toString() ?? "");
  const [description, setDescription] = useState(
    editProduct?.description ?? "",
  );
  const [usage, setUsage] = useState(editProduct?.usage ?? "");
  const [categorySlug, setCategorySlug] = useState(
    editProduct?.categorySlug ?? "",
  );
  const [images, setImages] = useState<string[]>(editProduct?.images ?? []);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const cat = categories.find((c) => c.slug === categorySlug);

  const MAX_IMAGES = 4;
  const MAX_FILE_MB = 8; // max MB per image

  const handleImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(
      0,
      MAX_IMAGES - images.length,
    );

    if (files.length === 0) return;

    // Check file sizes
    const oversized = files.filter(
      (f) => f.size > MAX_FILE_MB * 1024 * 1024,
    );
    if (oversized.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Image too large",
        text: `Max size is ${MAX_FILE_MB}MB per image. ${oversized.map((f) => f.name).join(", ")} exceeded the limit.`,
        confirmButtonColor: "#000",
      });
      return;
    }

    // Show uploading feedback
    Swal.fire({
      title: "Uploading images...",
      text: `Processing ${files.length} image${files.length > 1 ? "s" : ""}`,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const b64s = await Promise.all(files.map(fileToBase64));
      setImages((prev) => [...prev, ...b64s].slice(0, MAX_IMAGES));
      Swal.fire({
        icon: "success",
        title: `${files.length} image${files.length > 1 ? "s" : ""} uploaded successfully!`,
        timer: 1200,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Upload failed",
        confirmButtonColor: "#000",
      });
    }
    // Reset input so same file can be re-selected
    if (fileRef.current) fileRef.current.value = "";
  };

  const removeImage = (i: number) =>
    setImages((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !categorySlug || !description) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        confirmButtonColor: "#000",
      });
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name,
        price: Number(price),
        description,
        usage,
        categorySlug,
        category: cat?.name ?? categorySlug,
        images,
      };
      if (editProduct) await updateProduct(editProduct.id, payload);
      else await createProduct(payload);
      Swal.fire({
        icon: "success",
        title: editProduct ? "Product updated!" : "Product added!",
        timer: 1500,
        showConfirmButton: false,
      });
      onSaved();
    } catch {
      Swal.fire({ icon: "error", title: "Error", confirmButtonColor: "#000" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      <h2 className="font-display text-3xl">
        {editProduct ? "Edit Product" : "Add Product"}
      </h2>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Product Name *
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
          placeholder="e.g. Silk Repair Shampoo"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Price (EGP) *
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
          placeholder="e.g. 350"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Description *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary resize-none"
          placeholder="Product description..."
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
          How to Use
        </label>
        <textarea
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          rows={2}
          className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary resize-none"
          placeholder="Usage instructions..."
        />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Category *
        </label>
        <div className="relative">
          <select
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="w-full appearance-none border border-border bg-transparent px-4 py-3 pr-10 text-sm outline-none focus:border-primary"
            required
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.25}
          />
        </div>
      </div>

      {/* Image upload */}
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Images (max 4) — first image is the main card image
        </label>
        {images.length > 0 && (
          <div className="mb-3 flex gap-2 flex-wrap">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative h-20 w-16 overflow-hidden border border-border bg-secondary"
              >
                {/* Click to view full size */}
                <button
                  type="button"
                  onClick={() =>
                    Swal.fire({
                      imageUrl: img,
                      imageAlt: `Image ${i + 1}`,
                      showConfirmButton: false,
                      showCloseButton: true,
                      width: "auto",
                      padding: "1rem",
                      background: "#fff",
                    })
                  }
                  className="h-full w-full"
                  title="Click to view full size"
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover transition-opacity hover:opacity-80"
                  />
                </button>
                {i === 0 && (
                  <span className="pointer-events-none absolute bottom-0 left-0 right-0 bg-primary/80 py-0.5 text-center text-[8px] uppercase tracking-wider text-primary-foreground">
                    Main
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center bg-primary text-primary-foreground"
                >
                  <X className="h-2.5 w-2.5" strokeWidth={2} />
                </button>
              </div>
            ))}
          </div>
        )}
        {images.length < MAX_IMAGES && (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 border border-dashed border-border px-4 py-3 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:border-primary hover:text-foreground transition-colors"
          >
            <Upload className="h-4 w-4" strokeWidth={1.5} /> Upload Images (
            {images.length}/{MAX_IMAGES}) — max {MAX_FILE_MB}MB each
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImages}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {loading ? "Saving..." : editProduct ? "Save Changes" : "Add Product"}
      </button>
    </form>
  );
}

/* ═══════════════════════════════════════════════════════════ MANAGE PRODUCTS */
function ManageProductsTab({ onEdit }: { onEdit: (p: Product) => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editTarget, setEditTarget] = useState<Product | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load products:", e);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (p: Product) => {
    const { isConfirmed } = await Swal.fire({
      icon: "warning",
      title: `Delete "${p.name}"?`,
      text: "This cannot be undone.",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#888",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });
    if (!isConfirmed) return;
    try {
      await deleteProduct(p.id);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        timer: 1200,
        showConfirmButton: false,
      });
      load();
    } catch {
      Swal.fire({ icon: "error", title: "Error", confirmButtonColor: "#000" });
    }
  };

  const handleSoldOut = async (p: Product) => {
    try {
      await toggleSoldOut(p.id, !p.soldOut);
      Swal.fire({
        icon: "success",
        title: p.soldOut ? "Marked as available" : "Marked as sold out",
        timer: 1200,
        showConfirmButton: false,
      });
      load();
    } catch {
      Swal.fire({ icon: "error", title: "Error", confirmButtonColor: "#000" });
    }
  };

  const handleBest = async (p: Product) => {
    try {
      await toggleBestSeller(p.id);
      Swal.fire({
        icon: "success",
        title: p.bestSeller
          ? "Removed from best sellers"
          : "Added to best sellers!",
        timer: 1200,
        showConfirmButton: false,
      });
      load();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error";
      Swal.fire({ icon: "error", title: msg, confirmButtonColor: "#000" });
    }
  };

  if (editTarget) {
    return (
      <div>
        <button
          onClick={() => setEditTarget(null)}
          className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to products
        </button>
        <AddProductTab
          editProduct={editTarget}
          onSaved={() => {
            setEditTarget(null);
            load();
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <h2 className="font-display text-3xl">Manage Products</h2>
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {products.length} items
        </span>
      </div>

      {/* Search */}
      <div className="relative mb-8 max-w-sm">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          strokeWidth={1.25}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-border bg-transparent py-3 pl-10 pr-4 text-sm outline-none focus:border-primary"
          placeholder="Search products..."
        />
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted-foreground text-sm">
          Loading...
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((p) => (
            <div key={p.id} className="border border-border bg-background">
              {/* Mobile: vertical card. Desktop: horizontal row */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 sm:p-3">
                {/* Image — full width on mobile, fixed size on desktop */}
                <div className="relative w-full aspect-[4/2] overflow-hidden bg-secondary sm:aspect-auto sm:h-16 sm:w-12 sm:shrink-0">
                  <img
                    src={p.images?.[0]}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                  {p.soldOut && (
                    <span className="absolute inset-0 flex items-center justify-center bg-primary/60 text-[10px] uppercase tracking-[0.2em] text-primary-foreground">
                      Sold Out
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 px-3 pt-2 pb-1 sm:px-0 sm:py-0">
                  <h3 className="font-display text-sm leading-tight truncate">
                    {p.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {p.category} · EGP {p.price}
                  </p>
                  {p.bestSeller && (
                    <span className="inline-flex items-center gap-1 mt-1 text-[9px] uppercase tracking-[0.15em] text-amber-600">
                      <Star
                        className="h-2.5 w-2.5 fill-amber-500 text-amber-500"
                        strokeWidth={0}
                      />{" "}
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Actions — full width on mobile, inline on desktop */}
                <div className="grid grid-cols-4 gap-1 px-3 pb-3 sm:flex sm:shrink-0 sm:gap-1.5 sm:px-0 sm:pb-0">
                  <button
                    onClick={() => handleBest(p)}
                    className={`flex items-center justify-center gap-1 border py-2 text-[9px] uppercase tracking-[0.1em] transition-colors sm:px-2 sm:py-1.5 ${
                      p.bestSeller
                        ? "border-amber-500 bg-amber-500 text-white"
                        : "border-border hover:border-amber-400 hover:text-amber-600"
                    }`}
                    title={
                      p.bestSeller
                        ? "Remove from best sellers"
                        : "Add to best sellers"
                    }
                  >
                    <Star
                      className={`h-3 w-3 ${p.bestSeller ? "fill-white" : ""}`}
                      strokeWidth={p.bestSeller ? 0 : 1.5}
                    />
                    <span className="hidden sm:inline">Best</span>
                  </button>
                  <button
                    onClick={() => handleSoldOut(p)}
                    className={`flex items-center justify-center gap-1 border py-2 text-[9px] uppercase tracking-[0.1em] transition-colors sm:px-2 sm:py-1.5 ${
                      p.soldOut
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    <Package className="h-3 w-3" strokeWidth={1.5} />
                    <span className="hidden sm:inline">
                      {p.soldOut ? "Stock" : "S/O"}
                    </span>
                  </button>
                  <button
                    onClick={() => setEditTarget(p)}
                    className="flex items-center justify-center gap-1 border border-border py-2 text-[9px] uppercase tracking-[0.1em] hover:bg-secondary transition-colors sm:px-2 sm:py-1.5"
                  >
                    <Edit className="h-3 w-3" strokeWidth={1.5} />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    className="flex items-center justify-center gap-1 border border-destructive py-2 text-[9px] uppercase tracking-[0.1em] text-destructive hover:bg-destructive hover:text-white transition-colors sm:px-2 sm:py-1.5"
                  >
                    <Trash2 className="h-3 w-3" strokeWidth={1.5} />
                    <span className="hidden sm:inline">Del</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ ORDERS */
function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      setOrders(await fetchOrders());
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to load orders",
        confirmButtonColor: "#000",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatus = async (order: Order, status: OrderStatus) => {
    try {
      await updateOrderStatus(order.id, status);
      Swal.fire({
        icon: "success",
        title: "Status updated",
        timer: 1200,
        showConfirmButton: false,
      });
      load();
    } catch {
      Swal.fire({ icon: "error", title: "Error", confirmButtonColor: "#000" });
    }
  };

  const handleDelete = async (order: Order) => {
    const { isConfirmed } = await Swal.fire({
      icon: "warning",
      title: `Delete order #${order.id}?`,
      text: "This cannot be undone.",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#888",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });
    if (!isConfirmed) return;
    try {
      await deleteOrder(order.id);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        timer: 1200,
        showConfirmButton: false,
      });
      load();
    } catch {
      Swal.fire({ icon: "error", title: "Error", confirmButtonColor: "#000" });
    }
  };

  const statusColor: Record<OrderStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <h2 className="font-display text-3xl">Orders</h2>
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {orders.length} orders
        </span>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted-foreground text-sm">
          Loading...
        </div>
      ) : orders.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          No orders yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-border bg-background">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
                <div className="flex items-center gap-4">
                  <span className="font-display text-lg">
                    Order #{order.id}
                  </span>
                  <span
                    className={`rounded-full px-3 py-0.5 text-[10px] uppercase tracking-[0.2em] font-medium ${statusColor[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleString("en-EG", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-2">
                {/* Items */}
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Items
                  </p>
                  <div className="space-y-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-14 w-10 object-cover bg-secondary shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            x{item.qty} — EGP {item.price * item.qty}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personal info */}
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Personal Information
                  </p>
                  <div className="space-y-1.5 text-sm">
                    <p>
                      <span className="text-muted-foreground">Name: </span>
                      {order.personalInfo?.name}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Address: </span>
                      {order.personalInfo?.address}
                    </p>
                    <p>
                      <span className="text-muted-foreground">
                        Governorate:{" "}
                      </span>
                      {order.personalInfo?.governorate}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Phone 1: </span>
                      {order.personalInfo?.phone1}
                    </p>
                    {order.personalInfo?.phone2 && (
                      <p>
                        <span className="text-muted-foreground">Phone 2: </span>
                        {order.personalInfo.phone2}
                      </p>
                    )}
                  </div>
                </div>

                {/* Payment info */}
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Payment Information
                  </p>
                  <div className="space-y-1.5 text-sm">
                    <p>
                      <span className="text-muted-foreground">Method: </span>
                      Vodafone Cash
                    </p>
                    <p>
                      <span className="text-muted-foreground">Sender: </span>
                      {order.paymentInfo?.senderPhone}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Amount: </span>EGP{" "}
                      {order.paymentInfo?.amount}
                    </p>
                  </div>
                  {order.paymentInfo?.receiptImage && (
                    <div className="mt-3">
                      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Transfer Receipt
                      </p>
                      <img
                        src={order.paymentInfo.receiptImage}
                        alt="Receipt"
                        className="max-h-40 border border-border object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Order Total
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>EGP {order.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span>EGP {order.deliveryFee ?? DELIVERY_FEE}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2 font-display text-xl">
                      <span>Total</span>
                      <span>EGP {order.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 border-t border-border px-6 py-4">
                <div className="relative flex-1 min-w-[180px]">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatus(order, e.target.value as OrderStatus)
                    }
                    className="w-full appearance-none border border-border bg-transparent px-4 py-2.5 pr-8 text-xs uppercase tracking-[0.2em] outline-none focus:border-primary"
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
                    strokeWidth={1.5}
                  />
                </div>
                <button
                  onClick={() => handleDelete(order)}
                  className="flex items-center gap-2 border border-destructive px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-destructive hover:bg-destructive hover:text-white transition-colors"
                >
                  <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />{" "}
                  Delete Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
