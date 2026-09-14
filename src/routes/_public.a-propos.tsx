import { createFileRoute } from "@tanstack/react-router";

import { WhyUs } from "@/components/site/WhyUs";
import { useDealer } from "@/lib/store";

export const Route = createFileRoute("/_public/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — BassimouAuto Seddouk" },
      {
        name: "description",
        content:
          "Découvrez BassimouAuto, concessionnaire automobile à Seddouk : vente de véhicules neufs et d'occasion, accompagnement et transparence.",
      },
      { property: "og:title", content: "À propos — BassimouAuto Seddouk" },
      {
        property: "og:description",
        content: "Concessionnaire automobile de confiance à Seddouk, véhicules vérifiés et papiers en règle.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const dealer = useDealer();

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-4xl font-bold">À propos de {dealer.nom}</h1>
        <div className="mt-6 space-y-4 text-muted-foreground">
          <p>
            {dealer.nom} est un concessionnaire automobile installé à Seddouk. Nous
            proposons des véhicules neufs et d&apos;occasion sélectionnés avec soin, à des
            prix clairs et négociables selon les modèles.
          </p>
          <p>
            Notre priorité : la transparence. Chaque véhicule est contrôlé, son historique
            est présenté honnêtement et les papiers sont en règle avant la vente.
          </p>
          <p>
            Notre équipe vous accompagne du choix du véhicule jusqu&apos;aux démarches
            administratives. Passez au showroom à l&apos;adresse {dealer.adresse} ou
            contactez-nous au {dealer.telephone}.
          </p>
        </div>
      </section>
      <WhyUs />
    </>
  );
}
