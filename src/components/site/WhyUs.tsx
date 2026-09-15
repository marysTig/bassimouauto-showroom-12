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
      <h2 className="font-display text-2xl sm:text-3xl font-bold">Pourquoi nous choisir</h2>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="surface-card p-3 sm:p-5">
            <span className="inline-flex size-9 sm:size-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Icon className="size-4 sm:size-5" />
            </span>
            <h3 className="mt-3 sm:mt-4 font-display text-xs sm:text-base font-semibold leading-tight">{title}</h3>
            <p className="mt-1 text-[10px] sm:text-sm text-muted-foreground leading-snug">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
