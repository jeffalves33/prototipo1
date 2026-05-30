import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { s as services, p as pendencies } from "./router-BE5avutW.mjs";
import { s as serviceCategoryLabel, i as maintenanceTypeLabel, k as periodicityLabel } from "./status-rules-wijUZOgZ.mjs";
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
function MechanicServices() {
  const [q, setQ] = reactExports.useState("");
  const [cat, setCat] = reactExports.useState("all");
  const filtered = services.filter((s) => `${s.name} ${s.description}`.toLowerCase().includes(q.toLowerCase()) && (cat === "all" || s.category === cat));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md space-y-4 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Serviços" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Catálogo de manutenção" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Óleo e pneus são categorias de serviço periódico." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar serviço...", className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: cat, onChange: (e) => setCat(e.target.value), className: "mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todas categorias" }),
        Object.entries(serviceCategoryLabel).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filtered.map((s) => {
      const count = pendencies.filter((p) => p.serviceId === s.id).length;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: serviceCategoryLabel[s.category] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: s.suggestedMaintenanceType === "preventiva" ? "ok" : "warn", children: maintenanceTypeLabel[s.suggestedMaintenanceType] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: s.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-lg bg-muted px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Periodicidade:" }),
          " ",
          periodicityLabel(s.periodicityType, s.periodicityKm, s.periodicityDays)
        ] }),
        count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-destructive", children: [
          count,
          " pendência(s) relacionada(s)"
        ] })
      ] }, s.id);
    }) })
  ] });
}
export {
  MechanicServices as component
};
