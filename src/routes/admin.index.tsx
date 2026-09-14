import { Link, createFileRoute } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { formatPrice, useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — BassimouAuto" },
      { name: "description", content: "Tableau de bord d'administration du showroom BassimouAuto." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Tableau de bord — BassimouAuto" },
      { property: "og:description", content: "Gestion des véhicules et des demandes de contact." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { vehicles, messages } = useStore();
  const count = (s: string) => vehicles.filter((v) => v.statut === s).length;

  const stats = [
    { label: "Total véhicules", value: vehicles.length },
    { label: "Disponibles", value: count("Disponible") },
    { label: "Réservés", value: count("Réservé") },
    { label: "Vendus", value: count("Vendu") },
  ];

  return (
    <AdminShell title="Tableau de bord">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="surface-card p-5">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-display text-3xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="surface-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Derniers véhicules</h2>
            <Link to="/admin/vehicules" className="text-sm text-primary">
              Gérer
            </Link>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {vehicles.slice(0, 5).map((v) => (
              <li key={v.id} className="flex justify-between gap-3 border-b border-border pb-2">
                <span>
                  {v.marque} {v.modele} · {v.annee}
                </span>
                <span className="font-semibold">{formatPrice(v.prix)}</span>
              </li>
            ))}
            {vehicles.length === 0 && <li className="text-muted-foreground">Aucun véhicule.</li>}
          </ul>
        </div>

        <div className="surface-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Messages non traités</h2>
            <Link to="/admin/messages" className="text-sm text-primary">
              Voir
            </Link>
          </div>
          <p className="mt-4 font-display text-3xl font-bold">
            {messages.filter((m) => !m.traite).length}
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
