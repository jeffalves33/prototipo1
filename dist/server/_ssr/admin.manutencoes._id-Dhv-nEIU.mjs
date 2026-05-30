import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { I as notFound } from "../_libs/tanstack__router-core.mjs";
import { A as AdminTopbar } from "./AdminTopbar-RNvBK5Sw.mjs";
import { A as ActionDialog } from "./ActionDialog-DXo9uEYP.mjs";
import { S as SectionCard, D as DetailRow } from "./AdminBlocks-DaczzGrM.mjs";
import { S as StatCard } from "./StatCard-xjKm0zZI.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { e as Route, m as maintenances, v as vehicles, h as mechanics, s as services, p as pendencies } from "./router-BE5avutW.mjs";
import { b as brl, n as num, f as formatDate } from "./calculations-o3_zsC-D.mjs";
import { i as maintenanceTypeLabel, m as maintenanceStatusLabel, h as maintenanceStatusTone, s as serviceCategoryLabel, k as periodicityLabel, p as pendencySeverityLabel, j as pendencySeverityTone } from "./status-rules-wijUZOgZ.mjs";
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
function MaintenanceDetail() {
  const {
    id
  } = Route.useParams();
  const m = maintenances.find((x) => x.id === id);
  if (!m) throw notFound();
  const v = vehicles.find((x) => x.id === m.vehicleId);
  const me = mechanics.find((x) => x.id === m.mechanicId);
  const sv = m.serviceIds.map((sid) => services.find((s) => s.id === sid)).filter(Boolean);
  const related = pendencies.filter((p) => p.vehicleId === m.vehicleId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: `Manutenção — ${v?.plate ?? "Veículo"}`, subtitle: "Detalhe da ordem e serviços realizados", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin/manutencoes", className: "rounded-md border border-input bg-card px-3 py-2 text-sm", children: "← Voltar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "Editar ordem", title: "Editar ordem de manutenção", description: "Atualize veículo, serviços, mecânico, valor e status.", submitLabel: "Salvar ordem", triggerClassName: "rounded-md border border-input bg-card px-3 py-2 text-sm hover:bg-accent", fields: [{
        label: "Veículo",
        type: "select",
        value: m.vehicleId,
        options: vehicles.map((vehicle) => ({
          label: `${vehicle.plate} · ${vehicle.model}`,
          value: vehicle.id
        }))
      }, {
        label: "Tipo",
        type: "select",
        value: m.maintenanceType,
        options: Object.entries(maintenanceTypeLabel).map(([value, label]) => ({
          label,
          value
        }))
      }, {
        label: "Serviços",
        type: "checkboxes",
        options: services.map((service) => ({
          label: service.name,
          value: service.id
        }))
      }, {
        label: "Causa / descrição",
        type: "textarea",
        value: m.cause,
        wide: true
      }, {
        label: "Data",
        type: "date",
        value: m.date
      }, {
        label: "KM atual",
        type: "number",
        value: m.currentKm
      }, {
        label: "Mecânico",
        type: "select",
        value: m.mechanicId,
        options: mechanics.map((mechanic) => ({
          label: mechanic.name,
          value: mechanic.id
        }))
      }, {
        label: "Valor",
        type: "number",
        value: m.value
      }, {
        label: "Status",
        type: "select",
        value: m.status,
        options: Object.entries(maintenanceStatusLabel).map(([value, label]) => ({
          label,
          value
        }))
      }, {
        label: "Observações",
        type: "textarea",
        value: m.notes,
        wide: true
      }] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "Marcar concluída", title: "Concluir manutenção", description: "Confirme os dados de fechamento da ordem.", submitLabel: "Concluir", fields: [{
        label: "Ordem",
        type: "summary",
        value: `${v?.plate ?? "Veículo"} · ${m.cause}`
      }, {
        label: "Data de conclusão",
        type: "date",
        value: "2026-05-29"
      }, {
        label: "KM final",
        type: "number",
        value: m.currentKm
      }, {
        label: "Valor final",
        type: "number",
        value: m.value
      }, {
        label: "Observações de conclusão",
        type: "textarea",
        wide: true
      }] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Tipo", value: maintenanceTypeLabel[m.maintenanceType], tone: m.maintenanceType === "corretiva" ? "danger" : "ok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Valor", value: brl(m.value) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "KM", value: num(m.currentKm) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Serviços", value: sv.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { title: "Dados da manutenção", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Status", value: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: maintenanceStatusTone[m.status], children: maintenanceStatusLabel[m.status] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Data", value: formatDate(m.date) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Veículo", value: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `/admin/veiculos/${v?.id}`, className: "text-primary hover:underline", children: [
            v?.plate,
            " · ",
            v?.brand,
            " ",
            v?.model
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Mecânico", value: me?.name ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Causa / descrição", value: m.cause }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Observações", value: m.notes || "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Serviços realizados", subtitle: "Óleo e pneus aparecem aqui como serviço/categoria", children: sv.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-3 mb-2 last:mb-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: s.suggestedMaintenanceType === "preventiva" ? "ok" : "warn", children: maintenanceTypeLabel[s.suggestedMaintenanceType] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
            serviceCategoryLabel[s.category],
            " · ",
            periodicityLabel(s.periodicityType, s.periodicityKm, s.periodicityDays)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: s.description })
        ] }, s.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Pendências do veículo relacionadas", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 md:grid-cols-2", children: related.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: pendencySeverityTone[p.severity], children: pendencySeverityLabel[p.severity] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: p.description })
      ] }, p.id)) }) })
    ] })
  ] });
}
export {
  MaintenanceDetail as component
};
