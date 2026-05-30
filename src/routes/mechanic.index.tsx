import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { maintenances, vehicles, services, mechanics, pendencies } from "@/lib/mock-data";
import {
  maintenanceStatusLabel,
  maintenanceStatusTone,
  maintenanceTypeLabel,
  pendencySeverityLabel,
  pendencySeverityTone,
} from "@/lib/status-rules";
import { brl, formatDate, num } from "@/lib/calculations";
import type { Maintenance, MaintenanceStatus, MaintenanceType } from "@/types/fleet";
import { Plus, Search } from "lucide-react";

export const Route = createFileRoute("/mechanic/")({
  head: () => ({ meta: [{ title: "Mecânico — Manutenções" }] }),
  component: MechanicHome,
});

function MechanicHome() {
  const [list, setList] = useState<Maintenance[]>(maintenances);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<MaintenanceStatus | "open">("open");
  const [openModal, setOpenModal] = useState(false);

  const filtered = useMemo(() => {
    return list
      .filter((m) => {
        if (status === "open") return m.status === "aberta" || m.status === "em_andamento";
        return m.status === status;
      })
      .filter((m) => {
        if (!q) return true;
        const v = vehicles.find((x) => x.id === m.vehicleId);
        return (v?.plate ?? "").toLowerCase().includes(q.toLowerCase());
      });
  }, [list, q, status]);

  const upcomingPendencies = pendencies
    .filter((p) => p.severity !== "baixa")
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-md space-y-4 p-4">
      <button
        onClick={() => setOpenModal(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
      >
        <Plus className="h-5 w-5" />
        Registrar manutenção
      </button>

      <section className="rounded-xl border border-border bg-card p-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por placa..."
              className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-2 text-sm"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as MaintenanceStatus | "open")}
            className="rounded-md border border-input bg-background px-2 py-2 text-sm"
          >
            <option value="open">Em aberto</option>
            <option value="aberta">Aberta</option>
            <option value="em_andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
      </section>

      <section>
        <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Manutenções
        </h2>
        <div className="space-y-2">
          {filtered.map((m) => {
            const v = vehicles.find((x) => x.id === m.vehicleId);
            return (
              <div key={m.id} className="rounded-xl border border-border bg-card p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {v?.plate} <span className="text-muted-foreground">· {v?.brand} {v?.model}</span>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{m.cause}</div>
                  </div>
                  <StatusBadge tone={maintenanceStatusTone[m.status]}>
                    {maintenanceStatusLabel[m.status]}
                  </StatusBadge>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                  <span>{maintenanceTypeLabel[m.maintenanceType]}</span>
                  <span>·</span>
                  <span>{formatDate(m.date)}</span>
                  <span>·</span>
                  <span>KM {num(m.currentKm)}</span>
                  {m.value > 0 && (
                    <>
                      <span>·</span>
                      <span>{brl(m.value)}</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
              Nenhuma manutenção encontrada.
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Próximas pendências
        </h2>
        <div className="space-y-2">
          {upcomingPendencies.map((p) => (
            <div key={p.id} className="flex items-start justify-between gap-2 rounded-xl border border-border bg-card p-3">
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
      </section>

      {openModal && (
        <NewMaintenanceModal
          onClose={() => setOpenModal(false)}
          onCreate={(m) => {
            setList((prev) => [m, ...prev]);
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
}

function NewMaintenanceModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (m: Maintenance) => void;
}) {
  const [vehicleId, setVehicleId] = useState(vehicles[0].id);
  const [maintenanceType, setMaintenanceType] = useState<MaintenanceType>("preventiva");
  const [serviceIds, setServiceIds] = useState<string[]>([]);
  const [cause, setCause] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [currentKm, setCurrentKm] = useState("");
  const [mechanicId, setMechanicId] = useState(mechanics[0].id);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<MaintenanceStatus>("aberta");
  const [notes, setNotes] = useState("");

  const toggleService = (id: string) =>
    setServiceIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 sm:items-center">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-card p-5 shadow-xl sm:rounded-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">Nova manutenção</h3>
          <button onClick={onClose} className="text-xs text-muted-foreground hover:underline">
            Fechar
          </button>
        </div>

        <div className="space-y-3">
          <F label="Veículo">
            <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} className="inp">
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.plate} · {v.brand} {v.model}
                </option>
              ))}
            </select>
          </F>
          <F label="Tipo">
            <div className="flex gap-2">
              {(["preventiva", "corretiva"] as MaintenanceType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setMaintenanceType(t)}
                  className={`flex-1 rounded-md border py-2 text-sm font-medium ${
                    maintenanceType === t
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input text-muted-foreground"
                  }`}
                >
                  {maintenanceTypeLabel[t]}
                </button>
              ))}
            </div>
          </F>
          <F label="Serviços realizados">
            <div className="max-h-44 space-y-1 overflow-y-auto rounded-md border border-input p-2">
              {services.map((s) => {
                const checked = serviceIds.includes(s.id);
                return (
                  <label key={s.id} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-accent">
                    <input type="checkbox" checked={checked} onChange={() => toggleService(s.id)} />
                    <span className="text-foreground">{s.name}</span>
                  </label>
                );
              })}
            </div>
          </F>
          <F label="Causa / descrição">
            <textarea value={cause} onChange={(e) => setCause(e.target.value)} className="inp min-h-[60px]" />
          </F>
          <div className="grid grid-cols-2 gap-2">
            <F label="Data">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="inp" />
            </F>
            <F label="KM atual">
              <input value={currentKm} onChange={(e) => setCurrentKm(e.target.value)} className="inp" inputMode="numeric" />
            </F>
            <F label="Mecânico">
              <select value={mechanicId} onChange={(e) => setMechanicId(e.target.value)} className="inp">
                {mechanics.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </F>
            <F label="Valor (R$)">
              <input value={value} onChange={(e) => setValue(e.target.value)} className="inp" inputMode="decimal" />
            </F>
            <F label="Status">
              <select value={status} onChange={(e) => setStatus(e.target.value as MaintenanceStatus)} className="inp">
                {Object.entries(maintenanceStatusLabel).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </F>
          </div>
          <F label="Observações">
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="inp min-h-[60px]" />
          </F>
        </div>

        <div className="mt-4 flex gap-2">
          <button onClick={onClose} className="flex-1 rounded-lg border border-input py-2.5 text-sm">
            Cancelar
          </button>
          <button
            onClick={() =>
              onCreate({
                id: "ma" + Math.random().toString(36).slice(2, 8),
                vehicleId,
                maintenanceType,
                serviceIds,
                cause,
                date,
                currentKm: Number(currentKm) || 0,
                value: Number(value) || 0,
                mechanicId,
                status,
                notes,
              })
            }
            className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Registrar
          </button>
        </div>
        <style>{`.inp{width:100%;border:1px solid var(--input);background:var(--background);border-radius:8px;padding:8px 10px;font-size:14px}`}</style>
      </div>
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
