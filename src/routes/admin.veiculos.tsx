import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatusBadge } from "@/components/StatusBadge";
import { vehicles, drivers } from "@/lib/mock-data";
import {
  vehicleStatusLabel,
  vehicleStatusTone,
  vehicleTypeLabel,
  docStatusLabel,
  docStatusTone,
} from "@/lib/status-rules";
import { num } from "@/lib/calculations";
import type { VehicleStatus, VehicleType } from "@/types/fleet";

export const Route = createFileRoute("/admin/veiculos")({
  head: () => ({ meta: [{ title: "Veículos — Admin" }] }),
  component: VehiclesList,
});

function VehiclesList() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<VehicleStatus | "all">("all");
  const [type, setType] = useState<VehicleType | "all">("all");
  const [driverId, setDriverId] = useState<string>("all");

  const filtered = useMemo(
    () =>
      vehicles.filter((v) => {
        if (q && !`${v.plate} ${v.brand} ${v.model}`.toLowerCase().includes(q.toLowerCase()))
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

  return (
    <>
      <AdminTopbar
        title="Veículos"
        subtitle={`${filtered.length} de ${vehicles.length} veículos`}
        actions={
          <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            + Novo veículo
          </button>
        }
      />

      <div className="p-6 space-y-4">
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
                <th className="px-4 py-2.5 text-left font-medium">Motorista</th>
                <th className="px-4 py-2.5 text-right font-medium">KM atual</th>
                <th className="px-4 py-2.5 text-left font-medium">Documentação</th>
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
                  <td className="px-4 py-3 text-foreground">{driverName(v.mainDriverId)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground">{num(v.currentKm)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge tone={docStatusTone[v.documentationStatus]}>
                      {docStatusLabel[v.documentationStatus]}
                    </StatusBadge>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge tone={vehicleStatusTone[v.status]}>
                      {vehicleStatusLabel[v.status]}
                    </StatusBadge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to="/admin/veiculos/$id"
                      params={{ id: v.id }}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Detalhes →
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
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
