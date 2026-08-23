import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { adminLogin } from "@/lib/api";
import Swal from "sweetalert2";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — Doctor Cosmetics" }] }),
  beforeLoad: () => {
    // If already logged in, go straight to admin
    if (typeof window !== "undefined" && localStorage.getItem("admin_token")) {
      window.location.href = "/admin";
    }
  },
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token } = await adminLogin(email, password);
      localStorage.setItem("admin_token", token);
      navigate({ to: "/admin" });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Invalid credentials",
        text: "Check your email and password.",
        confirmButtonColor: "#000",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6" strokeWidth={1.25} />
          </div>
          <h1 className="mt-4 font-display text-3xl tracking-[0.2em]">
            DOCTOR COSMETICS
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Admin Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-primary"
              placeholder="admin@monabeauty.com"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-border bg-transparent px-4 py-3 pr-12 text-sm outline-none focus:border-primary"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Toggle password"
              >
                {showPass ? (
                  <EyeOff className="h-4 w-4" strokeWidth={1.5} />
                ) : (
                  <Eye className="h-4 w-4" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-primary py-4 text-xs uppercase tracking-[0.3em] text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
