import { createFileRoute } from "@tanstack/react-router";

import { ContactSection } from "@/components/site/ContactSection";

export const Route = createFileRoute("/_public/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BassimouAuto Seddouk" },
      {
        name: "description",
        content:
          "Contactez BassimouAuto à Seddouk : adresse, plan d'accès, téléphone et WhatsApp pour toute demande de véhicule.",
      },
      { property: "og:title", content: "Contact — BassimouAuto Seddouk" },
      {
        property: "og:description",
        content: "Adresse, plan d'accès, téléphone et WhatsApp de BassimouAuto à Seddouk.",
      },
    ],
  }),
  component: () => (
    <div className="pt-8">
      <ContactSection />
    </div>
  ),
});
