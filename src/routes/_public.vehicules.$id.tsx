import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

import { StatutBadge } from "@/components/site/VehicleCard";
import { formatKm, formatPrice, telHref, useStore, whatsappHref } from "@/lib/store";

export const Route = createFileRoute("/_public/vehicules/$id")({
  head: () => ({
    meta: [
      { title: "Fiche véhicule — BassimouAuto Seddouk" },
      {
        name: "description",
        content:
          "Détails complets du véhicule : année, kilométrage, boîte, carburant, prix en DA et disponibilité chez BassimouAuto.",
      },
      { property: "og:title", content: "Fiche véhicule — BassimouAuto Seddouk" },
      {
        property: "og:description",
        content: "Caractéristiques, photos et prix du véhicule disponible chez BassimouAuto.",
      },
    ],
  }),
  component: VehicleDetail,
});

function VehicleDetail() {
  const { id } = Route.useParams();
  const { vehicles, dealer } = useStore();
  const vehicle = vehicles.find((v) => v.id === id);
  const [index, setIndex] = useState(0);

  if (!vehicle) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Véhicule introuvable</h1>
        <Link to="/vehicules" className="mt-4 inline-block text-primary">
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const photos = vehicle.photos.length ? vehicle.photos : [];
  const titre = `${vehicle.marque} ${vehicle.modele}`;
  const waText = `Bonjour, je suis intéressé par ${titre}, est-il toujours disponible ?`;

  const specs: [string, string][] = [
    ["Année", String(vehicle.annee)],
    ["État", vehicle.etat],
    ["Boîte", vehicle.boite],
    ["Carburant", vehicle.carburant],
    ...(vehicle.etat === "Occasion"
      ? ([["Kilométrage", formatKm(vehicle.kilometrage)]] as [string, string][])
      : []),
    ["Puissance / cylindrée", vehicle.puissance],
    ["Nombre de portes", String(vehicle.portes)],
    ["Nombre de places", String(vehicle.places)],
    ["Couleur", vehicle.couleur],
    ["Origine", vehicle.origine],
    ["Main", vehicle.main],
    ["Papiers en règle", vehicle.papiers ? "Oui" : "Non"],
    ["Prix négociable", vehicle.negociable ? "Oui" : "Non"],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/vehicules" className="text-sm text-muted-foreground hover:text-primary">
        ← Retour au catalogue
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="surface-card relative aspect-[4/3] overflow-hidden">
            {photos[index] ? (
              <img
                src={photos[index]}
                alt={`${titre} photo ${index + 1}`}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-muted-foreground">
                Pas de photo
              </div>
            )}
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Photo précédente"
                  onClick={() => setIndex((i) => (i - 1 + photos.length) % photos.length)}
                  className="absolute left-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Photo suivante"
                  onClick={() => setIndex((i) => (i + 1) % photos.length)}
                  className="absolute right-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/80"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>
          {photos.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {photos.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`size-20 shrink-0 overflow-hidden rounded-lg border ${
                    i === index ? "border-primary" : "border-border"
                  }`}
                >
                  <img src={p} alt={`Miniature ${i + 1}`} className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-bold">{titre}</h1>
            <StatutBadge statut={vehicle.statut} />
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-primary">
            {formatPrice(vehicle.prix)}
            {vehicle.negociable && (
              <span className="ml-2 text-sm font-medium text-muted-foreground">négociable</span>
            )}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={telHref(dealer.telephone)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Phone className="size-4" /> Appeler
            </a>
            <a
              href={whatsappHref(dealer.telephone, waText)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-whatsapp px-5 py-3 text-sm font-semibold text-whatsapp-foreground"
            >
              <MessageCircle className="size-4" /> WhatsApp
            </a>
          </div>

          <div className="surface-card mt-8 overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {specs.map(([k, v], i) => (
                  <tr key={k} className={i % 2 ? "bg-muted/40" : ""}>
                    <th className="w-1/2 px-4 py-3 text-left font-medium text-muted-foreground">
                      {k}
                    </th>
                    <td className="px-4 py-3 font-semibold">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
