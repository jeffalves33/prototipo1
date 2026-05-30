import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { I as notFound } from "../_libs/tanstack__router-core.mjs";
import { A as ActionDialog } from "./ActionDialog-DXo9uEYP.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { R as Route$5, v as vehicles, m as maintenances, p as pendencies, s as services, h as mechanics } from "./router-BE5avutW.mjs";
import { n as num, b as brl, f as formatDate } from "./calculations-o3_zsC-D.mjs";
import { q as vehicleTypeLabel, v as vehicleStatusLabel, o as vehicleStatusTone, i as maintenanceTypeLabel, p as pendencySeverityLabel, j as pendencySeverityTone, s as serviceCategoryLabel, k as periodicityLabel, m as maintenanceStatusLabel, h as maintenanceStatusTone } from "./status-rules-wijUZOgZ.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
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
import "../_libs/isbot.mjs";
function MechanicVehicleDetail() {
  const {
    id
  } = Route$5.useParams();
  const v = vehicles.find((x) => x.id === id);
  if (!v) throw notFound();
  const vm = maintenances.filter((m) => m.vehicleId === v.id);
  const vp = pendencies.filter((p) => p.vehicleId === v.id && p.status === "aberta");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md space-y-4 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/mechanic/veiculos", className: "text-sm text-primary", children: "← Veículos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Detalhe do veículo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: v.plate }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            v.brand,
            " ",
            v.model,
            " · ",
            vehicleTypeLabel[v.type]
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: vehicleStatusTone[v.status], children: vehicleStatusLabel[v.status] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "KM atual" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold", children: num(v.currentKm) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Manutenções" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold", children: vm.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Custo histórico" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold", children: brl(v.totalMaintenanceCost) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Pendências" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold", children: vp.length })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "Registrar manutenção neste veículo", title: "Registrar manutenção", description: "Abra uma ordem vinculada ao veículo selecionado.", submitLabel: "Registrar", triggerClassName: "mt-4 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90", fields: [{
        label: "Veículo",
        type: "summary",
        value: `${v.plate} · ${v.brand} ${v.model}`
      }, {
        label: "Tipo",
        type: "select",
        options: Object.entries(maintenanceTypeLabel).map(([value, label]) => ({
          label,
          value
        }))
      }, {
        label: "Serviços",
        type: "checkboxes",
        options: services.map((s) => ({
          label: s.name,
          value: s.id
        }))
      }, {
        label: "Mecânico",
        type: "select",
        options: mechanics.map((m) => ({
          label: m.name,
          value: m.id
        }))
      }, {
        label: "KM atual",
        type: "number",
        value: v.currentKm
      }, {
        label: "Causa / descrição",
        type: "textarea",
        wide: true
      }] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Pendências do veículo" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
        vp.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 text-sm text-muted-foreground", children: "Nenhuma pendência aberta." }),
        vp.map((p) => {
          const s = services.find((x) => x.id === p.serviceId);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: p.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: pendencySeverityTone[p.severity], children: pendencySeverityLabel[p.severity] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: p.description }),
            s && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 rounded-lg bg-muted p-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: s.name }),
              " · ",
              serviceCategoryLabel[s.category],
              " · ",
              periodicityLabel(s.periodicityType, s.periodicityKm, s.periodicityDays)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "Registrar ação", title: "Registrar ação da pendência", description: "Informe o encaminhamento executado para esta pendência.", submitLabel: "Registrar ação", triggerClassName: "mt-3 w-full rounded-lg border border-input py-2 text-xs font-medium hover:bg-accent", fields: [{
              label: "Pendência",
              type: "summary",
              value: p.title
            }, {
              label: "Serviço",
              type: "summary",
              value: s?.name ?? "Não vinculado"
            }, {
              label: "Ação",
              type: "select",
              options: [{
                label: "Agendar serviço"
              }, {
                label: "Registrar manutenção"
              }, {
                label: "Marcar como resolvida"
              }]
            }, {
              label: "Observação",
              type: "textarea",
              wide: true
            }] })
          ] }, p.id);
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Histórico de manutenção" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: vm.map((m) => {
        const sv = m.serviceIds.map((sid) => services.find((s) => s.id === sid)).filter(Boolean);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
                maintenanceTypeLabel[m.maintenanceType],
                " · ",
                formatDate(m.date)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                "KM ",
                num(m.currentKm),
                " · ",
                brl(m.value)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: maintenanceStatusTone[m.status], children: maintenanceStatusLabel[m.status] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: m.cause }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1", children: sv.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-muted px-2 py-1 text-[11px]", children: s.name }, s.id)) })
        ] }, m.id);
      }) })
    ] })
  ] });
}
export {
  MechanicVehicleDetail as component
};
