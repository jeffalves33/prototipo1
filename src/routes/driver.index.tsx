import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useProfile } from "@/lib/profile";
import { StatusBadge } from "@/components/StatusBadge";
import { drivers, vehicles, trips as mockTrips, refuels as mockRefuels, expenses as mockExpenses } from "@/lib/mock-data";
import {
  licenseStatusLabel,
  licenseStatusTone,
  vehicleStatusLabel,
  vehicleStatusTone,
  fuelTypeLabel,
  expenseTypeLabel,
} from "@/lib/status-rules";
import { formatDate, formatDateTime, num } from "@/lib/calculations";
import type { Trip, Refuel, Expense, FuelType, ExpenseType } from "@/types/fleet";
import { LogOut, Fuel, Receipt, Square, Play, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/driver/")({
  head: () => ({ meta: [{ title: "Motorista — Operação" }] }),
  component: DriverScreen,
});

// Active driver mocked: first one with status "ativo".
const ACTIVE_DRIVER_ID = "d1";

function DriverScreen() {
  const { setProfile } = useProfile();
  const driver = drivers.find((d) => d.id === ACTIVE_DRIVER_ID)!;
  const vehicle = vehicles.find((v) => v.id === driver.mainVehicleId) ?? null;

  // Local mutable copies for the mock.
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [refuels, setRefuels] = useState<Refuel[]>(mockRefuels);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);

  const activeTrip = useMemo(
    () => trips.find((t) => t.driverId === driver.id && t.status === "em_andamento") ?? null,
    [trips, driver.id],
  );

  return (
    <div className="min-h-screen bg-background pb-10">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-primary">Prototipo 1</div>
          <div className="text-base font-semibold text-foreground">{driver.name}</div>
        </div>
        <button
          onClick={() => setProfile(null)}
          className="flex items-center gap-1 rounded-md border border-input px-2 py-1 text-xs text-muted-foreground hover:bg-accent"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sair
        </button>
      </header>

      <main className="mx-auto max-w-md space-y-4 p-4">
        <section className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Motorista</div>
            <StatusBadge tone={licenseStatusTone[driver.licenseStatus]}>
              CNH {licenseStatusLabel[driver.licenseStatus]}
            </StatusBadge>
          </div>
          <div className="mt-2 space-y-1 text-sm">
            <div className="text-foreground">{driver.phone}</div>
            <div className="text-muted-foreground">CPF: {driver.cpf.slice(0, 3)}.***.***-{driver.cpf.slice(-2)}</div>
            <div className="text-muted-foreground">CNH {driver.licenseNumber} · venc. {formatDate(driver.licenseDueDate)}</div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Veículo atual</div>
            {vehicle && (
              <StatusBadge tone={vehicleStatusTone[vehicle.status]}>
                {vehicleStatusLabel[vehicle.status]}
              </StatusBadge>
            )}
          </div>
          {vehicle ? (
            <>
              <div className="mt-2 text-lg font-semibold text-foreground">{vehicle.plate}</div>
              <div className="text-sm text-muted-foreground">
                {vehicle.brand} {vehicle.model} · KM {num(vehicle.currentKm)}
              </div>
              {vehicle.status !== "ativo" && (
                <div className="mt-3 rounded-md bg-warning/15 px-3 py-2 text-xs text-[oklch(0.42_0.13_70)]">
                  Veículo {vehicleStatusLabel[vehicle.status].toLowerCase()}. Procure o gestor antes de iniciar viagem.
                </div>
              )}
            </>
          ) : (
            <div className="mt-2 text-sm text-muted-foreground">Sem veículo atribuído.</div>
          )}
        </section>

        {activeTrip ? (
          <ActiveTripCard
            trip={activeTrip}
            tripRefuels={refuels.filter((r) => r.tripId === activeTrip.id)}
            tripExpenses={expenses.filter((e) => e.tripId === activeTrip.id)}
            onRegisterRefuel={(r) => setRefuels((prev) => [r, ...prev])}
            onRegisterExpense={(e) => setExpenses((prev) => [e, ...prev])}
            onFinish={(finalKm) =>
              setTrips((prev) =>
                prev.map((t) =>
                  t.id === activeTrip.id
                    ? {
                        ...t,
                        status: "concluida",
                        finishedAt: new Date().toISOString(),
                        finalKm,
                        totalKm: finalKm - t.initialKm,
                      }
                    : t,
                ),
              )
            }
          />
        ) : (
          vehicle && (
            <StartTripCard
              driverId={driver.id}
              vehicle={vehicle}
              onStart={(t) => setTrips((prev) => [t, ...prev])}
            />
          )
        )}
      </main>
    </div>
  );
}

