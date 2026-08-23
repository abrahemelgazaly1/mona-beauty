import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NavBottom } from "@/components/NavBottom";
import { NewsTicker } from "@/components/NewsTicker";
import { ProductsMarquee } from "@/components/ProductsMarquee";
import { categories } from "@/data/products";
import heroImg from "@/assets/hero.jpg";
import {
  Truck,
  RefreshCw,
  ShieldCheck,
  Headphones,
  Star,
  Quote,
} from "lucide-react";
import { useLang } from "@/context/LangContext";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { t } = useLang();

  const perks = [
    {
      icon: Truck,
      title: t("perk_delivery_title"),
      desc: t("perk_delivery_desc"),
    },
    {
      icon: ShieldCheck,
      title: t("perk_authentic_title"),
      desc: t("perk_authentic_desc"),
    },
    {
      icon: RefreshCw,
      title: t("perk_returns_title"),
      desc: t("perk_returns_desc"),
    },
    {
      icon: Headphones,
      title: t("perk_support_title"),
      desc: t("perk_support_desc"),
    },
  ];

  const testimonials = [
    {
      name: "Sara M.",
      rating: 5,
      text: "The Silk Repair Shampoo is literally a miracle. My hair has never felt this soft and healthy.",
    },
    {
      name: "Nour A.",
      rating: 5,
      text: "I've been buying from Doctor Cosmetics for a year now. The quality is always consistent and delivery is fast.",
    },
    {
      name: "Layla K.",
      rating: 5,
      text: "Hydra Glow Cream changed my whole skincare routine. My skin stays moisturised all day long.",
    },
    {
      name: "Dina R.",
      rating: 4,
      text: "Amazing selection and the packaging is gorgeous. Will definitely keep coming back!",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[calc(100vh-5rem)] min-h-[640px] w-full overflow-hidden bg-primary">
        <img
          src={heroImg}
          alt="Doctor Cosmetics"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full animate-zoom-in object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-14 text-primary-foreground">
          <div className="pt-8 md:pt-16">
            <p
              className="animate-fade-in text-xs uppercase tracking-[0.4em] opacity-80"
              style={{ animationDelay: "0.1s" }}
            >
              {t("hero_est")}
            </p>
            <h1
              className="mt-6 max-w-4xl animate-fade-up font-display text-5xl leading-[1.05] md:text-7xl lg:text-8xl"
              style={{ animationDelay: "0.25s" }}
            >
              {t("hero_tagline")
                .split("\n")
                .map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
            </h1>
            <p
              className="mt-6 max-w-md animate-fade-up text-base leading-relaxed opacity-85 md:text-lg"
              style={{ animationDelay: "0.45s" }}
            >
              {t("hero_sub")}
            </p>
          </div>

          <div
            className="flex animate-fade-up items-end justify-between"
            style={{ animationDelay: "0.65s" }}
          >
            <div className="hidden text-xs uppercase tracking-[0.3em] opacity-60 md:block">
              {t("hero_scroll")}
            </div>
            <Link
              to="/products"
              className="group inline-flex items-center gap-4 border-2 border-primary-foreground bg-primary-foreground px-10 py-5 text-xs uppercase tracking-[0.35em] text-primary font-medium transition-all duration-500 hover:bg-transparent hover:text-primary-foreground hover:border-primary-foreground/40 hover:scale-105"
            >
              {t("hero_shop")}
              <span className="inline-block h-px w-8 bg-current transition-all duration-500 group-hover:w-14" />
            </Link>
          </div>
        </div>
      </section>

      <NewsTicker />

      <ProductsMarquee />

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-10 flex items-end justify-between sm:mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("cat_label")}
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-6xl">
              {t("cat_title")}
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs uppercase tracking-[0.3em] hover:opacity-60"
          >
            {t("cat_view_all")}
          </Link>
        </div>

        {/* Only Hair Care shown here — bigger image */}
        {(() => {
          const hairCare = categories.find((c) => c.slug === "hair-care");
          if (!hairCare) return null;
          return (
            <Link
              to="/category/$slug"
              params={{ slug: hairCare.slug }}
              className="group block animate-fade-up"
            >
              <div className="relative aspect-[16/7] overflow-hidden bg-secondary sm:aspect-[16/6]">
                <img
                  src={hairCare.image}
                  alt={hairCare.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-transform duration-[900ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="font-display text-4xl text-white drop-shadow-lg sm:text-6xl md:text-7xl">
                    {hairCare.name}
                  </h3>
                </div>
              </div>
            </Link>
          );
        })()}
      </section>

      {/* ABOUT */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:py-32">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {t("about_label")}
              </p>
              <h2 className="mt-4 font-display text-3xl leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl">
                {t("about_title")}
              </h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:space-y-5 sm:text-base">
              <p>{t("about_p1")}</p>
              <p>{t("about_p2")}</p>
              <div className="flex flex-wrap gap-6 pt-2 text-foreground sm:gap-8">
                <div>
                  <div className="font-display text-3xl sm:text-4xl">2019</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {t("about_founded")}
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl sm:text-4xl">50+</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {t("about_products")}
                  </div>
                </div>
                <div>
                  <div className="font-display text-3xl sm:text-4xl">5k+</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {t("about_clients")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-10 text-center sm:mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t("why_label")}
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">
            {t("why_title")}
          </h2>
        </div>
        <div className="grid gap-5 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => (
            <div
              key={p.title}
              className="group animate-fade-up border border-border p-6 sm:p-8 transition-colors hover:bg-secondary"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p.icon className="h-8 w-8 mb-5" strokeWidth={1.25} />
              <h3 className="font-display text-xl">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-border bg-secondary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("reviews_label")}
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-6xl">
              {t("reviews_title")}
            </h2>
          </div>
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial, i) => (
              <div
                key={testimonial.name}
                className="animate-fade-up bg-background p-5 sm:p-6 border border-border"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Quote
                  className="h-6 w-6 mb-4 text-muted-foreground"
                  strokeWidth={1.25}
                />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-display text-base">
                    {testimonial.name}
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-3 w-3 fill-primary text-primary"
                        strokeWidth={0}
                      />
                    ))}
                    {Array.from({ length: 5 - testimonial.rating }).map(
                      (_, j) => (
                        <Star
                          key={j}
                          className="h-3 w-3 text-muted"
                          strokeWidth={1}
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-10 text-center sm:mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t("services_label")}
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">
            {t("services_title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t("services_sub")}
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              { key: "manicure", icon: "💅" },
              { key: "pedicure", icon: "🦶" },
              { key: "scalp", icon: "🌱" },
              { key: "hair", icon: "✂️" },
              { key: "protein", icon: "💊" },
              { key: "iron", icon: "🔥" },
              { key: "color", icon: "🎨" },
              { key: "blowdry", icon: "💨" },
              { key: "skin", icon: "🌿" },
              { key: "bride", icon: "👰" },
              { key: "makeup", icon: "💄" },
            ] as { key: string; icon: string }[]
          ).map(({ key, icon }, i) => (
            <div
              key={key}
              className="animate-fade-up group border border-border p-6 transition-colors hover:bg-secondary sm:p-8"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="mb-4 text-3xl">{icon}</div>
              <h3 className="font-display text-xl">
                {t(`svc_${key}_title` as Parameters<typeof t>[0])}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`svc_${key}_desc` as Parameters<typeof t>[0])}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 border-t border-border pt-12 text-center">
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("svc_cta")}
          </p>
          <a
            href="tel:+201272828240"
            className="mt-8 inline-flex items-center gap-3 border border-primary bg-primary px-10 py-4 text-xs uppercase tracking-[0.35em] text-primary-foreground transition-opacity hover:opacity-85"
          >
            {t("svc_contact_btn")}
          </a>
        </div>
      </section>

      <Footer />
      <NavBottom />
    </div>
  );
}
