import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { login, useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Connexion administrateur — BassimouAuto" },
      { name: "description", content: "Espace d'administration du site BassimouAuto." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Connexion administrateur — BassimouAuto" },
      { property: "og:description", content: "Espace réservé à la gestion du showroom." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate({ to: "/admin", replace: true });
  }, [isAuthenticated, navigate]);

  const field =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <div className="admin-theme flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (login(username, password)) navigate({ to: "/admin", replace: true });
          else setError(true);
        }}
        className="surface-card w-full max-w-sm space-y-4 p-6"
      >
        <h1 className="font-display text-xl font-bold">Connexion administrateur</h1>
        <label className="block text-sm">
          <span className="mb-1 block text-muted-foreground">Identifiant</span>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className={field} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-muted-foreground">Mot de passe</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={field}
          />
        </label>
        {error && <p className="text-sm text-destructive">Identifiants incorrects.</p>}
        <button
          type="submit"
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
