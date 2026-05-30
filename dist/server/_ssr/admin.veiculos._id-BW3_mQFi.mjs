import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { I as notFound } from "../_libs/tanstack__router-core.mjs";
import { A as AdminTopbar } from "./AdminTopbar-RNvBK5Sw.mjs";
import { A as ActionDialog } from "./ActionDialog-DXo9uEYP.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { S as StatCard } from "./StatCard-xjKm0zZI.mjs";
import { b as Route$3, v as vehicles, f as drivers, t as trips, r as refuels, g as expenses, m as maintenances, p as pendencies } from "./router-BE5avutW.mjs";
import { q as vehicleTypeLabel, v as vehicleStatusLabel, o as vehicleStatusTone, t as tripStatusLabel, n as tripStatusTone, f as fuelTypeLabel, e as expenseTypeLabel, i as maintenanceTypeLabel, m as maintenanceStatusLabel, h as maintenanceStatusTone, p as pendencySeverityLabel, j as pendencySeverityTone, d as docStatusLabel, a as docStatusTone } from "./status-rules-wijUZOgZ.mjs";
import { s as sum, v as vehicleTotalCost, n as num, b as brl, f as formatDate, a as formatDateTime } from "./calculations-o3_zsC-D.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
const tabs = [{
  id: "overview",
  label: "Visão geral"
}, {
  id: "trips",
  label: "Viagens"
}, {
  id: "refuels",
  label: "Abastecimentos"
}, {
  id: "expenses",
  label: "Despesas"
}, {
  id: "maintenance",
  label: "Manutenções"
}, {
  id: "pendencies",
  label: "Pendências"
}, {
  id: "docs",
  label: "Documentação"
}];
function VehicleDetail() {
  const {
    id
  } = Route$3.useParams();
  const v = vehicles.find((x) => x.id === id);
  if (!v) throw notFound();
  const [tab, setTab] = reactExports.useState("overview");
  const driver = v.mainDriverId ? drivers.find((d) => d.id === v.mainDriverId) : null;
  const vTrips = trips.filter((t) => t.vehicleId === v.id);
  const vRefuels = refuels.filter((r) => r.vehicleId === v.id);
  const vExpenses = expenses.filter((e) => e.vehicleId === v.id);
  const vMaint = maintenances.filter((m) => m.vehicleId === v.id);
  const vPend = pendencies.filter((p) => p.vehicleId === v.id);
  const totalKm = sum(vTrips.filter((t) => t.totalKm != null).map((t) => t.totalKm));
  const totalLiters = sum(vRefuels.map((r) => r.liters));
  const avgCons = totalLiters > 0 ? totalKm / totalLiters : 0;
  const totalCost = vehicleTotalCost(v, vRefuels, vExpenses, vMaint);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: `${v.plate} — ${v.brand} ${v.model}`, subtitle: `${vehicleTypeLabel[v.type]} · ${v.year} · ${v.capacity}`, actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/veiculos", className: "rounded-md border border-input bg-card px-3 py-1.5 text-sm hover:bg-accent", children: "← Voltar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "Alterar status", title: "Alterar status do veículo", description: "Atualize a disponibilidade operacional deste veículo.", submitLabel: "Salvar status", triggerClassName: "rounded-md border border-input bg-card px-3 py-1.5 text-sm hover:bg-accent", fields: [{
        label: "Status atual",
        type: "summary",
        value: vehicleStatusLabel[v.status]
      }, {
        label: "Novo status",
        type: "select",
        value: v.status,
        options: Object.entries(vehicleStatusLabel).map(([value, label]) => ({
          label,
          value
        }))
      }, {
        label: "Motivo",
        type: "textarea",
        wide: true
      }] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "Atribuir motorista", title: "Atribuir motorista", description: "Defina o motorista principal deste veículo.", submitLabel: "Salvar vínculo", triggerClassName: "rounded-md border border-input bg-card px-3 py-1.5 text-sm hover:bg-accent", fields: [{
        label: "Veículo",
        type: "summary",
        value: `${v.plate} · ${v.brand} ${v.model}`
      }, {
        label: "Motorista",
        type: "select",
        value: driver?.id ?? "none",
        options: [{
          label: "Sem motorista",
          value: "none"
        }, ...drivers.map((d) => ({
          label: d.name,
          value: d.id
        }))]
      }, {
        label: "Observação",
        type: "textarea",
        wide: true
      }] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "Veículo temporário p/ viagem", title: "Autorizar veículo temporário", description: "Escolha uma viagem e registre este veículo como substituto temporário.", submitLabel: "Autorizar", triggerClassName: "rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90", fields: [{
        label: "Viagem",
        type: "select",
        options: trips.map((t) => ({
          label: `${t.origin} → ${t.destination}`,
          value: t.id
        }))
      }, {
        label: "Motorista",
        type: "select",
        options: drivers.map((d) => ({
          label: d.name,
          value: d.id
        }))
      }, {
        label: "Veículo temporário",
        type: "summary",
        value: `${v.plate} · ${v.brand} ${v.model}`
      }, {
        label: "Justificativa",
        type: "textarea",
        wide: true
      }] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: vehicleStatusTone[v.status], children: vehicleStatusLabel[v.status] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-xs text-muted-foreground", children: [
            "Motorista: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: driver?.name ?? "—" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "KM atual", value: num(v.currentKm) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Consumo médio", value: `${avgCons.toFixed(2)} km/L`, hint: "histórico" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Custo total", value: brl(totalCost), tone: "danger", hint: "combustível + manut. + desp." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 rounded-lg border border-border bg-card p-1", children: tabs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(t.id), className: `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`, children: t.label }, t.id)) }),
      tab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Dados cadastrais", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Placa", v: v.plate }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Tipo", v: vehicleTypeLabel[v.type] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Marca / Modelo", v: `${v.brand} ${v.model}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Ano", v: String(v.year) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Capacidade", v: v.capacity }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Cadastrado em", v: formatDate(v.createdAt) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Indicadores operacionais", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "KM total rodado", v: num(totalKm) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Litros abastecidos", v: num(totalLiters) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Viagens", v: String(vTrips.length) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Manutenções", v: String(vMaint.length) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Custo manutenção", v: brl(sum(vMaint.map((m) => m.value))) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Pendências abertas", v: String(vPend.length) })
        ] })
      ] }),
      tab === "trips" && /* @__PURE__ */ jsxRuntimeExports.jsx(Table, { head: ["Início", "Origem → Destino", "Motorista", "KM", "Status"], children: vTrips.map((t) => {
        const d = drivers.find((x) => x.id === t.driverId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: formatDateTime(t.startedAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2.5", children: [
            t.origin,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "→" }),
            " ",
            t.destination
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: d?.name ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right tabular-nums", children: t.totalKm != null ? num(t.totalKm) : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: tripStatusTone[t.status], children: tripStatusLabel[t.status] }) })
        ] }, t.id);
      }) }),
      tab === "refuels" && /* @__PURE__ */ jsxRuntimeExports.jsx(Table, { head: ["Data", "KM", "Combustível", "Litros", "Valor"], children: vRefuels.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: formatDateTime(r.date) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right tabular-nums", children: num(r.currentKm) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: fuelTypeLabel[r.fuelType] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2.5 text-right tabular-nums", children: [
          num(r.liters),
          " L"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right tabular-nums", children: brl(r.totalValue) })
      ] }, r.id)) }),
      tab === "expenses" && /* @__PURE__ */ jsxRuntimeExports.jsx(Table, { head: ["Data", "Tipo", "Motorista", "Valor", "Observação"], children: vExpenses.map((e) => {
        const d = drivers.find((x) => x.id === e.driverId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: formatDateTime(e.date) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: expenseTypeLabel[e.type] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: d?.name ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right tabular-nums", children: brl(e.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground", children: e.notes || "—" })
        ] }, e.id);
      }) }),
      tab === "maintenance" && /* @__PURE__ */ jsxRuntimeExports.jsx(Table, { head: ["Data", "Tipo", "Causa", "KM", "Valor", "Status"], children: vMaint.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: formatDate(m.date) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: maintenanceTypeLabel[m.maintenanceType] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: m.cause }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right tabular-nums", children: num(m.currentKm) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right tabular-nums", children: brl(m.value) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: maintenanceStatusTone[m.status], children: maintenanceStatusLabel[m.status] }) })
      ] }, m.id)) }),
      tab === "pendencies" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card divide-y divide-border", children: [
        vPend.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-center text-sm text-muted-foreground", children: "Sem pendências." }),
        vPend.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground", children: p.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: p.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: pendencySeverityTone[p.severity], children: pendencySeverityLabel[p.severity] })
        ] }, p.id))
      ] }),
      tab === "docs" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Documentação do veículo", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Vencimento", v: formatDate(v.documentationDueDate) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-1.5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: docStatusTone[v.documentationStatus], children: docStatusLabel[v.documentationStatus] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Tacógrafo", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "Vencimento", v: formatDate(v.tachographDueDate) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-1.5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: docStatusTone[v.tachographStatus], children: docStatusLabel[v.tachographStatus] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Card({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 divide-y divide-border", children })
  ] });
}
function Row({
  k,
  v
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-1.5 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: v })
  ] });
}
function Table({
  head,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: head.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: `px-4 py-2.5 font-medium ${i >= head.length - 2 ? "text-right" : "text-left"}`, children: h }, h)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children })
  ] }) });
}
export {
  VehicleDetail as component
};
