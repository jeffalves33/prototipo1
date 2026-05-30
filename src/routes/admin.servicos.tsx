import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { FilterBar, TableShell } from "@/components/admin/AdminBlocks";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { services, maintenances } from "@/lib/mock-data";
import { maintenanceTypeLabel, periodicityLabel, serviceCategoryLabel } from "@/lib/status-rules";
import type { PeriodicityType, ServiceCategory } from "@/types/fleet";

export const Route = createFileRoute("/admin/servicos")({
  head: () => ({ meta: [{ title: "Serviços — Admin" }] }),
  component: ServicesPage,
});

function ServicesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<ServiceCategory | "all">("all");
  const [periodicity, setPeriodicity] = useState<PeriodicityType | "all">("all");

  const filtered = useMemo(
    () =>
      services.filter(
        (s) =>
          `${s.name} ${s.description}`.toLowerCase().includes(q.toLowerCase()) &&
          (cat === "all" || s.category === cat) &&
          (periodicity === "all" || s.periodicityType === periodicity),
      ),
    [q, cat, periodicity],
  );

  return (
    <>
      <AdminTopbar
        title="Serviços"
        subtitle="Cadastro de serviços periódicos. Óleo e pneus são categorias de serviço, não módulos separados."
        actions={
          <button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
            + Novo serviço
          </button>
        }
      />

      <div className="space-y-4 p-6">
        <div className="grid gap-3 md:grid-cols-4">
          <StatCard label="Serviços" value={services.length} />
          <StatCard label="Por KM" value={services.filter((s) => s.periodicityType === "km").length} />
          <StatCard label="Por tempo" value={services.filter((s) => s.periodicityType === "time").length} />
          <StatCard label="Sem recorrência" value={services.filter((s) => s.periodicityType === "none").length} />
        </div>

        <FilterBar>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar serviço..."
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as ServiceCategory | "all")}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">Todas categorias</option>
            {Object.entries(serviceCategoryLabel).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <select
            value={periodicity}
            onChange={(e) => setPeriodicity(e.target.value as PeriodicityType | "all")}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">Todas periodicidades</option>
            <option value="km">Por KM</option>
            <option value="time">Por tempo</option>
            <option value="none">Sem recorrência</option>
          </select>
          <div className="rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground">
            {filtered.length} de {services.length} registros
          </div>
        </FilterBar>

        <TableShell head={["Serviço", "Categoria", "Tipo sugerido", "Periodicidade", "Uso", "Status", ""]}>
          {filtered.map((s) => (
            <tr key={s.id} className="hover:bg-muted/40">
              <td className="px-4 py-3 font-medium">
                {s.name}
                <div className="text-xs text-muted-foreground">{s.description}</div>
              </td>
              <td className="px-4 py-3">{serviceCategoryLabel[s.category]}</td>
              <td className="px-4 py-3">{maintenanceTypeLabel[s.suggestedMaintenanceType]}</td>
              <td className="px-4 py-3">
                {periodicityLabel(s.periodicityType, s.periodicityKm, s.periodicityDays)}
              </td>
              <td className="px-4 py-3 text-right">
                {maintenances.filter((m) => m.serviceIds.includes(s.id)).length}
              </td>
              <td className="px-4 py-3">
                <StatusBadge tone={s.status === "ativo" ? "ok" : "muted"}>{s.status}</StatusBadge>
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  to="/admin/servicos/$id"
                  params={{ id: s.id }}
                  className="font-medium text-primary hover:underline"
                >
                  Detalhes →
                </Link>
              </td>
            </tr>
          ))}
        </TableShell>
      </div>
    </>
  );
}
