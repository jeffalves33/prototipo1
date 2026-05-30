import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import {
  vehicles,
  drivers,
  trips,
  refuels,
  expenses,
  maintenances,
  pendencies,
} from "@/lib/mock-data";
import { brl, num, sum } from "@/lib/calculations";
import {
  pendencySeverityLabel,
  pendencySeverityTone,
  vehicleStatusLabel,
  vehicleStatusTone,
} from "@/lib/status-rules";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Admin" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter((v) => v.status === "ativo").length;
  const inMaintenance = vehicles.filter((v) => v.status === "manutencao").length;
  const activeDrivers = drivers.filter((d) => d.status === "ativo").length;
  const inProgressTrips = trips.filter((t) => t.status === "em_andamento").length;

  const kmTotal = sum(
    trips.filter((t) => t.totalKm != null).map((t) => t.totalKm as number),
  );
  const litersTotal = sum(refuels.map((r) => r.liters));
  const avgConsumption = litersTotal > 0 ? kmTotal / litersTotal : 0;

  const fuelCost = sum(refuels.map((r) => r.totalValue));
  const maintCost = sum(maintenances.map((m) => m.value));
  const tripExpensesTotal = sum(expenses.map((e) => e.value));
  const totalSpend = fuelCost + maintCost + tripExpensesTotal;
  const criticalPendencies = pendencies.filter((p) => p.severity === "critica").length;

  // Cost per vehicle (top 5)
  const costByVehicle = vehicles
    .map((v) => {
      const c =
        sum(refuels.filter((r) => r.vehicleId === v.id).map((r) => r.totalValue)) +
        sum(maintenances.filter((m) => m.vehicleId === v.id).map((m) => m.value)) +
        sum(expenses.filter((e) => e.vehicleId === v.id).map((e) => e.value));
      return { v, c };
    })
    .sort((a, b) => b.c - a.c);

  const topCost = costByVehicle.slice(0, 5);
  const maxCost = topCost[0]?.c || 1;

  // Consumption by vehicle
  const consumptionByVehicle = vehicles
    .map((v) => {
      const km = sum(
        trips
          .filter((t) => t.vehicleId === v.id && t.totalKm != null)
          .map((t) => t.totalKm as number),
      );
      const liters = sum(refuels.filter((r) => r.vehicleId === v.id).map((r) => r.liters));
      return { v, value: liters > 0 ? km / liters : 0 };
    })
    .filter((x) => x.value > 0)
    .sort((a, b) => b.value - a.value);

  const preventive = maintenances.filter((m) => m.maintenanceType === "preventiva").length;
  const corrective = maintenances.filter((m) => m.maintenanceType === "corretiva").length;

  const expByCat = (["pedagio", "alimentacao", "hospedagem", "descarga", "outros"] as const).map(
    (t) => ({ t, v: sum(expenses.filter((e) => e.type === t).map((e) => e.value)) }),
  );
  const expCatMax = Math.max(...expByCat.map((x) => x.v), 1);
  const catLabels: Record<string, string> = {
    pedagio: "Pedágio",
    alimentacao: "Alimentação",
    hospedagem: "Hospedagem",
    descarga: "Descarga",
    outros: "Outros",
  };

  return (
    <>
      <AdminTopbar
        title="Dashboard"
        subtitle="Visão geral da operação"
        actions={
          <>
            <select className="rounded-md border border-input bg-card px-2 py-1.5 text-sm">
              <option>Últimos 30 dias</option>
              <option>Este mês</option>
              <option>Últimos 90 dias</option>
            </select>
            <select className="rounded-md border border-input bg-card px-2 py-1.5 text-sm">
              <option>Todos os veículos</option>
              {vehicles.map((v) => (
                <option key={v.id}>{v.plate}</option>
              ))}
            </select>
            <select className="rounded-md border border-input bg-card px-2 py-1.5 text-sm">
              <option>Todos os motoristas</option>
              {drivers.map((d) => (
                <option key={d.id}>{d.name}</option>
              ))}
            </select>
          </>
        }
      />

      <div className="p-6 space-y-6">
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          <StatCard label="Total de veículos" value={totalVehicles} />
          <StatCard label="Veículos ativos" value={activeVehicles} tone="ok" />
          <StatCard label="Em manutenção" value={inMaintenance} tone="warn" />
          <StatCard label="Motoristas ativos" value={activeDrivers} />
          <StatCard label="Viagens em andamento" value={inProgressTrips} tone="ok" />
          <StatCard label="Pendências críticas" value={criticalPendencies} tone="danger" />
          <StatCard label="KM rodados" value={num(kmTotal)} hint="no período" />
          <StatCard label="Litros abastecidos" value={num(litersTotal)} hint="no período" />
          <StatCard
            label="Consumo médio"
            value={`${avgConsumption.toFixed(2)} km/L`}
            hint="geral"
          />
          <StatCard label="Gasto total" value={brl(totalSpend)} tone="danger" />
          <StatCard label="Manutenção" value={brl(maintCost)} hint="período" />
          <StatCard label="Despesas viagem" value={brl(tripExpensesTotal)} hint="período" />
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Top veículos por custo</h2>
              <span className="text-xs text-muted-foreground">Combustível + manutenção + despesas</span>
            </div>
            <div className="mt-4 space-y-3">
              {topCost.map(({ v, c }) => (
                <div key={v.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{v.plate}</span>
                    <span className="tabular-nums text-muted-foreground">{brl(c)}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-1.5 rounded-full bg-primary"
                      style={{ width: `${(c / maxCost) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-sm font-semibold text-foreground">Consumo médio por veículo</h2>
            <div className="mt-4 space-y-3">
              {consumptionByVehicle.map((x) => (
                <div key={x.v.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">
                    {x.v.plate}{" "}
                    <span className="text-muted-foreground">— {x.v.model}</span>
                  </span>
                  <span className="tabular-nums text-foreground">{x.value.toFixed(2)} km/L</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-sm font-semibold text-foreground">Manutenção preventiva vs corretiva</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div className="rounded-md bg-success/10 p-4">
                <div className="text-xs font-medium uppercase tracking-wide text-success">Preventiva</div>
                <div className="mt-1 text-3xl font-semibold text-foreground tabular-nums">{preventive}</div>
              </div>
              <div className="rounded-md bg-destructive/10 p-4">
                <div className="text-xs font-medium uppercase tracking-wide text-destructive">Corretiva</div>
                <div className="mt-1 text-3xl font-semibold text-foreground tabular-nums">{corrective}</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-sm font-semibold text-foreground">Despesas por categoria</h2>
            <div className="mt-4 space-y-3">
              {expByCat.map((c) => (
                <div key={c.t}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{catLabels[c.t]}</span>
                    <span className="tabular-nums text-muted-foreground">{brl(c.v)}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-1.5 rounded-full bg-info"
                      style={{ width: `${(c.v / expCatMax) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <h2 className="text-sm font-semibold text-foreground">Alertas recentes</h2>
              <Link to="/admin/pendencias" className="text-xs font-medium text-primary hover:underline">
                Ver todas →
              </Link>
            </div>
            <ul className="divide-y divide-border">
              {pendencies.slice(0, 5).map((p) => (
                <li key={p.id} className="flex items-start justify-between gap-3 px-5 py-3">
                  <div>
                    <div className="text-sm font-medium text-foreground">{p.title}</div>
                    <div className="text-xs text-muted-foreground">{p.description}</div>
                  </div>
                  <StatusBadge tone={pendencySeverityTone[p.severity]}>
                    {pendencySeverityLabel[p.severity]}
                  </StatusBadge>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <h2 className="text-sm font-semibold text-foreground">Status dos veículos</h2>
              <Link to="/admin/veiculos" className="text-xs font-medium text-primary hover:underline">
                Ver todos →
              </Link>
            </div>
            <ul className="divide-y divide-border">
              {vehicles.slice(0, 6).map((v) => (
                <li key={v.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {v.plate} <span className="text-muted-foreground">— {v.brand} {v.model}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">KM atual: {num(v.currentKm)}</div>
                  </div>
                  <StatusBadge tone={vehicleStatusTone[v.status]}>
                    {vehicleStatusLabel[v.status]}
                  </StatusBadge>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
