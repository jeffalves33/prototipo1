import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AdminTopbar } from "./AdminTopbar-RNvBK5Sw.mjs";
import { A as ActionDialog } from "./ActionDialog-DXo9uEYP.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { v as vehicles, f as drivers } from "./router-BE5avutW.mjs";
import { q as vehicleTypeLabel, v as vehicleStatusLabel, d as docStatusLabel, a as docStatusTone, o as vehicleStatusTone } from "./status-rules-wijUZOgZ.mjs";
import { n as num } from "./calculations-o3_zsC-D.mjs";
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
function VehiclesList() {
  const [q, setQ] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("all");
  const [type, setType] = reactExports.useState("all");
  const [driverId, setDriverId] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => vehicles.filter((v) => {
    if (q && !`${v.plate} ${v.brand} ${v.model}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (status !== "all" && v.status !== status) return false;
    if (type !== "all" && v.type !== type) return false;
    if (driverId !== "all" && v.mainDriverId !== driverId) return false;
    return true;
  }), [q, status, type, driverId]);
  const driverName = (id) => id ? drivers.find((d) => d.id === id)?.name ?? "—" : "Sem motorista";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Veículos", subtitle: `${filtered.length} de ${vehicles.length} veículos`, actions: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "+ Novo veículo", title: "Novo veículo", description: "Cadastre dados principais, documentação e vínculo inicial do veículo.", submitLabel: "Salvar veículo", triggerClassName: "rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90", fields: [{
      label: "Placa",
      placeholder: "ABC-1D23"
    }, {
      label: "Tipo",
      type: "select",
      options: Object.entries(vehicleTypeLabel).map(([value, label]) => ({
        label,
        value
      }))
    }, {
      label: "Marca",
      placeholder: "Scania"
    }, {
      label: "Modelo",
      placeholder: "R 450"
    }, {
      label: "Ano",
      type: "number",
      placeholder: "2026"
    }, {
      label: "Capacidade",
      placeholder: "29 ton"
    }, {
      label: "KM atual",
      type: "number",
      placeholder: "0"
    }, {
      label: "Motorista principal",
      type: "select",
      options: [{
        label: "Sem motorista",
        value: "none"
      }, ...drivers.map((d) => ({
        label: d.name,
        value: d.id
      }))]
    }, {
      label: "Vencimento documentação",
      type: "date"
    }, {
      label: "Vencimento tacógrafo",
      type: "date"
    }] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 rounded-lg border border-border bg-card p-3 sm:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar por placa ou modelo...", className: "rounded-md border border-input bg-background px-3 py-1.5 text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: status, onChange: (e) => setStatus(e.target.value), className: "rounded-md border border-input bg-background px-3 py-1.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todos os status" }),
          Object.entries(vehicleStatusLabel).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: type, onChange: (e) => setType(e.target.value), className: "rounded-md border border-input bg-background px-3 py-1.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todos os tipos" }),
          Object.entries(vehicleTypeLabel).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: driverId, onChange: (e) => setDriverId(e.target.value), className: "rounded-md border border-input bg-background px-3 py-1.5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Qualquer motorista" }),
          drivers.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d.id, children: d.name }, d.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Placa" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Veículo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Tipo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Motorista" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right font-medium", children: "KM atual" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Documentação" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-medium", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-border", children: [
          filtered.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: v.plate }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-foreground", children: [
              v.brand,
              " ",
              v.model,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "· ",
                v.year
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: vehicleTypeLabel[v.type] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: driverName(v.mainDriverId) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums text-foreground", children: num(v.currentKm) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: docStatusTone[v.documentationStatus], children: docStatusLabel[v.documentationStatus] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: vehicleStatusTone[v.status], children: vehicleStatusLabel[v.status] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/veiculos/$id", params: {
              id: v.id
            }, className: "text-sm font-medium text-primary hover:underline", children: "Detalhes →" }) })
          ] }, v.id)),
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 8, className: "px-4 py-10 text-center text-sm text-muted-foreground", children: "Nenhum veículo encontrado." }) })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  VehiclesList as component
};
