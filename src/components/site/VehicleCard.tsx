import { Link } from "@tanstack/react-router";
import { Calendar, Fuel, Gauge } from "lucide-react";

import { formatKm, formatPrice, type Statut, type Vehicle } from "@/lib/store";

export function StatutBadge({ statut }: { statut: Statut }) {
  const tone =
    statut === "Disponible"
      ? "bg-success text-success-foreground"
      : statut === "Réservé"
        ? "bg-warning text-warning-foreground"
        : "bg-destructive text-destructive-foreground";
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{statut}</span>
  );
}

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      to="/vehicules/$id"
      params={{ id: vehicle.id }}
      className="group surface-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {vehicle.photos[0] ? (
          <img
            src={vehicle.photos[0]}
            alt={`${vehicle.marque} ${vehicle.modele}`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
            Pas de photo
          </div>
        )}
        <div className="absolute left-3 top-3">
          <StatutBadge statut={vehicle.statut} />
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="font-display text-lg font-semibold">
            {vehicle.marque} {vehicle.modele}
          </h3>
          <p className="text-sm text-muted-foreground">
            {vehicle.etat} · {vehicle.boite}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3.5" /> {vehicle.annee}
          </span>
          <span className="inline-flex items-center gap-1">
            <Fuel className="size-3.5" /> {vehicle.carburant}
          </span>
          <span className="inline-flex items-center gap-1">
            <Gauge className="size-3.5" /> {formatKm(vehicle.kilometrage)}
          </span>
        </div>

        <p className="font-display text-xl font-bold text-primary">
          {formatPrice(vehicle.prix)}
        </p>
      </div>
    </Link>
  );
}
