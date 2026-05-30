import { createFileRoute } from "@tanstack/react-router";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { TableShell } from "@/components/admin/AdminBlocks";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { mechanics, maintenances, vehicles } from "@/lib/mock-data";
import { brl, num, sum } from "@/lib/calculations";
import { maintenanceStatusLabel, maintenanceStatusTone, maintenanceTypeLabel } from "@/lib/status-rules";

export const Route = createFileRoute("/admin/mecanicos")({ head: () => ({ meta: [{ title: "Mecânicos — Admin" }] }), component: MechanicsPage });
function MechanicsPage() {
  const active = mechanics.filter((m) => m.status === "ativo").length;
  const open = maintenances.filter((m) => m.status !== "concluida" && m.status !== "cancelada").length;
  const cost = sum(maintenances.map((m) => m.value));
  return <><AdminTopbar title="Mecânicos" subtitle="Responsáveis por manutenção e carga de trabalho" actions={<button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">+ Novo mecânico</button>} /><div className="space-y-4 p-6"><div className="grid gap-3 md:grid-cols-4"><StatCard label="Mecânicos" value={mechanics.length} /><StatCard label="Ativos" value={active} tone="ok" /><StatCard label="Manutenções abertas" value={open} tone="warn" /><StatCard label="Valor executado" value={brl(cost)} /></div><TableShell head={["Mecânico", "Especialidade", "Contato", "Manutenções", "Abertas", "Valor", "Últimas ordens"]}>{mechanics.map((m) => { const list = maintenances.filter((x) => x.mechanicId === m.id); const listOpen = list.filter((x) => x.status !== "concluida" && x.status !== "cancelada"); return <tr key={m.id} className="hover:bg-muted/40"><td className="px-4 py-3 font-semibold">{m.name}<div className="text-xs font-normal text-muted-foreground">{m.status === "ativo" ? "Ativo" : "Inativo"}</div></td><td className="px-4 py-3">{m.specialty}</td><td className="px-4 py-3 text-muted-foreground">{m.phone}</td><td className="px-4 py-3 text-right">{list.length}</td><td className="px-4 py-3 text-right">{listOpen.length}</td><td className="px-4 py-3 text-right">{brl(sum(list.map((x) => x.value)))}</td><td className="px-4 py-3"><div className="space-y-1">{list.slice(0, 2).map((x) => { const v = vehicles.find((a) => a.id === x.vehicleId); return <div key={x.id} className="flex items-center gap-2 text-xs"><StatusBadge tone={maintenanceStatusTone[x.status]}>{maintenanceStatusLabel[x.status]}</StatusBadge><span>{v?.plate} · {maintenanceTypeLabel[x.maintenanceType]}</span></div>; })}</div></td></tr>; })}</TableShell></div></>;
}
