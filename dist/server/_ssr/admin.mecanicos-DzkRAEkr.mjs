import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminTopbar } from "./AdminTopbar-RNvBK5Sw.mjs";
import { A as ActionDialog } from "./ActionDialog-DXo9uEYP.mjs";
import { T as TableShell } from "./AdminBlocks-DaczzGrM.mjs";
import { S as StatCard } from "./StatCard-xjKm0zZI.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { h as mechanics, m as maintenances, v as vehicles } from "./router-BE5avutW.mjs";
import { s as sum, b as brl } from "./calculations-o3_zsC-D.mjs";
import { m as maintenanceStatusLabel, h as maintenanceStatusTone, i as maintenanceTypeLabel } from "./status-rules-wijUZOgZ.mjs";
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
function MechanicsPage() {
  const active = mechanics.filter((m) => m.status === "ativo").length;
  const open = maintenances.filter((m) => m.status !== "concluida" && m.status !== "cancelada").length;
  const cost = sum(maintenances.map((m) => m.value));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Mecânicos", subtitle: "Responsáveis por manutenção e carga de trabalho", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "+ Novo mecânico", title: "Novo mecânico", description: "Cadastre um responsável para ordens de manutenção.", submitLabel: "Salvar mecânico", fields: [{
      label: "Nome",
      placeholder: "Nome completo"
    }, {
      label: "Telefone",
      placeholder: "(11) 99999-9999"
    }, {
      label: "Especialidade",
      placeholder: "Motor e Diesel"
    }, {
      label: "Status",
      type: "select",
      options: [{
        label: "Ativo",
        value: "ativo"
      }, {
        label: "Inativo",
        value: "inativo"
      }]
    }] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Mecânicos", value: mechanics.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Ativos", value: active, tone: "ok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Manutenções abertas", value: open, tone: "warn" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Valor executado", value: brl(cost) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableShell, { head: ["Mecânico", "Especialidade", "Contato", "Manutenções", "Abertas", "Valor", "Últimas ordens"], children: mechanics.map((m) => {
        const list = maintenances.filter((x) => x.mechanicId === m.id);
        const listOpen = list.filter((x) => x.status !== "concluida" && x.status !== "cancelada");
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold", children: [
            m.name,
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-normal text-muted-foreground", children: m.status === "ativo" ? "Ativo" : "Inativo" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: m.specialty }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: m.phone }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: list.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: listOpen.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: brl(sum(list.map((x) => x.value))) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: list.slice(0, 2).map((x) => {
            const v = vehicles.find((a) => a.id === x.vehicleId);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: maintenanceStatusTone[x.status], children: maintenanceStatusLabel[x.status] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                v?.plate,
                " · ",
                maintenanceTypeLabel[x.maintenanceType]
              ] })
            ] }, x.id);
          }) }) })
        ] }, m.id);
      }) })
    ] })
  ] });
}
export {
  MechanicsPage as component
};
