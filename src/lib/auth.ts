import { useSyncExternalStore } from "react";

/** Identifiants administrateur (à modifier ici si besoin). */
export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "bassimou2026";

const KEY = "bassimouauto:session";

let loggedIn = false;
let hydrated = false;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  if (window.localStorage.getItem(KEY) === "ok") {
    loggedIn = true;
    emit();
  }
}

function subscribe(l: () => void) {
  listeners.add(l);
  hydrate();
  return () => listeners.delete(l);
}

export function useAuth() {
  const isAuthenticated = useSyncExternalStore(
    subscribe,
    () => loggedIn,
    () => false,
  );
  const isReady = useSyncExternalStore(
    subscribe,
    () => hydrated,
    () => false,
  );
  return { isAuthenticated, isReady };
}

export function login(username: string, password: string) {
  if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    loggedIn = true;
    window.localStorage.setItem(KEY, "ok");
    emit();
    return true;
  }
  return false;
}

export function logout() {
  loggedIn = false;
  window.localStorage.removeItem(KEY);
  emit();
}
