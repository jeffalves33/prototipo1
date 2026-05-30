import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { I as notFound } from "../_libs/tanstack__router-core.mjs";
import { A as AdminTopbar } from "./AdminTopbar-RNvBK5Sw.mjs";
import { A as ActionDialog } from "./ActionDialog-DXo9uEYP.mjs";
import { S as SectionCard, D as DetailRow, T as TableShell } from "./AdminBlocks-DaczzGrM.mjs";
import { S as StatCard } from "./StatCard-xjKm0zZI.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { c as Route$2, s as services, m as maintenances, p as pendencies, v as vehicles, h as mechanics } from "./router-BE5avutW.mjs";
import { s as sum, b as brl, f as formatDate, n as num } from "./calculations-o3_zsC-D.mjs";
import { s as serviceCategoryLabel, i as maintenanceTypeLabel, k as periodicityLabel, m as maintenanceStatusLabel, h as maintenanceStatusTone, p as pendencySeverityLabel, j as pendencySeverityTone } from "./status-rules-wijUZOgZ.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
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
function ServiceDetail() {
  const {
    id
  } = Route$2.useParams();
  const service = services.find((s) => s.id === id);
  if (!service) throw notFound();
  const serviceMaintenances = maintenances.filter((m) => m.serviceIds.includes(service.id));
  const servicePendencies = pendencies.filter((p) => p.serviceId === service.id);
  const totalValue = sum(serviceMaintenances.map((m) => m.value));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: service.name, subtitle: "Detalhe do serviço, recorrência e uso em manutenções", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/servicos", className: "rounded-md border border-input bg-card px-3 py-2 text-sm hover:bg-accent", children: "← Voltar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "Editar serviço", title: "Editar serviço", description: "Atualize cadastro, categoria e recorrência do serviço.", submitLabel: "Salvar alterações", triggerClassName: "rounded-md border border-input bg-card px-3 py-2 text-sm hover:bg-accent", fields: [{
        label: "Nome",
        value: service.name
      }, {
        label: "Categoria",
        type: "select",
        value: service.category,
        options: Object.entries(serviceCategoryLabel).map(([value, label]) => ({
          label,
          value
        }))
      }, {
        label: "Tipo sugerido",
        type: "select",
        value: service.suggestedMaintenanceType,
        options: Object.entries(maintenanceTypeLabel).map(([value, label]) => ({
          label,
          value
        }))
      }, {
        label: "Periodicidade",
        type: "select",
        value: service.periodicityType,
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
        value: service.periodicityKm ?? ""
      }, {
        label: "Dias de recorrência",
        type: "number",
        value: service.periodicityDays ?? ""
      }, {
        label: "Descrição",
        type: "textarea",
        value: service.description,
        wide: true
      }] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Categoria", value: serviceCategoryLabel[service.category] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Tipo sugerido", value: maintenanceTypeLabel[service.suggestedMaintenanceType] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Usos", value: serviceMaintenances.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Valor em manutenções", value: brl(totalValue) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { title: "Cadastro", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Serviço", value: service.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Categoria", value: serviceCategoryLabel[service.category] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Tipo sugerido", value: maintenanceTypeLabel[service.suggestedMaintenanceType] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Periodicidade", value: periodicityLabel(service.periodicityType, service.periodicityKm, service.periodicityDays) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Status", value: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: service.status === "ativo" ? "ok" : "muted", children: service.status }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Descrição", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: service.description }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableShell, { head: ["Data", "Veículo", "Tipo", "Mecânico", "KM", "Valor", "Status", ""], children: serviceMaintenances.map((m) => {
        const v = vehicles.find((x) => x.id === m.vehicleId);
        const mechanic = mechanics.find((x) => x.id === m.mechanicId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: formatDate(m.date) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-medium", children: [
            v?.plate ?? "—",
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-normal text-muted-foreground", children: v ? `${v.brand} ${v.model}` : "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: maintenanceTypeLabel[m.maintenanceType] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: mechanic?.name ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: num(m.currentKm) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: brl(m.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: maintenanceStatusTone[m.status], children: maintenanceStatusLabel[m.status] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/manutencoes/$id", params: {
            id: m.id
          }, className: "font-medium text-primary hover:underline", children: "Abrir →" }) })
        ] }, m.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Pendências ligadas", children: servicePendencies.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Nenhuma pendência ligada a este serviço." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 md:grid-cols-2", children: servicePendencies.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-3", children: [
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
  ServiceDetail as component
};
