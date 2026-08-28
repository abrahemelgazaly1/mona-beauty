import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NavBottom } from "@/components/NavBottom";
import { ProductsGrid } from "@/components/ProductsGrid";
import { fetchProducts } from "@/lib/api";

export const Route = createFileRoute("/products")({
  loader: async () => {
    const products = await fetchProducts();
    return { products };
  },
  head: () => ({
    meta: [
      { title: "All Products — Doctor Cosmetics" },
      { name: "description", content: "Shop the full edit of hair care." },
    ],
  }),
  component: ProductsLayout,
});

function ProductsLayout() {
  const matches = useRouterState({ select: (s) => s.matches });
  const { products } = Route.useLoaderData();

  const isDetailPage = matches.some((m) => m.routeId === "/products/$id");

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ProductsGrid
        initial={products}
        title="Hair Care"
        subtitle="Curated collection for your hair."
      />
      <Footer />
      <NavBottom />
    </div>
  );
}
