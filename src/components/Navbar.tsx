import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";

export function Navbar() {
  const { cartCount } = useCart();
  const { isRTL } = useLang();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/*
          Always LTR inside: name on the physical LEFT, cart on the right.
          In RTL page the whole navbar flips, so we force ltr here
          so name stays on the left and cart stays on the right.
        */}
        <div className="flex w-full items-center justify-between" dir="ltr">

          {/* Brand name only */}
          <Link
            to="/"
            className="flex-shrink-0 transition-opacity hover:opacity-70"
          >
            <span className="whitespace-nowrap font-display tracking-[0.2em] text-xl sm:text-2xl md:text-3xl">
              DOCTOR<span className="font-light"> COSMETICS</span>
            </span>
          </Link>

          {/* Cart — always on the right */}
          <Link
            to="/cart"
            className="relative flex items-center transition-opacity hover:opacity-70"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.25} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

        </div>
      </div>
    </header>
  );
}
