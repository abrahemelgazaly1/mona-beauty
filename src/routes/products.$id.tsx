import { useState, useMemo } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Heart,
  Minus,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NavBottom } from "@/components/NavBottom";
import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import type { Product } from "@/data/products";

export const Route = createFileRoute("/products/$id")({
  loader: async ({ params }) => {
    const products = await fetchProducts();
    const product = products.find((p) => String(p.id) === String(params.id));
    if (!product) throw notFound();
    return { product, allProducts: products };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Product"} — MONA BEAUTY` },
      { name: "description", content: loaderData?.product.description ?? "" },
    ],
  }),
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Product not found</h1>
        <Link
          to="/products"
          className="mt-6 inline-block text-xs uppercase tracking-[0.3em] underline"
        >
          Back to shop
        </Link>
      </div>
      <Footer />
    </div>
  ),
});

function ProductDetail() {
  const { product, allProducts } = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const { t } = useLang();
  const [slide, setSlide] = useState(0);
  const [qty, setQty] = useState(1);
  const [descOpen, setDescOpen] = useState(true);

  const isWished = wishlist.includes(product.id);

  // Pick 4 random products different from current — shuffled once per page load
  const suggestions = useMemo(() => {
    const pool = allProducts.filter((p: Product) => p.id !== product.id);
    // Fisher-Yates shuffle
    const arr = [...pool];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-12 pb-28 md:pb-12">
        <nav className="mb-8 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            {t("detail_home")}
          </Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-foreground">
            {t("detail_products")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* SLIDER */}
          <div className="animate-fade-in">
            <div className="relative aspect-square overflow-hidden bg-secondary">
              {product.images.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  alt={product.name}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === slide ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <button
                onClick={() =>
                  setSlide(
                    (s) =>
                      (s - 1 + product.images.length) % product.images.length,
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-3 backdrop-blur-sm transition-opacity hover:bg-background"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setSlide((s) => (s + 1) % product.images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-3 backdrop-blur-sm transition-opacity hover:bg-background"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {product.images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`aspect-square overflow-hidden border-2 transition-colors ${i === slide ? "border-primary" : "border-transparent"}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="animate-fade-up lg:pt-4">
            <h1 className="font-display text-4xl leading-tight md:text-5xl">
              {product.name}
            </h1>
            <div className="mt-6 font-display text-3xl">
              EGP {product.price}
            </div>

            {product.soldOut && (
              <div className="mt-4 inline-block bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-primary">
                {t("product_sold_out")}
              </div>
            )}

            {/* Description */}
            <button
              onClick={() => setDescOpen((o) => !o)}
              className="mt-10 flex w-full items-center justify-between border-b border-border pb-4 text-xs uppercase tracking-[0.3em]"
            >
              {t("detail_description")}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${descOpen ? "rotate-180" : ""}`}
                strokeWidth={1.5}
              />
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-500 ${descOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="min-h-0">
                <p className="pt-4 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Quantity */}
            {!product.soldOut && (
              <div className="mt-8 flex items-center gap-4">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {t("detail_quantity")}
                </span>
                <div className="flex items-center border border-border">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 hover:bg-secondary"
                    aria-label="Decrease"
                  >
                    <Minus className="h-3 w-3" strokeWidth={1.5} />
                  </button>
                  <span className="min-w-10 text-center text-sm">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3 py-2 hover:bg-secondary"
                    aria-label="Increase"
                  >
                    <Plus className="h-3 w-3" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            )}

            {/* Wishlist + Add to Cart */}
            <div className="mt-6 grid grid-cols-10 gap-3">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="col-span-3 flex items-center justify-center border border-primary py-4 transition-colors hover:bg-secondary"
                aria-label="Wishlist"
              >
                <Heart
                  className={`h-5 w-5 ${isWished ? "fill-primary" : ""}`}
                  strokeWidth={1.5}
                />
              </button>
              <button
                onClick={() => !product.soldOut && addToCart(product, qty)}
                disabled={product.soldOut}
                className="col-span-7 bg-primary py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {product.soldOut ? t("product_sold_out") : t("detail_add_cart")}
              </button>
            </div>

            {!product.soldOut && (
              <Link
                to="/cart"
                onClick={() => addToCart(product, qty)}
                className="mt-3 flex w-full items-center justify-center border border-primary bg-transparent py-4 text-xs uppercase tracking-[0.3em] transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {t("detail_checkout")}
              </Link>
            )}

            {/* Usage */}
            {product.usage && (
              <div className="mt-10 border-t border-border pt-6">
                <h4 className="text-xs uppercase tracking-[0.3em]">
                  {t("detail_how_to_use")}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {product.usage}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* You may also like */}
        {suggestions.length > 0 && (
          <section className="mt-24 border-t border-border pt-16">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-display text-3xl md:text-5xl">
                {t("detail_you_may")}
              </h2>
            </div>
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {suggestions.map((p: Product) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
      <NavBottom />
    </div>
  );
}
