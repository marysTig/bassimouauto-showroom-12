import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AdminShell } from "@/components/admin/AdminShell";
import { uploadImage } from "@/lib/cloudinary";
import { actions, formatPrice, useVehicles, type Vehicle } from "@/lib/store";

export const Route = createFileRoute("/admin/vehicules")({
  head: () => ({
    meta: [
      { title: "Gestion des véhicules — BassimouAuto" },
      { name: "description", content: "Ajouter, modifier ou supprimer les véhicules du catalogue BassimouAuto." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Gestion des véhicules — BassimouAuto" },
      { property: "og:description", content: "Administration du catalogue de véhicules." },
    ],
  }),
  component: AdminVehiclesPage,
});

type Form = Omit<Vehicle, "id" | "createdAt"> & { id?: string };

const emptyForm: Form = {
  marque: "",
  modele: "",
  annee: new Date().getFullYear(),
  etat: "Occasion",
  boite: "Manuelle",
  carburant: "Essence",
  kilometrage: 0,
  puissance: "",
  portes: 5,
  places: 5,
  couleur: "",
  prix: 0,
  negociable: true,
  origine: "Achat local",
  main: "Première main",
  papiers: true,
  statut: "Disponible",
  featured: false,
  photos: [],
};

const field =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary";

function AdminVehiclesPage() {
  const { vehicles, loading } = useVehicles();
  const [form, setForm] = useState<Form | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  async function readFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploadingPhotos(true);
    try {
      const uploads = await Promise.all(
        Array.from(files).map((file) => uploadImage(file)),
      );
      setForm((f) => (f ? { ...f, photos: [...f.photos, ...uploads] } : f));
    } catch {
      toast.error("Erreur lors de l'upload des photos. Vérifiez votre connexion.");
    } finally {
      setUploadingPhotos(false);
    }
  }

  return (
    <AdminShell title="Gestion des véhicules">
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setForm({ ...emptyForm })}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="size-4" /> Ajouter un véhicule
        </button>
      </div>

      <div className="surface-card overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-secondary text-left">
            <tr>
              <th className="p-3">Photo</th>
              <th className="p-3">Véhicule</th>
              <th className="p-3">Année</th>
              <th className="p-3">Prix</th>
              <th className="p-3">Statut</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id} className="border-t border-border">
                <td className="p-3">
                  {v.photos[0] ? (
                    <img
                      src={v.photos[0]}
                      alt={`${v.marque} ${v.modele}`}
                      className="size-14 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="size-14 rounded-lg bg-muted" />
                  )}
                </td>
                <td className="p-3 font-semibold">
                  {v.marque} {v.modele}
                  {v.featured && <span className="ml-2 text-xs text-primary">★ à la une</span>}
                </td>
                <td className="p-3">{v.annee}</td>
                <td className="p-3">{formatPrice(v.prix)}</td>
                <td className="p-3">{v.statut}</td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      aria-label="Modifier"
                      onClick={() => setForm({ ...v })}
                      className="rounded-lg border border-border p-2"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Supprimer"
                      onClick={async () => {
                        if (confirm(`Supprimer ${v.marque} ${v.modele} ? Cette action est définitive.`)) {
                          await actions.deleteVehicle(v.id);
                          toast.success("Véhicule supprimé avec succès.");
                        }
                      }}
                      className="rounded-lg border border-border p-2 text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-muted-foreground">
                  Chargement…
                </td>
              </tr>
            )}
            {!loading && vehicles.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-muted-foreground">
                  Aucun véhicule enregistré.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {form && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSaving(true);
              try {
                const isEdit = Boolean(form.id);
                await actions.saveVehicle(form);
                setForm(null);
                toast.success(isEdit ? "Véhicule modifié avec succès." : "Véhicule ajouté avec succès.");
              } finally {
                setSaving(false);
              }
            }}
            className="admin-theme surface-card mx-auto max-w-3xl space-y-4 p-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">
                {form.id ? "Modifier le véhicule" : "Nouveau véhicule"}
              </h2>
              <button type="button" onClick={() => setForm(null)} aria-label="Fermer">
                <X className="size-5" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Text label="Marque" value={form.marque} onChange={(v) => setForm({ ...form, marque: v })} required />
              <Text label="Modèle" value={form.modele} onChange={(v) => setForm({ ...form, modele: v })} required />
              <Num label="Année" value={form.annee} onChange={(v) => setForm({ ...form, annee: v })} />
              <Select
                label="État"
                value={form.etat}
                options={["Neuf", "Occasion"]}
                onChange={(v) => setForm({ ...form, etat: v as Vehicle["etat"] })}
              />
              <Select
                label="Boîte"
                value={form.boite}
                options={["Manuelle", "Automatique"]}
                onChange={(v) => setForm({ ...form, boite: v as Vehicle["boite"] })}
              />
              <Select
                label="Carburant"
                value={form.carburant}
                options={["Essence", "Diesel", "Hybride", "Électrique"]}
                onChange={(v) => setForm({ ...form, carburant: v as Vehicle["carburant"] })}
              />
              <Num label="Kilométrage" value={form.kilometrage} onChange={(v) => setForm({ ...form, kilometrage: v })} />
              <Text
                label="Puissance / cylindrée"
                value={form.puissance}
                onChange={(v) => setForm({ ...form, puissance: v })}
              />
              <Num label="Nombre de portes" value={form.portes} onChange={(v) => setForm({ ...form, portes: v })} />
              <Num label="Nombre de places" value={form.places} onChange={(v) => setForm({ ...form, places: v })} />
              <Text label="Couleur" value={form.couleur} onChange={(v) => setForm({ ...form, couleur: v })} />
              <Num label="Prix (DA)" value={form.prix} onChange={(v) => setForm({ ...form, prix: v })} />
              <Select
                label="Négociable"
                value={form.negociable ? "Oui" : "Non"}
                options={["Oui", "Non"]}
                onChange={(v) => setForm({ ...form, negociable: v === "Oui" })}
              />
              <Select
                label="Origine"
                value={form.origine}
                options={["Importée", "Achat local"]}
                onChange={(v) => setForm({ ...form, origine: v as Vehicle["origine"] })}
              />
              <Select
                label="Main"
                value={form.main}
                options={["Première main", "Deuxième main"]}
                onChange={(v) => setForm({ ...form, main: v as Vehicle["main"] })}
              />
              <Select
                label="Papiers en règle"
                value={form.papiers ? "Oui" : "Non"}
                options={["Oui", "Non"]}
                onChange={(v) => setForm({ ...form, papiers: v === "Oui" })}
              />
              <Select
                label="Statut"
                value={form.statut}
                options={["Disponible", "Réservé", "Vendu"]}
                onChange={(v) => setForm({ ...form, statut: v as Vehicle["statut"] })}
              />
              <Select
                label="Mis en avant"
                value={form.featured ? "Oui" : "Non"}
                options={["Oui", "Non"]}
                onChange={(v) => setForm({ ...form, featured: v === "Oui" })}
              />
            </div>

            <div>
              <p className="mb-1 text-sm text-muted-foreground">Photos (galerie — uploadées sur Cloudinary)</p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => readFiles(e.target.files)}
                className="text-sm"
                disabled={uploadingPhotos}
              />
              {uploadingPhotos && (
                <p className="mt-2 text-sm text-primary animate-pulse">
                  Upload en cours… veuillez patienter.
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {form.photos.map((p, i) => (
                  <div key={i} className="relative">
                    <img src={p} alt={`Photo ${i + 1}`} className="size-20 rounded-lg object-cover" />
                    <button
                      type="button"
                      aria-label="Retirer la photo"
                      onClick={() =>
                        setForm({ ...form, photos: form.photos.filter((_, j) => j !== i) })
                      }
                      className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setForm(null)}
                className="rounded-lg border border-border px-4 py-2 text-sm font-semibold"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
              >
                {saving ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminShell>
  );
}

function Text({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-muted-foreground">{label}</span>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={field}
      />
    </label>
  );
}

function Num({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-muted-foreground">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={field}
      />
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={field}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
