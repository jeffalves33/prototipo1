import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { I as notFound } from "../_libs/tanstack__router-core.mjs";
import { A as AdminTopbar } from "./AdminTopbar-RNvBK5Sw.mjs";
import { A as ActionDialog } from "./ActionDialog-DXo9uEYP.mjs";
import { S as SectionCard, D as DetailRow, T as TableShell } from "./AdminBlocks-DaczzGrM.mjs";
import { S as StatCard } from "./StatCard-xjKm0zZI.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { a as Route$4, t as trips, f as drivers, v as vehicles, r as refuels, g as expenses } from "./router-BE5avutW.mjs";
import { s as sum, n as num, b as brl, a as formatDateTime } from "./calculations-o3_zsC-D.mjs";
import { t as tripStatusLabel, n as tripStatusTone, v as vehicleStatusLabel, o as vehicleStatusTone, f as fuelTypeLabel, e as expenseTypeLabel } from "./status-rules-wijUZOgZ.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/isbot.mjs";
function TripDetail() {
  const {
    id
  } = Route$4.useParams();
  const t = trips.find((x) => x.id === id);
  if (!t) throw notFound();
  const d = drivers.find((x) => x.id === t.driverId);
  const v = vehicles.find((x) => x.id === t.vehicleId);
  const tr = refuels.filter((r) => r.tripId === t.id);
  const te = expenses.filter((e) => e.tripId === t.id);
  const liters = sum(tr.map((r) => r.liters));
  const fuelCost = sum(tr.map((r) => r.totalValue));
  const expenseTotal = sum(te.map((e) => e.value));
  const km = t.totalKm ?? 0;
  const avg = liters > 0 && km > 0 ? km / liters : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: `${t.origin} → ${t.destination}`, subtitle: "Detalhe da rota, veículo utilizado, paradas e despesas", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin/viagens", className: "rounded-md border border-input bg-card px-3 py-2 text-sm", children: "← Voltar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "Editar viagem", title: "Editar viagem", description: "Atualize rota, responsáveis, KM e status.", submitLabel: "Salvar viagem", triggerClassName: "rounded-md border border-input bg-card px-3 py-2 text-sm hover:bg-accent", fields: [{
        label: "Motorista",
        type: "select",
        value: d?.id,
        options: drivers.map((driver) => ({
          label: driver.name,
          value: driver.id
        }))
      }, {
        label: "Veículo",
        type: "select",
        value: v?.id,
        options: vehicles.map((vehicle) => ({
          label: `${vehicle.plate} · ${vehicle.model}`,
          value: vehicle.id
        }))
      }, {
        label: "Origem",
        value: t.origin
      }, {
        label: "Destino",
        value: t.destination
      }, {
        label: "KM inicial",
        type: "number",
        value: t.initialKm
      }, {
        label: "KM final",
        type: "number",
        value: t.finalKm ?? ""
      }, {
        label: "Status",
        type: "select",
        value: t.status,
        options: Object.entries(tripStatusLabel).map(([value, label]) => ({
          label,
          value
        }))
      }, {
        label: "Observações",
        type: "textarea",
        value: t.notes,
        wide: true
      }] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "KM total", value: t.totalKm != null ? num(t.totalKm) : "Em aberto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Litros", value: `${num(liters)} L` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Consumo médio", value: avg ? `${avg.toFixed(2)} km/L` : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Custo operacional", value: brl(fuelCost + expenseTotal), tone: "warn" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { title: "Dados da viagem", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Status", value: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: tripStatusTone[t.status], children: tripStatusLabel[t.status] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Início", value: formatDateTime(t.startedAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Fim", value: formatDateTime(t.finishedAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "KM inicial", value: num(t.initialKm) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "KM final", value: t.finalKm ? num(t.finalKm) : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Observações", value: t.notes || "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { title: "Responsáveis e ativo", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Motorista", value: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/admin/motoristas/${d?.id}`, className: "text-primary hover:underline", children: d?.name ?? "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Veículo", value: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/admin/veiculos/${v?.id}`, className: "text-primary hover:underline", children: [
            v?.plate,
            " · ",
            v?.brand,
            " ",
            v?.model
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Status do veículo", value: v ? /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: vehicleStatusTone[v.status], children: vehicleStatusLabel[v.status] }) : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Veículo temporário", value: t.temporaryVehicleAssignment ? "Sim, autorizado pelo admin" : "Não" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Abastecimentos da viagem", subtitle: "Motorista registra KM e litros; admin visualiza valores", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableShell, { head: ["Data", "KM", "Comb.", "Litros", "Valor"], children: tr.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: formatDateTime(r.date) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: num(r.currentKm) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: fuelTypeLabel[r.fuelType] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right", children: [
            num(r.liters),
            " L"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: brl(r.totalValue) })
        ] }, r.id)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Despesas da viagem", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableShell, { head: ["Data", "Tipo", "Valor", "Obs."], children: te.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: formatDateTime(e.date) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: expenseTypeLabel[e.type] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: brl(e.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: e.notes || "—" })
        ] }, e.id)) }) })
      ] })
    ] })
  ] });
}
export {
  TripDetail as component
};
