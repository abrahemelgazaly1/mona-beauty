import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import {
  products as allProducts,
  categories,
  type Product,
} from "@/data/products";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLang } from "@/context/LangContext";

type Props = {
  initial: Product[];
  title: string;
  subtitle?: string;
  showCategoryFilter?: boolean;
};

export function ProductsGrid({
  initial,
  title,
  subtitle,
  showCategoryFilter = true,
}: Props) {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(4000);
  const [sort, setSort] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const isMobile = useIsMobile();

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      )
      .slice(0, 5);
  }, [query]);

  const filtered = useMemo(() => {
    let list = [...initial];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    if (showCategoryFilter && selectedCats.length) {
      list = list.filter((p) => selectedCats.includes(p.categorySlug));
    }
    list = list.filter((p) => p.price <= priceMax);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [initial, query, selectedCats, priceMax, sort, showCategoryFilter]);

  const FilterPanel = () => (
    <div className="space-y-8">
      {/* Sort */}
      <div>
        <h4 className="text-xs font-medium uppercase tracking-[0.25em]">
          {t("grid_sort")}
        </h4>
        <div className="relative mt-3">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full appearance-none border border-border bg-transparent px-4 py-3 pr-10 text-sm outline-none focus:border-primary"
          >
            <option value="featured">{t("grid_sort_featured")}</option>
            <option value="price-asc">{t("grid_sort_price_asc")}</option>
            <option value="price-desc">{t("grid_sort_price_desc")}</option>
            <option value="name">{t("grid_sort_name")}</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
            strokeWidth={1.25}
          />
        </div>
      </div>

      {/* Category */}
      {showCategoryFilter && (
        <div>
          <h4 className="text-xs font-medium uppercase tracking-[0.25em]">
            {t("grid_category")}
          </h4>
          {isMobile ? (
            <div className="relative mt-3">
              <select
                value={selectedCats[0] || ""}
                onChange={(e) =>
                  setSelectedCats(e.target.value ? [e.target.value] : [])
                }
                className="w-full appearance-none border border-border bg-transparent px-4 py-3 pr-10 text-sm outline-none focus:border-primary"
              >
                <option value="">{t("grid_all_cats")}</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                strokeWidth={1.25}
              />
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              {categories.map((c) => (
                <label
                  key={c.slug}
                  className="flex cursor-pointer items-center gap-3 text-sm"
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-primary"
                    checked={selectedCats.includes(c.slug)}
                    onChange={(e) =>
                      setSelectedCats((s) =>
                        e.target.checked
                          ? [...s, c.slug]
                          : s.filter((x) => x !== c.slug),
                      )
                    }
                  />
                  {c.name}
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Max Price */}
      <div>
        <h4 className="text-xs font-medium uppercase tracking-[0.25em]">
          {t("grid_max_price")}
        </h4>
        <div className="mt-3">
          <input
            type="range"
            min={100}
            max={4000}
            step={50}
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="mt-2 text-sm">EGP {priceMax}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 pb-24 md:pb-10">
      <div className="border-b border-border pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {t("grid_shop_label")}
        </p>
        <h1 className="mt-3 font-display text-4xl md:text-7xl">{title}</h1>
        {subtitle && (
          <p className="mt-3 max-w-xl text-muted-foreground">{subtitle}</p>
        )}
      </div>

      {/* Search */}
      <div className="relative mx-auto mt-10 max-w-2xl">
        <div className="flex items-center border-b border-border">
          <Search
            className="h-5 w-5 text-muted-foreground"
            strokeWidth={1.25}
          />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggest(true);
            }}
            onFocus={() => setShowSuggest(true)}
            onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
            placeholder={t("grid_search")}
            className="w-full bg-transparent px-4 py-4 text-sm outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        {showSuggest && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 animate-fade-in border border-border bg-background shadow-elegant">
            {suggestions.map((p) => (
              <Link
                key={p.id}
                to="/products/$id"
                params={{ id: p.id }}
                className="flex items-center gap-4 border-b border-border p-3 last:border-0 hover:bg-secondary"
              >
                <img
                  src={p.images[0]}
                  alt=""
                  className="h-14 w-14 object-cover"
                />
                <div className="flex-1">
                  <div className="text-sm">{p.name}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {p.category}
                  </div>
                </div>
                <div className="text-sm">EGP {p.price}</div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Mobile filter button */}
      {isMobile && (
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {filtered.length} {t("grid_products_count")}
          </span>
          <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 border border-border px-4 py-2 text-xs uppercase tracking-[0.25em]">
                <SlidersHorizontal className="h-4 w-4" strokeWidth={1.25} />
                {t("grid_filters")}
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] sm:max-w-sm">
              <SheetHeader>
                <SheetTitle className="font-display text-xl">
                  {t("grid_filters")}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8">
                <FilterPanel />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}

      <div className="mt-8 grid gap-10 lg:mt-14 lg:grid-cols-[240px_1fr]">
        {!isMobile && (
          <aside>
            <FilterPanel />
          </aside>
        )}

        <div>
          {!isMobile && (
            <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <span>
                {filtered.length} {t("grid_products_count")}
              </span>
            </div>
          )}
          {filtered.length === 0 ? (
            <div className="py-24 text-center text-muted-foreground">
              {t("grid_no_products")}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <div
                  key={p.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
