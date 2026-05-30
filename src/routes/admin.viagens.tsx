import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { FilterBar, TableShell } from "@/components/admin/AdminBlocks";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { trips, drivers, vehicles, expenses, refuels } from "@/lib/mock-data";
import { brl, formatDateTime, num, sum } from "@/lib/calculations";
import { tripStatusLabel, tripStatusTone } from "@/lib/status-rules";
import type { TripStatus } from "@/types/fleet";

export const Route = createFileRoute("/admin/viagens")({
  head: () => ({ meta: [{ title: "Viagens — Admin" }] }),
  component: TripsPage,
});

function TripsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<TripStatus | "all">("all");
  const [driverId, setDriverId] = useState("all");
  const [vehicleId, setVehicleId] = useState("all");

  const filtered = useMemo(() => trips.filter((t) => {
    const d = drivers.find((x) => x.id === t.driverId);
    const v = vehicles.find((x) => x.id === t.vehicleId);
    const text = `${t.origin} ${t.destination} ${d?.name ?? ""} ${v?.plate ?? ""}`.toLowerCase();
    return text.includes(q.toLowerCase()) && (status === "all" || t.status === status) && (driverId === "all" || t.driverId === driverId) && (vehicleId === "all" || t.vehicleId === vehicleId);
  }), [q, status, driverId, vehicleId]);

  const inProgress = trips.filter((t) => t.status === "em_andamento").length;
  const km = sum(trips.map((t) => t.totalKm ?? 0));
  const liters = sum(refuels.map((r) => r.liters));
  const expenseTotal = sum(expenses.map((e) => e.value));

  return <>
    <AdminTopbar title="Viagens" subtitle="Rotas, veículos, motoristas e registros operacionais por viagem" actions={<button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">+ Nova viagem</button>} />
    <div className="space-y-4 p-6">
      <div className="grid gap-3 md:grid-cols-4"><StatCard label="Viagens" value={trips.length} /><StatCard label="Em andamento" value={inProgress} tone="warn" /><StatCard label="KM rodados" value={num(km)} /><StatCard label="Despesas" value={brl(expenseTotal)} /></div>
      <FilterBar>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar rota, placa ou motorista..." className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <select value={status} onChange={(e) => setStatus(e.target.value as TripStatus | "all")} className="rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="all">Todos os status</option>{Object.entries(tripStatusLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        <select value={driverId} onChange={(e) => setDriverId(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="all">Todos os motoristas</option>{drivers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select>
        <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="all">Todos os veículos</option>{vehicles.map((v) => <option key={v.id} value={v.id}>{v.plate} · {v.model}</option>)}</select>
      </FilterBar>
      <TableShell head={["Início", "Rota", "Motorista", "Veículo", "KM", "Abast.", "Desp.", "Status", ""]}>
        {filtered.map((t) => { const d = drivers.find((x) => x.id === t.driverId); const v = vehicles.find((x) => x.id === t.vehicleId); const tr = refuels.filter((r) => r.tripId === t.id); const te = expenses.filter((e) => e.tripId === t.id); return <tr key={t.id} className="hover:bg-muted/40"><td className="px-4 py-3">{formatDateTime(t.startedAt)}</td><td className="px-4 py-3 font-medium">{t.origin} → {t.destination}{t.temporaryVehicleAssignment && <div className="text-xs text-info">Veículo temporário autorizado pelo admin</div>}</td><td className="px-4 py-3">{d?.name ?? "—"}</td><td className="px-4 py-3">{v?.plate ?? "—"}</td><td className="px-4 py-3 text-right">{t.totalKm != null ? num(t.totalKm) : "—"}</td><td className="px-4 py-3 text-right">{num(sum(tr.map((r) => r.liters)))} L</td><td className="px-4 py-3 text-right">{brl(sum(te.map((e) => e.value)))}</td><td className="px-4 py-3"><StatusBadge tone={tripStatusTone[t.status]}>{tripStatusLabel[t.status]}</StatusBadge></td><td className="px-4 py-3 text-right"><Link to="/admin/viagens/$id" params={{ id: t.id }} className="font-medium text-primary hover:underline">Detalhes →</Link></td></tr>; })}
      </TableShell>
    </div>
  </>;
}
