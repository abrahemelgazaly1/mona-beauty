import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { Reveal } from "@/components/site/Reveal";
import { CategoryAnimation } from "@/components/menu/CategoryAnimation";
import { menuCategories, menuGroups, type MenuCategory } from "@/data/menuData";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "قائمة الطعام والمشروبات | Griffin Coffee Menu - El-Mahalla" },
      {
        name: "description",
        content:
          "استعرض قائمة جريفين كافيه الكاملة: قهوة سبيشاليتي، فرابيه، بوبا تي، وجبات عجين مخمر، إفطار، وافل وحلويات | Browse Griffin Coffee full menu: specialty espresso, frappes, boba tea, sourdough meals, breakfast, waffles and desserts in El-Mahalla.",
      },
      {
        name: "keywords",
        content:
          "قائمة جريفين, Griffin Menu, قائمة الطعام, Coffee Menu, منيو مقهى, قهوة متخصصة, Specialty Coffee, اسبريسو, Espresso, كابتشينو, Cappuccino, لاتيه, Latte, موكا, Mocha, ماتشا, Matcha, فرابيه, Frappe, ميلك شيك, Milkshake, عصير طازج, Fresh Juice, بوبا تي, Boba Tea, موخيتو, Mojito, كوكتيل, Cocktails, عجين مخمر, Sourdough, إفطار, Breakfast, كلوب ساندوتش, Club Sandwich, كروسان, Croissant, وافل, Waffle, بان كيك, Pancakes, كريب, Crepe, كيك, Cakes, حلويات, Desserts, مشروبات ساخنة, Hot Drinks, مشروبات باردة, Cold Drinks, المحلة الكبرى, El-Mahalla",
      },
      { property: "og:title", content: "قائمة Griffin Coffee - Menu | El-Mahalla El-Kubra" },
      {
        property: "og:description",
        content:
          "قائمة كاملة بأصناف القهوة، المشروبات الساخنة والباردة، الوجبات والحلويات | Full menu: coffee, hot & cold drinks, meals and desserts.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://griffin.coffee/menu" },
      { property: "og:image", content: "https://griffin.coffee/menu-preview.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "ar_EG" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Griffin Coffee Menu - قائمة الطعام" },
      { name: "twitter:description", content: "قهوة سبيشاليتي، فرابيه، وجبات عجين مخمر وحلويات" },
      { name: "twitter:image", content: "https://griffin.coffee/menu-preview.jpg" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "googlebot", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://griffin.coffee/menu" },
      { rel: "alternate", hreflang: "ar", href: "https://griffin.coffee/menu" },
      { rel: "alternate", hreflang: "en", href: "https://griffin.coffee/menu" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Menu",
          name: "Griffin Coffee Menu",
          description: "Full menu of Griffin Coffee including specialty coffee, drinks, meals and desserts",
          inLanguage: ["ar", "en"],
          hasMenuSection: [
            {
              "@type": "MenuSection",
              name: "Food - الطعام",
              description: "Sourdough meals, breakfast, sandwiches and desserts",
              hasMenuItem: [
                { "@type": "MenuItem", name: "Sourdough Meals", description: "Fresh sourdough sandwiches" },
                { "@type": "MenuItem", name: "Breakfast", description: "Premium breakfast plates" },
                { "@type": "MenuItem", name: "Croissant", description: "Fresh baked croissants" },
                { "@type": "MenuItem", name: "Waffles", description: "Belgian style waffles" },
                { "@type": "MenuItem", name: "Pancakes", description: "Fluffy pancakes" },
                { "@type": "MenuItem", name: "Crepes", description: "Thin French crepes" },
                { "@type": "MenuItem", name: "Cakes & Desserts", description: "Homemade cakes and desserts" }
              ]
            },
            {
              "@type": "MenuSection",
              name: "Coffee - القهوة",
              description: "Specialty coffee drinks and espresso bar",
              hasMenuItem: [
                { "@type": "MenuItem", name: "Espresso", offers: { "@type": "Offer", price: "49.99", priceCurrency: "EGP" } },
                { "@type": "MenuItem", name: "Cappuccino", offers: { "@type": "Offer", price: "94.99", priceCurrency: "EGP" } },
                { "@type": "MenuItem", name: "Latte", offers: { "@type": "Offer", price: "94.99", priceCurrency: "EGP" } },
                { "@type": "MenuItem", name: "Mocha", offers: { "@type": "Offer", price: "115.99", priceCurrency: "EGP" } },
                { "@type": "MenuItem", name: "Turkish Coffee", offers: { "@type": "Offer", price: "49.99", priceCurrency: "EGP" } },
                { "@type": "MenuItem", name: "Specialty Coffee", description: "V60, Chemex, Syphon, Cold Brew" }
              ]
            },
            {
              "@type": "MenuSection",
              name: "Drinks - المشروبات",
              description: "Hot and cold beverages",
              hasMenuItem: [
                { "@type": "MenuItem", name: "Frappe", description: "Blended iced coffee drinks" },
                { "@type": "MenuItem", name: "Milkshakes", description: "Thick creamy milkshakes" },
                { "@type": "MenuItem", name: "Fresh Juice", description: "100% natural fresh juices" },
                { "@type": "MenuItem", name: "Smoothies", description: "Fruit smoothies" },
                { "@type": "MenuItem", name: "Mojito", description: "Refreshing mojitos" },
                { "@type": "MenuItem", name: "Boba Tea", description: "Bubble tea with tapioca pearls" },
                { "@type": "MenuItem", name: "Matcha", description: "Japanese green tea" }
              ]
            }
          ]
        })
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://griffin.coffee"
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Menu",
              item: "https://griffin.coffee/menu"
            }
          ]
        })
      }
    ]
  }),
  component: MenuPage,
});

