import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";
import dish4 from "@/assets/dish-4.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

export type Dish = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

export const dishes: Dish[] = [
  {
    id: "olive-kiri-sourdough",
    name: "Olive Kiri Sourdough",
    price: "200 EGY",
    description:
      "Kiri cheese with basil, olives, arugula, your choice of potatoes (wedges, hash browns, French fries), and mixed salad.",
    image: dish1,
  },
  {
    id: "olive-cheese-sourdough",
    name: "Olive Cheese Sourdough",
    price: "200 EGY",
    description:
      "Cream cheese with basil, olives, arugula, your choice of potatoes (wedges, hash browns, French fries), and mixed salad.",
    image: dish2,
  },
  {
    id: "smoked-turkey-sourdough",
    name: "Smoked Turkey Sourdough",
    price: "200 EGY",
    description:
      "Smoked turkey mix with scrambled eggs, Parmesan cheese, and your choice of potatoes (wedges, hash browns, or French fries) and mixed salad.",
    image: dish3,
  },
  {
    id: "pastrami-scramble-sourdough",
    name: "Pastrami Scramble Sourdough",
    price: "180 EGY",
    description:
      "Pastrami mix with scrambled eggs, Parmesan cheese, and your choice of potatoes (wedges, hash browns, or French fries) and mixed salad.",
    image: dish4,
  },
];

export const galleryImages = [
  { src: gallery2, alt: "Griffin barista pouring latte art" },
  { src: gallery3, alt: "Quiet work-friendly corner seating at Griffin" },
  { src: gallery4, alt: "Freshly baked sourdough loaves" },
  { src: gallery5, alt: "Copper espresso machine at the Griffin bar" },
  { src: gallery6, alt: "Iced coffee and dessert on a marble table" },
  { src: gallery2, alt: "Calm interior of Griffin Coffee" },
];

export const reviews = [
  {
    name: "Mariam H.",
    role: "Regular guest",
    quote:
      "The calmest place in El-Mahalla. I come for the flat white, I stay because nobody rushes you. Service is genuinely faultless.",
  },
  {
    name: "Ahmed S.",
    role: "Works remotely",
    quote:
      "Fast, stable internet and quiet tables. I finish a full working day here and the sourdough plates keep me going.",
  },
  {
    name: "Nour A.",
    role: "Food lover",
    quote:
      "Spotless, elegant and the kitchen is serious. The Smoked Turkey Sourdough is the best thing I've had in the city.",
  },
];

export const contact = {
  phone: "040 2235800",
  phoneHref: "tel:+20402235800",
  instagram: "griffin.coffee.eg",
  instagramUrl: "https://instagram.com/griffin.coffee.eg",
  facebook: "griffin.coffee.eg",
  facebookUrl: "https://facebook.com/griffin.coffee.eg",
  address:
    "El-Mahalla El-Kubra, El-Bahr Street, in front of Banque Misr El Ahly (National Bank of Egypt), El-Mahalla el-Kubra, Egypt, 31951",
  hours: "Open daily 7:30 AM — 1:00 AM",
  mapEmbed:
    "https://www.google.com/maps?q=30.975424,31.169584&hl=en&z=17&output=embed",
  mapLink: "https://www.google.com/maps?q=30.975424,31.169584",
};
