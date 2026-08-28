import catBoba from "@/assets/cat-boba.jpg";
import catBreakfast from "@/assets/cat-breakfast.jpg";
import catBubbles from "@/assets/cat-bubbles.jpg";
import catCakes from "@/assets/cat-cakes.jpg";
import catCocktails from "@/assets/cat-cocktails.jpg";
import catCoffee from "@/assets/cat-coffee.jpg";
import catCortado from "@/assets/cat-cortado.jpg";
import catCrepe from "@/assets/cat-crepe.jpg";
import catCroissant from "@/assets/cat-croissant.jpg";
import catExtras from "@/assets/cat-extras.jpg";
import catFrappeCoffee from "@/assets/cat-frappe-coffee.jpg";
import catFrappePlain from "@/assets/cat-frappe-plain.jpg";
import catHotChocolate from "@/assets/cat-hot-chocolate.jpg";
import catHotDrinks from "@/assets/cat-hot-drinks.jpg";
import catIceDrinks from "@/assets/cat-ice-drinks.jpg";
import catJuice from "@/assets/cat-juice.jpg";
import catMatcha from "@/assets/cat-matcha.jpg";
import catMilkshake from "@/assets/cat-milkshake.jpg";
import catMojito from "@/assets/cat-mojito.jpg";
import catPancakes from "@/assets/cat-pancakes.jpg";
import catSignature from "@/assets/cat-signature.jpg";
import catSmoothies from "@/assets/cat-smoothies.jpg";
import catSourdough from "@/assets/cat-sourdough.jpg";
import catSpecialty from "@/assets/cat-specialty.jpg";
import catWaffle from "@/assets/cat-waffle.jpg";

export type AnimationKind =
  | "stack"
  | "slice"
  | "sparkle"
  | "flip"
  | "steam"
  | "ice-fall"
  | "bubble"
  | "shake";

export type MenuItem = {
  name: string;
  price: string;
  description?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  group: "food" | "coffee" | "drinks";
  animation: AnimationKind;
  image: string;
  items: MenuItem[];
};

const p = (n: number) => `${n.toFixed(2)} LE`;

export const menuGroups = [
  { id: "food", label: "Food" },
  { id: "coffee", label: "Coffee" },
  { id: "drinks", label: "Drinks" },
] as const;

