import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ActionDialog } from "@/components/admin/ActionDialog";
import { FilterBar, TableShell } from "@/components/admin/AdminBlocks";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { maintenances, vehicles, mechanics, services } from "@/lib/mock-data";
import { brl, formatDate, num, sum } from "@/lib/calculations";
import { maintenanceStatusLabel, maintenanceStatusTone, maintenanceTypeLabel, serviceCategoryLabel } from "@/lib/status-rules";
import type { MaintenanceStatus, MaintenanceType } from "@/types/fleet";

export const Route = createFileRoute("/admin/manutencoes")({
  head: () => ({ meta: [{ title: "Manutencoes - Admin" }] }),
  component: MaintenancesPage,
});

function MaintenancesPage() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<MaintenanceStatus | "all">("all");
  const [type, setType] = useState<MaintenanceType | "all">("all");
  const [vehicleId, setVehicleId] = useState("all");

  const filtered = useMemo(
    () =>
      maintenances.filter((maintenance) => {
        const vehicle = vehicles.find((item) => item.id === maintenance.vehicleId);
        const serviceNames = maintenance.serviceIds.map((id) => services.find((service) => service.id === id)?.name).join(" ");
        const text = `${vehicle?.plate ?? ""} ${vehicle?.model ?? ""} ${maintenance.cause} ${serviceNames}`.toLowerCase();
        return (
          text.includes(q.toLowerCase()) &&
          (status === "all" || maintenance.status === status) &&
          (type === "all" || maintenance.maintenanceType === type) &&
          (vehicleId === "all" || maintenance.vehicleId === vehicleId)
        );
      }),
    [q, status, type, vehicleId],
  );
  const total = sum(filtered.map((maintenance) => maintenance.value));

  if (path !== "/admin/manutencoes") return <Outlet />;

  return (
    <>
      <AdminTopbar
        title="Manutencoes"
        subtitle="Ordens preventivas e corretivas com um ou mais servicos realizados"
        actions={
          <ActionDialog
            triggerLabel="+ Nova manutencao"
            title="Nova manutencao"
            description="Abra uma ordem preventiva ou corretiva e vincule os servicos realizados."
            submitLabel="Salvar manutencao"
            fields={[
              { label: "Veiculo", type: "select", options: vehicles.map((vehicle) => ({ label: `${vehicle.plate} - ${vehicle.model}`, value: vehicle.id })) },
              { label: "Tipo", type: "select", options: Object.entries(maintenanceTypeLabel).map(([value, label]) => ({ label, value })) },
              { label: "Servicos", type: "checkboxes", options: services.map((service) => ({ label: service.name, value: service.id })) },
              { label: "Causa / descricao", type: "textarea", wide: true },
              { label: "Data", type: "date", value: "2026-05-29" },
              { label: "KM atual", type: "number" },
              { label: "Mecanico", type: "select", options: mechanics.map((mechanic) => ({ label: mechanic.name, value: mechanic.id })) },
              { label: "Valor", type: "number" },
              { label: "Status", type: "select", options: Object.entries(maintenanceStatusLabel).map(([value, label]) => ({ label, value })) },
              { label: "Observacoes", type: "textarea", wide: true },
            ]}
          />
        }
      />
      <div className="space-y-4 p-6">
        <div className="grid gap-3 md:grid-cols-4">
          <StatCard label="Registros" value={filtered.length} />
          <StatCard label="Preventivas" value={filtered.filter((maintenance) => maintenance.maintenanceType === "preventiva").length} tone="ok" />
          <StatCard label="Corretivas" value={filtered.filter((maintenance) => maintenance.maintenanceType === "corretiva").length} tone="danger" />
          <StatCard label="Valor" value={brl(total)} />
        </div>
        <FilterBar>
          <input value={q} onChange={(event) => setQ(event.target.value)} placeholder="Buscar placa, servico ou causa..." className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <select value={status} onChange={(event) => setStatus(event.target.value as MaintenanceStatus | "all")} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="all">Todos os status</option>
            {Object.entries(maintenanceStatusLabel).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
          </select>
          <select value={type} onChange={(event) => setType(event.target.value as MaintenanceType | "all")} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="all">Todos os tipos</option>
            {Object.entries(maintenanceTypeLabel).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
          </select>
          <select value={vehicleId} onChange={(event) => setVehicleId(event.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="all">Todos os veiculos</option>
            {vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.plate} - {vehicle.model}</option>)}
          </select>
        </FilterBar>
        <TableShell head={["Data", "Veiculo", "Tipo", "Servicos", "Causa", "Mecanico", "KM", "Valor", "Status", ""]}>
          {filtered.map((maintenance) => {
            const vehicle = vehicles.find((item) => item.id === maintenance.vehicleId);
            const mechanic = mechanics.find((item) => item.id === maintenance.mechanicId);
            const maintenanceServices = maintenance.serviceIds.map((id) => services.find((service) => service.id === id)).filter(Boolean);
            return (
              <tr key={maintenance.id} className="hover:bg-muted/40">
                <td className="px-4 py-3">{formatDate(maintenance.date)}</td>
                <td className="px-4 py-3 font-semibold">{vehicle?.plate}<div className="text-xs font-normal text-muted-foreground">{vehicle?.brand} {vehicle?.model}</div></td>
                <td className="px-4 py-3">{maintenanceTypeLabel[maintenance.maintenanceType]}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {maintenanceServices.slice(0, 3).map((service) => <span key={service!.id} className="rounded bg-muted px-2 py-1 text-xs">{service!.name}</span>)}
                    {maintenanceServices.length > 3 && <span className="text-xs text-muted-foreground">+{maintenanceServices.length - 3}</span>}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{maintenanceServices[0] ? serviceCategoryLabel[maintenanceServices[0].category] : "-"}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{maintenance.cause}</td>
                <td className="px-4 py-3">{mechanic?.name ?? "-"}</td>
                <td className="px-4 py-3 text-right">{num(maintenance.currentKm)}</td>
                <td className="px-4 py-3 text-right">{brl(maintenance.value)}</td>
                <td className="px-4 py-3"><StatusBadge tone={maintenanceStatusTone[maintenance.status]}>{maintenanceStatusLabel[maintenance.status]}</StatusBadge></td>
                <td className="px-4 py-3 text-right">
                  <a href={`/admin/manutencoes/${maintenance.id}`} className="font-medium text-primary hover:underline">Detalhes -&gt;</a>
                </td>
              </tr>
            );
          })}
        </TableShell>
      </div>
    </>
  );
}