function ActiveTripCard({
  trip,
  tripRefuels,
  tripExpenses,
  onRegisterRefuel,
  onRegisterExpense,
  onFinish,
}: {
  trip: Trip;
  tripRefuels: Refuel[];
  tripExpenses: Expense[];
  onRegisterRefuel: (r: Refuel) => void;
  onRegisterExpense: (e: Expense) => void;
  onFinish: (finalKm: number) => void;
}) {
  const [open, setOpen] = useState<"none" | "refuel" | "expense" | "finish">("none");
  return (
    <section className="rounded-xl border border-primary/30 bg-primary/5 p-4">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-wide text-primary">Viagem em andamento</div>
        <StatusBadge tone="info">Ao vivo</StatusBadge>
      </div>
      <div className="mt-2 text-base font-semibold text-foreground">
        {trip.origin} → {trip.destination}
      </div>
      <div className="text-xs text-muted-foreground">
        Início: {formatDateTime(trip.startedAt)} · KM inicial: {num(trip.initialKm)}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => setOpen("refuel")}
          className="flex items-center justify-center gap-2 rounded-lg bg-card border border-border py-3 text-sm font-medium text-foreground hover:bg-accent"
        >
          <Fuel className="h-4 w-4" /> Abastecimento
        </button>
        <button
          onClick={() => setOpen("expense")}
          className="flex items-center justify-center gap-2 rounded-lg bg-card border border-border py-3 text-sm font-medium text-foreground hover:bg-accent"
        >
          <Receipt className="h-4 w-4" /> Despesa
        </button>
        <button
          onClick={() => setOpen("finish")}
          className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-destructive py-3 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90"
        >
          <Square className="h-4 w-4" /> Encerrar viagem
        </button>
      </div>

      <div className="mt-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Registros recentes</div>
        <ul className="mt-2 divide-y divide-border rounded-lg border border-border bg-card">
          {[...tripRefuels.slice(0, 3).map((r) => ({
            id: "r" + r.id,
            label: `Abastecimento · ${num(r.liters)} L · ${fuelTypeLabel[r.fuelType]}`,
            when: formatDateTime(r.date),
          })),
          ...tripExpenses.slice(0, 3).map((e) => ({
            id: "e" + e.id,
            label: `Despesa · ${expenseTypeLabel[e.type]} · R$ ${e.value.toFixed(2)}`,
            when: formatDateTime(e.date),
          }))]
            .slice(0, 5)
            .map((x) => (
              <li key={x.id} className="px-3 py-2 text-sm">
                <div className="text-foreground">{x.label}</div>
                <div className="text-xs text-muted-foreground">{x.when}</div>
              </li>
            ))}
          {tripRefuels.length === 0 && tripExpenses.length === 0 && (
            <li className="px-3 py-3 text-center text-xs text-muted-foreground">
              Nenhum registro ainda nesta viagem.
            </li>
          )}
        </ul>
      </div>

      {open === "refuel" && (
        <RefuelDrawer
          tripId={trip.id}
          driverId={trip.driverId}
          vehicleId={trip.vehicleId}
          onClose={() => setOpen("none")}
          onSubmit={(r) => {
            onRegisterRefuel(r);
            setOpen("none");
          }}
        />
      )}
      {open === "expense" && (
        <ExpenseDrawer
          tripId={trip.id}
          driverId={trip.driverId}
          vehicleId={trip.vehicleId}
          onClose={() => setOpen("none")}
          onSubmit={(e) => {
            onRegisterExpense(e);
            setOpen("none");
          }}
        />
      )}
      {open === "finish" && (
        <FinishTripDrawer
          initialKm={trip.initialKm}
          onClose={() => setOpen("none")}
          onSubmit={(finalKm) => {
            onFinish(finalKm);
            setOpen("none");
          }}
        />
      )}
    </section>
  );
}

function StartTripCard({
  driverId,
  vehicle,
  onStart,
}: {
  driverId: string;
  vehicle: { id: string; currentKm: number };
  onStart: (t: Trip) => void;
}) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [initialKm, setInitialKm] = useState(String(vehicle.currentKm));
  const [notes, setNotes] = useState("");

  const submit = () => {
    if (!origin || !destination || !initialKm) return;
    const t: Trip = {
      id: "t" + Math.random().toString(36).slice(2, 8),
      driverId,
      vehicleId: vehicle.id,
      origin,
      destination,
      startedAt: new Date().toISOString(),
      finishedAt: null,
      status: "em_andamento",
      initialKm: Number(initialKm),
      finalKm: null,
      totalKm: null,
      notes,
      temporaryVehicleAssignment: false,
    };
    onStart(t);
  };

  return (
    <section className="rounded-xl border border-border bg-card p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Iniciar viagem</div>
      <div className="mt-3 space-y-2">
        <Field label="Origem">
          <input value={origin} onChange={(e) => setOrigin(e.target.value)} className="input" placeholder="Cidade/UF" />
        </Field>
        <Field label="Destino">
          <input value={destination} onChange={(e) => setDestination(e.target.value)} className="input" placeholder="Cidade/UF" />
        </Field>
        <Field label="KM inicial">
          <input value={initialKm} onChange={(e) => setInitialKm(e.target.value)} className="input" inputMode="numeric" />
        </Field>
        <Field label="Observação">
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="input min-h-[60px]" />
        </Field>
        <button
          onClick={submit}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Play className="h-4 w-4" /> Iniciar viagem
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <style>{`.input{width:100%;border:1px solid var(--input);background:var(--background);border-radius:8px;padding:8px 10px;font-size:14px}`}</style>
    </section>
  );
}

