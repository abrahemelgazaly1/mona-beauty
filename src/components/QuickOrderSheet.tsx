import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { DELIVERY_FEE } from "@/lib/constants";
import Swal from "sweetalert2";

type Props = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function QuickOrderSheet({ product, open, onOpenChange }: Props) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const subtotal = product.price * qty;
  const total = subtotal + DELIVERY_FEE;
  const soldOut = product.soldOut;

  const handleAdd = () => {
    if (soldOut) {
      Swal.fire({
        icon: "warning",
        title: "Sold Out",
        text: "This product is currently sold out.",
        confirmButtonColor: "#000",
      });
      return;
    }
    addToCart(product, qty);
    Swal.fire({
      icon: "success",
      title: "Added to cart",
      timer: 1500,
      showConfirmButton: false,
    });
    onOpenChange(false);
    setQty(1);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">Quick Order</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          <div className="flex gap-4">
            <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-secondary">
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {soldOut && (
                <span className="absolute inset-0 flex items-center justify-center bg-primary/70 text-[10px] uppercase tracking-[0.2em] text-primary-foreground">
                  Sold Out
                </span>
              )}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {product.category}
              </p>
              <h3 className="font-display text-xl">{product.name}</h3>
              <p className="mt-1 text-sm">EGP {product.price}</p>
            </div>
          </div>

          {!soldOut && (
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Quantity
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

          <div className="space-y-2 border-t border-border pt-6 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>EGP {subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span>EGP {DELIVERY_FEE}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 font-display text-xl">
              <span>Total</span>
              <span>EGP {total}</span>
            </div>
          </div>

          {!soldOut && (
            <>
              <button
                onClick={handleAdd}
                className="w-full bg-primary py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-opacity hover:opacity-85"
              >
                Add to cart
              </button>
              <Link
                to="/checkout"
                onClick={() => {
                  addToCart(product, qty);
                  onOpenChange(false);
                }}
                className="flex w-full items-center justify-center border border-primary py-4 text-xs uppercase tracking-[0.3em] transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Proceed to checkout
              </Link>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
