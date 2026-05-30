import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { v as vehicles, p as pendencies, m as maintenances } from "./router-BE5avutW.mjs";
import { n as num } from "./calculations-o3_zsC-D.mjs";
import { v as vehicleStatusLabel, q as vehicleTypeLabel, o as vehicleStatusTone } from "./status-rules-wijUZOgZ.mjs";
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
function MechanicVehicles() {
  const [q, setQ] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("all");
  const filtered = vehicles.filter((v) => `${v.plate} ${v.brand} ${v.model}`.toLowerCase().includes(q.toLowerCase()) && (status === "all" || v.status === status));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md space-y-4 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Veículos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Frota para manutenção" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Abra o veículo para ver histórico, serviços e pendências." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar por placa ou modelo...", className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: status, onChange: (e) => setStatus(e.target.value), className: "mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todos os status" }),
        Object.entries(vehicleStatusLabel).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: filtered.map((v) => {
      const p = pendencies.filter((x) => x.vehicleId === v.id && x.status === "aberta");
      const m = maintenances.filter((x) => x.vehicleId === v.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/mechanic/veiculos/${v.id}`, className: "block rounded-xl border border-border bg-card p-3 hover:bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold", children: [
              v.plate,
              " · ",
              v.brand,
              " ",
              v.model
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              vehicleTypeLabel[v.type],
              " · KM ",
              num(v.currentKm)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: vehicleStatusTone[v.status], children: vehicleStatusLabel[v.status] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Pendências" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold", children: p.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted p-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Histórico" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold", children: m.length })
          ] })
        ] })
      ] }, v.id);
    }) })
  ] });
}
export {
  MechanicVehicles as component
};
