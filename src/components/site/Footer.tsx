import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Facebook, Instagram } from "lucide-react";

import { telHref, useDealer } from "@/lib/store";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export function Footer() {
  const dealer = useDealer();

  return (
    <footer className="mt-20 border-t border-border bg-surface text-center sm:text-left">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
            <img src="/logo.png" alt={`${dealer.nom} Logo`} className="h-10 w-auto object-contain bg-black rounded-full px-4 py-1.5" />
            <div className="font-display text-lg font-bold">
              <span className="text-foreground">BASSIMOU</span>
              <span className="text-primary ml-1">AUTO</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Concessionnaire automobile — véhicules neufs et d&apos;occasion.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href="https://www.facebook.com/share/1Dnfvvac2N/"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-[#1877F2] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="size-5" />
            </a>
            <a
              href="https://www.instagram.com/bassimouauto?stkn=NmFzbzlxeGxuMWF6"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-[#E4405F] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="size-5" />
            </a>
            <a
              href="https://www.tiktok.com/@bassimou.auto?_r=1&_t=ZS-99mYYzH0qHt"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon className="size-5" />
            </a>
          </div>
        </div>

        <div className="space-y-2 text-sm flex flex-col items-center sm:items-start">
          <p className="font-semibold">Coordonnées</p>
          <p className="flex items-start justify-center sm:justify-start gap-2 text-muted-foreground text-center sm:text-left">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {dealer.adresse}
          </p>
          <a
            href={telHref(dealer.telephone)}
            className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground hover:text-primary"
          >
            <Phone className="size-4" />
            {dealer.telephone}
          </a>
        </div>

        <div className="space-y-2 text-sm flex flex-col items-center sm:items-start">
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
        <Link to="/admin/login" className="hover:text-primary transition-colors">
          {dealer.nom} — Seddouk
        </Link>
      </div>
    </footer>
  );
}
