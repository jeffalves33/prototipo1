import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ActionDialog } from "@/components/admin/ActionDialog";
import { FilterBar, TableShell } from "@/components/admin/AdminBlocks";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { trips, drivers, vehicles, expenses, refuels } from "@/lib/mock-data";
import { brl, formatDateTime, num, sum } from "@/lib/calculations";
import { tripStatusLabel, tripStatusTone } from "@/lib/status-rules";
import type { TripStatus } from "@/types/fleet";

export const Route = createFileRoute("/admin/viagens")({
  head: () => ({ meta: [{ title: "Viagens - Admin" }] }),
  component: TripsPage,
});

function TripsPage() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<TripStatus | "all">("all");
  const [driverId, setDriverId] = useState("all");
  const [vehicleId, setVehicleId] = useState("all");

  const filtered = useMemo(
    () =>
      trips.filter((trip) => {
        const driver = drivers.find((item) => item.id === trip.driverId);
        const vehicle = vehicles.find((item) => item.id === trip.vehicleId);
        const text = `${vehicle?.fixedRoute ?? ""} ${driver?.name ?? ""} ${vehicle?.plate ?? ""}`.toLowerCase();
        return (
          text.includes(q.toLowerCase()) &&
          (status === "all" || trip.status === status) &&
          (driverId === "all" || trip.driverId === driverId) &&
          (vehicleId === "all" || trip.vehicleId === vehicleId)
        );
      }),
    [driverId, q, status, vehicleId],
  );

  const inProgress = trips.filter((trip) => trip.status === "em_andamento").length;
  const km = sum(trips.map((trip) => trip.totalKm ?? 0));
  const expenseTotal = sum(expenses.map((expense) => expense.value));

  if (path !== "/admin/viagens") return <Outlet />;

  return (
    <>
      <AdminTopbar
        title="Viagens"
        subtitle="Viagens abertas pela rota fixa cadastrada em cada veiculo"
        actions={
          <ActionDialog
            triggerLabel="+ Nova viagem"
            title="Nova viagem"
            description="Abra uma viagem com motorista e veiculo. A rota vem do cadastro do veiculo."
            submitLabel="Salvar viagem"
            fields={[
              { label: "Motorista", type: "select", options: drivers.map((driver) => ({ label: driver.name, value: driver.id })) },
              { label: "Veiculo / rota", type: "select", options: vehicles.map((vehicle) => ({ label: `${vehicle.plate} - ${vehicle.fixedRoute}`, value: vehicle.id })) },
              { label: "Rota", type: "summary", value: "Definida no cadastro do veiculo selecionado" },
              { label: "Data de inicio", type: "date", value: "2026-05-29" },
              { label: "KM inicial", type: "number", placeholder: "412000" },
              { label: "Status", type: "select", options: Object.entries(tripStatusLabel).map(([value, label]) => ({ label, value })) },
              { label: "Veiculo temporario", type: "select", options: [{ label: "Nao", value: "nao" }, { label: "Sim", value: "sim" }] },
              { label: "Observacoes", type: "textarea", wide: true },
            ]}
          />
        }
      />
      <div className="space-y-4 p-6">
        <div className="grid gap-3 md:grid-cols-4">
          <StatCard label="Viagens" value={trips.length} />
          <StatCard label="Em andamento" value={inProgress} tone="warn" />
          <StatCard label="KM rodados" value={num(km)} />
          <StatCard label="Despesas" value={brl(expenseTotal)} />
        </div>
        <FilterBar>
          <input value={q} onChange={(event) => setQ(event.target.value)} placeholder="Buscar rota fixa, placa ou motorista..." className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <select value={status} onChange={(event) => setStatus(event.target.value as TripStatus | "all")} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="all">Todos os status</option>
            {Object.entries(tripStatusLabel).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
          </select>
          <select value={driverId} onChange={(event) => setDriverId(event.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="all">Todos os motoristas</option>
            {drivers.map((driver) => <option key={driver.id} value={driver.id}>{driver.name}</option>)}
          </select>
          <select value={vehicleId} onChange={(event) => setVehicleId(event.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="all">Todos os veiculos</option>
            {vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.plate} - {vehicle.model}</option>)}
          </select>
        </FilterBar>
        <TableShell head={["Inicio", "Rota", "Motorista", "Veiculo", "KM", "Abast.", "Desp.", "Status", ""]}>
          {filtered.map((trip) => {
            const driver = drivers.find((item) => item.id === trip.driverId);
            const vehicle = vehicles.find((item) => item.id === trip.vehicleId);
            const tripRefuels = refuels.filter((refuel) => refuel.tripId === trip.id);
            const tripExpenses = expenses.filter((expense) => expense.tripId === trip.id);
            return (
              <tr key={trip.id} className="hover:bg-muted/40">
                <td className="px-4 py-3">{formatDateTime(trip.startedAt)}</td>
                <td className="px-4 py-3 font-medium">
                  {vehicle?.fixedRoute ?? `${trip.origin} - ${trip.destination}`}
                  {trip.temporaryVehicleAssignment && <div className="text-xs text-info">Veiculo temporario autorizado pelo admin</div>}
                </td>
                <td className="px-4 py-3">{driver?.name ?? "-"}</td>
                <td className="px-4 py-3">{vehicle?.plate ?? "-"}</td>
                <td className="px-4 py-3 text-right">{trip.totalKm != null ? num(trip.totalKm) : "-"}</td>
                <td className="px-4 py-3 text-right">{num(sum(tripRefuels.map((refuel) => refuel.liters)))} L</td>
                <td className="px-4 py-3 text-right">{brl(sum(tripExpenses.map((expense) => expense.value)))}</td>
                <td className="px-4 py-3"><StatusBadge tone={tripStatusTone[trip.status]}>{tripStatusLabel[trip.status]}</StatusBadge></td>
                <td className="px-4 py-3 text-right">
                  <a href={`/admin/viagens/${trip.id}`} className="font-medium text-primary hover:underline">Detalhes -&gt;</a>
                </td>
              </tr>
            );
          })}
        </TableShell>
      </div>
    </>
  );
}