export const menuCategories: MenuCategory[] = [
  {
    id: "sourdough",
    name: "Sourdough",
    group: "food",
    animation: "stack",
    image: catSourdough,
    items: [
      { name: "Pastrami Scramble Sourdough", price: p(180) },
      { name: "Smoked Turkey Sourdough", price: p(180) },
      { name: "Olive Cheese Sourdough", price: p(200) },
      { name: "Olive Kiri Sourdough", price: p(200) },
    ],
  },
  {
    id: "breakfast",
    name: "Breakfast",
    group: "food",
    animation: "slice",
    image: catBreakfast,
    items: [
      { name: "Classic Omelette", price: p(149.99) },
      { name: "Griffin Breakfast", price: p(199.99) },
      { name: "Japanese Breakfast", price: p(179.99) },
      { name: "Bikini Scramble", price: p(179.99) },
      { name: "Cheesy Omelette", price: p(189.99) },
      { name: "Cheese Platter", price: p(189.99) },
      { name: "Smoked Turkey Omelette", price: p(199.99) },
      { name: "Cheese & Beef Platter", price: p(189.99) },
    ],
  },
  {
    id: "club-sandwiches",
    name: "Club Sandwiches",
    group: "food",
    animation: "slice",
    image: catBreakfast,
    items: [
      { name: "Croque Madame", price: p(139.99) },
      { name: "Croque Pastrami", price: p(129.99) },
      { name: "Smoked Rocket Club", price: p(144.99) },
      { name: "Mix Cheese Club", price: p(149.99) },
      { name: "Smoked Omelette Club", price: p(139.99) },
    ],
  },
  {
    id: "extras",
    name: "Extras",
    group: "food",
    animation: "sparkle",
    image: catExtras,
    items: [
      { name: "Extra Mozzarella", price: p(24.99) },
      { name: "Green Salad", price: p(74.99) },
      { name: "Cheese Sauce", price: p(29.99) },
      { name: "Extra Pastrami", price: p(29.99) },
      { name: "Extra Mushrooms", price: p(29.99) },
      { name: "Extra Toast", price: p(14.99) },
      { name: "Extra Smoked Beef", price: p(29.99) },
      { name: "Extra Smoked Turkey", price: p(29.99) },
      { name: "Wedges Potatoes", price: p(49.99) },
      { name: "Hash Browns Potatoes", price: p(54.99) },
      { name: "French Fries", price: p(49.99) },
    ],
  },
  {
    id: "croissant",
    name: "Croissant",
    group: "food",
    animation: "flip",
    image: catCroissant,
    items: [
      { name: "Plain Croissant", price: p(64.99) },
      { name: "Cheese Croissant", price: p(84.99) },
      { name: "Smoked Beef Croissant", price: p(129.99) },
      { name: "Smoked Turkey Croissant", price: p(119.99) },
      { name: "Mix Cheese Croissant", price: p(139.99) },
      { name: "Mix Smoked Croissant", price: p(119.99) },
      { name: "Croissant Roll Pistachio", price: p(124.99) },
      { name: "Croissant Roll Nutella", price: p(119.99) },
      { name: "Croissant Roll Plain", price: p(74.99) },
    ],
  },
  {
    id: "cakes",
    name: "Cakes",
    group: "food",
    animation: "sparkle",
    image: catCakes,
    items: [
      { name: "English Cake", price: p(64.99) },
      { name: "Chocolate Brookies", price: p(99.99) },
      { name: "Chocolate Travell", price: p(129.99) },
      { name: "Cheese Cake", price: p(129.99) },
      { name: "Honey Cake", price: p(109.99) },
      { name: "French Toast", price: p(139.99) },
      { name: "Molten Chocolate", price: p(119.99) },
      { name: "Tiramisu", price: p(139.99) },
      { name: "Blueberry San Sebastian", price: p(129.99) },
      { name: "Kinder San Sebastian", price: p(129.99) },
      { name: "Lotus San Sebastian", price: p(129.99) },
      { name: "Nutella San Sebastian", price: p(129.99) },
      { name: "Pistachio San Sebastian", price: p(129.99) },
      { name: "Donuts Boston Cream", price: p(79.99) },
      { name: "Muffin Chocolate", price: p(59.99) },
      { name: "Muffin Blueberry", price: p(64.99) },
      { name: "Muffin Vanilla", price: p(59.99) },
      { name: "Salted Caramel Cake", price: p(129.99) },
    ],
  },
  {
    id: "pancakes",
    name: "Pancakes",
    group: "food",
    animation: "flip",
    image: catPancakes,
    items: [
      { name: "Classic Mini Pancake", price: p(94.99) },
      { name: "Pistachio Mini Pancake", price: p(134.99) },
      { name: "Kinder Mini Pancake", price: p(124.99) },
      { name: "Lotus Mini Pancake", price: p(119.99) },
      { name: "Nutella Mini Pancake", price: p(109.99) },
      { name: "Caramel Mega Pancake", price: p(94.99) },
      { name: "Lotus Mega Pancake", price: p(109.99) },
      { name: "Kinder Mega Pancake", price: p(109.99) },
      { name: "Nutella Mega Pancake", price: p(104.99) },
    ],
  },
  {
    id: "waffle",
    name: "Waffle",
    group: "food",
    animation: "flip",
    image: catWaffle,
    items: [
      { name: "Blueberry Waffle", price: p(119.99) },
      { name: "Kinder Waffle", price: p(139.99) },
      { name: "Nutella Waffle", price: p(145.99) },
      { name: "Lotus Waffle", price: p(149.99) },
      { name: "Caramel Waffle", price: p(119.99) },
      { name: "Chocolate Waffle", price: p(119.99) },
      { name: "Four Season Waffle", price: p(159.99) },
      { name: "Pistachio Waffle", price: p(169.99) },
      { name: "Strawberry Waffle", price: p(119.99) },
    ],
  },
  {
    id: "crepe",
    name: "Crepe",
    group: "food",
    animation: "flip",
    image: catCrepe,
    items: [
      { name: "Fettuccine Kinder", price: p(149.99) },
      { name: "Fettuccine Lotus", price: p(154.99) },
      { name: "Fettuccine Pistachio", price: p(184.44) },
      { name: "Fettuccine Nutella", price: p(144.99) },
      { name: "Ice Crepe", price: p(174.99) },
      { name: "Ice Crepe Pistachio", price: p(189.99) },
      { name: "Konafa Pistachio Crepe", price: p(184.99) },
      { name: "Lotus Sushi Crepe", price: p(154.99) },
      { name: "Nutella Sushi Crepe", price: p(144.99) },
      { name: "Oreo Sushi Crepe", price: p(144.99) },
    ],
  },
  {
    id: "coffee-drinks",
    name: "Coffee Drinks",
    group: "coffee",
    animation: "steam",
    image: catCoffee,
    items: [
      { name: "Turkish Coffee — Small", price: p(49.99) },
      { name: "Turkish Coffee — Double", price: p(64.99) },
      { name: "French Coffee — Small", price: p(69.99) },
      { name: "French Coffee — Double", price: p(79.99) },
      { name: "Espresso — Small", price: p(49.99) },
      { name: "Espresso — Double", price: p(64.99) },
      { name: "Macchiato — Small", price: p(59.99) },
      { name: "Macchiato — Double", price: p(69.99) },
      { name: "Conpana", price: p(74.99) },
      { name: "Spanish Espresso", price: p(79.99) },
      { name: "Affogato", price: p(69.99) },
      { name: "Cappuccino", price: p(94.99) },
      { name: "Latte", price: p(94.99) },
      { name: "Cinnamon Latte", price: p(114.99) },
      { name: "Spanish Latte", price: p(114.99) },
      { name: "Flat White", price: p(94.99) },
      { name: "Americano", price: p(74.99) },
      { name: "Mocha", price: p(115.99) },
      { name: "Lotus Latte", price: p(129.99) },
    ],
  },
  {
    id: "specialty-coffee",
    name: "Specialty Coffee",
    group: "coffee",
    animation: "steam",
    image: catSpecialty,
    items: [
      { name: "V60", price: p(119.99) },
      { name: "Chemex", price: p(129.99) },
      { name: "Syphon", price: p(119.99) },
      { name: "Cold Brew", price: p(74.99) },
      { name: "Aeropress", price: p(119.99) },
      { name: "French Press", price: p(124.99) },
      { name: "Calita", price: p(119.99) },
    ],
  },
  {
    id: "cortado-coffee",
    name: "Cortado Coffee",
    group: "coffee",
    animation: "steam",
    image: catCortado,
    items: [
      { name: "Classic Corto", price: p(79.99) },
      { name: "Caramel Corto", price: p(84.99) },
      { name: "Vanilla Corto", price: p(84.99) },
      { name: "Mocha Corto", price: p(84.99) },
      { name: "Irish Corto", price: p(84.99) },
      { name: "Hazelnut Corto", price: p(84.99) },
    ],
  },
  {
    id: "hot-chocolate",
    name: "Hot Chocolate",
    group: "coffee",
    animation: "steam",
    image: catHotChocolate,
    items: [
      { name: "Hot Chocolate", price: p(99.99) },
      { name: "Orange Hot Chocolate", price: p(119.99) },
      { name: "Cinnamon Hot Chocolate", price: p(119.99) },
      { name: "Strawberry Hot Chocolate", price: p(119.99) },
      { name: "Irish Hot Chocolate", price: p(119.99) },
      { name: "Lemon Hot Chocolate", price: p(119.99) },
      { name: "Salted Caramel Hot Chocolate", price: p(119.99) },
      { name: "Cookies Hot Chocolate", price: p(129.99) },
    ],
  },
  {
    id: "hot-drinks",
    name: "Hot Drinks",
    group: "coffee",
    animation: "steam",
    image: catHotDrinks,
    items: [
      { name: "Cedar Apple", price: p(74.99) },
      { name: "Tea (Regular)", price: p(39.99) },
      { name: "Tea (Flavors)", price: p(49.99) },
      { name: "Anise", price: p(49.99) },
      { name: "Mint", price: p(49.99) },
    ],
  },
  {
    id: "signature",
    name: "Signature",
    group: "coffee",
    animation: "sparkle",
    image: catSignature,
    items: [
      { name: "Rose Latte", price: p(119.99) },
      { name: "Cookies Latte", price: p(119.99) },
      { name: "Matcha Rose", price: p(134.99) },
      { name: "Shaken Whitenut", price: p(124.99) },
      { name: "Matcha Spanish Latte", price: p(129.99) },
      { name: "Pistachio Latte", price: p(139.99) },
      { name: "Coconut Mocha", price: p(134.99) },
      { name: "Mixed Popping", price: p(159.99) },
    ],
  },
  {
    id: "matcha-soft-drinks",
    name: "Matcha & Soft Drinks",
    group: "coffee",
    animation: "steam",
    image: catMatcha,
    items: [
      { name: "Coconut Matcha", price: p(124.99) },
      { name: "Mango Matcha", price: p(124.99) },
      { name: "Strawberry Matcha", price: p(124.99) },
      { name: "Passion Matcha", price: p(124.99) },
      { name: "Matcha Latte", price: p(109.99) },
      { name: "Mineral Water", price: p(19.99) },
      { name: "Pepsi", price: p(34.99) },
      { name: "Seven Up", price: p(34.99) },
      { name: "Redbull Original", price: p(79.99) },
    ],
  },
  {
    id: "frappe-with-coffee",
    name: "Frappe with Coffee",
    group: "drinks",
    animation: "ice-fall",
    image: catFrappeCoffee,
    items: [
      { name: "Coffee Frappe — Medium", price: p(99.99) },
      { name: "Coffee Frappe — Large", price: p(109.99) },
      { name: "Mocha Frappe — Medium", price: p(104.99) },
      { name: "Mocha Frappe — Large", price: p(114.99) },
      { name: "White Mocha Frappe — Medium", price: p(104.99) },
      { name: "White Mocha Frappe — Large", price: p(114.99) },
      { name: "Coffee Caramel — Medium", price: p(104.99) },
      { name: "Coffee Caramel — Large", price: p(114.99) },
      { name: "Oreo Cookies — Medium", price: p(124.99) },
      { name: "Oreo Cookies — Large", price: p(134.99) },
    ],
  },
  {
    id: "frappe-without-coffee",
    name: "Frappe without Coffee",
    group: "drinks",
    animation: "ice-fall",
    image: catFrappePlain,
    items: [
      { name: "Caramel — Medium", price: p(99.99) },
      { name: "Caramel — Large", price: p(109.99) },
      { name: "Chocolate — Medium", price: p(99.99) },
      { name: "Chocolate — Large", price: p(109.99) },
      { name: "Nutella — Medium", price: p(119.99) },
      { name: "Nutella — Large", price: p(139.99) },
      { name: "Lotus — Medium", price: p(119.99) },
      { name: "Lotus — Large", price: p(139.99) },
      { name: "Strawberry — Medium", price: p(99.99) },
      { name: "Strawberry — Large", price: p(109.99) },
      { name: "Vanilla — Medium", price: p(99.99) },
      { name: "Vanilla — Large", price: p(104.99) },
      { name: "Pistachio — Medium", price: p(124.99) },
      { name: "Pistachio — Large", price: p(144.99) },
      { name: "Salted Caramel Frappe — Medium", price: p(109.99) },
      { name: "Salted Caramel Frappe — Large", price: p(119.99) },
      { name: "Bubbles Gum", price: p(129.99) },
    ],
  },
  {
    id: "fresh-juice",
    name: "Fresh Juice",
    group: "drinks",
    animation: "bubble",
    image: catJuice,
    items: [
      { name: "Lemon", price: p(79.99) },
      { name: "Lemon Mint", price: p(79.99) },
      { name: "Orange", price: p(79.99) },
      { name: "Strawberry", price: p(89.99) },
      { name: "Mango", price: p(94.99) },
      { name: "Water Melon", price: p(89.99) },
      { name: "Banana", price: p(84.99) },
    ],
  },
  {
    id: "ice-drinks",
    name: "Ice Drinks",
    group: "drinks",
    animation: "ice-fall",
    image: catIceDrinks,
    items: [
      { name: "Ice Latte — Medium", price: p(84.99) },
      { name: "Ice Latte — Large", price: p(94.99) },
      { name: "Ice Americano", price: p(74.99) },
      { name: "Ice Mocha — Medium", price: p(114.99) },
      { name: "Ice Mocha — Large", price: p(124.99) },
      { name: "Ice White Mocha — Medium", price: p(114.99) },
      { name: "Ice White Mocha — Large", price: p(124.99) },
      { name: "Ice Chocolate — Medium", price: p(109.99) },
      { name: "Ice Chocolate — Large", price: p(119.99) },
      { name: "Ice Spanish Latte — Medium", price: p(94.99) },
      { name: "Ice Spanish Latte — Large", price: p(109.99) },
      { name: "Creamy Ice Mocha", price: p(124.99) },
      { name: "Caramel Macchiato", price: p(109.99) },
      { name: "Rafaello Latte", price: p(119.99) },
    ],
  },
  {
    id: "milk-shake",
    name: "Milk Shake",
    group: "drinks",
    animation: "shake",
    image: catMilkshake,
    items: [
      { name: "Chocolate — Medium", price: p(94.99) },
      { name: "Chocolate — Large", price: p(99.99) },
      { name: "Caramel — Medium", price: p(94.99) },
      { name: "Caramel — Large", price: p(99.99) },
      { name: "Lotus — Medium", price: p(119.99) },
      { name: "Lotus — Large", price: p(129.99) },
      { name: "Vanilla — Medium", price: p(94.99) },
      { name: "Vanilla — Large", price: p(99.99) },
      { name: "Pistachio — Medium", price: p(124.99) },
      { name: "Pistachio — Large", price: p(144.99) },
      { name: "Nutella — Medium", price: p(114.99) },
      { name: "Nutella — Large", price: p(129.99) },
      { name: "Strawberry — Medium", price: p(94.99) },
      { name: "Strawberry — Large", price: p(99.99) },
      { name: "Mango — Medium", price: p(94.99) },
      { name: "Mango — Large", price: p(99.99) },
      { name: "Blueberry — Medium", price: p(94.99) },
      { name: "Blueberry — Large", price: p(99.99) },
      { name: "Oreo — Medium", price: p(94.99) },
      { name: "Oreo — Large", price: p(99.99) },
      { name: "Kinder — Medium", price: p(119.99) },
      { name: "Kinder — Large", price: p(129.99) },
    ],
  },
  {
    id: "smoothies",
    name: "Smoothies",
    group: "drinks",
    animation: "bubble",
    image: catSmoothies,
    items: [
      { name: "Mango — Medium", price: p(94.99) },
      { name: "Mango — Large", price: p(99.99) },
      { name: "Strawberry — Medium", price: p(94.99) },
      { name: "Strawberry — Large", price: p(99.99) },
      { name: "Blueberry — Medium", price: p(94.99) },
      { name: "Blueberry — Large", price: p(99.99) },
      { name: "Passion Fruit — Medium", price: p(94.99) },
      { name: "Passion Fruit — Large", price: p(99.99) },
      { name: "Peach — Medium", price: p(94.99) },
      { name: "Peach — Large", price: p(99.99) },
      { name: "Lemon & Mint — Medium", price: p(94.99) },
      { name: "Lemon & Mint — Large", price: p(99.99) },
    ],
  },
  {
    id: "mojito",
    name: "Mojito",
    group: "drinks",
    animation: "bubble",
    image: catMojito,
    items: [
      { name: "Blue Lemon", price: p(99.99) },
      { name: "Pomegranate Mojito", price: p(99.99) },
      { name: "Mint Mojito", price: p(99.99) },
      { name: "Strawberry Mojito", price: p(99.99) },
      { name: "Cherry Cola", price: p(99.99) },
      { name: "Red Bull Mojito", price: p(129.99) },
      { name: "Blueberry Mojito", price: p(99.99) },
      { name: "Blue Hawaii", price: p(99.99) },
      { name: "Coconut Strawberry Mojito", price: p(119.99) },
      { name: "Coconut Pineapple Mojito", price: p(119.99) },
    ],
  },
  {
    id: "cocktails",
    name: "Cocktails",
    group: "drinks",
    animation: "bubble",
    image: catCocktails,
    items: [
      { name: "Kiwi Mango", price: p(119.99) },
      { name: "Miami", price: p(99.99) },
      { name: "Mango Passion", price: p(94.99) },
      { name: "Mango Tropical", price: p(94.99) },
    ],
  },
  {
    id: "bubbles",
    name: "Bubbles",
    group: "drinks",
    animation: "bubble",
    image: catBubbles,
    items: [
      { name: "Mixedberry Bubbles", price: p(119.99) },
      { name: "Miami Bubbles", price: p(119.99) },
      { name: "Passion Bubbles", price: p(109.99) },
      { name: "Energized Bubbles", price: p(139.99) },
      { name: "Mango Passion Bubbles", price: p(119.99) },
      { name: "Watermelon Freez Bubbles", price: p(114.99) },
    ],
  },
  {
    id: "boba",
    name: "Boba",
    group: "drinks",
    animation: "bubble",
    image: catBoba,
    items: [
      { name: "Boba Spanish Latte", price: p(129.99) },
      { name: "Boba Tea", price: p(84.99) },
      { name: "Boba Strawberry", price: p(109.99) },
      { name: "Boba Raspberry", price: p(109.99) },
      { name: "Boba Golden Bloody", price: p(104.99) },
      { name: "Boba Salted Caramel", price: p(109.99) },
      { name: "Boba Mango Tropical", price: p(109.99) },
      { name: "Blue Sea Boba", price: p(114.99) },
      { name: "Boba Matcha", price: p(129.99) },
    ],
  },
];
