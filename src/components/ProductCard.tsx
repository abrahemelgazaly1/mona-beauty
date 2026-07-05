import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { QuickOrderSheet } from "@/components/QuickOrderSheet";
import Swal from "sweetalert2";

export function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isInWishlist } = useCart();
  const [quickOpen, setQuickOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const wished = isInWishlist(product.id);
  const soldOut = product.soldOut;
  const displayImage =
    hovered && product.images[1] ? product.images[1] : product.images[0];

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    Swal.fire({
      icon: "success",
      title: wished ? "Removed from wishlist" : "Added to wishlist",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  const handleQuickOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (soldOut) {
      Swal.fire({
        icon: "warning",
        title: "Sold Out",
        text: "This product is currently sold out.",
        confirmButtonColor: "#000",
      });
      return;
    }
    setQuickOpen(true);
  };

  return (
    <>
      <div className="group relative">
        {/* Action icons outside card */}
        <div className="absolute -right-1 -top-1 z-10 flex flex-col gap-2">
          <button
            onClick={handleQuickOrder}
            className="flex h-9 w-9 items-center justify-center border border-border bg-background shadow-soft transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Quick order"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.25} />
          </button>
          <button
            onClick={handleWishlist}
            className="flex h-9 w-9 items-center justify-center border border-border bg-background shadow-soft transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Wishlist"
          >
            <Heart
              className={`h-4 w-4 ${wished ? "fill-primary" : ""}`}
              strokeWidth={1.25}
            />
          </button>
        </div>

        <Link
          to="/products/$id"
          params={{ id: product.id }}
          className="block"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
            <img
              src={displayImage}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
            {soldOut && (
              <span className="absolute inset-0 flex items-center justify-center bg-primary/60 text-xs uppercase tracking-[0.3em] text-primary-foreground">
                Sold Out
              </span>
            )}
            {!soldOut && (
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-primary py-3 text-center text-xs font-medium uppercase tracking-[0.3em] text-primary-foreground transition-transform duration-500 group-hover:translate-y-0">
                View Product
              </div>
            )}
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {product.category}
            </p>
            <h3 className="font-display text-sm leading-tight">
              {product.name}
            </h3>
            <p className="text-xs">EGP {product.price}</p>
          </div>
        </Link>
      </div>

      <QuickOrderSheet
        product={product}
        open={quickOpen}
        onOpenChange={setQuickOpen}
      />
    </>
  );
}
