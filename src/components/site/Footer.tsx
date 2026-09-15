import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";

import { telHref, useDealer } from "@/lib/store";

export function Footer() {
  const dealer = useDealer();

  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt={`${dealer.nom} Logo`} className="h-8 w-auto object-contain" />
            <div className="font-display text-lg font-bold">
              <span className="text-foreground">BASSIMOU</span>
              <span className="text-primary ml-1">AUTO</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Concessionnaire automobile — véhicules neufs et d&apos;occasion.
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-semibold">Coordonnées</p>
          <p className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {dealer.adresse}
          </p>
          <a
            href={telHref(dealer.telephone)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary"
          >
            <Phone className="size-4" />
            {dealer.telephone}
          </a>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-semibold">Liens rapides</p>
          {[
            { to: "/", label: "Accueil" },
            { to: "/vehicules", label: "Véhicules" },
            { to: "/a-propos", label: "À propos" },
            { to: "/contact", label: "Contact" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="block text-muted-foreground hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        {dealer.nom} — Seddouk
      </div>
    </footer>
  );
}
