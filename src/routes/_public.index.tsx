import { Link, createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";

import heroImage from "@/assets/hero-showroom.jpg";
import { ContactSection } from "@/components/site/ContactSection";
import { VehicleCard } from "@/components/site/VehicleCard";
import { WhyUs } from "@/components/site/WhyUs";
import { telHref, useStore, whatsappHref } from "@/lib/store";

export const Route = createFileRoute("/_public/")({
  head: () => ({
    meta: [
      { title: "BassimouAuto — Concessionnaire automobile à Seddouk" },
      {
        name: "description",
        content:
          "BassimouAuto, concessionnaire automobile à Seddouk : véhicules neufs et d'occasion vérifiés, papiers en règle, prix en DA.",
      },
      { property: "og:title", content: "BassimouAuto — Concessionnaire automobile à Seddouk" },
      {
        property: "og:description",
        content: "Véhicules neufs et d'occasion vérifiés à Seddouk. Appelez ou écrivez sur WhatsApp.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { vehicles, dealer } = useStore();
  const featured = vehicles.filter((v) => v.featured).slice(0, 4);

  return (
    <>
      <section className="relative">
        <img
          src={heroImage}
          alt="Showroom automobile BassimouAuto"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="hero-overlay relative">
          <div className="mx-auto max-w-6xl px-4 py-24 sm:py-32 text-center sm:text-left flex flex-col items-center sm:items-start">
            <p className="font-display text-sm uppercase tracking-[0.3em] text-primary">
              Seddouk · Béjaïa
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl text-white">
              {dealer.nom} <span className="hidden sm:inline">— </span>
              <span className="block sm:inline">Votre concessionnaire automobile à Seddouk</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Un large choix de véhicules neufs et d&apos;occasion, contrôlés et livrés avec
              des papiers en règle. Achetez en toute confiance, près de chez vous.
            </p>
            <div className="mt-8 flex flex-wrap justify-center sm:justify-start gap-3">
              <a
                href="#dernieres-arrivees"
                className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Voir les véhicules
              </a>
              <a
                href={telHref(dealer.telephone)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold"
              >
                <Phone className="size-4" /> Appeler
              </a>
              <a
                href={whatsappHref(dealer.telephone, "Bonjour, je cherche un véhicule.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-whatsapp px-5 py-3 text-sm font-semibold text-whatsapp-foreground"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="dernieres-arrivees" className="mx-auto max-w-6xl px-4 py-16 scroll-mt-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold">Nos dernières arrivées</h2>
          <Link to="/vehicules" className="text-sm font-semibold text-primary">
            Tout voir
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featured.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
          {featured.length === 0 && (
            <p className="text-muted-foreground">Aucun véhicule mis en avant pour le moment.</p>
          )}
        </div>
      </section>

      <WhyUs />
      <ContactSection />
    </>
  );
}
