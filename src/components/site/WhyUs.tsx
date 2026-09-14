import { CarFront, FileCheck2, Headphones, ShieldCheck } from "lucide-react";

const items = [
  { icon: CarFront, title: "Large choix de véhicules", text: "Neufs et occasions sélectionnés pour tous les budgets." },
  { icon: ShieldCheck, title: "Véhicules vérifiés et fiables", text: "Chaque voiture est contrôlée avant la mise en vente." },
  { icon: FileCheck2, title: "Papiers en règle", text: "Dossiers complets et transfert de carte grise sans souci." },
  { icon: Headphones, title: "Service client réactif", text: "Une réponse rapide par téléphone ou WhatsApp." },
];

export function WhyUs() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="font-display text-3xl font-bold">Pourquoi nous choisir</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="surface-card p-5">
            <span className="inline-flex size-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
