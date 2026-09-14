import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
import { actions, useStore, type Dealer } from "@/lib/store";

export const Route = createFileRoute("/admin/parametres")({
  head: () => ({
    meta: [
      { title: "Informations concessionnaire — BassimouAuto" },
      { name: "description", content: "Modifier les coordonnées affichées sur le site BassimouAuto." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Informations concessionnaire — BassimouAuto" },
      { property: "og:description", content: "Nom, adresse, téléphone et localisation du showroom." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { dealer } = useStore();
  const [form, setForm] = useState<Dealer>(dealer);
  const [saved, setSaved] = useState(false);

  const field =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <AdminShell title="Informations concessionnaire">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          actions.saveDealer(form);
          setSaved(true);
        }}
        className="surface-card max-w-xl space-y-4 p-5"
      >
        {(
          [
            ["nom", "Nom du concessionnaire"],
            ["adresse", "Adresse"],
            ["telephone", "Téléphone / WhatsApp"],
            ["maps", "Lien Google Maps"],
          ] as [keyof Dealer, string][]
        ).map(([key, label]) => (
          <label key={key} className="block text-sm">
            <span className="mb-1 block text-muted-foreground">{label}</span>
            <input
              value={form[key]}
              onChange={(e) => {
                setSaved(false);
                setForm({ ...form, [key]: e.target.value });
              }}
              className={field}
            />
          </label>
        ))}
        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Enregistrer
        </button>
        {saved && <p className="text-sm text-primary">Informations mises à jour.</p>}
      </form>
    </AdminShell>
  );
}
