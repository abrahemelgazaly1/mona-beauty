import catHair from "@/assets/cat-hair.jpg";
import catSkin from "@/assets/cat-skin.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  images: string[];
  description: string;
  usage: string;
  productComponents?: string;
  soldOut?: boolean;
  bestSeller?: boolean;
};

export const categories = [
  { slug: "hair-care", name: "Hair Care", image: catHair },
];

// Static placeholder products (fallback when API is unavailable)
// Real products come from MongoDB via the API
export const products: Product[] = [
  {
    id: "1",
    name: "Silk Repair Shampoo",
    category: "Hair Care",
    categorySlug: "hair-care",
    price: 320,
    images: [catHair, catSkin, catHair],
    description:
      "A nourishing shampoo that gently cleanses while restoring softness and shine to damaged hair.",
    usage:
      "Apply a small amount to wet hair. Massage into scalp, then rinse thoroughly. Follow with conditioner.",
  },
  {
    id: "2",
    name: "Radiance Hair Serum",
    category: "Hair Care",
    categorySlug: "hair-care",
    price: 450,
    images: [catSkin, catHair, catSkin],
    description:
      "Lightweight serum that tames frizz and adds mirror-like shine to every strand.",
    usage:
      "Warm 2–3 drops between palms and smooth through damp or dry hair, avoiding the roots.",
  },
  {
    id: "3",
    name: "Deep Repair Mask",
    category: "Hair Care",
    categorySlug: "hair-care",
    price: 380,
    images: [catHair, catSkin, catHair],
    description: "Intensive weekly treatment for dry, chemically-treated hair.",
    usage: "Apply to damp hair, leave for 10 minutes, then rinse thoroughly.",
  },
  {
    id: "4",
    name: "Argan Oil Elixir",
    category: "Hair Care",
    categorySlug: "hair-care",
    price: 410,
    images: [catSkin, catHair, catSkin],
    description:
      "Pure argan oil that deeply nourishes and softens all hair types.",
    usage: "Apply 2–3 drops to ends of dry or damp hair.",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getByCategory = (slug: string) =>
  products.filter((p) => p.categorySlug === slug);
