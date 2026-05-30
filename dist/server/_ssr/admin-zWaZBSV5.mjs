import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { O as Outlet, e as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useProfile } from "./router-BE5avutW.mjs";
import { c as LogOut, L as LayoutDashboard, f as Truck, g as Users, W as Wrench, M as MapPinned, F as Fuel, R as Receipt, H as Hammer, b as ListChecks, T as TriangleAlert, C as ChartColumn } from "../_libs/lucide-react.mjs";
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
const items = [
  { to: "/admin/dashboard", label: "Dashboard", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4" }) },
  { to: "/admin/veiculos", label: "Veículos", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4" }) },
  { to: "/admin/motoristas", label: "Motoristas", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }) },
  { to: "/admin/mecanicos", label: "Mecânicos", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-4 w-4" }) },
  { to: "/admin/viagens", label: "Viagens", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPinned, { className: "h-4 w-4" }) },
  { to: "/admin/abastecimentos", label: "Abastecimentos", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Fuel, { className: "h-4 w-4" }) },
  { to: "/admin/despesas", label: "Despesas", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-4 w-4" }) },
  { to: "/admin/manutencoes", label: "Manutenções", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Hammer, { className: "h-4 w-4" }) },
  { to: "/admin/servicos", label: "Serviços", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-4 w-4" }) },
  { to: "/admin/pendencias", label: "Pendências", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4" }) },
  { to: "/admin/relatorios", label: "Relatórios", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4" }) }
];
function AdminSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { setProfile } = useProfile();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden lg:flex w-60 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-5 border-b border-sidebar-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-sidebar-foreground/60", children: "Frota ERP" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-lg font-semibold", children: "Administrador" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 overflow-y-auto py-3", children: items.map((it) => {
      const active = path === it.to || path.startsWith(it.to + "/");
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: it.to,
          className: `flex items-center gap-3 px-5 py-2 text-sm transition-colors ${active ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-primary" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground border-l-2 border-transparent"}`,
          children: [
            it.icon,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: it.label })
          ]
        },
        it.to
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setProfile(null),
        className: "flex items-center gap-2 border-t border-sidebar-border px-5 py-3 text-sm text-sidebar-foreground/80 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/60",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          "Trocar perfil"
        ]
      }
    )
  ] });
}
function AdminLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen w-full bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminSidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 min-w-0 flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
export {
  AdminLayout as component
};
