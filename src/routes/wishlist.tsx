import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NavBottom } from "@/components/NavBottom";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { useLang } from "@/context/LangContext";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — MONA BEAUTY" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useCart();
  const { t } = useLang();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-12 pb-28 md:pb-12">
        <div className="flex items-center gap-4">
          <Heart className="h-8 w-8" strokeWidth={1.25} />
          <h1 className="font-display text-5xl md:text-7xl">
            {t("wishlist_title")}
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-muted-foreground">{t("wishlist_empty")}</p>
            <Link
              to="/products"
              className="mt-6 inline-block border border-primary px-8 py-4 text-xs uppercase tracking-[0.3em] transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {t("wishlist_explore")}
            </Link>
          </div>
        ) : (
          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {items.length} {t("wishlist_saved")}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
              {items.map((p, i) => (
                <div
                  key={p.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
      <NavBottom />
    </div>
  );
}
