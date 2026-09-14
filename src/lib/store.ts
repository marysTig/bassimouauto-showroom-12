import { useSyncExternalStore } from "react";

import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";

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

export interface StoreState {
  vehicles: Vehicle[];
  messages: Message[];
  dealer: Dealer;
}

export const defaultDealer: Dealer = {
  nom: "BassimouAuto",
  adresse: "N74, Seddouk 06011, Algérie",
  telephone: "0550 68 69 39",
  maps: "https://www.google.com/maps?q=GMWP%2BCV+Seddouk&output=embed",
};

const seedVehicles: Vehicle[] = [
  {
    id: "v1",
    marque: "Volkswagen",
    modele: "Polo",
    annee: 2022,
    etat: "Occasion",
    boite: "Manuelle",
    carburant: "Essence",
    kilometrage: 38000,
    puissance: "6 CV / 1000 cm³",
    portes: 5,
    places: 5,
    couleur: "Blanc",
    prix: 3200000,
    negociable: true,
    origine: "Importée",
    main: "Première main",
    papiers: true,
    statut: "Disponible",
    featured: true,
    photos: [car1],
    createdAt: Date.now() - 100000,
  },
  {
    id: "v2",
    marque: "Hyundai",
    modele: "Tucson",
    annee: 2023,
    etat: "Neuf",
    boite: "Automatique",
    carburant: "Diesel",
    kilometrage: 0,
    puissance: "9 CV / 1600 cm³",
    portes: 5,
    places: 5,
    couleur: "Gris argent",
    prix: 7450000,
    negociable: false,
    origine: "Achat local",
    main: "Première main",
    papiers: true,
    statut: "Disponible",
    featured: true,
    photos: [car2],
    createdAt: Date.now() - 90000,
  },
  {
    id: "v3",
    marque: "Mercedes",
    modele: "Classe C",
    annee: 2019,
    etat: "Occasion",
    boite: "Automatique",
    carburant: "Diesel",
    kilometrage: 92000,
    puissance: "11 CV / 2000 cm³",
    portes: 4,
    places: 5,
    couleur: "Bleu nuit",
    prix: 9800000,
    negociable: true,
    origine: "Importée",
    main: "Deuxième main",
    papiers: true,
    statut: "Réservé",
    featured: true,
    photos: [car3],
    createdAt: Date.now() - 80000,
  },
  {
    id: "v4",
    marque: "Toyota",
    modele: "Yaris",
    annee: 2018,
    etat: "Occasion",
    boite: "Manuelle",
    carburant: "Essence",
    kilometrage: 121000,
    puissance: "5 CV / 1300 cm³",
    portes: 5,
    places: 5,
    couleur: "Rouge",
    prix: 2450000,
    negociable: true,
    origine: "Achat local",
    main: "Deuxième main",
    papiers: true,
    statut: "Vendu",
    featured: true,
    photos: [car4],
    createdAt: Date.now() - 70000,
  },
];

const STORAGE_KEY = "bassimouauto:data:v1";

let state: StoreState = {
  vehicles: seedVehicles,
  messages: [],
  dealer: defaultDealer,
};

let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota */
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StoreState>;
      state = {
        vehicles: parsed.vehicles ?? state.vehicles,
        messages: parsed.messages ?? state.messages,
        dealer: { ...defaultDealer, ...(parsed.dealer ?? {}) },
      };
      emit();
    } else {
      persist();
    }
  } catch {
    /* ignore */
  }
}

function setState(next: Partial<StoreState>) {
  state = { ...state, ...next };
  persist();
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  hydrate();
  return () => listeners.delete(listener);
}

const getSnapshot = () => state;

export function useStore(): StoreState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function useDealer(): Dealer {
  return useStore().dealer;
}

const uid = () => Math.random().toString(36).slice(2, 10);

export const actions = {
  saveVehicle(vehicle: Omit<Vehicle, "id" | "createdAt"> & { id?: string }) {
    const existing = vehicle.id ? state.vehicles.find((v) => v.id === vehicle.id) : undefined;
    if (existing) {
      setState({
        vehicles: state.vehicles.map((v) =>
          v.id === existing.id ? ({ ...v, ...vehicle } as Vehicle) : v,
        ),
      });
      return existing.id;
    }
    const id = uid();
    setState({
      vehicles: [{ ...(vehicle as Vehicle), id, createdAt: Date.now() }, ...state.vehicles],
    });
    return id;
  },
  deleteVehicle(id: string) {
    setState({ vehicles: state.vehicles.filter((v) => v.id !== id) });
  },
  addMessage(msg: Omit<Message, "id" | "createdAt" | "traite">) {
    setState({
      messages: [
        { ...msg, id: uid(), createdAt: Date.now(), traite: false },
        ...state.messages,
      ],
    });
  },
  toggleMessage(id: string) {
    setState({
      messages: state.messages.map((m) => (m.id === id ? { ...m, traite: !m.traite } : m)),
    });
  },
  deleteMessage(id: string) {
    setState({ messages: state.messages.filter((m) => m.id !== id) });
  },
  saveDealer(dealer: Dealer) {
    setState({ dealer });
  },
};

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