function RefuelDrawer({
  tripId,
  driverId,
  vehicleId,
  onClose,
  onSubmit,
}: {
  tripId: string;
  driverId: string;
  vehicleId: string;
  onClose: () => void;
  onSubmit: (r: Refuel) => void;
}) {
  const [currentKm, setCurrentKm] = useState("");
  const [liters, setLiters] = useState("");
  const [fuelType, setFuelType] = useState<FuelType>("diesel_s10");
  const [notes, setNotes] = useState("");
  return (
    <Drawer title="Registrar abastecimento" onClose={onClose}>
      <Field label="KM atual">
        <input value={currentKm} onChange={(e) => setCurrentKm(e.target.value)} className="input" inputMode="numeric" />
      </Field>
      <Field label="Litros abastecidos">
        <input value={liters} onChange={(e) => setLiters(e.target.value)} className="input" inputMode="decimal" />
      </Field>
      <Field label="Combustível">
        <select value={fuelType} onChange={(e) => setFuelType(e.target.value as FuelType)} className="input">
          {Object.entries(fuelTypeLabel).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Observação">
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="input min-h-[60px]" />
      </Field>
      <p className="text-xs text-muted-foreground">Você não precisa informar valor; o financeiro é registrado pelo admin.</p>
      <DrawerActions
        onCancel={onClose}
        onSubmit={() =>
          onSubmit({
            id: "r" + Math.random().toString(36).slice(2, 8),
            tripId,
            driverId,
            vehicleId,
            date: new Date().toISOString(),
            currentKm: Number(currentKm) || 0,
            fuelType,
            liters: Number(liters) || 0,
            unitPrice: 0,
            totalValue: 0,
            notes,
          })
        }
      />
    </Drawer>
  );
}

function ExpenseDrawer({
  tripId,
  driverId,
  vehicleId,
  onClose,
  onSubmit,
}: {
  tripId: string;
  driverId: string;
  vehicleId: string;
  onClose: () => void;
  onSubmit: (e: Expense) => void;
}) {
  const [type, setType] = useState<ExpenseType>("pedagio");
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");
  return (
    <Drawer title="Registrar despesa" onClose={onClose}>
      <Field label="Tipo">
        <select value={type} onChange={(e) => setType(e.target.value as ExpenseType)} className="input">
          {Object.entries(expenseTypeLabel).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Valor (R$)">
        <input value={value} onChange={(e) => setValue(e.target.value)} className="input" inputMode="decimal" />
      </Field>
      <Field label="Observação">
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="input min-h-[60px]" />
      </Field>
      <DrawerActions
        onCancel={onClose}
        onSubmit={() =>
          onSubmit({
            id: "e" + Math.random().toString(36).slice(2, 8),
            tripId,
            driverId,
            vehicleId,
            type,
            value: Number(value) || 0,
            date: new Date().toISOString(),
            notes,
          })
        }
      />
    </Drawer>
  );
}

function FinishTripDrawer({
  initialKm,
  onClose,
  onSubmit,
}: {
  initialKm: number;
  onClose: () => void;
  onSubmit: (finalKm: number) => void;
}) {
  const [finalKm, setFinalKm] = useState("");
  const valid = Number(finalKm) > initialKm;
  return (
    <Drawer title="Encerrar viagem" onClose={onClose}>
      <p className="text-sm text-muted-foreground">
        KM inicial: <span className="font-medium text-foreground">{num(initialKm)}</span>
      </p>
      <Field label="KM final">
        <input value={finalKm} onChange={(e) => setFinalKm(e.target.value)} className="input" inputMode="numeric" />
      </Field>
      {finalKm && !valid && (
        <p className="text-xs text-destructive">KM final deve ser maior que o inicial.</p>
      )}
      <DrawerActions
        onCancel={onClose}
        submitLabel="Encerrar"
        disabled={!valid}
        onSubmit={() => onSubmit(Number(finalKm))}
      />
    </Drawer>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Drawer({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 sm:items-center">
      <div className="w-full max-w-md rounded-t-2xl bg-card p-5 shadow-xl sm:rounded-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <button onClick={onClose} className="text-xs text-muted-foreground hover:underline">
            Fechar
          </button>
        </div>
        <div className="space-y-3">{children}</div>
        <style>{`.input{width:100%;border:1px solid var(--input);background:var(--background);border-radius:8px;padding:8px 10px;font-size:14px}`}</style>
      </div>
    </div>
  );
}

function DrawerActions({
  onCancel,
  onSubmit,
  submitLabel = "Registrar",
  disabled,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  submitLabel?: string;
  disabled?: boolean;
}) {
  return (
    <div className="mt-2 flex gap-2">
      <button onClick={onCancel} className="flex-1 rounded-lg border border-input py-2.5 text-sm">
        Cancelar
      </button>
      <button
        disabled={disabled}
        onClick={onSubmit}
        className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {submitLabel}
      </button>
    </div>
  );
}
