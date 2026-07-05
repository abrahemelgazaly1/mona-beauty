import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { fetchBestSellers } from "@/lib/api";
import type { Product } from "@/data/products";
import { useLang } from "@/context/LangContext";

export function ProductsMarquee() {
  const { t } = useLang();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBestSellers()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  // Need at least 1 product to show; duplicate for infinite scroll
  const loop = items.length > 0 ? [...items, ...items] : [];

  return (
    <section className="overflow-hidden py-24">
      <div className="mx-auto mb-14 max-w-7xl px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {t("best_label")}
        </p>
        <h2 className="mt-3 font-display text-4xl md:text-6xl">
          {t("best_title")}
        </h2>
      </div>

      {loading && (
        <div className="flex gap-6 px-6 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-[280px] shrink-0 md:w-[340px]">
              <div className="aspect-[4/5] animate-pulse bg-secondary" />
              <div className="mt-4 space-y-2">
                <div className="h-3 w-16 animate-pulse rounded bg-secondary" />
                <div className="h-5 w-40 animate-pulse rounded bg-secondary" />
                <div className="h-4 w-20 animate-pulse rounded bg-secondary" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="px-6 text-sm text-muted-foreground">
          No best sellers yet. Mark products as best sellers from the admin
          dashboard.
        </div>
      )}

      {!loading && loop.length > 0 && (
        <div className="group relative">
          <div className="flex w-max animate-marquee-slow gap-6 px-6">
            {loop.map((p, i) => (
              <Link
                key={`${p.id}-${i}`}
                to="/products/$id"
                params={{ id: p.id }}
                className="w-[280px] shrink-0 md:w-[340px]"
              >
                <div className="aspect-[4/5] overflow-hidden bg-secondary">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {p.category}
                  </p>
                  <h3 className="font-display text-lg">{p.name}</h3>
                  <p className="text-sm">EGP {p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
