import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminTopbar } from "./AdminTopbar-RNvBK5Sw.mjs";
import { A as ActionDialog } from "./ActionDialog-DXo9uEYP.mjs";
import { F as FilterBar, S as SectionCard, M as MiniBar, T as TableShell } from "./AdminBlocks-DaczzGrM.mjs";
import { S as StatCard } from "./StatCard-xjKm0zZI.mjs";
import { t as trips, r as refuels, g as expenses, m as maintenances, v as vehicles, f as drivers } from "./router-BE5avutW.mjs";
import { s as sum, n as num, b as brl } from "./calculations-o3_zsC-D.mjs";
import { e as expenseTypeLabel, i as maintenanceTypeLabel } from "./status-rules-wijUZOgZ.mjs";
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
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
function ReportsPage() {
  const [period, setPeriod] = reactExports.useState("30");
  const [vehicleId, setVehicleId] = reactExports.useState("all");
  const [driverId, setDriverId] = reactExports.useState("all");
  const scopedTrips = reactExports.useMemo(() => trips.filter((t) => (vehicleId === "all" || t.vehicleId === vehicleId) && (driverId === "all" || t.driverId === driverId)), [vehicleId, driverId]);
  const scopedRefuels = refuels.filter((r) => (vehicleId === "all" || r.vehicleId === vehicleId) && (driverId === "all" || r.driverId === driverId));
  const scopedExpenses = expenses.filter((e) => (vehicleId === "all" || e.vehicleId === vehicleId) && (driverId === "all" || e.driverId === driverId));
  const scopedMaint = maintenances.filter((m) => vehicleId === "all" || m.vehicleId === vehicleId);
  const km = sum(scopedTrips.map((t) => t.totalKm ?? 0));
  const liters = sum(scopedRefuels.map((r) => r.liters));
  const fuelCost = sum(scopedRefuels.map((r) => r.totalValue));
  const expCost = sum(scopedExpenses.map((e) => e.value));
  const maintCost = sum(scopedMaint.map((m) => m.value));
  const byVehicle = vehicles.map((v) => ({
    v,
    km: sum(scopedTrips.filter((t) => t.vehicleId === v.id).map((t) => t.totalKm ?? 0)),
    cost: sum(scopedRefuels.filter((r) => r.vehicleId === v.id).map((r) => r.totalValue)) + sum(scopedExpenses.filter((e) => e.vehicleId === v.id).map((e) => e.value)) + sum(scopedMaint.filter((m) => m.vehicleId === v.id).map((m) => m.value))
  })).filter((x) => vehicleId === "all" || x.v.id === vehicleId).sort((a, b) => b.cost - a.cost);
  const maxCost = Math.max(1, ...byVehicle.map((x) => x.cost));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Relatórios", subtitle: "Análise executiva por período, veículo, motorista e categoria", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "Gerar PDF mock", title: "Gerar relatório", description: "Configure a exportação do relatório executivo.", submitLabel: "Gerar PDF", fields: [{
      label: "Período",
      type: "select",
      value: period,
      options: [{
        label: "Últimos 7 dias",
        value: "7"
      }, {
        label: "Últimos 30 dias",
        value: "30"
      }, {
        label: "Últimos 90 dias",
        value: "90"
      }, {
        label: "Ano atual",
        value: "365"
      }]
    }, {
      label: "Veículo",
      type: "select",
      value: vehicleId,
      options: [{
        label: "Todos os veículos",
        value: "all"
      }, ...vehicles.map((v) => ({
        label: `${v.plate} · ${v.model}`,
        value: v.id
      }))]
    }, {
      label: "Motorista",
      type: "select",
      value: driverId,
      options: [{
        label: "Todos os motoristas",
        value: "all"
      }, ...drivers.map((d) => ({
        label: d.name,
        value: d.id
      }))]
    }, {
      label: "Seções",
      type: "checkboxes",
      options: [{
        label: "Ranking de custo"
      }, {
        label: "Despesas por categoria"
      }, {
        label: "Manutenção preventiva x corretiva"
      }, {
        label: "Resumo por motorista"
      }]
    }] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterBar, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: period, onChange: (e) => setPeriod(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7", children: "Últimos 7 dias" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30", children: "Últimos 30 dias" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "90", children: "Últimos 90 dias" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "365", children: "Ano atual" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: vehicleId, onChange: (e) => setVehicleId(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todos os veículos" }),
          vehicles.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: v.id, children: [
            v.plate,
            " · ",
            v.model
          ] }, v.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: driverId, onChange: (e) => setDriverId(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todos os motoristas" }),
          drivers.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d.id, children: d.name }, d.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground", children: [
          "Filtro aplicado no mock: ",
          period,
          " dias"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "KM", value: num(km) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Litros", value: `${num(liters)} L` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Combustível", value: brl(fuelCost) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Manutenção", value: brl(maintCost), tone: "danger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Despesas", value: brl(expCost), tone: "warn" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 xl:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Ranking de custo por veículo", subtitle: "Combustível + manutenção + despesas", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: byVehicle.map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx(MiniBar, { label: `${x.v.plate} — ${x.v.model}`, value: x.cost, max: maxCost, right: brl(x.cost) }, x.v.id)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Despesas por categoria", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Object.entries(expenseTypeLabel).map(([k, label]) => {
          const v = sum(scopedExpenses.filter((e) => e.type === k).map((e) => e.value));
          return /* @__PURE__ */ jsxRuntimeExports.jsx(MiniBar, { label, value: v, max: Math.max(1, expCost), right: brl(v) }, k);
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Manutenção preventiva x corretiva", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2", children: Object.entries(maintenanceTypeLabel).map(([k, label]) => {
          const list = scopedMaint.filter((m) => m.maintenanceType === k);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase text-muted-foreground", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-3xl font-semibold", children: list.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: brl(sum(list.map((m) => m.value))) })
          ] }, k);
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Resumo por motorista", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableShell, { head: ["Motorista", "Viagens", "KM", "Litros", "Despesas"], children: drivers.map((d) => {
          const tr = scopedTrips.filter((t) => t.driverId === d.id);
          const rf = scopedRefuels.filter((r) => r.driverId === d.id);
          const ex = scopedExpenses.filter((e) => e.driverId === d.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: d.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: tr.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: num(sum(tr.map((t) => t.totalKm ?? 0))) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right", children: [
              num(sum(rf.map((r) => r.liters))),
              " L"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: brl(sum(ex.map((e) => e.value))) })
          ] }, d.id);
        }) }) })
      ] })
    ] })
  ] });
}
export {
  ReportsPage as component
};
