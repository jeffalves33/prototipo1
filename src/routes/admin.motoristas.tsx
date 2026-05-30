import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { FilterBar, TableShell } from "@/components/admin/AdminBlocks";
import { StatusBadge } from "@/components/StatusBadge";
import { StatCard } from "@/components/StatCard";
import { drivers, vehicles, trips, expenses } from "@/lib/mock-data";
import { brl, num } from "@/lib/calculations";
import { driverStatusLabel, driverStatusTone, licenseStatusLabel, licenseStatusTone } from "@/lib/status-rules";
import type { DriverStatus, LicenseStatus } from "@/types/fleet";

export const Route = createFileRoute("/admin/motoristas")({
  head: () => ({ meta: [{ title: "Motoristas — Admin" }] }),
  component: DriversPage,
});

function DriversPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<DriverStatus | "all">("all");
  const [license, setLicense] = useState<LicenseStatus | "all">("all");

  const filtered = useMemo(() => drivers.filter((d) => {
    const vehicle = vehicles.find((v) => v.id === d.mainVehicleId);
    const text = `${d.name} ${d.phone} ${d.cpf} ${vehicle?.plate ?? ""}`.toLowerCase();
    return text.includes(q.toLowerCase()) && (status === "all" || d.status === status) && (license === "all" || d.licenseStatus === license);
  }), [q, status, license]);

  const active = drivers.filter((d) => d.status === "ativo").length;
  const licenseAlerts = drivers.filter((d) => d.licenseStatus !== "ok").length;
  const tripCount = trips.length;
  const expenseTotal = expenses.reduce((s, e) => s + e.value, 0);

  return (
    <>
      <AdminTopbar
        title="Motoristas"
        subtitle="Cadastro, vínculo com veículo, CNH e histórico operacional"
        actions={<button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">+ Novo motorista</button>}
      />
      <div className="space-y-4 p-6">
        <div className="grid gap-3 md:grid-cols-4">
          <StatCard label="Motoristas" value={drivers.length} />
          <StatCard label="Ativos" value={active} tone="ok" />
          <StatCard label="Alertas de CNH" value={licenseAlerts} tone={licenseAlerts ? "danger" : "ok"} />
          <StatCard label="Despesas lançadas" value={brl(expenseTotal)} hint={`${tripCount} viagens`} />
        </div>

        <FilterBar>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nome, CPF, placa..." className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <select value={status} onChange={(e) => setStatus(e.target.value as DriverStatus | "all")} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="all">Todos os status</option>
            {Object.entries(driverStatusLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select value={license} onChange={(e) => setLicense(e.target.value as LicenseStatus | "all")} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="all">Todas as CNHs</option>
            {Object.entries(licenseStatusLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <div className="rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">{filtered.length} de {drivers.length} registros</div>
        </FilterBar>

        <TableShell head={["Motorista", "Contato", "Veículo principal", "CNH", "Viagens", "KM", "Despesas", "Status", ""]}>
          {filtered.map((d) => {
            const vehicle = vehicles.find((v) => v.id === d.mainVehicleId);
            return (
              <tr key={d.id} className="hover:bg-muted/40">
                <td className="px-4 py-3 font-semibold text-foreground">{d.name}<div className="text-xs font-normal text-muted-foreground">CPF {d.cpf}</div></td>
                <td className="px-4 py-3 text-muted-foreground">{d.phone}</td>
                <td className="px-4 py-3">{vehicle ? <span>{vehicle.plate}<div className="text-xs text-muted-foreground">{vehicle.brand} {vehicle.model}</div></span> : <span className="text-muted-foreground">Sem veículo</span>}</td>
                <td className="px-4 py-3"><StatusBadge tone={licenseStatusTone[d.licenseStatus]}>{licenseStatusLabel[d.licenseStatus]}</StatusBadge><div className="mt-1 text-xs text-muted-foreground">{d.licenseDueDate}</div></td>
                <td className="px-4 py-3 text-right tabular-nums">{d.totalTrips}</td>
                <td className="px-4 py-3 text-right tabular-nums">{num(d.totalKm)}</td>
                <td className="px-4 py-3 text-right tabular-nums">{brl(d.totalTravelExpenses)}</td>
                <td className="px-4 py-3"><StatusBadge tone={driverStatusTone[d.status]}>{driverStatusLabel[d.status]}</StatusBadge></td>
                <td className="px-4 py-3 text-right"><a href={`/admin/motoristas/${d.id}`} className="font-medium text-primary hover:underline">Detalhes →</a></td>
              </tr>
            );
          })}
        </TableShell>
      </div>
    </>
  );
}
