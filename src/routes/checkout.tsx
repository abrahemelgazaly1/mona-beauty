import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Copy, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NavBottom } from "@/components/NavBottom";
import { useCart } from "@/context/CartContext";
import {
  DELIVERY_FEE,
  EGYPT_GOVERNORATES,
  VODAFONE_CASH_NUMBER,
} from "@/lib/constants";
import { createOrder } from "@/lib/api";
import Swal from "sweetalert2";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — MONA BEAUTY" }] }),
  component: CheckoutPage,
});

type Step = "info" | "payment";

/* ─── Order Summary (reusable) ─── */
function OrderSummary({
  cartTotal,
  total,
}: {
  cartTotal: number;
  total: number;
}) {
  const { cart } = useCart();
  return (
    <div className="border border-border bg-background p-5 sm:p-6">
      <h3 className="text-xs uppercase tracking-[0.3em]">Order Summary</h3>
      <div className="mt-4 divide-y divide-border">
        {cart.map((item) => (
          <div key={item.product.id} className="flex gap-3 py-3">
            <img
              src={item.product.images[0]}
              alt=""
              className="h-14 w-10 shrink-0 object-cover sm:h-16 sm:w-12"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium leading-tight">
                {item.product.name}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                x{item.qty}
              </p>
            </div>
            <p className="shrink-0 text-xs">
              EGP {item.product.price * item.qty}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-2 border-t border-border pt-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>EGP {cartTotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery</span>
          <span>EGP {DELIVERY_FEE}</span>
        </div>
      </div>
      <div className="mt-3 flex justify-between border-t border-border pt-3 font-display text-xl">
        <span>Total</span>
        <span>EGP {total}</span>
      </div>
    </div>
  );
}

function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cartTotal + DELIVERY_FEE;

  const [step, setStep] = useState<Step>("info");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");

  const [senderPhone, setSenderPhone] = useState("");
  const [amountSent, setAmountSent] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string>("");

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="py-32 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Link
            to="/products"
            className="mt-6 inline-block border border-primary px-8 py-4 text-xs uppercase tracking-[0.3em] transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Continue shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReceiptFile(file);
    const reader = new FileReader();
    reader.onload = () => setReceiptPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !address.trim() || !governorate || !phone1.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing info",
        text: "Please fill all required fields.",
        confirmButtonColor: "#000",
      });
      return;
    }
    if (phone1.replace(/\D/g, "").length !== 10) {
      Swal.fire({
        icon: "warning",
        title: "Invalid phone",
        text: "Phone 1 must be 10 digits.",
        confirmButtonColor: "#000",
      });
      return;
    }
    if (phone2 && phone2.replace(/\D/g, "").length !== 10) {
      Swal.fire({
        icon: "warning",
        title: "Invalid phone",
        text: "Phone 2 must be 10 digits.",
        confirmButtonColor: "#000",
      });
      return;
    }
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrder = async () => {
    if (!senderPhone.trim() || senderPhone.replace(/\D/g, "").length !== 10) {
      Swal.fire({
        icon: "warning",
        title: "Invalid phone",
        text: "Sender phone must be 10 digits.",
        confirmButtonColor: "#000",
      });
      return;
    }
    if (!amountSent || Number(amountSent) <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Missing amount",
        text: "Please enter the transferred amount.",
        confirmButtonColor: "#000",
      });
      return;
    }
    if (!receiptFile) {
      Swal.fire({
        icon: "warning",
        title: "No receipt",
        text: "Please upload a transfer screenshot.",
        confirmButtonColor: "#000",
      });
      return;
    }
    setLoading(true);
    try {
      await createOrder({
        items: cart.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          price: i.product.price,
          qty: i.qty,
          image: i.product.images[0],
        })),
        personalInfo: {
          name,
          address,
          governorate,
          phone1: `+20${phone1}`,
          phone2: phone2 ? `+20${phone2}` : "",
        },
        paymentInfo: {
          method: "vodafone_cash",
          senderPhone: `+20${senderPhone}`,
          amount: Number(amountSent),
          receiptImage: receiptPreview,
        },
        subtotal: cartTotal,
        deliveryFee: DELIVERY_FEE,
        total,
      });
      clearCart();
      await Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Your order has been received. We'll contact you soon.",
        confirmButtonColor: "#000",
        confirmButtonText: "Back to Home",
      });
      navigate({ to: "/" });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to place order. Please try again.",
        confirmButtonColor: "#000",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">
          Checkout
        </h1>

        {/* Step indicator */}
        <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em]">
          <span
            className={
              step === "info" ? "text-foreground" : "text-muted-foreground"
            }
          >
            1. Your Info
          </span>
          <span className="h-px w-8 bg-border" />
          <span
            className={
              step === "payment" ? "text-foreground" : "text-muted-foreground"
            }
          >
            2. Payment
          </span>
        </div>

        {/* ORDER SUMMARY — always on top for mobile, right col for desktop */}
        <div className="mt-8 block lg:hidden">
          <OrderSummary cartTotal={cartTotal} total={total} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
          {/* LEFT — Form */}
          <div>
            {step === "info" ? (
              <form onSubmit={handleInfoSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Full Name *
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Address *
                  </label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
                    placeholder="Street, building, floor..."
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Governorate *
                  </label>
                  <div className="relative">
                    <select
                      value={governorate}
                      onChange={(e) => setGovernorate(e.target.value)}
                      className="w-full appearance-none border border-border bg-transparent px-4 py-3 pr-10 text-sm outline-none focus:border-primary"
                      required
                    >
                      <option value="">Select governorate</option>
                      {EGYPT_GOVERNORATES.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      strokeWidth={1.25}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Phone 1 *
                  </label>
                  <div className="flex items-stretch border border-border focus-within:border-primary">
                    <div className="flex shrink-0 items-center gap-1.5 border-r border-border px-3 text-sm text-muted-foreground">
                      <span>🇪🇬</span>
                      <span>+20</span>
                    </div>
                    <input
                      value={phone1}
                      onChange={(e) =>
                        setPhone1(
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                      className="flex-1 bg-transparent px-3 py-3 text-sm outline-none"
                      placeholder="10 digits"
                      maxLength={10}
                      inputMode="numeric"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Phone 2{" "}
                    <span className="normal-case text-muted-foreground">
                      (optional)
                    </span>
                  </label>
                  <div className="flex items-stretch border border-border focus-within:border-primary">
                    <div className="flex shrink-0 items-center gap-1.5 border-r border-border px-3 text-sm text-muted-foreground">
                      <span>🇪🇬</span>
                      <span>+20</span>
                    </div>
                    <input
                      value={phone2}
                      onChange={(e) =>
                        setPhone2(
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                      className="flex-1 bg-transparent px-3 py-3 text-sm outline-none"
                      placeholder="10 digits"
                      maxLength={10}
                      inputMode="numeric"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full bg-primary py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-opacity hover:opacity-85"
                >
                  Continue to Payment
                </button>
              </form>
            ) : (
              <div className="space-y-5">
                {/* Vodafone Cash box */}
                <div className="border border-border bg-secondary p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Payment Method
                  </p>
                  <p className="mt-1.5 font-display text-xl">Vodafone Cash</p>
                  <div className="mt-4 flex items-center justify-between gap-3 border border-border bg-background px-4 py-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        Transfer to
                      </p>
                      <p className="mt-1 font-display text-lg">
                        {VODAFONE_CASH_NUMBER}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(VODAFONE_CASH_NUMBER);
                        Swal.fire({
                          icon: "success",
                          title: "Copied!",
                          timer: 1000,
                          showConfirmButton: false,
                        });
                      }}
                      className="flex shrink-0 items-center gap-1.5 border border-border px-3 py-2 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Copy className="h-3 w-3" /> Copy
                    </button>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Transfer exactly{" "}
                    <span className="font-medium text-foreground">
                      EGP {total}
                    </span>{" "}
                    then fill the details below.
                  </p>
                </div>

                {/* Sender phone */}
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Sender Phone *
                  </label>
                  <div className="flex items-stretch border border-border focus-within:border-primary">
                    <div className="flex shrink-0 items-center gap-1.5 border-r border-border px-3 text-sm text-muted-foreground">
                      <span>🇪🇬</span>
                      <span>+20</span>
                    </div>
                    <input
                      value={senderPhone}
                      onChange={(e) =>
                        setSenderPhone(
                          e.target.value.replace(/\D/g, "").slice(0, 10),
                        )
                      }
                      className="flex-1 bg-transparent px-3 py-3 text-sm outline-none"
                      placeholder="10 digits"
                      maxLength={10}
                      inputMode="numeric"
                    />
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Amount Transferred *
                  </label>
                  <input
                    type="number"
                    value={amountSent}
                    onChange={(e) => setAmountSent(e.target.value)}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
                    placeholder={`EGP ${total}`}
                    inputMode="numeric"
                  />
                </div>

                {/* Receipt */}
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    Transfer Screenshot *
                  </label>
                  <label className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center border border-dashed border-border bg-secondary transition-colors hover:border-primary">
                    {receiptPreview ? (
                      <img
                        src={receiptPreview}
                        alt="Receipt"
                        className="max-h-52 object-contain p-2"
                      />
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          Click to upload
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleReceiptChange}
                    />
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep("info")}
                    className="flex-1 border border-border py-4 text-xs uppercase tracking-[0.3em] transition-colors hover:bg-secondary"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleOrder}
                    disabled={loading}
                    className="flex-1 bg-primary py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-50"
                  >
                    {loading ? "Placing..." : "Order Now"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — hidden on mobile (shown above) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <OrderSummary cartTotal={cartTotal} total={total} />
            </div>
          </aside>
        </div>
      </div>
      <Footer />
      <NavBottom />
    </div>
  );
}
