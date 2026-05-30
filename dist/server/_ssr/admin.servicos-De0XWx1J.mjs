import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AdminTopbar } from "./AdminTopbar-RNvBK5Sw.mjs";
import { A as ActionDialog } from "./ActionDialog-DXo9uEYP.mjs";
import { F as FilterBar, T as TableShell } from "./AdminBlocks-DaczzGrM.mjs";
import { S as StatCard } from "./StatCard-xjKm0zZI.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { s as services, m as maintenances } from "./router-BE5avutW.mjs";
import { s as serviceCategoryLabel, i as maintenanceTypeLabel, k as periodicityLabel } from "./status-rules-wijUZOgZ.mjs";
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
function ServicesPage() {
  const [q, setQ] = reactExports.useState("");
  const [cat, setCat] = reactExports.useState("all");
  const [periodicity, setPeriodicity] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => services.filter((s) => `${s.name} ${s.description}`.toLowerCase().includes(q.toLowerCase()) && (cat === "all" || s.category === cat) && (periodicity === "all" || s.periodicityType === periodicity)), [q, cat, periodicity]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Serviços", subtitle: "Cadastro de serviços periódicos. Óleo e pneus são categorias de serviço, não módulos separados.", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "+ Novo serviço", title: "Novo serviço", description: "Cadastre um serviço periódico ou corretivo para usar nas manutenções.", submitLabel: "Salvar serviço", fields: [{
      label: "Nome",
      placeholder: "Troca de óleo do motor"
    }, {
      label: "Categoria",
      type: "select",
      options: Object.entries(serviceCategoryLabel).map(([value, label]) => ({
        label,
        value
      }))
    }, {
      label: "Tipo sugerido",
      type: "select",
      options: Object.entries(maintenanceTypeLabel).map(([value, label]) => ({
        label,
        value
      }))
    }, {
      label: "Periodicidade",
      type: "select",
      options: [{
        label: "Por KM",
        value: "km"
      }, {
        label: "Por tempo",
        value: "time"
      }, {
        label: "Sem recorrência",
        value: "none"
      }]
    }, {
      label: "KM de recorrência",
      type: "number",
      placeholder: "10000"
    }, {
      label: "Dias de recorrência",
      type: "number",
      placeholder: "365"
    }, {
      label: "Descrição",
      type: "textarea",
      wide: true
    }] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Serviços", value: services.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Por KM", value: services.filter((s) => s.periodicityType === "km").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Por tempo", value: services.filter((s) => s.periodicityType === "time").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Sem recorrência", value: services.filter((s) => s.periodicityType === "none").length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterBar, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar serviço...", className: "rounded-md border border-input bg-background px-3 py-2 text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: cat, onChange: (e) => setCat(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todas categorias" }),
          Object.entries(serviceCategoryLabel).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: periodicity, onChange: (e) => setPeriodicity(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todas periodicidades" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "km", children: "Por KM" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "time", children: "Por tempo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "none", children: "Sem recorrência" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground", children: [
          filtered.length,
          " de ",
          services.length,
          " registros"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableShell, { head: ["Serviço", "Categoria", "Tipo sugerido", "Periodicidade", "Uso", "Status", ""], children: filtered.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-medium", children: [
          s.name,
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: serviceCategoryLabel[s.category] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: maintenanceTypeLabel[s.suggestedMaintenanceType] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: periodicityLabel(s.periodicityType, s.periodicityKm, s.periodicityDays) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: maintenances.filter((m) => m.serviceIds.includes(s.id)).length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: s.status === "ativo" ? "ok" : "muted", children: s.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/servicos/$id", params: {
          id: s.id
        }, className: "font-medium text-primary hover:underline", children: "Detalhes →" }) })
      ] }, s.id)) })
    ] })
  ] });
}
export {
  ServicesPage as component
};
