import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { DetailRow, SectionCard, TableShell } from "@/components/admin/AdminBlocks";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { trips, drivers, vehicles, refuels, expenses } from "@/lib/mock-data";
import { brl, formatDateTime, num, sum } from "@/lib/calculations";
import { expenseTypeLabel, fuelTypeLabel, tripStatusLabel, tripStatusTone, vehicleStatusLabel, vehicleStatusTone } from "@/lib/status-rules";

export const Route = createFileRoute("/admin/viagens/$id")({
  head: ({ params }) => ({ meta: [{ title: `${trips.find((t) => t.id === params.id)?.origin ?? "Viagem"} — Admin` }] }),
  component: TripDetail,
});

function TripDetail() {
  const { id } = Route.useParams();
  const t = trips.find((x) => x.id === id);
  if (!t) throw notFound();
  const d = drivers.find((x) => x.id === t.driverId);
  const v = vehicles.find((x) => x.id === t.vehicleId);
  const tr = refuels.filter((r) => r.tripId === t.id);
  const te = expenses.filter((e) => e.tripId === t.id);
  const liters = sum(tr.map((r) => r.liters));
  const fuelCost = sum(tr.map((r) => r.totalValue));
  const expenseTotal = sum(te.map((e) => e.value));
  const km = t.totalKm ?? 0;
  const avg = liters > 0 && km > 0 ? km / liters : null;

  return <>
    <AdminTopbar title={`${t.origin} → ${t.destination}`} subtitle="Detalhe da rota, veículo utilizado, paradas e despesas" actions={<><a href="/admin/viagens" className="rounded-md border border-input bg-card px-3 py-2 text-sm">← Voltar</a><button className="rounded-md border border-input bg-card px-3 py-2 text-sm">Editar viagem</button></>} />
    <div className="space-y-4 p-6">
      <div className="grid gap-3 md:grid-cols-4"><StatCard label="KM total" value={t.totalKm != null ? num(t.totalKm) : "Em aberto"} /><StatCard label="Litros" value={`${num(liters)} L`} /><StatCard label="Consumo médio" value={avg ? `${avg.toFixed(2)} km/L` : "—"} /><StatCard label="Custo operacional" value={brl(fuelCost + expenseTotal)} tone="warn" /></div>
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Dados da viagem"><DetailRow label="Status" value={<StatusBadge tone={tripStatusTone[t.status]}>{tripStatusLabel[t.status]}</StatusBadge>} /><DetailRow label="Início" value={formatDateTime(t.startedAt)} /><DetailRow label="Fim" value={formatDateTime(t.finishedAt)} /><DetailRow label="KM inicial" value={num(t.initialKm)} /><DetailRow label="KM final" value={t.finalKm ? num(t.finalKm) : "—"} /><DetailRow label="Observações" value={t.notes || "—"} /></SectionCard>
        <SectionCard title="Responsáveis e ativo"><DetailRow label="Motorista" value={<a href={`/admin/motoristas/${d?.id}`} className="text-primary hover:underline">{d?.name ?? "—"}</a>} /><DetailRow label="Veículo" value={<a href={`/admin/veiculos/${v?.id}`} className="text-primary hover:underline">{v?.plate} · {v?.brand} {v?.model}</a>} /><DetailRow label="Status do veículo" value={v ? <StatusBadge tone={vehicleStatusTone[v.status]}>{vehicleStatusLabel[v.status]}</StatusBadge> : "—"} /><DetailRow label="Veículo temporário" value={t.temporaryVehicleAssignment ? "Sim, autorizado pelo admin" : "Não"} /></SectionCard>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Abastecimentos da viagem" subtitle="Motorista registra KM e litros; admin visualiza valores"><TableShell head={["Data", "KM", "Comb.", "Litros", "Valor"]}>{tr.map((r) => <tr key={r.id}><td className="px-4 py-3">{formatDateTime(r.date)}</td><td className="px-4 py-3 text-right">{num(r.currentKm)}</td><td className="px-4 py-3">{fuelTypeLabel[r.fuelType]}</td><td className="px-4 py-3 text-right">{num(r.liters)} L</td><td className="px-4 py-3 text-right">{brl(r.totalValue)}</td></tr>)}</TableShell></SectionCard>
        <SectionCard title="Despesas da viagem"><TableShell head={["Data", "Tipo", "Valor", "Obs."]}>{te.map((e) => <tr key={e.id}><td className="px-4 py-3">{formatDateTime(e.date)}</td><td className="px-4 py-3">{expenseTypeLabel[e.type]}</td><td className="px-4 py-3 text-right">{brl(e.value)}</td><td className="px-4 py-3 text-muted-foreground">{e.notes || "—"}</td></tr>)}</TableShell></SectionCard>
      </div>
    </div>
  </>;
}
