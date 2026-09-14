import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { VehicleCard } from "@/components/site/VehicleCard";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/_public/vehicules/")({
  head: () => ({
    meta: [
      { title: "Nos véhicules — BassimouAuto Seddouk" },
      {
        name: "description",
        content:
          "Catalogue des véhicules BassimouAuto à Seddouk : filtrez par marque, prix, année, carburant, boîte et état.",
      },
      { property: "og:title", content: "Nos véhicules — BassimouAuto Seddouk" },
      {
        property: "og:description",
        content: "Tous nos véhicules neufs et d'occasion disponibles à Seddouk.",
      },
    ],
  }),
  component: CataloguePage,
});

const ALL = "Tous";

function CataloguePage() {
  const { vehicles } = useStore();
  const [marque, setMarque] = useState(ALL);
  const [carburant, setCarburant] = useState(ALL);
  const [boite, setBoite] = useState(ALL);
  const [etat, setEtat] = useState(ALL);
  const [annee, setAnnee] = useState(ALL);
  const [prixMin, setPrixMin] = useState("");
  const [prixMax, setPrixMax] = useState("");

  const marques = useMemo(
    () => [ALL, ...Array.from(new Set(vehicles.map((v) => v.marque))).sort()],
    [vehicles],
  );
  const annees = useMemo(
    () => [ALL, ...Array.from(new Set(vehicles.map((v) => String(v.annee)))).sort().reverse()],
    [vehicles],
  );

  const filtered = vehicles.filter((v) => {
    if (marque !== ALL && v.marque !== marque) return false;
    if (carburant !== ALL && v.carburant !== carburant) return false;
    if (boite !== ALL && v.boite !== boite) return false;
    if (etat !== ALL && v.etat !== etat) return false;
    if (annee !== ALL && String(v.annee) !== annee) return false;
    if (prixMin && v.prix < Number(prixMin)) return false;
    if (prixMax && v.prix > Number(prixMax)) return false;
    return true;
  });

  const select =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl font-bold">Nos véhicules</h1>
      <p className="mt-2 text-muted-foreground">
        {filtered.length} véhicule{filtered.length > 1 ? "s" : ""} correspondant à votre recherche.
      </p>

      <div className="surface-card mt-8 grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">Marque</span>
          <select value={marque} onChange={(e) => setMarque(e.target.value)} className={select}>
            {marques.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">Année</span>
          <select value={annee} onChange={(e) => setAnnee(e.target.value)} className={select}>
            {annees.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">Carburant</span>
          <select
            value={carburant}
            onChange={(e) => setCarburant(e.target.value)}
            className={select}
          >
            {[ALL, "Essence", "Diesel", "Hybride", "Électrique"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">Boîte</span>
          <select value={boite} onChange={(e) => setBoite(e.target.value)} className={select}>
            {[ALL, "Manuelle", "Automatique"].map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">État</span>
          <select value={etat} onChange={(e) => setEtat(e.target.value)} className={select}>
            {[ALL, "Neuf", "Occasion"].map((e2) => (
              <option key={e2}>{e2}</option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">Prix min (DA)</span>
          <input
            type="number"
            value={prixMin}
            onChange={(e) => setPrixMin(e.target.value)}
            className={select}
            placeholder="0"
          />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted-foreground">Prix max (DA)</span>
          <input
            type="number"
            value={prixMax}
            onChange={(e) => setPrixMax(e.target.value)}
            className={select}
            placeholder="10 000 000"
          />
        </label>
        <div className="flex items-end">
          <button
            type="button"
            onClick={() => {
              setMarque(ALL);
              setAnnee(ALL);
              setCarburant(ALL);
              setBoite(ALL);
              setEtat(ALL);
              setPrixMin("");
              setPrixMax("");
            }}
            className="w-full rounded-lg border border-border px-4 py-2 text-sm font-semibold"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground">
          Aucun véhicule ne correspond à ces filtres.
        </p>
      )}
    </div>
  );
}
