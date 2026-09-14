import { Outlet, createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
