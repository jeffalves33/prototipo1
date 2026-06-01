import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ActionDialog } from "@/components/admin/ActionDialog";
import { StatusBadge } from "@/components/StatusBadge";
import { StatCard } from "@/components/StatCard";
import { vehicles, drivers, trips, refuels, expenses, maintenances } from "@/lib/mock-data";
import {
  vehicleStatusLabel,
  vehicleStatusTone,
  vehicleTypeLabel,
  docStatusLabel,
  docStatusTone,
} from "@/lib/status-rules";
import { brl, num, sum, vehicleTotalCost } from "@/lib/calculations";
import type { VehicleStatus, VehicleType } from "@/types/fleet";

export const Route = createFileRoute("/admin/veiculos")({
  head: () => ({ meta: [{ title: "Veículos — Admin" }] }),
  component: VehiclesList,
});

function VehiclesList() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<VehicleStatus | "all">("all");
  const [type, setType] = useState<VehicleType | "all">("all");
  const [driverId, setDriverId] = useState<string>("all");

  const filtered = useMemo(
    () =>
      vehicles.filter((v) => {
        if (q && !`${v.plate} ${v.brand} ${v.model} ${v.fixedRoute}`.toLowerCase().includes(q.toLowerCase()))
          return false;
        if (status !== "all" && v.status !== status) return false;
        if (type !== "all" && v.type !== type) return false;
        if (driverId !== "all" && v.mainDriverId !== driverId) return false;
        return true;
      }),
    [q, status, type, driverId],
  );

  const driverName = (id: string | null) =>
    id ? drivers.find((d) => d.id === id)?.name ?? "—" : "Sem motorista";

  const fleetKm = sum(trips.map((t) => t.totalKm ?? 0));
  const fleetLiters = sum(refuels.map((r) => r.liters));
  const fleetCost = sum(
    vehicles.map((vehicle) =>
      vehicleTotalCost(
        vehicle,
        refuels.filter((r) => r.vehicleId === vehicle.id),
        expenses.filter((e) => e.vehicleId === vehicle.id),
        maintenances.filter((m) => m.vehicleId === vehicle.id),
      ),
    ),
  );
  const available = vehicles.filter((v) => v.status === "ativo" || v.status === "reservado").length;
  const avgConsumption = fleetLiters > 0 ? fleetKm / fleetLiters : 0;

  if (path !== "/admin/veiculos") return <Outlet />;

  return (
    <>
      <AdminTopbar
        title="Veículos"
        subtitle={`${filtered.length} de ${vehicles.length} veículos`}
        actions={
          <ActionDialog
            triggerLabel="+ Novo veículo"
            title="Novo veículo"
            description="Cadastre dados principais, documentação e vínculo inicial do veículo."
            submitLabel="Salvar veículo"
            triggerClassName="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            fields={[
              { label: "Placa", placeholder: "ABC-1D23" },
              { label: "Tipo", type: "select", options: Object.entries(vehicleTypeLabel).map(([value, label]) => ({ label, value })) },
              { label: "Marca", placeholder: "Scania" },
              { label: "Modelo", placeholder: "R 450" },
              { label: "Ano", type: "number", placeholder: "2026" },
              { label: "Capacidade", placeholder: "29 ton" },
              { label: "Rota fixa", placeholder: "Sao Paulo/SP -> Curitiba/PR", wide: true },
              { label: "KM atual", type: "number", placeholder: "0" },
              { label: "Motorista principal", type: "select", options: [{ label: "Sem motorista", value: "none" }, ...drivers.map((d) => ({ label: d.name, value: d.id }))] },
              { label: "Vencimento documentação", type: "date" },
              { label: "Vencimento tacógrafo", type: "date" },
              { label: "Vencimento CETURB", type: "date" },
            ]}
          />
        }
      />

      <div className="p-6 space-y-4">
        <section className="grid gap-3 md:grid-cols-4">
          <StatCard label="Veiculos" value={vehicles.length} />
          <StatCard label="Disponiveis" value={available} tone="ok" />
          <StatCard label="Consumo medio" value={`${avgConsumption.toFixed(2)} km/L`} />
          <StatCard label="Custo da frota" value={brl(fleetCost)} tone="warn" />
        </section>

        <div className="grid gap-2 rounded-lg border border-border bg-card p-3 sm:grid-cols-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por placa ou modelo..."
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as VehicleStatus | "all")}
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
          >
            <option value="all">Todos os status</option>
            {Object.entries(vehicleStatusLabel).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as VehicleType | "all")}
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
          >
            <option value="all">Todos os tipos</option>
            {Object.entries(vehicleTypeLabel).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <select
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
          >
            <option value="all">Qualquer motorista</option>
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Placa</th>
                <th className="px-4 py-2.5 text-left font-medium">Veículo</th>
                <th className="px-4 py-2.5 text-left font-medium">Tipo</th>
                <th className="px-4 py-2.5 text-left font-medium">Rota fixa</th>
                <th className="px-4 py-2.5 text-left font-medium">Motorista</th>
                <th className="px-4 py-2.5 text-right font-medium">KM atual</th>
                <th className="px-4 py-2.5 text-left font-medium">Documentação</th>
                <th className="px-4 py-2.5 text-left font-medium">CETURB</th>
                <th className="px-4 py-2.5 text-left font-medium">Status</th>
                <th className="px-4 py-2.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{v.plate}</td>
                  <td className="px-4 py-3 text-foreground">
                    {v.brand} {v.model} <span className="text-muted-foreground">· {v.year}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{vehicleTypeLabel[v.type]}</td>
                  <td className="px-4 py-3 text-foreground">{v.fixedRoute}</td>
                  <td className="px-4 py-3 text-foreground">{driverName(v.mainDriverId)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground">{num(v.currentKm)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge tone={docStatusTone[v.documentationStatus]}>
                      {docStatusLabel[v.documentationStatus]}
                    </StatusBadge>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge tone={docStatusTone[v.ceturbStatus]}>
                      {docStatusLabel[v.ceturbStatus]}
                    </StatusBadge>
                    <div className="mt-1 text-xs text-muted-foreground">{v.ceturbDueDate}</div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge tone={vehicleStatusTone[v.status]}>
                      {vehicleStatusLabel[v.status]}
                    </StatusBadge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a
                      href={`/admin/veiculos/${v.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Detalhes →
                    </a>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    Nenhum veículo encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
