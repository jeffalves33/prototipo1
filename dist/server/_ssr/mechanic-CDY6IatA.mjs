import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useRouterState, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useProfile } from "./router-BE5avutW.mjs";
import { c as LogOut, H as Hammer, T as TriangleAlert, f as Truck, b as ListChecks } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
const tabs = [{
  to: "/mechanic",
  label: "Manutenções",
  icon: Hammer,
  exact: true
}, {
  to: "/mechanic/pendencias",
  label: "Pendências",
  icon: TriangleAlert
}, {
  to: "/mechanic/veiculos",
  label: "Veículos",
  icon: Truck
}, {
  to: "/mechanic/servicos",
  label: "Serviços",
  icon: ListChecks
}];
function MechanicLayout() {
  const {
    setProfile
  } = useProfile();
  const path = useRouterState({
    select: (s) => s.location.pathname
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-background pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold uppercase tracking-widest text-primary", children: "Frota" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-semibold text-foreground", children: "Mecânico" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setProfile(null), className: "flex items-center gap-1 rounded-md border border-input px-2 py-1 text-xs text-muted-foreground hover:bg-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5" }),
        "Sair"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "fixed inset-x-0 bottom-0 z-20 flex border-t border-border bg-card", children: tabs.map((t) => {
      const active = "exact" in t && t.exact ? path === t.to : path.startsWith(t.to);
      const Icon = t.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: t.to, className: `flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }),
        t.label
      ] }, t.to);
    }) })
  ] });
}
export {
  MechanicLayout as component
};
