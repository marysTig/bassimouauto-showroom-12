import { createFileRoute } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { actions, formatDate, useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/messages")({
  head: () => ({
    meta: [
      { title: "Demandes de contact — BassimouAuto" },
      { name: "description", content: "Gestion des demandes de contact reçues sur le site BassimouAuto." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Demandes de contact — BassimouAuto" },
      { property: "og:description", content: "Suivi des messages clients du showroom." },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  const { messages } = useStore();
  const sorted = [...messages].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <AdminShell title="Demandes de contact">
      <div className="space-y-3">
        {sorted.map((m) => (
          <div key={m.id} className="surface-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold">
                  {m.nom} · <a href={`tel:${m.telephone}`}>{m.telephone}</a>
                </p>
                <p className="text-xs text-muted-foreground">{formatDate(m.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    m.traite ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"
                  }`}
                >
                  {m.traite ? "Traité" : "Non traité"}
                </span>
                <button
                  type="button"
                  onClick={() => actions.toggleMessage(m.id)}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold"
                >
                  Marquer {m.traite ? "non traité" : "traité"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Supprimer ce message ?")) actions.deleteMessage(m.id);
                  }}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-destructive"
                >
                  Supprimer
                </button>
              </div>
            </div>
            {m.vehicule && (
              <p className="mt-3 text-sm">
                <span className="text-muted-foreground">Véhicule recherché : </span>
                {m.vehicule}
              </p>
            )}
            {m.message && <p className="mt-1 text-sm">{m.message}</p>}
          </div>
        ))}
        {sorted.length === 0 && (
          <p className="text-sm text-muted-foreground">Aucune demande pour le moment.</p>
        )}
      </div>
    </AdminShell>
  );
}
