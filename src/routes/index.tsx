import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useProfile } from "@/lib/profile";
import type { Profile } from "@/types/fleet";
import { Truck, UserCog, Wrench } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prototipo 1" },
      { name: "description", content: "Prototipo 1" },
    ],
  }),
  component: ProfileSelector,
});

const options: { id: Profile; title: string; desc: string; route: string; icon: React.ReactNode; tag: string }[] = [
  {
    id: "admin",
    title: "Administrador",
    desc: "Gestão completa em desktop: dashboard, veículos, motoristas, manutenções, relatórios.",
    route: "/admin/dashboard",
    icon: <UserCog className="h-7 w-7" />,
    tag: "Desktop",
  },
  {
    id: "driver",
    title: "Motorista",
    desc: "Tela operacional simples: iniciar viagem, registrar abastecimento e despesas.",
    route: "/driver",
    icon: <Truck className="h-7 w-7" />,
    tag: "Mobile / PWA",
  },
  {
    id: "mechanic",
    title: "Mecânico",
    desc: "Registro rápido de manutenções, pendências e visualização de veículos.",
    route: "/mechanic",
    icon: <Wrench className="h-7 w-7" />,
    tag: "Mobile / PWA",
  },
];

function ProfileSelector() {
  const navigate = useNavigate();
  const { profile, setProfile } = useProfile();

  useEffect(() => {
    if (profile === "admin") void navigate({ to: "/admin/dashboard" });
    else if (profile === "driver") void navigate({ to: "/driver" });
    else if (profile === "mechanic") void navigate({ to: "/mechanic" });
  }, [profile, navigate]);

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Prototipo 1</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Selecione o perfil de acesso
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Protótipo funcional — cada perfil tem fluxos próprios. Sem autenticação real.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {options.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                setProfile(o.id);
                void navigate({ to: o.route });
              }}
              className="group flex flex-col items-start rounded-xl border border-border bg-card p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {o.icon}
                </div>
                <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {o.tag}
                </span>
              </div>
              <h2 className="mt-4 text-lg font-semibold text-foreground">{o.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{o.desc}</p>
              <span className="mt-4 text-sm font-medium text-primary group-hover:underline">
                Entrar →
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
