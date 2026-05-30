import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatusBadge } from "@/components/StatusBadge";
import { StatCard } from "@/components/StatCard";
import {
  vehicles,
  drivers,
  trips,
  refuels,
  expenses,
  maintenances,
  pendencies,
} from "@/lib/mock-data";
import {
  vehicleStatusLabel,
  vehicleStatusTone,
  vehicleTypeLabel,
  docStatusLabel,
  docStatusTone,
  tripStatusLabel,
  tripStatusTone,
  maintenanceStatusLabel,
  maintenanceStatusTone,
  maintenanceTypeLabel,
  pendencySeverityLabel,
  pendencySeverityTone,
  fuelTypeLabel,
  expenseTypeLabel,
} from "@/lib/status-rules";
import { brl, num, formatDate, formatDateTime, sum, vehicleTotalCost } from "@/lib/calculations";

export const Route = createFileRoute("/admin/veiculos/$id")({
  head: ({ params }) => {
    const v = vehicles.find((x) => x.id === params.id);
    return { meta: [{ title: `${v?.plate ?? "Veículo"} — Admin` }] };
  },
  notFoundComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Veículo não encontrado.</div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-10 text-center text-destructive">{error.message}</div>
  ),
  component: VehicleDetail,
});

const tabs = [
  { id: "overview", label: "Visão geral" },
  { id: "trips", label: "Viagens" },
  { id: "refuels", label: "Abastecimentos" },
  { id: "expenses", label: "Despesas" },
  { id: "maintenance", label: "Manutenções" },
  { id: "pendencies", label: "Pendências" },
  { id: "docs", label: "Documentação" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function VehicleDetail() {
  const { id } = Route.useParams();
  const v = vehicles.find((x) => x.id === id);
  if (!v) throw notFound();
  const [tab, setTab] = useState<TabId>("overview");

  const driver = v.mainDriverId ? drivers.find((d) => d.id === v.mainDriverId) : null;
  const vTrips = trips.filter((t) => t.vehicleId === v.id);
  const vRefuels = refuels.filter((r) => r.vehicleId === v.id);
  const vExpenses = expenses.filter((e) => e.vehicleId === v.id);
  const vMaint = maintenances.filter((m) => m.vehicleId === v.id);
  const vPend = pendencies.filter((p) => p.vehicleId === v.id);

  const totalKm = sum(vTrips.filter((t) => t.totalKm != null).map((t) => t.totalKm as number));
  const totalLiters = sum(vRefuels.map((r) => r.liters));
  const avgCons = totalLiters > 0 ? totalKm / totalLiters : 0;
  const totalCost = vehicleTotalCost(v, vRefuels, vExpenses, vMaint);

  return (
    <>
      <AdminTopbar
        title={`${v.plate} — ${v.brand} ${v.model}`}
        subtitle={`${vehicleTypeLabel[v.type]} · ${v.year} · ${v.capacity}`}
        actions={
          <>
            <Link
              to="/admin/veiculos"
              className="rounded-md border border-input bg-card px-3 py-1.5 text-sm hover:bg-accent"
            >
              ← Voltar
            </Link>
            <button className="rounded-md border border-input bg-card px-3 py-1.5 text-sm hover:bg-accent">
              Alterar status
            </button>
            <button className="rounded-md border border-input bg-card px-3 py-1.5 text-sm hover:bg-accent">
              Atribuir motorista
            </button>
            <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Veículo temporário p/ viagem
            </button>
          </>
        }
      />

      <div className="p-6 space-y-4">
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</div>
            <div className="mt-2">
              <StatusBadge tone={vehicleStatusTone[v.status]}>{vehicleStatusLabel[v.status]}</StatusBadge>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Motorista: <span className="font-medium text-foreground">{driver?.name ?? "—"}</span>
            </div>
          </div>
          <StatCard label="KM atual" value={num(v.currentKm)} />
          <StatCard label="Consumo médio" value={`${avgCons.toFixed(2)} km/L`} hint="histórico" />
          <StatCard label="Custo total" value={brl(totalCost)} tone="danger" hint="combustível + manut. + desp." />
        </section>

        <div className="flex flex-wrap gap-1 rounded-lg border border-border bg-card p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="grid gap-4 lg:grid-cols-2">
            <Card title="Dados cadastrais">
              <Row k="Placa" v={v.plate} />
              <Row k="Tipo" v={vehicleTypeLabel[v.type]} />
              <Row k="Marca / Modelo" v={`${v.brand} ${v.model}`} />
              <Row k="Ano" v={String(v.year)} />
              <Row k="Capacidade" v={v.capacity} />
              <Row k="Cadastrado em" v={formatDate(v.createdAt)} />
            </Card>
            <Card title="Indicadores operacionais">
              <Row k="KM total rodado" v={num(totalKm)} />
              <Row k="Litros abastecidos" v={num(totalLiters)} />
              <Row k="Viagens" v={String(vTrips.length)} />
              <Row k="Manutenções" v={String(vMaint.length)} />
              <Row k="Custo manutenção" v={brl(sum(vMaint.map((m) => m.value)))} />
              <Row k="Pendências abertas" v={String(vPend.length)} />
            </Card>
          </div>
        )}

        {tab === "trips" && (
          <Table head={["Início", "Origem → Destino", "Motorista", "KM", "Status"]}>
            {vTrips.map((t) => {
              const d = drivers.find((x) => x.id === t.driverId);
              return (
                <tr key={t.id} className="hover:bg-muted/30">
                  <td className="px-4 py-2.5">{formatDateTime(t.startedAt)}</td>
                  <td className="px-4 py-2.5">
                    {t.origin} <span className="text-muted-foreground">→</span> {t.destination}
                  </td>
                  <td className="px-4 py-2.5">{d?.name ?? "—"}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{t.totalKm != null ? num(t.totalKm) : "—"}</td>
                  <td className="px-4 py-2.5">
                    <StatusBadge tone={tripStatusTone[t.status]}>{tripStatusLabel[t.status]}</StatusBadge>
                  </td>
                </tr>
              );
            })}
          </Table>
        )}

        {tab === "refuels" && (
          <Table head={["Data", "KM", "Combustível", "Litros", "Valor"]}>
            {vRefuels.map((r) => (
              <tr key={r.id} className="hover:bg-muted/30">
                <td className="px-4 py-2.5">{formatDateTime(r.date)}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{num(r.currentKm)}</td>
                <td className="px-4 py-2.5">{fuelTypeLabel[r.fuelType]}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{num(r.liters)} L</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{brl(r.totalValue)}</td>
              </tr>
            ))}
          </Table>
        )}

        {tab === "expenses" && (
          <Table head={["Data", "Tipo", "Motorista", "Valor", "Observação"]}>
            {vExpenses.map((e) => {
              const d = drivers.find((x) => x.id === e.driverId);
              return (
                <tr key={e.id} className="hover:bg-muted/30">
                  <td className="px-4 py-2.5">{formatDateTime(e.date)}</td>
                  <td className="px-4 py-2.5">{expenseTypeLabel[e.type]}</td>
                  <td className="px-4 py-2.5">{d?.name ?? "—"}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{brl(e.value)}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{e.notes || "—"}</td>
                </tr>
              );
            })}
          </Table>
        )}

        {tab === "maintenance" && (
          <Table head={["Data", "Tipo", "Causa", "KM", "Valor", "Status"]}>
            {vMaint.map((m) => (
              <tr key={m.id} className="hover:bg-muted/30">
                <td className="px-4 py-2.5">{formatDate(m.date)}</td>
                <td className="px-4 py-2.5">{maintenanceTypeLabel[m.maintenanceType]}</td>
                <td className="px-4 py-2.5">{m.cause}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{num(m.currentKm)}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{brl(m.value)}</td>
                <td className="px-4 py-2.5">
                  <StatusBadge tone={maintenanceStatusTone[m.status]}>{maintenanceStatusLabel[m.status]}</StatusBadge>
                </td>
              </tr>
            ))}
          </Table>
        )}

        {tab === "pendencies" && (
          <div className="rounded-lg border border-border bg-card divide-y divide-border">
            {vPend.length === 0 && (
              <div className="p-6 text-center text-sm text-muted-foreground">Sem pendências.</div>
            )}
            {vPend.map((p) => (
              <div key={p.id} className="flex items-start justify-between gap-4 p-4">
                <div>
                  <div className="text-sm font-medium text-foreground">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.description}</div>
                </div>
                <StatusBadge tone={pendencySeverityTone[p.severity]}>
                  {pendencySeverityLabel[p.severity]}
                </StatusBadge>
              </div>
            ))}
          </div>
        )}

        {tab === "docs" && (
          <div className="grid gap-4 lg:grid-cols-2">
            <Card title="Documentação do veículo">
              <Row k="Vencimento" v={formatDate(v.documentationDueDate)} />
              <div className="flex items-center justify-between py-1.5 text-sm">
                <span className="text-muted-foreground">Status</span>
                <StatusBadge tone={docStatusTone[v.documentationStatus]}>
                  {docStatusLabel[v.documentationStatus]}
                </StatusBadge>
              </div>
            </Card>
            <Card title="Tacógrafo">
              <Row k="Vencimento" v={formatDate(v.tachographDueDate)} />
              <div className="flex items-center justify-between py-1.5 text-sm">
                <span className="text-muted-foreground">Status</span>
                <StatusBadge tone={docStatusTone[v.tachographStatus]}>
                  {docStatusLabel[v.tachographStatus]}
                </StatusBadge>
              </div>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <div className="mt-3 divide-y divide-border">{children}</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium text-foreground">{v}</span>
    </div>
  );
}

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            {head.map((h, i) => (
              <th
                key={h}
                className={`px-4 py-2.5 font-medium ${
                  i >= head.length - 2 ? "text-right" : "text-left"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">{children}</tbody>
      </table>
    </div>
  );
}
