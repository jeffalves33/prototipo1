import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useProfile } from "@/lib/profile";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Truck,
  Users,
  Wrench,
  MapPinned,
  Fuel,
  Receipt,
  Hammer,
  ListChecks,
  AlertTriangle,
  BarChart3,
  LogOut,
} from "lucide-react";

const items: { to: string; label: string; icon: ReactNode }[] = [
  { to: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { to: "/admin/veiculos", label: "Veículos", icon: <Truck className="h-4 w-4" /> },
  { to: "/admin/motoristas", label: "Motoristas", icon: <Users className="h-4 w-4" /> },
  { to: "/admin/mecanicos", label: "Mecânicos", icon: <Wrench className="h-4 w-4" /> },
  { to: "/admin/viagens", label: "Viagens", icon: <MapPinned className="h-4 w-4" /> },
  { to: "/admin/abastecimentos", label: "Abastecimentos", icon: <Fuel className="h-4 w-4" /> },
  { to: "/admin/despesas", label: "Despesas", icon: <Receipt className="h-4 w-4" /> },
  { to: "/admin/manutencoes", label: "Manutenções", icon: <Hammer className="h-4 w-4" /> },
  { to: "/admin/servicos", label: "Serviços", icon: <ListChecks className="h-4 w-4" /> },
  { to: "/admin/pendencias", label: "Pendências", icon: <AlertTriangle className="h-4 w-4" /> },
  { to: "/admin/relatorios", label: "Relatórios", icon: <BarChart3 className="h-4 w-4" /> },
];

export function AdminSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { setProfile } = useProfile();

  const switchProfile = () => {
    setProfile(null);
    void navigate({ to: "/" });
  };

  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="px-5 py-5 border-b border-sidebar-border">
        <div className="text-xs uppercase tracking-widest text-sidebar-foreground/60">Prototipo 1</div>
        <div className="mt-0.5 text-lg font-semibold">Administrador</div>
      </div>
      <nav className="flex-1 overflow-y-auto py-3">
        {items.map((it) => {
          const active = path === it.to || path.startsWith(it.to + "/");
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex items-center gap-3 px-5 py-2 text-sm transition-colors ${
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-primary"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground border-l-2 border-transparent"
              }`}
            >
              {it.icon}
              <span>{it.label}</span>
            </Link>
          );
        })}
      </nav>
      <button
        onClick={switchProfile}
        className="flex items-center gap-2 border-t border-sidebar-border px-5 py-3 text-sm text-sidebar-foreground/80 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/60"
      >
        <LogOut className="h-4 w-4" />
        Trocar perfil
      </button>
    </aside>
  );
}
