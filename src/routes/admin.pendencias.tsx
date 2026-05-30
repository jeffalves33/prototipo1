import { createFileRoute } from "@tanstack/react-router";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ActionDialog } from "@/components/admin/ActionDialog";
import { SectionCard } from "@/components/admin/AdminBlocks";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { pendencies, vehicles, drivers, services } from "@/lib/mock-data";
import { formatDate, num } from "@/lib/calculations";
import { pendencySeverityLabel, pendencySeverityTone, serviceCategoryLabel } from "@/lib/status-rules";
import type { PendencySeverity } from "@/types/fleet";

export const Route = createFileRoute("/admin/pendencias")({ head: () => ({ meta: [{ title: "Pendências — Admin" }] }), component: PendenciesPage });
const groups: { key: PendencySeverity; title: string; desc: string }[] = [
  { key: "critica", title: "Críticas", desc: "Exigem ação imediata" },
  { key: "atencao", title: "Atenção", desc: "Próximas do prazo ou limite" },
  { key: "baixa", title: "Baixa", desc: "Acompanhamento" },
];
function PendenciesPage() {
  const open = pendencies.filter((p) => p.status === "aberta");
  return <><AdminTopbar title="Pendências" subtitle="Fila centralizada de riscos: serviços, documentação, CNH, tacógrafo e manutenções abertas" actions={<ActionDialog triggerLabel="Exportar lista" title="Exportar pendências" description="Configure o arquivo com os itens abertos da fila." submitLabel="Exportar" fields={[{ label: "Severidade", type: "select", options: [{ label: "Todas", value: "all" }, { label: "Críticas", value: "critica" }, { label: "Atenção", value: "atencao" }, { label: "Baixa", value: "baixa" }] }, { label: "Formato", type: "select", options: [{ label: "PDF", value: "pdf" }, { label: "CSV", value: "csv" }, { label: "XLSX", value: "xlsx" }] }, { label: "Incluir", type: "checkboxes", options: [{ label: "Veículo ou motorista vinculado" }, { label: "Serviço relacionado" }, { label: "Prazo e quilometragem" }, { label: "Ação recomendada" }] }]} />} /><div className="space-y-4 p-6"><div className="grid gap-3 md:grid-cols-4"><StatCard label="Abertas" value={open.length} /><StatCard label="Críticas" value={open.filter((p) => p.severity === "critica").length} tone="danger" /><StatCard label="Atenção" value={open.filter((p) => p.severity === "atencao").length} tone="warn" /><StatCard label="Baixa" value={open.filter((p) => p.severity === "baixa").length} tone="ok" /></div>{groups.map((g) => { const list = open.filter((p) => p.severity === g.key); return <SectionCard key={g.key} title={`${g.title} (${list.length})`} subtitle={g.desc}>{list.length === 0 ? <div className="text-sm text-muted-foreground">Nenhuma pendência neste grupo.</div> : <div className="divide-y divide-border">{list.map((p) => { const v = vehicles.find((x) => x.id === p.vehicleId); const d = drivers.find((x) => x.id === p.driverId); const s = services.find((x) => x.id === p.serviceId); const href = v ? `/admin/veiculos/${v.id}` : d ? `/admin/motoristas/${d.id}` : "#"; return <a href={href} key={p.id} className="block py-3 hover:bg-muted/30"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="font-semibold text-foreground">{p.title}</div><p className="mt-0.5 text-sm text-muted-foreground">{p.description}</p><div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">{v && <span>Veículo: <b>{v.plate}</b></span>}{d && <span>Motorista: <b>{d.name}</b></span>}{s && <span>Serviço: <b>{s.name}</b> · {serviceCategoryLabel[s.category]}</span>}{p.dueKm && <span>Limite: {num(p.dueKm)} km</span>}{p.currentKm && <span>Atual: {num(p.currentKm)} km</span>}{p.dueDate && <span>Prazo: {formatDate(p.dueDate)}</span>}</div></div><div className="flex flex-col items-end gap-2"><StatusBadge tone={pendencySeverityTone[p.severity]}>{pendencySeverityLabel[p.severity]}</StatusBadge><span className="rounded-md border border-input px-2 py-1 text-xs text-primary">{p.actionLabel}</span></div></div></a>; })}</div>}</SectionCard>; })}</div></>;
}
