import { useLang } from "@/context/LangContext";

export function NewsTicker() {
  const { t } = useLang();
  const items = [t("ticker_1"), t("ticker_2"), t("ticker_3"), t("ticker_4")];
  const loop = [...items, ...items, ...items];
  return (
    <section className="overflow-hidden border-y border-border bg-background py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {loop.map((text, i) => (
          <span
            key={i}
            className="mx-10 flex items-center gap-10 font-display text-xl tracking-wide text-foreground md:text-2xl"
          >
            {text}
            <span className="text-foreground/30">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
