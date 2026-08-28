import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Home, Globe } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";

export function NavBottom() {
  const { wishlist } = useCart();
  const { lang, setLang } = useLang();

  const matches = useRouterState({ select: (s) => s.matches });
  const isHome = matches.some((m) => m.routeId === "/");
  const isWishlist = matches.some((m) => m.routeId === "/wishlist");

  const toggleLang = () => setLang(lang === "en" ? "ar" : "en");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
      aria-label="Bottom navigation"
    >
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-6">
        {/* Wishlist — left */}
        <Link
          to="/wishlist"
          className="relative flex flex-col items-center gap-1"
          aria-label="Wishlist"
        >
          <div className="relative">
            <Heart
              className={`h-6 w-6 transition-colors ${isWishlist ? "text-primary" : "text-muted-foreground"}`}
              strokeWidth={1.25}
            />
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-[9px] font-medium text-primary-foreground">
                {wishlist.length}
              </span>
            )}
          </div>
          <span
            className={`text-[9px] uppercase tracking-[0.2em] transition-colors ${isWishlist ? "text-primary" : "text-muted-foreground"}`}
          >
            {lang === "ar" ? "مفضلة" : "Wishlist"}
          </span>
          {isWishlist && (
            <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 bg-primary rounded-full" />
          )}
        </Link>

        {/* Home — center */}
        <Link
          to="/"
          className="relative flex flex-col items-center gap-1"
          aria-label="Home"
        >
          <Home
            className={`h-6 w-6 transition-colors ${isHome ? "text-primary" : "text-muted-foreground"}`}
            strokeWidth={1.25}
          />
          <span
            className={`text-[9px] uppercase tracking-[0.2em] transition-colors ${isHome ? "text-primary" : "text-muted-foreground"}`}
          >
            {lang === "ar" ? "الرئيسية" : "Home"}
          </span>
          {isHome && (
            <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 bg-primary rounded-full" />
          )}
        </Link>

        {/* Language — right */}
        <button
          onClick={toggleLang}
          className="relative flex flex-col items-center gap-1"
          aria-label="Toggle language"
        >
          <Globe className="h-6 w-6 text-muted-foreground" strokeWidth={1.25} />
          <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            {lang === "en" ? "AR" : "EN"}
          </span>
        </button>
      </div>
    </nav>
  );
}
