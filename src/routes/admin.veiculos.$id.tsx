import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ActionDialog } from "@/components/admin/ActionDialog";
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
  tireRecords,
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
import { brl, num, formatDate, formatDateTime, splitFixedRoute, sum, vehicleTotalCost } from "@/lib/calculations";

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
  { id: "tires", label: "Pneus" },
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
  const vTires = tireRecords.filter((tire) => tire.vehicleId === v.id);

  const totalKm = sum(vTrips.filter((t) => t.totalKm != null).map((t) => t.totalKm as number));
  const totalLiters = sum(vRefuels.map((r) => r.liters));
  const avgCons = totalLiters > 0 ? totalKm / totalLiters : 0;
  const totalCost = vehicleTotalCost(v, vRefuels, vExpenses, vMaint);
  const tireAlerts = vTires.filter((tire) => tire.status !== "ok").length;
  const tireCost = sum(vTires.map((tire) => tire.accumulatedCost));
  const tireAvgTread =
    vTires.length > 0 ? sum(vTires.map((tire) => tire.treadDepthMm)) / vTires.length : 0;

  return (
    <>
      <AdminTopbar
        title={`${v.plate} — ${v.brand} ${v.model}`}
        subtitle={`${vehicleTypeLabel[v.type]} · ${v.year} · ${v.capacity} · ${v.fixedRoute}`}
        actions={
          <>
            <ActionDialog
              triggerLabel="Editar veiculo"
              title="Editar veiculo"
              description="Atualize dados cadastrais, rota fixa e documentacao deste veiculo."
              submitLabel="Salvar veiculo"
              triggerClassName="rounded-md border border-input bg-card px-3 py-1.5 text-sm hover:bg-accent"
              fields={[
                { label: "Placa", value: v.plate },
                { label: "Tipo", type: "select", value: v.type, options: Object.entries(vehicleTypeLabel).map(([value, label]) => ({ label, value })) },
                { label: "Marca", value: v.brand },
                { label: "Modelo", value: v.model },
                { label: "Ano", type: "number", value: v.year },
                { label: "Capacidade", value: v.capacity },
                { label: "Rota fixa", value: v.fixedRoute, wide: true },
                { label: "KM atual", type: "number", value: v.currentKm },
                { label: "Vencimento documentacao", type: "date", value: v.documentationDueDate },
                { label: "Vencimento tacografo", type: "date", value: v.tachographDueDate },
                { label: "Vencimento CETURB", type: "date", value: v.ceturbDueDate },
              ]}
            />
            <Link
              to="/admin/veiculos"
              className="rounded-md border border-input bg-card px-3 py-1.5 text-sm hover:bg-accent"
            >
              ← Voltar
            </Link>
            <ActionDialog
              triggerLabel="Alterar status"
              title="Alterar status do veículo"
              description="Atualize a disponibilidade operacional deste veículo."
              submitLabel="Salvar status"
              triggerClassName="rounded-md border border-input bg-card px-3 py-1.5 text-sm hover:bg-accent"
              fields={[
                { label: "Status atual", type: "summary", value: vehicleStatusLabel[v.status] },
                { label: "Novo status", type: "select", value: v.status, options: Object.entries(vehicleStatusLabel).map(([value, label]) => ({ label, value })) },
                { label: "Motivo", type: "textarea", wide: true },
              ]}
            />
            <ActionDialog
              triggerLabel="Atribuir motorista"
              title="Atribuir motorista"
              description="Defina o motorista principal deste veículo."
              submitLabel="Salvar vínculo"
              triggerClassName="rounded-md border border-input bg-card px-3 py-1.5 text-sm hover:bg-accent"
              fields={[
                { label: "Veículo", type: "summary", value: `${v.plate} · ${v.brand} ${v.model}` },
                { label: "Motorista", type: "select", value: driver?.id ?? "none", options: [{ label: "Sem motorista", value: "none" }, ...drivers.map((d) => ({ label: d.name, value: d.id }))] },
                { label: "Observação", type: "textarea", wide: true },
              ]}
            />
            <ActionDialog
              triggerLabel="Veículo temporário p/ viagem"
              title="Autorizar veículo temporário"
              description="Escolha uma viagem e registre este veículo como substituto temporário."
              submitLabel="Autorizar"
              triggerClassName="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              fields={[
                { label: "Viagem", type: "select", options: trips.map((t) => ({ label: `${t.origin} → ${t.destination}`, value: t.id })) },
                { label: "Motorista", type: "select", options: drivers.map((d) => ({ label: d.name, value: d.id })) },
                { label: "Veículo temporário", type: "summary", value: `${v.plate} · ${v.brand} ${v.model}` },
                { label: "Justificativa", type: "textarea", wide: true },
              ]}
            />
          </>
        }
      />

      <div className="p-6 space-y-4">
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
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
          <StatCard
            label="Pneus em atencao"
            value={String(tireAlerts)}
            tone={tireAlerts > 0 ? "warn" : "ok"}
            hint={`${vTires.length} monitorados`}
          />
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
              <Row k="Rota fixa" v={v.fixedRoute} />
              <Row k="Cadastrado em" v={formatDate(v.createdAt)} />
            </Card>
            <Card title="Indicadores operacionais">
              <Row k="KM total rodado" v={num(totalKm)} />
              <Row k="Litros abastecidos" v={num(totalLiters)} />
              <Row k="Viagens" v={String(vTrips.length)} />
              <Row k="Manutenções" v={String(vMaint.length)} />
              <Row k="Custo manutenção" v={brl(sum(vMaint.map((m) => m.value)))} />
              <Row k="Pneus monitorados" v={String(vTires.length)} />
              <Row k="Custo pneus" v={brl(tireCost)} />
              <Row k="Sulco medio" v={vTires.length > 0 ? `${tireAvgTread.toFixed(1)} mm` : "-"} />
              <Row k="Pendências abertas" v={String(vPend.length)} />
            </Card>
          </div>
        )}

        {tab === "trips" && (
          <Table head={["Data inicial", "Data final", "Origem", "Destino", "Motorista", "KM inicial", "KM final", "Status"]}>
            {vTrips.map((t) => {
              const d = drivers.find((x) => x.id === t.driverId);
              const { origin, destination } = splitFixedRoute(v.fixedRoute);
              return (
                <tr key={t.id} className="hover:bg-muted/30">
                  <td className="px-4 py-2.5">{formatDateTime(t.startedAt)}</td>
                  <td className="px-4 py-2.5">{formatDateTime(t.finishedAt)}</td>
                  <td className="px-4 py-2.5">{origin}</td>
                  <td className="px-4 py-2.5">{destination}</td>
                  <td className="px-4 py-2.5">{d?.name ?? "—"}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{num(t.initialKm)}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{t.finalKm != null ? num(t.finalKm) : "—"}</td>
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

        {tab === "tires" && (
          <Table head={["Posicao", "Pneu", "Vida", "Sulco", "Pressao", "Custo", "Status", "Proxima acao"]}>
            {vTires.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center text-sm text-muted-foreground">
                  Sem pneus cadastrados para este veiculo.
                </td>
              </tr>
            )}
            {vTires.map((tire) => (
              <tr key={tire.id} className="hover:bg-muted/30">
                <td className="px-4 py-2.5 font-medium">{tire.position}</td>
                <td className="px-4 py-2.5">
                  {tire.brand} {tire.model}
                  <div className="text-xs text-muted-foreground">
                    Instalado no KM {num(tire.installedAtKm)}
                  </div>
                </td>
                <td className="px-4 py-2.5">{tireLifeLabel[tire.life]}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{tire.treadDepthMm.toFixed(1)} mm</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{tire.pressurePsi} psi</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{brl(tire.accumulatedCost)}</td>
                <td className="px-4 py-2.5 text-right">
                  <StatusBadge tone={tireStatusTone[tire.status]}>
                    {tireStatusLabel[tire.status]}
                  </StatusBadge>
                </td>
                <td className="px-4 py-2.5 text-right">
                  {tire.nextAction}
                  <div className="text-xs text-muted-foreground">
                    Ultima inspecao: {formatDate(tire.lastInspectionDate)}
                  </div>
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
          <div className="grid gap-4 lg:grid-cols-3">
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
            <Card title="CETURB">
              <Row k="Vencimento" v={formatDate(v.ceturbDueDate)} />
              <div className="flex items-center justify-between py-1.5 text-sm">
                <span className="text-muted-foreground">Status</span>
                <StatusBadge tone={docStatusTone[v.ceturbStatus]}>
                  {docStatusLabel[v.ceturbStatus]}
                </StatusBadge>
              </div>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}

const tireStatusLabel = {
  ok: "OK",
  atencao: "Atencao",
  critico: "Critico",
  recapagem: "Recapagem",
} as const;

const tireStatusTone = {
  ok: "ok",
  atencao: "warn",
  critico: "danger",
  recapagem: "info",
} as const;

const tireLifeLabel = {
  novo: "Novo",
  primeira_recapagem: "1a recapagem",
  segunda_recapagem: "2a recapagem",
} as const;

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
