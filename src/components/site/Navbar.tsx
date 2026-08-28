import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import logo from "@/assets/griffin-logo.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sections = [
  { label: "Signature Dishes", hash: "#dishes" },
  { label: "About Griffin", hash: "#about" },
  { label: "Customer Reviews", hash: "#reviews" },
  { label: "Our Locations", hash: "#locations" },
  { label: "Visit Us", hash: "#visit" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "bg-primary text-primary-foreground border-b border-background/20"
          : "bg-background text-primary border-b border-border",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label="Griffin home">
          <img
            src={logo}
            alt="Griffin Coffee logo"
            width={48}
            height={48}
            className="size-10 rounded-full object-cover ring-1 ring-current sm:size-12"
          />
        </Link>

        <Link
          to="/"
          className="font-display absolute left-1/2 -translate-x-1/2 text-2xl tracking-brand uppercase sm:text-3xl"
        >
          Griffin
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Open navigation menu"
            className="inline-flex items-center gap-2 rounded-full border border-current px-3 py-2 text-xs uppercase tracking-[0.2em] transition-opacity hover:opacity-70 sm:px-4"
          >
            <Menu className="size-4" />
            <span className="hidden sm:inline">Menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-60 border-border bg-background text-primary"
          >
            {sections.map((s) => (
              <DropdownMenuItem key={s.hash} asChild>
                <a
                  href={onHome ? s.hash : `/${s.hash}`}
                  className="cursor-pointer text-sm uppercase tracking-[0.14em] focus:bg-primary focus:text-primary-foreground"
                >
                  {s.label}
                </a>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem asChild>
              <Link
                to="/menu"
                className="cursor-pointer text-sm uppercase tracking-[0.14em] focus:bg-primary focus:text-primary-foreground"
              >
                Full Menu
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}
