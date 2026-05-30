import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AdminTopbar } from "./AdminTopbar-RNvBK5Sw.mjs";
import { A as ActionDialog } from "./ActionDialog-DXo9uEYP.mjs";
import { F as FilterBar, T as TableShell } from "./AdminBlocks-DaczzGrM.mjs";
import { S as StatCard } from "./StatCard-xjKm0zZI.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { m as maintenances, v as vehicles, s as services, h as mechanics } from "./router-BE5avutW.mjs";
import { s as sum, b as brl, f as formatDate, n as num } from "./calculations-o3_zsC-D.mjs";
import { i as maintenanceTypeLabel, m as maintenanceStatusLabel, s as serviceCategoryLabel, h as maintenanceStatusTone } from "./status-rules-wijUZOgZ.mjs";
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
function MaintenancesPage() {
  const [q, setQ] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("all");
  const [type, setType] = reactExports.useState("all");
  const [vehicleId, setVehicleId] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => maintenances.filter((m) => {
    const v = vehicles.find((x) => x.id === m.vehicleId);
    const ms = m.serviceIds.map((id) => services.find((s) => s.id === id)?.name).join(" ");
    const text = `${v?.plate ?? ""} ${v?.model ?? ""} ${m.cause} ${ms}`.toLowerCase();
    return text.includes(q.toLowerCase()) && (status === "all" || m.status === status) && (type === "all" || m.maintenanceType === type) && (vehicleId === "all" || m.vehicleId === vehicleId);
  }), [q, status, type, vehicleId]);
  const total = sum(filtered.map((m) => m.value));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Manutenções", subtitle: "Ordens preventivas e corretivas com um ou mais serviços realizados", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "+ Nova manutenção", title: "Nova manutenção", description: "Abra uma ordem preventiva ou corretiva e vincule os serviços realizados.", submitLabel: "Salvar manutenção", fields: [{
      label: "Veículo",
      type: "select",
      options: vehicles.map((v) => ({
        label: `${v.plate} · ${v.model}`,
        value: v.id
      }))
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
      label: "Causa / descrição",
      type: "textarea",
      wide: true
    }, {
      label: "Data",
      type: "date",
      value: "2026-05-29"
    }, {
      label: "KM atual",
      type: "number"
    }, {
      label: "Mecânico",
      type: "select",
      options: mechanics.map((m) => ({
        label: m.name,
        value: m.id
      }))
    }, {
      label: "Valor",
      type: "number"
    }, {
      label: "Status",
      type: "select",
      options: Object.entries(maintenanceStatusLabel).map(([value, label]) => ({
        label,
        value
      }))
    }, {
      label: "Observações",
      type: "textarea",
      wide: true
    }] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Registros", value: filtered.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Preventivas", value: filtered.filter((m) => m.maintenanceType === "preventiva").length, tone: "ok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Corretivas", value: filtered.filter((m) => m.maintenanceType === "corretiva").length, tone: "danger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Valor", value: brl(total) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterBar, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar placa, serviço ou causa...", className: "rounded-md border border-input bg-background px-3 py-2 text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: status, onChange: (e) => setStatus(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todos os status" }),
          Object.entries(maintenanceStatusLabel).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: type, onChange: (e) => setType(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todos os tipos" }),
          Object.entries(maintenanceTypeLabel).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: vehicleId, onChange: (e) => setVehicleId(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todos os veículos" }),
          vehicles.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: v.id, children: [
            v.plate,
            " · ",
            v.model
          ] }, v.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableShell, { head: ["Data", "Veículo", "Tipo", "Serviços", "Causa", "Mecânico", "KM", "Valor", "Status", ""], children: filtered.map((m) => {
        const v = vehicles.find((x) => x.id === m.vehicleId);
        const me = mechanics.find((x) => x.id === m.mechanicId);
        const sv = m.serviceIds.map((id) => services.find((s) => s.id === id)).filter(Boolean);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: formatDate(m.date) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold", children: [
            v?.plate,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-normal text-muted-foreground", children: [
              v?.brand,
              " ",
              v?.model
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: maintenanceTypeLabel[m.maintenanceType] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
              sv.slice(0, 3).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-muted px-2 py-1 text-xs", children: s.name }, s.id)),
              sv.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "+",
                sv.length - 3
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: sv[0] ? serviceCategoryLabel[sv[0].category] : "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: m.cause }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: me?.name ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: num(m.currentKm) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: brl(m.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: maintenanceStatusTone[m.status], children: maintenanceStatusLabel[m.status] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/manutencoes/$id", params: {
            id: m.id
          }, className: "font-medium text-primary hover:underline", children: "Detalhes →" }) })
        ] }, m.id);
      }) })
    ] })
  ] });
}
export {
  MaintenancesPage as component
};
