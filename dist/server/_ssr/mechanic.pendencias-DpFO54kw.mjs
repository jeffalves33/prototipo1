import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { p as pendencies, v as vehicles, s as services } from "./router-BE5avutW.mjs";
import { n as num, f as formatDate } from "./calculations-o3_zsC-D.mjs";
import { p as pendencySeverityLabel, j as pendencySeverityTone, s as serviceCategoryLabel } from "./status-rules-wijUZOgZ.mjs";
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
const groups = [{
  key: "critica",
  title: "Críticas"
}, {
  key: "atencao",
  title: "Atenção"
}, {
  key: "baixa",
  title: "Baixa"
}];
function MechanicPendencies() {
  const open = pendencies.filter((p) => p.status === "aberta");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md space-y-4 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Pendências" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Fila de manutenção" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        open.length,
        " itens em aberto para revisar ou executar."
      ] })
    ] }),
    groups.map((g) => {
      const list = open.filter((p) => p.severity === g.key);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold", children: [
          g.title,
          " (",
          list.length,
          ")"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
          list.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-sm text-muted-foreground", children: "Nenhum item." }),
          list.map((p) => {
            const v = vehicles.find((x) => x.id === p.vehicleId);
            const s = services.find((x) => x.id === p.serviceId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: v ? `/mechanic/veiculos/${v.id}` : "#", className: "block p-3 hover:bg-muted/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: p.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: p.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: pendencySeverityTone[p.severity], children: pendencySeverityLabel[p.severity] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-2 text-[11px] text-muted-foreground", children: [
                v && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  v.plate,
                  " · ",
                  v.model
                ] }),
                s && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  serviceCategoryLabel[s.category],
                  " · ",
                  s.name
                ] }),
                p.currentKm && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Atual ",
                  num(p.currentKm),
                  " km"
                ] }),
                p.dueKm && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Limite ",
                  num(p.dueKm),
                  " km"
                ] }),
                p.dueDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Prazo ",
                  formatDate(p.dueDate)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mt-3 w-full rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground", children: p.actionLabel })
            ] }, p.id);
          })
        ] })
      ] }, g.key);
    })
  ] });
}
export {
  MechanicPendencies as component
};
