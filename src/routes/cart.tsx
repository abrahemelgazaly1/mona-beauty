import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NavBottom } from "@/components/NavBottom";
import { useCart } from "@/context/CartContext";
import { DELIVERY_FEE } from "@/lib/constants";
import { useLang } from "@/context/LangContext";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Doctor Cosmetics" }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, removeFromCart, cartTotal } = useCart();
  const { t } = useLang();
  const total = cartTotal + DELIVERY_FEE;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 py-12 pb-28 md:pb-12">
        <h1 className="font-display text-5xl md:text-7xl">{t("cart_title")}</h1>

        {cart.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-muted-foreground">{t("cart_empty")}</p>
            <Link
              to="/products"
              className="mt-6 inline-block border border-primary px-8 py-4 text-xs uppercase tracking-[0.3em] transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {t("cart_continue")}
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
            <div className="divide-y divide-border border-y border-border">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-6 py-6">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="h-32 w-24 object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                          {item.product.category}
                        </p>
                        <h3 className="mt-1 font-display text-xl">
                          {item.product.name}
                        </h3>
                        <p className="mt-1 text-sm">EGP {item.product.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label="Remove"
                      >
                        <X className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="flex items-center border border-border self-start">
                      <button
                        onClick={() => updateQty(item.product.id, item.qty - 1)}
                        className="px-3 py-2"
                      >
                        <Minus className="h-3 w-3" strokeWidth={1.5} />
                      </button>
                      <span className="min-w-10 text-center text-sm">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.product.id, item.qty + 1)}
                        className="px-3 py-2"
                      >
                        <Plus className="h-3 w-3" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="h-fit border border-border p-8">
              <h3 className="text-xs uppercase tracking-[0.3em]">
                {t("cart_summary")}
              </h3>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t("cart_subtotal")}
                  </span>
                  <span>EGP {cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {t("cart_delivery")}
                  </span>
                  <span>EGP {DELIVERY_FEE}</span>
                </div>
              </div>
              <div className="mt-6 flex justify-between border-t border-border pt-6 font-display text-2xl">
                <span>{t("cart_total")}</span>
                <span>EGP {total}</span>
              </div>
              <Link
                to="/checkout"
                className="mt-8 flex w-full items-center justify-center bg-primary py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-opacity hover:opacity-85"
              >
                {t("cart_checkout")}
              </Link>
            </aside>
          </div>
        )}
      </div>
      <Footer />
      <NavBottom />
    </div>
  );
}
