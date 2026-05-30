import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { FilterBar, TableShell } from "@/components/admin/AdminBlocks";
import { StatCard } from "@/components/StatCard";
import { refuels, drivers, vehicles, trips } from "@/lib/mock-data";
import { brl, formatDateTime, num, sum } from "@/lib/calculations";
import { fuelTypeLabel } from "@/lib/status-rules";
import type { FuelType } from "@/types/fleet";

export const Route = createFileRoute("/admin/abastecimentos")({
  head: () => ({ meta: [{ title: "Abastecimentos — Admin" }] }),
  component: RefuelsPage,
});

function RefuelsPage() {
  const [q, setQ] = useState("");
  const [vehicleId, setVehicleId] = useState("all");
  const [driverId, setDriverId] = useState("all");
  const [fuel, setFuel] = useState<FuelType | "all">("all");

  const filtered = useMemo(
    () =>
      refuels.filter((r) => {
        const d = drivers.find((x) => x.id === r.driverId);
        const v = vehicles.find((x) => x.id === r.vehicleId);
        const t = trips.find((x) => x.id === r.tripId);
        const text = `${d?.name ?? ""} ${v?.plate ?? ""} ${t?.origin ?? ""} ${t?.destination ?? ""}`.toLowerCase();

        return (
          text.includes(q.toLowerCase()) &&
          (vehicleId === "all" || r.vehicleId === vehicleId) &&
          (driverId === "all" || r.driverId === driverId) &&
          (fuel === "all" || r.fuelType === fuel)
        );
      }),
    [q, vehicleId, driverId, fuel],
  );

  const liters = sum(filtered.map((r) => r.liters));
  const value = sum(filtered.map((r) => r.totalValue));
  const avg = liters ? value / liters : 0;

  return (
    <>
      <AdminTopbar
        title="Abastecimentos"
        subtitle="Controle operacional de consumo. Motorista registra litros e KM; admin fecha valores."
        actions={
          <button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
            + Lançar valor
          </button>
        }
      />

      <div className="space-y-4 p-6">
        <div className="grid gap-3 md:grid-cols-4">
          <StatCard label="Registros" value={filtered.length} />
          <StatCard label="Litros" value={`${num(liters)} L`} />
          <StatCard label="Valor total" value={brl(value)} />
          <StatCard label="Preço médio" value={brl(avg)} />
        </div>

        <FilterBar>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar motorista, placa ou rota..."
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">Todos os veículos</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.plate} · {v.model}
              </option>
            ))}
          </select>
          <select
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">Todos os motoristas</option>
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value as FuelType | "all")}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">Todos combustíveis</option>
            {Object.entries(fuelTypeLabel).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </FilterBar>

        <TableShell head={["Data", "Veículo", "Motorista", "Viagem", "KM", "Combustível", "Litros", "Valor"]}>
          {filtered.map((r) => {
            const d = drivers.find((x) => x.id === r.driverId);
            const v = vehicles.find((x) => x.id === r.vehicleId);
            const t = trips.find((x) => x.id === r.tripId);

            return (
              <tr key={r.id} className="hover:bg-muted/40">
                <td className="px-4 py-3">{formatDateTime(r.date)}</td>
                <td className="px-4 py-3 font-medium">{v?.plate ?? "—"}</td>
                <td className="px-4 py-3">{d?.name ?? "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {t ? `${t.origin} → ${t.destination}` : "Avulso"}
                </td>
                <td className="px-4 py-3 text-right">{num(r.currentKm)}</td>
                <td className="px-4 py-3">{fuelTypeLabel[r.fuelType]}</td>
                <td className="px-4 py-3 text-right">{num(r.liters)} L</td>
                <td className="px-4 py-3 text-right">{brl(r.totalValue)}</td>
              </tr>
            );
          })}
        </TableShell>
      </div>
    </>
  );
}
