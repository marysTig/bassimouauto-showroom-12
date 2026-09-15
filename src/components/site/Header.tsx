import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import { telHref, useDealer } from "@/lib/store";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/vehicules", label: "Véhicules" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const dealer = useDealer();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-1 sm:gap-2 font-display text-base sm:text-xl font-bold tracking-tight">
          <img src="/logo.png" alt={`${dealer.nom} Logo`} className="h-8 sm:h-10 w-auto object-contain" />
          <div className="flex items-center">
            <span className="text-foreground">BASSIMOU</span>
            <span className="text-primary ml-1">AUTO</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref(dealer.telephone)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            <Phone className="size-4" />
            <span className="hidden sm:inline">Appeler maintenant</span>
            <span className="sm:hidden">Appeler</span>
          </a>
          <button
            type="button"
            aria-label="Ouvrir le menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="block rounded-md px-2 py-3 text-sm font-medium text-muted-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
