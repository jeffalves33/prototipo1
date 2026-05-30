import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useProfile, f as drivers, v as vehicles, t as trips, r as refuels, g as expenses } from "./router-BE5avutW.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { l as licenseStatusLabel, g as licenseStatusTone, v as vehicleStatusLabel, o as vehicleStatusTone, f as fuelTypeLabel, e as expenseTypeLabel } from "./status-rules-wijUZOgZ.mjs";
import { f as formatDate, n as num, a as formatDateTime } from "./calculations-o3_zsC-D.mjs";
import { c as LogOut, F as Fuel, R as Receipt, e as Square, P as Play, a as ChevronRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const ACTIVE_DRIVER_ID = "d1";
function DriverScreen() {
  const {
    setProfile
  } = useProfile();
  const driver = drivers.find((d) => d.id === ACTIVE_DRIVER_ID);
  const vehicle = vehicles.find((v) => v.id === driver.mainVehicleId) ?? null;
  const [trips$1, setTrips] = reactExports.useState(trips);
  const [refuels$1, setRefuels] = reactExports.useState(refuels);
  const [expenses$1, setExpenses] = reactExports.useState(expenses);
  const activeTrip = reactExports.useMemo(() => trips$1.find((t) => t.driverId === driver.id && t.status === "em_andamento") ?? null, [trips$1, driver.id]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold uppercase tracking-widest text-primary", children: "Frota" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-semibold text-foreground", children: driver.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setProfile(null), className: "flex items-center gap-1 rounded-md border border-input px-2 py-1 text-xs text-muted-foreground hover:bg-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5" }),
        "Sair"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-md space-y-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Motorista" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(StatusBadge, { tone: licenseStatusTone[driver.licenseStatus], children: [
            "CNH ",
            licenseStatusLabel[driver.licenseStatus]
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-1 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground", children: driver.phone }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
            "CPF: ",
            driver.cpf.slice(0, 3),
            ".***.***-",
            driver.cpf.slice(-2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
            "CNH ",
            driver.licenseNumber,
            " · venc. ",
            formatDate(driver.licenseDueDate)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Veículo atual" }),
          vehicle && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: vehicleStatusTone[vehicle.status], children: vehicleStatusLabel[vehicle.status] })
        ] }),
        vehicle ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-lg font-semibold text-foreground", children: vehicle.plate }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
            vehicle.brand,
            " ",
            vehicle.model,
            " · KM ",
            num(vehicle.currentKm)
          ] }),
          vehicle.status !== "ativo" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-md bg-warning/15 px-3 py-2 text-xs text-[oklch(0.42_0.13_70)]", children: [
            "Veículo ",
            vehicleStatusLabel[vehicle.status].toLowerCase(),
            ". Procure o gestor antes de iniciar viagem."
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-muted-foreground", children: "Sem veículo atribuído." })
      ] }),
      activeTrip ? /* @__PURE__ */ jsxRuntimeExports.jsx(ActiveTripCard, { trip: activeTrip, tripRefuels: refuels$1.filter((r) => r.tripId === activeTrip.id), tripExpenses: expenses$1.filter((e) => e.tripId === activeTrip.id), onRegisterRefuel: (r) => setRefuels((prev) => [r, ...prev]), onRegisterExpense: (e) => setExpenses((prev) => [e, ...prev]), onFinish: (finalKm) => setTrips((prev) => prev.map((t) => t.id === activeTrip.id ? {
        ...t,
        status: "concluida",
        finishedAt: (/* @__PURE__ */ new Date()).toISOString(),
        finalKm,
        totalKm: finalKm - t.initialKm
      } : t)) }) : vehicle && /* @__PURE__ */ jsxRuntimeExports.jsx(StartTripCard, { driverId: driver.id, vehicle, onStart: (t) => setTrips((prev) => [t, ...prev]) })
    ] })
  ] });
}
function ActiveTripCard({
  trip,
  tripRefuels,
  tripExpenses,
  onRegisterRefuel,
  onRegisterExpense,
  onFinish
}) {
  const [open, setOpen] = reactExports.useState("none");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-primary/30 bg-primary/5 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wide text-primary", children: "Viagem em andamento" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: "info", children: "Ao vivo" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-base font-semibold text-foreground", children: [
      trip.origin,
      " → ",
      trip.destination
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
      "Início: ",
      formatDateTime(trip.startedAt),
      " · KM inicial: ",
      num(trip.initialKm)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen("refuel"), className: "flex items-center justify-center gap-2 rounded-lg bg-card border border-border py-3 text-sm font-medium text-foreground hover:bg-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Fuel, { className: "h-4 w-4" }),
        " Abastecimento"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen("expense"), className: "flex items-center justify-center gap-2 rounded-lg bg-card border border-border py-3 text-sm font-medium text-foreground hover:bg-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-4 w-4" }),
        " Despesa"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen("finish"), className: "col-span-2 flex items-center justify-center gap-2 rounded-lg bg-destructive py-3 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "h-4 w-4" }),
        " Encerrar viagem"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Registros recentes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-2 divide-y divide-border rounded-lg border border-border bg-card", children: [
        [...tripRefuels.slice(0, 3).map((r) => ({
          id: "r" + r.id,
          label: `Abastecimento · ${num(r.liters)} L · ${fuelTypeLabel[r.fuelType]}`,
          when: formatDateTime(r.date)
        })), ...tripExpenses.slice(0, 3).map((e) => ({
          id: "e" + e.id,
          label: `Despesa · ${expenseTypeLabel[e.type]} · R$ ${e.value.toFixed(2)}`,
          when: formatDateTime(e.date)
        }))].slice(0, 5).map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground", children: x.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: x.when })
        ] }, x.id)),
        tripRefuels.length === 0 && tripExpenses.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-3 py-3 text-center text-xs text-muted-foreground", children: "Nenhum registro ainda nesta viagem." })
      ] })
    ] }),
    open === "refuel" && /* @__PURE__ */ jsxRuntimeExports.jsx(RefuelDrawer, { tripId: trip.id, driverId: trip.driverId, vehicleId: trip.vehicleId, onClose: () => setOpen("none"), onSubmit: (r) => {
      onRegisterRefuel(r);
      setOpen("none");
    } }),
    open === "expense" && /* @__PURE__ */ jsxRuntimeExports.jsx(ExpenseDrawer, { tripId: trip.id, driverId: trip.driverId, vehicleId: trip.vehicleId, onClose: () => setOpen("none"), onSubmit: (e) => {
      onRegisterExpense(e);
      setOpen("none");
    } }),
    open === "finish" && /* @__PURE__ */ jsxRuntimeExports.jsx(FinishTripDrawer, { initialKm: trip.initialKm, onClose: () => setOpen("none"), onSubmit: (finalKm) => {
      onFinish(finalKm);
      setOpen("none");
    } })
  ] });
}
function StartTripCard({
  driverId,
  vehicle,
  onStart
}) {
  const [origin, setOrigin] = reactExports.useState("");
  const [destination, setDestination] = reactExports.useState("");
  const [initialKm, setInitialKm] = reactExports.useState(String(vehicle.currentKm));
  const [notes, setNotes] = reactExports.useState("");
  const submit = () => {
    if (!origin || !destination || !initialKm) return;
    const t = {
      id: "t" + Math.random().toString(36).slice(2, 8),
      driverId,
      vehicleId: vehicle.id,
      origin,
      destination,
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      finishedAt: null,
      status: "em_andamento",
      initialKm: Number(initialKm),
      finalKm: null,
      totalKm: null,
      notes,
      temporaryVehicleAssignment: false
    };
    onStart(t);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-card p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Iniciar viagem" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Origem", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: origin, onChange: (e) => setOrigin(e.target.value), className: "input", placeholder: "Cidade/UF" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Destino", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: destination, onChange: (e) => setDestination(e.target.value), className: "input", placeholder: "Cidade/UF" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "KM inicial", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: initialKm, onChange: (e) => setInitialKm(e.target.value), className: "input", inputMode: "numeric" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Observação", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), className: "input min-h-[60px]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: submit, className: "mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4" }),
        " Iniciar viagem",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `.input{width:100%;border:1px solid var(--input);background:var(--background);border-radius:8px;padding:8px 10px;font-size:14px}` })
  ] });
}
function RefuelDrawer({
  tripId,
  driverId,
  vehicleId,
  onClose,
  onSubmit
}) {
  const [currentKm, setCurrentKm] = reactExports.useState("");
  const [liters, setLiters] = reactExports.useState("");
  const [fuelType, setFuelType] = reactExports.useState("diesel_s10");
  const [notes, setNotes] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Drawer, { title: "Registrar abastecimento", onClose, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "KM atual", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: currentKm, onChange: (e) => setCurrentKm(e.target.value), className: "input", inputMode: "numeric" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Litros abastecidos", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: liters, onChange: (e) => setLiters(e.target.value), className: "input", inputMode: "decimal" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Combustível", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: fuelType, onChange: (e) => setFuelType(e.target.value), className: "input", children: Object.entries(fuelTypeLabel).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Observação", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), className: "input min-h-[60px]" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Você não precisa informar valor; o financeiro é registrado pelo admin." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerActions, { onCancel: onClose, onSubmit: () => onSubmit({
      id: "r" + Math.random().toString(36).slice(2, 8),
      tripId,
      driverId,
      vehicleId,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      currentKm: Number(currentKm) || 0,
      fuelType,
      liters: Number(liters) || 0,
      unitPrice: 0,
      totalValue: 0,
      notes
    }) })
  ] });
}
function ExpenseDrawer({
  tripId,
  driverId,
  vehicleId,
  onClose,
  onSubmit
}) {
  const [type, setType] = reactExports.useState("pedagio");
  const [value, setValue] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Drawer, { title: "Registrar despesa", onClose, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tipo", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: type, onChange: (e) => setType(e.target.value), className: "input", children: Object.entries(expenseTypeLabel).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Valor (R$)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => setValue(e.target.value), className: "input", inputMode: "decimal" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Observação", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), className: "input min-h-[60px]" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerActions, { onCancel: onClose, onSubmit: () => onSubmit({
      id: "e" + Math.random().toString(36).slice(2, 8),
      tripId,
      driverId,
      vehicleId,
      type,
      value: Number(value) || 0,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      notes
    }) })
  ] });
}
function FinishTripDrawer({
  initialKm,
  onClose,
  onSubmit
}) {
  const [finalKm, setFinalKm] = reactExports.useState("");
  const valid = Number(finalKm) > initialKm;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Drawer, { title: "Encerrar viagem", onClose, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      "KM inicial: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: num(initialKm) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "KM final", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: finalKm, onChange: (e) => setFinalKm(e.target.value), className: "input", inputMode: "numeric" }) }),
    finalKm && !valid && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "KM final deve ser maior que o inicial." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerActions, { onCancel: onClose, submitLabel: "Encerrar", disabled: !valid, onSubmit: () => onSubmit(Number(finalKm)) })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: label }),
    children
  ] });
}
function Drawer({
  title,
  children,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-t-2xl bg-card p-5 shadow-xl sm:rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-xs text-muted-foreground hover:underline", children: "Fechar" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `.input{width:100%;border:1px solid var(--input);background:var(--background);border-radius:8px;padding:8px 10px;font-size:14px}` })
  ] }) });
}
function DrawerActions({
  onCancel,
  onSubmit,
  submitLabel = "Registrar",
  disabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onCancel, className: "flex-1 rounded-lg border border-input py-2.5 text-sm", children: "Cancelar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled, onClick: onSubmit, className: "flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50", children: submitLabel })
  ] });
}
export {
  DriverScreen as component
};