type GroupId = (typeof menuGroups)[number]["id"] | "all";

function MenuPage() {
  const [group, setGroup] = useState<GroupId>("all");
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const shown =
    group === "all" ? menuCategories : menuCategories.filter((c) => c.group === group);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <section className="px-6 py-14 text-center sm:py-20">
          <Reveal>
            <h1 className="font-display text-4xl uppercase tracking-[0.2em] text-copper sm:text-6xl">
              Menu Griffin
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rule-copper mx-auto mt-6 w-48" />
            <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground">
              Tap any category to watch it come to life — steam rising, syrup poured, ice
              falling — then read every item and price.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap justify-center gap-2">
              {[{ id: "all", label: "All" }, ...menuGroups].map((g) => {
                const on = group === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setGroup(g.id as GroupId)}
                    className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
                      on
                        ? "border-copper bg-copper text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-copper hover:text-copper"
                    }`}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((category, i) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  index={i}
                  isOpen={openCategory === category.id}
                  onToggle={() => 
                    setOpenCategory(openCategory === category.id ? null : category.id)
                  }
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function CategoryCard({
  category,
  index,
  isOpen,
  onToggle,
}: {
  category: MenuCategory;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      layout="position"
      initial={reduce ? undefined : { opacity: 0, y: 26 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-lux"
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left"
      >
        <div className="relative aspect-[4/3] w-full">
          <CategoryAnimation
            kind={category.animation}
            image={category.image}
            name={category.name}
            isActive={!isOpen}
          />
        </div>
        <div className="flex items-end justify-between gap-3 px-5 py-4">
          <div>
            <h2 className="font-display text-2xl leading-tight text-copper">
              {category.name}
            </h2>
            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {category.items.length} items
            </p>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-copper" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/60 px-5 py-4">
              <ul className="space-y-3">
                {category.items.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.02 }}
                    className="flex items-baseline gap-3 border-b border-border/30 pb-2 last:border-0"
                  >
                    <span className="text-sm text-secondary-foreground">{item.name}</span>
                    <span className="rule-copper mx-1 flex-1" />
                    <span className="shrink-0 text-sm tracking-wide text-copper">
                      {item.price}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
