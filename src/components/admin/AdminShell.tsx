import { Link, useNavigate } from "@tanstack/react-router";
import { Car, LayoutDashboard, LogOut, Mail, Menu, Settings } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { logout, useAuth } from "@/lib/auth";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/vehicules", label: "Véhicules", icon: Car, exact: false },
  { to: "/admin/messages", label: "Messages", icon: Mail, exact: false },
  { to: "/admin/parametres", label: "Informations", icon: Settings, exact: false },
] as const;

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const { isAuthenticated, isReady } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isReady && !isAuthenticated) navigate({ to: "/admin/login", replace: true });
  }, [isReady, isAuthenticated, navigate]);

  if (!isReady || !isAuthenticated) {
    return (
      <div className="admin-theme flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Chargement…
      </div>
    );
  }

  const menu = (
    <nav className="space-y-1">
      {nav.map(({ to, label, icon: Icon, exact }) => (
        <Link
          key={to}
          to={to}
          onClick={() => setOpen(false)}
          activeOptions={{ exact }}
          activeProps={{ className: "bg-primary text-primary-foreground" }}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
        >
          <Icon className="size-4" /> {label}
        </Link>
      ))}
      <button
        type="button"
        onClick={() => {
          logout();
          navigate({ to: "/admin/login", replace: true });
        }}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-secondary"
      >
        <LogOut className="size-4" /> Déconnexion
      </button>
    </nav>
  );

  return (
    <div className="admin-theme min-h-screen lg:flex">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-surface p-4 lg:block">
        <p className="mb-6 px-3 font-display text-lg font-bold">Administration</p>
        {menu}
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg border border-border p-2 lg:hidden"
            >
              <Menu className="size-5" />
            </button>
            <h1 className="font-display text-lg font-bold">{title}</h1>
          </div>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            Voir le site
          </Link>
        </header>

        {open && <div className="border-b border-border bg-surface p-4 lg:hidden">{menu}</div>}

        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
