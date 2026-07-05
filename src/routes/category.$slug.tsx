import { createFileRoute, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NavBottom } from "@/components/NavBottom";
import { ProductsGrid } from "@/components/ProductsGrid";
import { categories } from "@/data/products";
import { fetchProducts } from "@/lib/api";

export const Route = createFileRoute("/category/$slug")({
  loader: async ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    const allProducts = await fetchProducts();
    const items = allProducts.filter((p) => p.categorySlug === params.slug);
    return { cat, items };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.cat.name ?? "Category"} — MONA BEAUTY` },
      {
        name: "description",
        content: `Shop ${loaderData?.cat.name ?? "our"} at Mona Beauty.`,
      },
    ],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Category not found</h1>
      </div>
      <Footer />
    </div>
  ),
});

function CategoryPage() {
  const { cat, items } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ProductsGrid
        initial={items}
        title={cat.name}
        subtitle={`Discover our ${cat.name.toLowerCase()} edit.`}
        showCategoryFilter={false}
      />
      <Footer />
      <NavBottom />
    </div>
  );
}
