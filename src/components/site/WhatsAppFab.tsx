import { MessageCircle } from "lucide-react";

import { useDealer, whatsappHref } from "@/lib/store";

export function WhatsAppFab() {
  const dealer = useDealer();

  return (
    <a
      href={whatsappHref(dealer.telephone, "Bonjour, je souhaite avoir des informations sur vos véhicules.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-card transition-transform hover:scale-110"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
