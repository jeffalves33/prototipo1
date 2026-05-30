import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useProfile } from "@/lib/profile";
import { Hammer, AlertTriangle, Truck, ListChecks, LogOut } from "lucide-react";

export const Route = createFileRoute("/mechanic")({
  component: MechanicLayout,
});

const tabs = [
  { to: "/mechanic", label: "Manutenções", icon: Hammer, exact: true },
  { to: "/mechanic/pendencias", label: "Pendências", icon: AlertTriangle },
  { to: "/mechanic/veiculos", label: "Veículos", icon: Truck },
  { to: "/mechanic/servicos", label: "Serviços", icon: ListChecks },
] as const;

function MechanicLayout() {
  const { setProfile } = useProfile();
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen flex-col bg-background pb-16">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-primary">Frota</div>
          <div className="text-base font-semibold text-foreground">Mecânico</div>
        </div>
        <button
          onClick={() => setProfile(null)}
          className="flex items-center gap-1 rounded-md border border-input px-2 py-1 text-xs text-muted-foreground hover:bg-accent"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sair
        </button>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-border bg-card">
        {tabs.map((t) => {
          const active = "exact" in t && t.exact ? path === t.to : path.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
