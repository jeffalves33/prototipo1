import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminTopbar } from "./AdminTopbar-RNvBK5Sw.mjs";
import { A as ActionDialog } from "./ActionDialog-DXo9uEYP.mjs";
import { S as SectionCard } from "./AdminBlocks-DaczzGrM.mjs";
import { S as StatCard } from "./StatCard-xjKm0zZI.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { p as pendencies, v as vehicles, f as drivers, s as services } from "./router-BE5avutW.mjs";
import { n as num, f as formatDate } from "./calculations-o3_zsC-D.mjs";
import { s as serviceCategoryLabel, p as pendencySeverityLabel, j as pendencySeverityTone } from "./status-rules-wijUZOgZ.mjs";
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
const groups = [{
  key: "critica",
  title: "Críticas",
  desc: "Exigem ação imediata"
}, {
  key: "atencao",
  title: "Atenção",
  desc: "Próximas do prazo ou limite"
}, {
  key: "baixa",
  title: "Baixa",
  desc: "Acompanhamento"
}];
function PendenciesPage() {
  const open = pendencies.filter((p) => p.status === "aberta");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Pendências", subtitle: "Fila centralizada de riscos: serviços, documentação, CNH, tacógrafo e manutenções abertas", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "Exportar lista", title: "Exportar pendências", description: "Configure o arquivo com os itens abertos da fila.", submitLabel: "Exportar", fields: [{
      label: "Severidade",
      type: "select",
      options: [{
        label: "Todas",
        value: "all"
      }, {
        label: "Críticas",
        value: "critica"
      }, {
        label: "Atenção",
        value: "atencao"
      }, {
        label: "Baixa",
        value: "baixa"
      }]
    }, {
      label: "Formato",
      type: "select",
      options: [{
        label: "PDF",
        value: "pdf"
      }, {
        label: "CSV",
        value: "csv"
      }, {
        label: "XLSX",
        value: "xlsx"
      }]
    }, {
      label: "Incluir",
      type: "checkboxes",
      options: [{
        label: "Veículo ou motorista vinculado"
      }, {
        label: "Serviço relacionado"
      }, {
        label: "Prazo e quilometragem"
      }, {
        label: "Ação recomendada"
      }]
    }] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Abertas", value: open.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Críticas", value: open.filter((p) => p.severity === "critica").length, tone: "danger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Atenção", value: open.filter((p) => p.severity === "atencao").length, tone: "warn" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Baixa", value: open.filter((p) => p.severity === "baixa").length, tone: "ok" })
      ] }),
      groups.map((g) => {
        const list = open.filter((p) => p.severity === g.key);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: `${g.title} (${list.length})`, subtitle: g.desc, children: list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Nenhuma pendência neste grupo." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: list.map((p) => {
          const v = vehicles.find((x) => x.id === p.vehicleId);
          const d = drivers.find((x) => x.id === p.driverId);
          const s = services.find((x) => x.id === p.serviceId);
          const href = v ? `/admin/veiculos/${v.id}` : d ? `/admin/motoristas/${d.id}` : "#";
          return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, className: "block py-3 hover:bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground", children: p.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: p.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground", children: [
                v && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Veículo: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: v.plate })
                ] }),
                d && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Motorista: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: d.name })
                ] }),
                s && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Serviço: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: s.name }),
                  " · ",
                  serviceCategoryLabel[s.category]
                ] }),
                p.dueKm && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Limite: ",
                  num(p.dueKm),
                  " km"
                ] }),
                p.currentKm && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Atual: ",
                  num(p.currentKm),
                  " km"
                ] }),
                p.dueDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Prazo: ",
                  formatDate(p.dueDate)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: pendencySeverityTone[p.severity], children: pendencySeverityLabel[p.severity] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md border border-input px-2 py-1 text-xs text-primary", children: p.actionLabel })
            ] })
          ] }) }, p.id);
        }) }) }, g.key);
      })
    ] })
  ] });
}
export {
  PendenciesPage as component
};
