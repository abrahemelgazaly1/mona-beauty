import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { products as staticProducts, type Product } from "@/data/products";
import { fetchProducts } from "@/lib/api";

type Ctx = {
  products: Product[];
  loading: boolean;
  refresh: () => void;
  getProduct: (id: string) => Product | undefined;
  getByCategory: (slug: string) => Product[];
};

const ProductsCtx = createContext<Ctx | null>(null);

function mergeWithStatic(apiProducts: Product[]): Product[] {
  const staticMap = new Map(staticProducts.map((p) => [p.id, p]));
  return apiProducts.map((p) => {
    const s = staticMap.get(p.id);
    const images =
      p.images?.length &&
      (p.images[0].startsWith("data:") || p.images[0].includes("/assets/"))
        ? p.images[0].startsWith("data:")
          ? p.images
          : (s?.images ?? p.images)
        : (s?.images ?? p.images);
    return { ...p, images, usage: p.usage || s?.usage || "" };
  });
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 30_000,
    retry: 1,
    placeholderData: staticProducts,
  });

  const products = useMemo(() => {
    if (!data) return staticProducts;
    try {
      return mergeWithStatic(data);
    } catch {
      return staticProducts;
    }
  }, [data]);

  const value = useMemo(
    () => ({
      products,
      loading: isLoading,
      refresh: () => qc.invalidateQueries({ queryKey: ["products"] }),
      getProduct: (id: string) => products.find((p) => p.id === id),
      getByCategory: (slug: string) =>
        products.filter((p) => p.categorySlug === slug),
    }),
    [products, isLoading, qc],
  );

  return <ProductsCtx.Provider value={value}>{children}</ProductsCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const c = useContext(ProductsCtx);
  if (!c) throw new Error("useProducts outside provider");
  return c;
};
