import { createFileRoute, Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Phone, Quote } from "lucide-react";
import { useState } from "react";

import heroImage from "@/assets/hero.jpg";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { Reveal } from "@/components/site/Reveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { contact, dishes, galleryImages, reviews, type Dish } from "@/data/griffin";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Griffin Coffee | أفضل مقهى متخصص في المحلة الكبرى - Specialty Café" },
      {
        name: "description",
        content:
          "جريفين كافيه - مقهى هادئ ومتخصص في المحلة الكبرى. قهوة سبيشاليتي، مطبخ عجين مخمر، إفطار فاخر وواي فاي سريع. مفتوح من 7:30 صباحاً حتى 1 صباحاً | Griffin: Quiet specialty coffee house in El-Mahalla with sourdough kitchen, premium breakfast & fast Wi-Fi.",
      },
      {
        name: "keywords",
        content:
          "جريفين كافيه, Griffin Coffee, مقهى المحلة الكبرى, قهوة متخصصة, Specialty Coffee Egypt, مطبخ عجين مخمر, Sourdough Kitchen, إفطار فاخر, Premium Breakfast, كافيه هادئ, Quiet Cafe, واي فاي سريع, Fast WiFi Cafe, مقهى للعمل, Work Cafe El-Mahalla, قهوة اسبريسو, Espresso Bar, لاتيه ارت, Latte Art, فرابيه, Frappe, بوبا تي, Boba Tea, ميلك شيك, Milkshake, موخيتو, Mojito, كيك, Cakes, وافل, Waffles, بان كيك, Pancakes, كريب, Crepes, كروسان, Croissants, قهوة تركي, Turkish Coffee, قهوة فرنساوي, French Coffee, كابتشينو, Cappuccino, موكا, Mocha, ماتشا, Matcha, مشروبات ساخنة, Hot Drinks, مشروبات باردة, Cold Drinks, عصير طبيعي, Fresh Juice",
      },
      {
        property: "og:title",
        content: "Griffin Coffee | أفضل مقهى سبيشاليتي في المحلة الكبرى",
      },
      {
        property: "og:description",
        content:
          "مقهى جريفين - قهوة سبيشاليتي فاخرة، مطبخ عجين مخمر، مكان هادئ للعمل والاسترخاء في المحلة الكبرى. Specialty coffee, sourdough meals & quiet workspace.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://griffin.coffee/" },
      { property: "og:site_name", content: "Griffin Coffee" },
      { property: "og:locale", content: "ar_EG" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:image", content: "https://griffin.coffee/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Griffin Coffee - Specialty Coffee House in El-Mahalla El-Kubra" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Griffin Coffee | Specialty Café El-Mahalla" },
      { name: "twitter:description", content: "قهوة سبيشاليتي فاخرة ومطبخ عجين مخمر في المحلة الكبرى" },
      { name: "twitter:image", content: "https://griffin.coffee/og-image.jpg" },
      { name: "twitter:site", content: "@griffin_coffee_eg" },
      { name: "twitter:creator", content: "@griffin_coffee_eg" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { name: "bingbot", content: "index, follow" },
      { name: "author", content: "Griffin Coffee" },
      { name: "language", content: "Arabic, English" },
      { name: "geo.region", content: "EG-GH" },
      { name: "geo.placename", content: "El-Mahalla El-Kubra" },
      { name: "geo.position", content: "30.975424;31.169584" },
      { name: "ICBM", content: "30.975424, 31.169584" },
      { name: "theme-color", content: "#2a4a3d" },
    ],
    links: [
      { rel: "canonical", href: "https://griffin.coffee/" },
      { rel: "alternate", hreflang: "ar", href: "https://griffin.coffee/" },
      { rel: "alternate", hreflang: "en", href: "https://griffin.coffee/" },
      { rel: "alternate", hreflang: "x-default", href: "https://griffin.coffee/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CafeOrCoffeeShop",
          name: "Griffin Coffee",
          alternateName: ["جريفين كافيه", "Griffin Café", "Griffin Coffee House"],
          description: "Specialty coffee house in El-Mahalla El-Kubra offering premium espresso, sourdough meals, breakfast plates, and a quiet workspace with fast Wi-Fi.",
          image: [
            "https://griffin.coffee/og-image.jpg",
            "https://griffin.coffee/hero.jpg"
          ],
          logo: "https://griffin.coffee/logo.png",
          url: "https://griffin.coffee",
          telephone: "+20 40 2235800",
          email: "info@griffin.coffee",
          servesCuisine: ["Coffee", "Specialty Coffee", "Sourdough", "Breakfast", "Desserts", "Beverages"],
          priceRange: "EGP 50-200",
          currenciesAccepted: "EGP",
          paymentAccepted: "Cash, Credit Card, Debit Card",
          acceptsReservations: "True",
          address: {
            "@type": "PostalAddress",
            streetAddress: "El-Bahr Street, in front of the National Bank of Egypt",
            addressLocality: "El-Mahalla El-Kubra",
            addressRegion: "Gharbia Governorate",
            postalCode: "31951",
            addressCountry: "EG",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 30.975424,
            longitude: 31.169584,
          },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            opens: "07:30",
            closes: "01:00"
          },
          menu: "https://griffin.coffee/menu",
          sameAs: [
            "https://instagram.com/griffin.coffee.eg",
            "https://facebook.com/griffin.coffee.eg",
          ],
          amenityFeature: [
            {
              "@type": "LocationFeatureSpecification",
              name: "Free WiFi",
              value: true
            },
            {
              "@type": "LocationFeatureSpecification",
              name: "Indoor Seating",
              value: true
            },
            {
              "@type": "LocationFeatureSpecification",
              name: "Quiet Environment",
              value: true
            },
            {
              "@type": "LocationFeatureSpecification",
              name: "Work-Friendly",
              value: true
            }
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "150",
            bestRating: "5",
            worstRating: "1"
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          "@id": "https://griffin.coffee/#restaurant",
          name: "Griffin Coffee",
          image: "https://griffin.coffee/og-image.jpg",
          servesCuisine: ["Coffee", "Breakfast", "Brunch", "Desserts"],
          telephone: "+20402235800",
          address: {
            "@type": "PostalAddress",
            streetAddress: "El-Bahr Street, in front of Banque Misr",
            addressLocality: "El-Mahalla El-Kubra",
            addressRegion: "Gharbia",
            postalCode: "31951",
            addressCountry: "EG"
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 30.975424,
            longitude: 31.169584
          },
          openingHours: "Mo-Su 07:30-01:00",
          priceRange: "$$",
          hasMenu: "https://griffin.coffee/menu"
        })
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://griffin.coffee/#localbusiness",
          name: "Griffin Coffee",
          description: "Best specialty coffee house in El-Mahalla El-Kubra",
          url: "https://griffin.coffee",
          telephone: "+20402235800",
          areaServed: {
            "@type": "City",
            name: "El-Mahalla El-Kubra"
          }
        })
      }
    ],
  }),
  component: Home,
});

