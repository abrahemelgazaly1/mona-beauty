import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";

import logo from "@/assets/griffin-logo.jpg";
import { contact } from "@/data/griffin";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background text-primary">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={logo}
            alt="Griffin Coffee logo"
            width={64}
            height={64}
            loading="lazy"
            className="size-14 rounded-full object-cover ring-1 ring-border"
          />
          <p className="font-display mt-4 text-2xl uppercase tracking-brand">Griffin</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A quiet specialty coffee house in El-Mahalla El-Kubra. Slow mornings, serious
            coffee, sourdough kitchen.
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/" className="transition-opacity hover:opacity-70">
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="transition-opacity hover:opacity-70">
                Menu
              </Link>
            </li>
            <li>
              <a href="/#about" className="transition-opacity hover:opacity-70">
                About
              </a>
            </li>
            <li>
              <a href="/#reviews" className="transition-opacity hover:opacity-70">
                Reviews
              </a>
            </li>
            <li>
              <a href="/#locations" className="transition-opacity hover:opacity-70">
                Locations
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Social
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
              >
                <Instagram className="size-4" /> {contact.instagram}
              </a>
            </li>
            <li>
              <a
                href={contact.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
              >
                <Facebook className="size-4" /> {contact.facebook}
              </a>
            </li>
            <li>
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
              >
                <Phone className="size-4" /> {contact.phone}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Address
          </h3>
          <p className="mt-4 flex gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            <span>{contact.address}</span>
          </p>
          <p className="mt-4 text-sm">{contact.hours}</p>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
        © {new Date().getFullYear()} Griffin Coffee — El-Mahalla El-Kubra
      </div>
    </footer>
  );
}
