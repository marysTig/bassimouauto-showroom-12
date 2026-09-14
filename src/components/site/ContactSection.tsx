import { MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

import { actions, telHref, useDealer, whatsappHref } from "@/lib/store";

export function mapsEmbedSrc(url: string) {
  if (!url) return "https://www.google.com/maps?q=Seddouk&output=embed";
  if (url.includes("output=embed") || url.includes("/maps/embed")) return url;
  return `https://www.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
}

export function ContactSection() {
  const dealer = useDealer();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nom: "", telephone: "", vehicule: "", message: "" });

  const field =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    actions.addMessage(form);
    const texte = `Bonjour, je suis ${form.nom} (${form.telephone}).\nVéhicule recherché : ${form.vehicule}\n${form.message}`;
    setSent(true);
    window.open(whatsappHref(dealer.telephone, texte), "_blank");
    setForm({ nom: "", telephone: "", vehicule: "", message: "" });
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="font-display text-3xl font-bold">Nous contacter</h2>
      <p className="mt-2 text-muted-foreground">
        Passez nous voir au showroom ou écrivez-nous, nous répondons rapidement.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="surface-card space-y-3 p-5 text-sm">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 text-primary" />
              {dealer.adresse}
            </p>
            <a
              href={telHref(dealer.telephone)}
              className="flex items-center gap-2 font-semibold hover:text-primary"
            >
              <Phone className="size-4 text-primary" />
              {dealer.telephone}
            </a>
            <a
              href={whatsappHref(dealer.telephone, "Bonjour, je souhaite avoir des informations.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-whatsapp px-4 py-2 text-sm font-semibold text-whatsapp-foreground"
            >
              <MessageCircle className="size-4" /> Écrire sur WhatsApp
            </a>
          </div>

          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              title="Localisation du showroom"
              src={mapsEmbedSrc(dealer.maps)}
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="surface-card space-y-4 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block text-muted-foreground">Nom</span>
              <input
                required
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                className={field}
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted-foreground">Téléphone</span>
              <input
                required
                value={form.telephone}
                onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                className={field}
              />
            </label>
          </div>
          <label className="block text-sm">
            <span className="mb-1 block text-muted-foreground">Véhicule recherché</span>
            <input
              value={form.vehicule}
              onChange={(e) => setForm({ ...form, vehicule: e.target.value })}
              className={field}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-muted-foreground">Message</span>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={field}
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]"
          >
            Envoyer via WhatsApp
          </button>
          {sent && (
            <p className="text-sm text-success">
              Message enregistré et ouvert dans WhatsApp. Merci !
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