function Home() {
  const [active, setActive] = useState<Dish | null>(null);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background">
      <Navbar />
      <main className="w-full">
        <Hero />
        <DishesSection onSelect={setActive} />
        <AboutSection />
        <ReviewsSection />
        <LocationsSection />
        <CtaSection />
      </main>
      <Footer />
      <DishDialog dish={active} onClose={() => setActive(null)} />
    </div>
  );
}

function Hero() {
  return (
    <section 
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <img
        src={heroImage}
        alt="Warm interior of Griffin Coffee with a latte and sourdough on a marble table"
        width={1920}
        height={1280}
        className="absolute inset-0 size-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="hero-veil absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-24 text-center">
        <p className="rise-in text-[0.65rem] uppercase tracking-brand text-copper-soft sm:text-xs">
          El-Mahalla El-Kubra · Est. Coffee House
        </p>
        <h1 className="rise-in font-display mt-6 text-5xl leading-[1.05] text-copper sm:text-7xl lg:text-8xl">
          Where the city
          <span className="block italic text-ivory">goes quiet</span>
        </h1>
        <p className="rise-in mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ivory/80 sm:text-base">
          Slow mornings, serious coffee and a sourdough kitchen. Impeccable service,
          spotless rooms and fast internet — a place to disconnect, or to get real work
          done.
        </p>
        <div className="rise-in mt-10">
          <Link
            to="/menu"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-copper px-9 py-4 text-xs uppercase tracking-[0.24em] text-copper transition-colors duration-500 hover:text-primary-foreground"
            aria-label="Explore Griffin Coffee menu"
          >
            <span className="absolute inset-0 -translate-x-full bg-copper transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative">Explore Menu</span>
            <span className="relative transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function DishesSection({ onSelect }: { onSelect: (dish: Dish) => void }) {
  const loop = [...dishes, ...dishes];

  return (
    <section id="dishes" className="w-full overflow-hidden bg-ivory py-20 sm:py-28">
      <Reveal className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-emerald-deep/70">
          Some types of dishes are
        </p>
        <h2 className="font-display mt-3 text-4xl uppercase tracking-[0.18em] text-emerald-deep sm:text-6xl">
          Sourdough Meals
        </h2>
        <div className="rule-copper mx-auto mt-6 w-40" />
      </Reveal>

      <div className="group relative mt-14 w-full overflow-hidden">
        <div className="marquee-track flex gap-6 group-hover:marquee-paused">
          {loop.map((dish, i) => (
            <button
              key={`${dish.id}-${i}`}
              type="button"
              onClick={() => onSelect(dish)}
              className="w-[16rem] shrink-0 overflow-hidden rounded-sm border border-emerald-deep/20 bg-white text-left transition-all duration-500 hover:-translate-y-2 hover:border-copper hover:shadow-lux sm:w-[20rem]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="px-5 py-5">
                <h3 className="font-display text-xl text-emerald-deep">{dish.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-copper">
                  {dish.price}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <p className="mt-8 text-center text-xs uppercase tracking-[0.2em] text-emerald-deep/60">
        Tap a dish to see what's inside
      </p>
    </section>
  );
}

function DishDialog({ dish, onClose }: { dish: Dish | null; onClose: () => void }) {
  return (
    <Dialog open={!!dish} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl overflow-hidden border-border bg-background p-0 text-primary">
        {dish && (
          <div className="grid md:grid-cols-2">
            <img
              src={dish.image}
              alt={dish.name}
              width={1024}
              height={768}
              className="h-56 w-full object-cover md:h-full"
            />
            <div className="p-7">
              <DialogTitle className="font-display text-3xl text-copper">
                {dish.name}
              </DialogTitle>
              <p className="mt-2 text-sm uppercase tracking-[0.22em] text-ivory">
                {dish.price}
              </p>
              <div className="rule-copper my-5" />
              <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                {dish.description}
              </DialogDescription>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function AboutSection() {
  return (
    <section id="about" className="w-full overflow-hidden bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            About
          </p>
          <h2 className="font-display mt-3 text-4xl uppercase tracking-[0.14em] text-copper sm:text-5xl">
            Griffin
          </h2>
          <div className="rule-copper mt-6 w-40" />
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Griffin is the quietest coffee house in El-Mahalla El-Kubra. We built it for
              people who want the volume turned down — soft light, calm music, generous
              tables and staff who read the room before they speak.
            </p>
            <p>
              The menu is small on purpose and made properly: single-origin espresso,
              slow-fermented sourdough from our own kitchen, and plates that arrive
              exactly as described. Everything is prepared to the highest standard, in a
              space we keep spotless from open to close.
            </p>
            <p>
              Come to switch off, or come to work — fast, stable internet, power at every
              seat, and nobody will ever rush your cup. Griffin fits a first date, a long
              deadline and a slow Friday morning equally well.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <OrbitGallery />
        </Reveal>
      </div>
    </section>
  );
}

function OrbitGallery() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[36rem] overflow-visible">
      <div className="absolute inset-8 rounded-full border border-border sm:inset-10" />
      <div className="orbit-ring absolute inset-8 sm:inset-10">
        {galleryImages.map((image, i) => {
          const angle = (360 / galleryImages.length) * i;
          return (
            <div
              key={image.src}
              className="absolute inset-0"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <div style={{ transform: `rotate(${-angle}deg)` }}>
                  <div className="orbit-counter">
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      className="size-24 rounded-full border-2 border-copper/50 object-cover shadow-lux sm:size-28"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p className="font-display text-center text-2xl uppercase tracking-brand text-copper sm:text-3xl">
          Griffin
        </p>
      </div>
    </div>
  );
}

function ReviewsSection() {
  return (
    <section id="reviews" className="w-full overflow-hidden border-y border-border bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <h2 className="font-display text-4xl uppercase tracking-[0.14em] text-copper sm:text-5xl">
            Customer Reviews
          </h2>
          <div className="rule-copper mx-auto mt-6 w-40" />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal
              key={review.name}
              delay={i * 0.12}
              className="rounded-sm border border-border bg-background p-8 transition-transform duration-500 hover:-translate-y-1"
            >
              <Quote className="size-6 text-copper" />
              <blockquote className="mt-5 text-sm leading-relaxed text-muted-foreground">
                “{review.quote}”
              </blockquote>
              <div className="mt-6">
                <p className="font-display text-lg text-copper">{review.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {review.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationsSection() {
  return (
    <section id="locations" className="w-full overflow-hidden bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <h2 className="font-display text-4xl uppercase tracking-[0.14em] text-copper sm:text-5xl">
            Our Locations
          </h2>
          <div className="rule-copper mx-auto mt-6 w-40" />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="order-1 overflow-hidden rounded-sm border border-border lg:order-2">
            <iframe
              title="Griffin Coffee location on the map"
              src={contact.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full sm:h-[26rem]"
            />
          </div>

          <div className="order-2 space-y-6 lg:order-1">
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-4 rounded-sm border border-border p-5 transition-colors hover:border-copper"
            >
              <Instagram className="mt-1 size-5 text-copper" />
              <span>
                <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Instagram
                </span>
                <span className="text-base">{contact.instagram}</span>
              </span>
            </a>

            <a
              href={contact.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-4 rounded-sm border border-border p-5 transition-colors hover:border-copper"
            >
              <Facebook className="mt-1 size-5 text-copper" />
              <span>
                <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Facebook
                </span>
                <span className="text-base">{contact.facebook}</span>
              </span>
            </a>

            <a
              href={contact.phoneHref}
              className="flex items-start gap-4 rounded-sm border border-border p-5 transition-colors hover:border-copper"
            >
              <Phone className="mt-1 size-5 text-copper" />
              <span>
                <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Phone
                </span>
                <span className="text-base">{contact.phone}</span>
              </span>
            </a>

            <a
              href={contact.mapLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-4 rounded-sm border border-border p-5 transition-colors hover:border-copper"
            >
              <MapPin className="mt-1 size-5 shrink-0 text-copper" />
              <span>
                <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Address
                </span>
                <span className="text-sm leading-relaxed">{contact.address}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section id="visit" className="relative w-full overflow-hidden bg-secondary py-24 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-display text-4xl leading-tight text-copper sm:text-6xl">
          Ready for the best cup of coffee?
        </h2>
        <p className="mt-5 text-sm uppercase tracking-[0.24em] text-ivory sm:text-base">
          Order Now or Reserve a Table
        </p>
        <div className="mt-10">
          <a
            href={contact.phoneHref}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-copper px-10 py-4 text-xs uppercase tracking-[0.24em] text-primary-foreground transition-transform duration-500 hover:scale-[1.03]"
          >
            <Phone className="size-4" />
            Call Griffin — {contact.phone}
          </a>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Open daily 7:30 AM to 1:00 AM
        </p>
      </div>
    </section>
  );
}
