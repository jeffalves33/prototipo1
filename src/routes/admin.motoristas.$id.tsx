import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ActionDialog } from "@/components/admin/ActionDialog";
import { DetailRow, SectionCard, TableShell } from "@/components/admin/AdminBlocks";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { drivers, vehicles, trips, refuels, expenses } from "@/lib/mock-data";
import { brl, formatDate, formatDateTime, num, sum } from "@/lib/calculations";
import { driverStatusLabel, driverStatusTone, licenseStatusLabel, licenseStatusTone, tripStatusLabel, tripStatusTone, fuelTypeLabel, expenseTypeLabel, vehicleStatusLabel, vehicleStatusTone } from "@/lib/status-rules";

export const Route = createFileRoute("/admin/motoristas/$id")({
  head: ({ params }) => ({ meta: [{ title: `${drivers.find((d) => d.id === params.id)?.name ?? "Motorista"} — Admin` }] }),
  component: DriverDetail,
});

const tabs = ["Resumo", "Viagens", "Abastecimentos", "Despesas", "Vínculo"] as const;
type Tab = (typeof tabs)[number];

function DriverDetail() {
  const { id } = Route.useParams();
  const d = drivers.find((x) => x.id === id);
  if (!d) throw notFound();
  const [tab, setTab] = useState<Tab>("Resumo");
  const vehicle = vehicles.find((v) => v.id === d.mainVehicleId) ?? null;
  const dTrips = trips.filter((t) => t.driverId === d.id);
  const dRefuels = refuels.filter((r) => r.driverId === d.id);
  const dExpenses = expenses.filter((e) => e.driverId === d.id);
  const km = sum(dTrips.map((t) => t.totalKm ?? 0));
  const liters = sum(dRefuels.map((r) => r.liters));
  const avg = liters > 0 ? km / liters : 0;

  return (
    <>
      <AdminTopbar
        title={d.name}
        subtitle="Detalhe do motorista, veículo vinculado e histórico operacional"
        actions={<><a href="/admin/motoristas" className="rounded-md border border-input bg-card px-3 py-2 text-sm">← Voltar</a><ActionDialog triggerLabel="Editar cadastro" title="Editar motorista" description="Atualize dados cadastrais, CNH e status do motorista." submitLabel="Salvar cadastro" triggerClassName="rounded-md border border-input bg-card px-3 py-2 text-sm hover:bg-accent" fields={[{ label: "Nome", value: d.name }, { label: "Telefone", value: d.phone }, { label: "CPF", value: d.cpf }, { label: "Endereço", value: d.address }, { label: "Número da CNH", value: d.licenseNumber }, { label: "Validade CNH", type: "date", value: d.licenseDueDate }, { label: "Status", type: "select", value: d.status, options: Object.entries(driverStatusLabel).map(([value, label]) => ({ label, value })) }]} /><ActionDialog triggerLabel="Trocar veículo principal" title="Trocar veículo principal" description="Defina o veículo padrão usado pelo motorista." submitLabel="Salvar vínculo" fields={[{ label: "Motorista", type: "summary", value: d.name }, { label: "Veículo atual", type: "summary", value: vehicle ? `${vehicle.plate} · ${vehicle.brand} ${vehicle.model}` : "Sem veículo" }, { label: "Novo veículo", type: "select", value: vehicle?.id ?? "none", options: [{ label: "Sem veículo", value: "none" }, ...vehicles.map((v) => ({ label: `${v.plate} · ${v.model}`, value: v.id }))] }, { label: "Motivo", type: "textarea", wide: true }]} /></>}
      />
      <div className="space-y-4 p-6">
        <div className="grid gap-3 md:grid-cols-4">
          <StatCard label="KM rodados" value={num(km)} />
          <StatCard label="Litros registrados" value={num(liters)} />
          <StatCard label="Consumo médio" value={`${avg.toFixed(2)} km/L`} />
          <StatCard label="Despesas" value={brl(sum(dExpenses.map((e) => e.value)))} tone="warn" />
        </div>
        <div className="flex flex-wrap gap-1 rounded-lg border border-border bg-card p-1">
          {tabs.map((x) => <button key={x} onClick={() => setTab(x)} className={`rounded-md px-3 py-1.5 text-sm font-medium ${tab === x ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>{x}</button>)}
        </div>

        {tab === "Resumo" && <div className="grid gap-4 lg:grid-cols-2">
          <SectionCard title="Dados cadastrais">
            <DetailRow label="Nome" value={d.name} />
            <DetailRow label="Telefone" value={d.phone} />
            <DetailRow label="Endereço" value={d.address} />
            <DetailRow label="CPF" value={d.cpf} />
            <DetailRow label="CNH" value={d.licenseNumber} />
            <DetailRow label="Validade CNH" value={formatDate(d.licenseDueDate)} />
            <DetailRow label="Status CNH" value={<StatusBadge tone={licenseStatusTone[d.licenseStatus]}>{licenseStatusLabel[d.licenseStatus]}</StatusBadge>} />
            <DetailRow label="Status cadastro" value={<StatusBadge tone={driverStatusTone[d.status]}>{driverStatusLabel[d.status]}</StatusBadge>} />
          </SectionCard>
          <SectionCard title="Veículo principal">
            {vehicle ? <>
              <DetailRow label="Placa" value={vehicle.plate} />
              <DetailRow label="Modelo" value={`${vehicle.brand} ${vehicle.model}`} />
              <DetailRow label="KM atual" value={num(vehicle.currentKm)} />
              <DetailRow label="Status" value={<StatusBadge tone={vehicleStatusTone[vehicle.status]}>{vehicleStatusLabel[vehicle.status]}</StatusBadge>} />
              <DetailRow label="Observação" value="Admin pode trocar o veículo principal ou atribuir veículo temporário em uma viagem." />
            </> : <div className="text-sm text-muted-foreground">Sem veículo principal atribuído.</div>}
          </SectionCard>
        </div>}

        {tab === "Viagens" && <TableShell head={["Data", "Rota", "Veículo", "KM", "Status", ""]}>{dTrips.map((t) => {
          const v = vehicles.find((x) => x.id === t.vehicleId);
          return <tr key={t.id} className="hover:bg-muted/40"><td className="px-4 py-3">{formatDateTime(t.startedAt)}</td><td className="px-4 py-3 font-medium">{t.origin} → {t.destination}</td><td className="px-4 py-3">{v?.plate ?? "—"}{t.temporaryVehicleAssignment && <div className="text-xs text-info">Veículo temporário</div>}</td><td className="px-4 py-3 text-right">{t.totalKm != null ? num(t.totalKm) : "—"}</td><td className="px-4 py-3"><StatusBadge tone={tripStatusTone[t.status]}>{tripStatusLabel[t.status]}</StatusBadge></td><td className="px-4 py-3 text-right"><a href={`/admin/viagens/${t.id}`} className="text-primary hover:underline">Abrir →</a></td></tr>;
        })}</TableShell>}

        {tab === "Abastecimentos" && <TableShell head={["Data", "Veículo", "KM", "Combustível", "Litros", "Valor"]}>{dRefuels.map((r) => { const v = vehicles.find((x) => x.id === r.vehicleId); return <tr key={r.id}><td className="px-4 py-3">{formatDateTime(r.date)}</td><td className="px-4 py-3">{v?.plate ?? "—"}</td><td className="px-4 py-3 text-right">{num(r.currentKm)}</td><td className="px-4 py-3">{fuelTypeLabel[r.fuelType]}</td><td className="px-4 py-3 text-right">{num(r.liters)} L</td><td className="px-4 py-3 text-right">{brl(r.totalValue)}</td></tr>; })}</TableShell>}

        {tab === "Despesas" && <TableShell head={["Data", "Viagem", "Tipo", "Valor", "Observação"]}>{dExpenses.map((e) => { const t = trips.find((x) => x.id === e.tripId); return <tr key={e.id}><td className="px-4 py-3">{formatDateTime(e.date)}</td><td className="px-4 py-3">{t?.origin} → {t?.destination}</td><td className="px-4 py-3">{expenseTypeLabel[e.type]}</td><td className="px-4 py-3 text-right">{brl(e.value)}</td><td className="px-4 py-3 text-muted-foreground">{e.notes || "—"}</td></tr>; })}</TableShell>}

        {tab === "Vínculo" && <SectionCard title="Troca e vínculo de veículo" subtitle="Protótipo visual da regra operacional solicitada"><div className="grid gap-3 md:grid-cols-2"><div className="rounded-lg bg-muted p-4"><h3 className="font-semibold">Veículo principal</h3><p className="mt-1 text-sm text-muted-foreground">Usado como padrão na área do motorista. Pode ser alterado pelo admin.</p><div className="mt-3 font-medium">{vehicle ? `${vehicle.plate} — ${vehicle.brand} ${vehicle.model}` : "Nenhum"}</div></div><div className="rounded-lg bg-muted p-4"><h3 className="font-semibold">Veículo temporário por viagem</h3><p className="mt-1 text-sm text-muted-foreground">Quando o veículo principal entra em manutenção, o gestor pode escolher outro veículo apenas para uma viagem.</p><ActionDialog triggerLabel="Simular troca temporária" title="Simular veículo temporário" description="Escolha uma viagem e o veículo substituto para este motorista." submitLabel="Simular troca" triggerClassName="mt-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90" fields={[{ label: "Viagem", type: "select", options: dTrips.map((t) => ({ label: `${t.origin} → ${t.destination}`, value: t.id })) }, { label: "Veículo temporário", type: "select", options: vehicles.map((v) => ({ label: `${v.plate} · ${v.model}`, value: v.id })) }, { label: "Justificativa", type: "textarea", wide: true }]} /></div></div></SectionCard>}
      </div>
    </>
  );
}
