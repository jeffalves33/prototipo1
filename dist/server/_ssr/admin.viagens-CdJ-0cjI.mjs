import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AdminTopbar } from "./AdminTopbar-RNvBK5Sw.mjs";
import { A as ActionDialog } from "./ActionDialog-DXo9uEYP.mjs";
import { F as FilterBar, T as TableShell } from "./AdminBlocks-DaczzGrM.mjs";
import { S as StatCard } from "./StatCard-xjKm0zZI.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { t as trips, f as drivers, v as vehicles, r as refuels, g as expenses } from "./router-BE5avutW.mjs";
import { s as sum, n as num, b as brl, a as formatDateTime } from "./calculations-o3_zsC-D.mjs";
import { t as tripStatusLabel, n as tripStatusTone } from "./status-rules-wijUZOgZ.mjs";
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
function TripsPage() {
  const [q, setQ] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("all");
  const [driverId, setDriverId] = reactExports.useState("all");
  const [vehicleId, setVehicleId] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => trips.filter((t) => {
    const d = drivers.find((x) => x.id === t.driverId);
    const v = vehicles.find((x) => x.id === t.vehicleId);
    const text = `${t.origin} ${t.destination} ${d?.name ?? ""} ${v?.plate ?? ""}`.toLowerCase();
    return text.includes(q.toLowerCase()) && (status === "all" || t.status === status) && (driverId === "all" || t.driverId === driverId) && (vehicleId === "all" || t.vehicleId === vehicleId);
  }), [q, status, driverId, vehicleId]);
  const inProgress = trips.filter((t) => t.status === "em_andamento").length;
  const km = sum(trips.map((t) => t.totalKm ?? 0));
  sum(refuels.map((r) => r.liters));
  const expenseTotal = sum(expenses.map((e) => e.value));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Viagens", subtitle: "Rotas, veículos, motoristas e registros operacionais por viagem", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "+ Nova viagem", title: "Nova viagem", description: "Abra uma viagem com motorista, veículo, rota e KM inicial.", submitLabel: "Salvar viagem", fields: [{
      label: "Motorista",
      type: "select",
      options: drivers.map((d) => ({
        label: d.name,
        value: d.id
      }))
    }, {
      label: "Veículo",
      type: "select",
      options: vehicles.map((v) => ({
        label: `${v.plate} · ${v.model}`,
        value: v.id
      }))
    }, {
      label: "Origem",
      placeholder: "São Paulo/SP"
    }, {
      label: "Destino",
      placeholder: "Curitiba/PR"
    }, {
      label: "Data de início",
      type: "date",
      value: "2026-05-29"
    }, {
      label: "KM inicial",
      type: "number",
      placeholder: "412000"
    }, {
      label: "Status",
      type: "select",
      options: Object.entries(tripStatusLabel).map(([value, label]) => ({
        label,
        value
      }))
    }, {
      label: "Veículo temporário",
      type: "select",
      options: [{
        label: "Não",
        value: "nao"
      }, {
        label: "Sim",
        value: "sim"
      }]
    }, {
      label: "Observações",
      type: "textarea",
      wide: true
    }] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Viagens", value: trips.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Em andamento", value: inProgress, tone: "warn" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "KM rodados", value: num(km) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Despesas", value: brl(expenseTotal) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterBar, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar rota, placa ou motorista...", className: "rounded-md border border-input bg-background px-3 py-2 text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: status, onChange: (e) => setStatus(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todos os status" }),
          Object.entries(tripStatusLabel).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: driverId, onChange: (e) => setDriverId(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todos os motoristas" }),
          drivers.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d.id, children: d.name }, d.id))
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableShell, { head: ["Início", "Rota", "Motorista", "Veículo", "KM", "Abast.", "Desp.", "Status", ""], children: filtered.map((t) => {
        const d = drivers.find((x) => x.id === t.driverId);
        const v = vehicles.find((x) => x.id === t.vehicleId);
        const tr = refuels.filter((r) => r.tripId === t.id);
        const te = expenses.filter((e) => e.tripId === t.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: formatDateTime(t.startedAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-medium", children: [
            t.origin,
            " → ",
            t.destination,
            t.temporaryVehicleAssignment && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-info", children: "Veículo temporário autorizado pelo admin" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: d?.name ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: v?.plate ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: t.totalKm != null ? num(t.totalKm) : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right", children: [
            num(sum(tr.map((r) => r.liters))),
            " L"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: brl(sum(te.map((e) => e.value))) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: tripStatusTone[t.status], children: tripStatusLabel[t.status] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/viagens/$id", params: {
            id: t.id
          }, className: "font-medium text-primary hover:underline", children: "Detalhes →" }) })
        ] }, t.id);
      }) })
    ] })
  ] });
}
export {
  TripsPage as component
};
