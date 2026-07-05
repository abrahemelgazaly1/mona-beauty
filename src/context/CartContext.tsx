import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";
import { DELIVERY_FEE } from "@/lib/constants";

type CartItem = { product: Product; qty: number };

type Ctx = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (p: Product, qty?: number) => boolean;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  toggleWishlist: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  deliveryFee: number;
  isInWishlist: (id: string) => boolean;
};

const CartCtx = createContext<Ctx | null>(null);
const CART_KEY = "mona_cart";
const WISH_KEY = "mona_wishlist";

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(load(CART_KEY, []));
    setWishlist(load(WISH_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = (p: Product, qty = 1) => {
    if (p.soldOut) return false;
    setCart((c) => {
      const existing = c.find((i) => i.product.id === p.id);
      if (existing)
        return c.map((i) =>
          i.product.id === p.id ? { ...i, qty: i.qty + qty } : i,
        );
      return [...c, { product: p, qty }];
    });
    return true;
  };

  const removeFromCart = (id: string) =>
    setCart((c) => c.filter((i) => i.product.id !== id));
  const updateQty = (id: string, qty: number) =>
    setCart((c) =>
      qty <= 0
        ? c.filter((i) => i.product.id !== id)
        : c.map((i) => (i.product.id === id ? { ...i, qty } : i)),
    );
  const toggleWishlist = (id: string) =>
    setWishlist((w) =>
      w.includes(id) ? w.filter((x) => x !== id) : [...w, id],
    );
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.qty * i.product.price, 0);

  return (
    <CartCtx.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQty,
        toggleWishlist,
        clearCart,
        cartCount,
        cartTotal,
        deliveryFee: DELIVERY_FEE,
        isInWishlist: (id) => wishlist.includes(id),
      }}
    >
      {children}
    </CartCtx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside provider");
  return c;
};
