import { useEffect, useState } from "react";
import { toast } from "sonner";

import { supabase } from "./supabase";

export type Etat = "Neuf" | "Occasion";
export type Boite = "Manuelle" | "Automatique";
export type Carburant = "Essence" | "Diesel" | "Hybride" | "Électrique";
export type Statut = "Disponible" | "Réservé" | "Vendu";
export type Origine = "Importée" | "Achat local";
export type Main = "Première main" | "Deuxième main";

export interface Vehicle {
  id: string;
  marque: string;
  modele: string;
  annee: number;
  etat: Etat;
  boite: Boite;
  carburant: Carburant;
  kilometrage: number;
  puissance: string;
  portes: number;
  places: number;
  couleur: string;
  prix: number;
  negociable: boolean;
  origine: Origine;
  main: Main;
  papiers: boolean;
  statut: Statut;
  featured: boolean;
  photos: string[];
  createdAt: number;
}

export interface Message {
  id: string;
  nom: string;
  telephone: string;
  vehicule: string;
  message: string;
  traite: boolean;
  createdAt: number;
}

export interface Dealer {
  nom: string;
  adresse: string;
  telephone: string;
  maps: string;
}

export const defaultDealer: Dealer = {
  nom: "BassimouAuto",
  adresse: "N74, Seddouk 06011, Algérie",
  telephone: "07 77 41 46 54",
  maps: "https://www.google.com/maps?q=GMWP%2BCV+Seddouk&output=embed",
};

type SupabaseVehicleRow = {
  id: string;
  marque: string;
  modele: string;
  annee: number;
  etat: string;
  boite: string;
  carburant: string;
  kilometrage: number;
  puissance: string;
  portes: number;
  places: number;
  couleur: string;
  prix: number;
  negociable: boolean;
  origine: string;
  main: string;
  papiers: boolean;
  statut: string;
  featured: boolean;
  photos: string[];
  created_at: string;
};

type SupabaseMessageRow = {
  id: string;
  nom: string;
  telephone: string;
  vehicule: string;
  message: string;
  traite: boolean;
  created_at: string;
};

function mapVehicle(row: SupabaseVehicleRow): Vehicle {
  return {
    id: row.id,
    marque: row.marque,
    modele: row.modele,
    annee: row.annee,
    etat: row.etat as Etat,
    boite: row.boite as Boite,
    carburant: row.carburant as Carburant,
    kilometrage: row.kilometrage,
    puissance: row.puissance ?? "",
    portes: row.portes,
    places: row.places,
    couleur: row.couleur ?? "",
    prix: row.prix,
    negociable: row.negociable,
    origine: row.origine as Origine,
    main: row.main as Main,
    papiers: row.papiers,
    statut: row.statut as Statut,
    featured: row.featured,
    photos: row.photos ?? [],
    createdAt: new Date(row.created_at).getTime(),
  };
}

function mapMessage(row: SupabaseMessageRow): Message {
  return {
    id: row.id,
    nom: row.nom,
    telephone: row.telephone,
    vehicule: row.vehicule ?? "",
    message: row.message ?? "",
    traite: row.traite,
    createdAt: new Date(row.created_at).getTime(),
  };
}

// ---- HOOKS ----

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchVehicles = () => {
      supabase
        .from("vehicles")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data, error }) => {
          if (error) {
            console.error(error);
            toast.error("Erreur lors du chargement des véhicules.");
          }
          if (mounted && data) setVehicles((data as SupabaseVehicleRow[]).map(mapVehicle));
          if (mounted) setLoading(false);
        });
    };

    fetchVehicles();

    const channel = supabase
      .channel("vehicles-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "vehicles" }, fetchVehicles)
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { vehicles, loading };
}

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchMessages = () => {
      supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data, error }) => {
          if (error) {
            console.error(error);
            toast.error("Erreur lors du chargement des messages.");
          }
          if (mounted && data) setMessages((data as SupabaseMessageRow[]).map(mapMessage));
          if (mounted) setLoading(false);
        });
    };

    fetchMessages();

    const channel = supabase
      .channel("messages-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, fetchMessages)
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return { messages, loading };
}

export function useDealer(): Dealer {
  const [dealer, setDealer] = useState<Dealer>(defaultDealer);

  useEffect(() => {
    supabase
      .from("dealer")
      .select("*")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) {
          setDealer({
            nom: data.nom as string,
            adresse: data.adresse as string,
            telephone: data.telephone as string,
            maps: data.maps as string,
          });
        }
      });
  }, []);

  return dealer;
}

// Compatibilité pour pages utilisant useStore
export function useStore() {
  const { vehicles, loading: vehiclesLoading } = useVehicles();
  const dealer = useDealer();
  return { vehicles, messages: [] as Message[], dealer, loading: vehiclesLoading };
}

// ---- ACTIONS ----

export const actions = {
  async saveVehicle(vehicle: Omit<Vehicle, "id" | "createdAt"> & { id?: string }) {
    const row = {
      marque: vehicle.marque,
      modele: vehicle.modele,
      annee: vehicle.annee,
      etat: vehicle.etat,
      boite: vehicle.boite,
      carburant: vehicle.carburant,
      kilometrage: vehicle.kilometrage,
      puissance: vehicle.puissance,
      portes: vehicle.portes,
      places: vehicle.places,
      couleur: vehicle.couleur,
      prix: vehicle.prix,
      negociable: vehicle.negociable,
      origine: vehicle.origine,
      main: vehicle.main,
      papiers: vehicle.papiers,
      statut: vehicle.statut,
      featured: vehicle.featured,
      photos: vehicle.photos,
    };

    if (vehicle.id) {
      const { error } = await supabase.from("vehicles").update(row).eq("id", vehicle.id);
      if (error) {
        toast.error("Erreur lors de la modification.");
        throw error;
      }
    } else {
      const { error } = await supabase.from("vehicles").insert(row);
      if (error) {
        toast.error("Erreur lors de l'\''ajout.");
        throw error;
      }
    }
  },

  async deleteVehicle(id: string) {
    const { error } = await supabase.from("vehicles").delete().eq("id", id);
    if (error) {
      toast.error("Erreur lors de la suppression.");
      throw error;
    }
  },

  async addMessage(msg: Omit<Message, "id" | "createdAt" | "traite">) {
    const { error } = await supabase.from("messages").insert({
      nom: msg.nom,
      telephone: msg.telephone,
      vehicule: msg.vehicule,
      message: msg.message,
      traite: false,
    });
    if (error) {
      toast.error("Erreur lors de l'\''enregistrement du message.");
      throw error;
    }
  },

  async toggleMessage(id: string, currentTraite: boolean) {
    const { error } = await supabase
      .from("messages")
      .update({ traite: !currentTraite })
      .eq("id", id);
    if (error) {
      toast.error("Erreur lors de la mise à jour du message.");
      throw error;
    }
  },

  async deleteMessage(id: string) {
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) {
      toast.error("Erreur lors de la suppression du message.");
      throw error;
    }
  },

  async saveDealer(dealer: Dealer) {
    const { error } = await supabase.from("dealer").update(dealer).eq("id", 1);
    if (error) {
      toast.error("Erreur lors de la sauvegarde des paramètres.");
      throw error;
    }
  },
};

// ---- UTILITAIRES ----

export function formatPrice(value: number) {
  return `${new Intl.NumberFormat("fr-DZ").format(value)} DA`;
}

export function formatKm(value: number) {
  return `${new Intl.NumberFormat("fr-DZ").format(value)} km`;
}

export function formatDate(ts: number) {
  return new Date(ts).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function whatsappHref(phone: string, text?: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `213${digits.slice(1)}`;
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
