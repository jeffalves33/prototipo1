import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { DetailRow, SectionCard, TableShell } from "@/components/admin/AdminBlocks";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { services, maintenances, pendencies, vehicles, mechanics } from "@/lib/mock-data";
import { brl, formatDate, num, sum } from "@/lib/calculations";
import {
  maintenanceStatusLabel,
  maintenanceStatusTone,
  maintenanceTypeLabel,
  pendencySeverityLabel,
  pendencySeverityTone,
  periodicityLabel,
  serviceCategoryLabel,
} from "@/lib/status-rules";

export const Route = createFileRoute("/admin/servicos/$id")({
  head: ({ params }) => ({
    meta: [{ title: `${services.find((s) => s.id === params.id)?.name ?? "Serviço"} — Admin` }],
  }),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { id } = Route.useParams();
  const service = services.find((s) => s.id === id);
  if (!service) throw notFound();

  const serviceMaintenances = maintenances.filter((m) => m.serviceIds.includes(service.id));
  const servicePendencies = pendencies.filter((p) => p.serviceId === service.id);
  const totalValue = sum(serviceMaintenances.map((m) => m.value));

  return (
    <>
      <AdminTopbar
        title={service.name}
        subtitle="Detalhe do serviço, recorrência e uso em manutenções"
        actions={
          <>
            <Link
              to="/admin/servicos"
              className="rounded-md border border-input bg-card px-3 py-2 text-sm hover:bg-accent"
            >
              ← Voltar
            </Link>
            <button className="rounded-md border border-input bg-card px-3 py-2 text-sm hover:bg-accent">
              Editar serviço
            </button>
          </>
        }
      />

      <div className="space-y-4 p-6">
        <div className="grid gap-3 md:grid-cols-4">
          <StatCard label="Categoria" value={serviceCategoryLabel[service.category]} />
          <StatCard label="Tipo sugerido" value={maintenanceTypeLabel[service.suggestedMaintenanceType]} />
          <StatCard label="Usos" value={serviceMaintenances.length} />
          <StatCard label="Valor em manutenções" value={brl(totalValue)} />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <SectionCard title="Cadastro">
            <DetailRow label="Serviço" value={service.name} />
            <DetailRow label="Categoria" value={serviceCategoryLabel[service.category]} />
            <DetailRow label="Tipo sugerido" value={maintenanceTypeLabel[service.suggestedMaintenanceType]} />
            <DetailRow
              label="Periodicidade"
              value={periodicityLabel(service.periodicityType, service.periodicityKm, service.periodicityDays)}
            />
            <DetailRow label="Status" value={<StatusBadge tone={service.status === "ativo" ? "ok" : "muted"}>{service.status}</StatusBadge>} />
          </SectionCard>

          <SectionCard title="Descrição">
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </SectionCard>
        </div>

        <TableShell head={["Data", "Veículo", "Tipo", "Mecânico", "KM", "Valor", "Status", ""]}>
          {serviceMaintenances.map((m) => {
            const v = vehicles.find((x) => x.id === m.vehicleId);
            const mechanic = mechanics.find((x) => x.id === m.mechanicId);

            return (
              <tr key={m.id} className="hover:bg-muted/40">
                <td className="px-4 py-3">{formatDate(m.date)}</td>
                <td className="px-4 py-3 font-medium">
                  {v?.plate ?? "—"}
                  <div className="text-xs font-normal text-muted-foreground">
                    {v ? `${v.brand} ${v.model}` : "—"}
                  </div>
                </td>
                <td className="px-4 py-3">{maintenanceTypeLabel[m.maintenanceType]}</td>
                <td className="px-4 py-3">{mechanic?.name ?? "—"}</td>
                <td className="px-4 py-3 text-right">{num(m.currentKm)}</td>
                <td className="px-4 py-3 text-right">{brl(m.value)}</td>
                <td className="px-4 py-3">
                  <StatusBadge tone={maintenanceStatusTone[m.status]}>{maintenanceStatusLabel[m.status]}</StatusBadge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    to="/admin/manutencoes/$id"
                    params={{ id: m.id }}
                    className="font-medium text-primary hover:underline"
                  >
                    Abrir →
                  </Link>
                </td>
              </tr>
            );
          })}
        </TableShell>

        <SectionCard title="Pendências ligadas">
          {servicePendencies.length === 0 ? (
            <div className="text-sm text-muted-foreground">Nenhuma pendência ligada a este serviço.</div>
          ) : (
            <div className="grid gap-2 md:grid-cols-2">
              {servicePendencies.map((p) => (
                <div key={p.id} className="rounded-lg border border-border p-3">
                  <div className="flex justify-between gap-2">
                    <span className="font-medium">{p.title}</span>
                    <StatusBadge tone={pendencySeverityTone[p.severity]}>{pendencySeverityLabel[p.severity]}</StatusBadge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </>
  );
}
