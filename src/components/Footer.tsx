import { Link } from "@tanstack/react-router";
import { Facebook } from "lucide-react";
import { useLang } from "@/context/LangContext";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-border bg-background pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl tracking-[0.25em]">
              DOCTOR COSMETICS
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("footer_desc")}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61575493928350"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="transition-opacity hover:opacity-60"
              >
                <Facebook className="h-5 w-5" strokeWidth={1.25} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em]">
              {t("footer_shop")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/products"
                  className="hover:text-foreground transition-colors"
                >
                  {t("footer_all_products")}
                </Link>
              </li>
              <li>
                <Link
                  to="/category/$slug"
                  params={{ slug: "hair-care" }}
                  className="hover:text-foreground transition-colors"
                >
                  {t("footer_hair_care")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em]">
              {t("footer_contact")}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="tel:+201063775592"
                  className="hover:text-foreground transition-colors"
                >
                  01063775592
                </a>
              </li>
              <li className="leading-relaxed">
                El Mahalla El Kubra, 7 El Damshiny,
                <br />
                Al Mahallah al Kubra,
                <br />
                Gharbia Governorate
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} DOCTOR COSMETICS — {t("footer_rights")}
        </div>
      </div>
    </footer>
  );
}
