import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminTopbar } from "./AdminTopbar-RNvBK5Sw.mjs";
import { A as ActionDialog } from "./ActionDialog-DXo9uEYP.mjs";
import { F as FilterBar, T as TableShell } from "./AdminBlocks-DaczzGrM.mjs";
import { S as StatCard } from "./StatCard-xjKm0zZI.mjs";
import { g as expenses, f as drivers, v as vehicles, t as trips } from "./router-BE5avutW.mjs";
import { s as sum, b as brl, a as formatDateTime } from "./calculations-o3_zsC-D.mjs";
import { e as expenseTypeLabel } from "./status-rules-wijUZOgZ.mjs";
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
function ExpensesPage() {
  const [q, setQ] = reactExports.useState("");
  const [type, setType] = reactExports.useState("all");
  const [driverId, setDriverId] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => expenses.filter((e) => {
    const d = drivers.find((x) => x.id === e.driverId);
    const v = vehicles.find((x) => x.id === e.vehicleId);
    const t = trips.find((x) => x.id === e.tripId);
    const text = `${d?.name ?? ""} ${v?.plate ?? ""} ${t?.origin ?? ""} ${t?.destination ?? ""} ${e.notes}`.toLowerCase();
    return text.includes(q.toLowerCase()) && (type === "all" || e.type === type) && (driverId === "all" || e.driverId === driverId);
  }), [q, type, driverId]);
  const total = sum(filtered.map((e) => e.value));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Despesas de viagem", subtitle: "Pedágio, alimentação, hospedagem, descarga e outros custos por viagem", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "+ Nova despesa", title: "Nova despesa", description: "Registre uma despesa vinculada ao motorista, veículo e viagem.", submitLabel: "Salvar despesa", fields: [{
      label: "Tipo",
      type: "select",
      options: Object.entries(expenseTypeLabel).map(([value, label]) => ({
        label,
        value
      }))
    }, {
      label: "Valor",
      type: "number",
      placeholder: "180,00"
    }, {
      label: "Motorista",
      type: "select",
      options: drivers.map((d) => ({
        label: d.name,
        value: d.id
      }))
    }, {
      label: "Veículo",
      type: "select",
      options: vehicles.map((v) => ({
        label: `${v.plate} · ${v.model}`,
        value: v.id
      }))
    }, {
      label: "Viagem",
      type: "select",
      options: trips.map((t) => ({
        label: `${t.origin} → ${t.destination}`,
        value: t.id
      }))
    }, {
      label: "Data",
      type: "date",
      value: "2026-05-28"
    }, {
      label: "Observação",
      type: "textarea",
      wide: true
    }] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Registros", value: filtered.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total", value: brl(total), tone: "warn" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Média por registro", value: brl(filtered.length ? total / filtered.length : 0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Motoristas", value: new Set(filtered.map((e) => e.driverId)).size })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterBar, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar motorista, placa, rota...", className: "rounded-md border border-input bg-background px-3 py-2 text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: type, onChange: (e) => setType(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todos os tipos" }),
          Object.entries(expenseTypeLabel).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: driverId, onChange: (e) => setDriverId(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todos os motoristas" }),
          drivers.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d.id, children: d.name }, d.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground", children: [
          filtered.length,
          " registros"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableShell, { head: ["Data", "Tipo", "Motorista", "Veículo", "Viagem", "Valor", "Obs."], children: filtered.map((e) => {
        const d = drivers.find((x) => x.id === e.driverId);
        const v = vehicles.find((x) => x.id === e.vehicleId);
        const t = trips.find((x) => x.id === e.tripId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: formatDateTime(e.date) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: expenseTypeLabel[e.type] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: d?.name ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: v?.plate ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: t ? `${t.origin} → ${t.destination}` : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: brl(e.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: e.notes || "—" })
        ] }, e.id);
      }) })
    ] })
  ] });
}
export {
  ExpensesPage as component
};
