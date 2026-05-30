import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminTopbar } from "./AdminTopbar-RNvBK5Sw.mjs";
import { A as ActionDialog } from "./ActionDialog-DXo9uEYP.mjs";
import { F as FilterBar, T as TableShell } from "./AdminBlocks-DaczzGrM.mjs";
import { S as StatCard } from "./StatCard-xjKm0zZI.mjs";
import { r as refuels, f as drivers, v as vehicles, t as trips } from "./router-BE5avutW.mjs";
import { s as sum, n as num, b as brl, a as formatDateTime } from "./calculations-o3_zsC-D.mjs";
import { f as fuelTypeLabel } from "./status-rules-wijUZOgZ.mjs";
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
function RefuelsPage() {
  const [q, setQ] = reactExports.useState("");
  const [vehicleId, setVehicleId] = reactExports.useState("all");
  const [driverId, setDriverId] = reactExports.useState("all");
  const [fuel, setFuel] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => refuels.filter((r) => {
    const d = drivers.find((x) => x.id === r.driverId);
    const v = vehicles.find((x) => x.id === r.vehicleId);
    const t = trips.find((x) => x.id === r.tripId);
    const text = `${d?.name ?? ""} ${v?.plate ?? ""} ${t?.origin ?? ""} ${t?.destination ?? ""}`.toLowerCase();
    return text.includes(q.toLowerCase()) && (vehicleId === "all" || r.vehicleId === vehicleId) && (driverId === "all" || r.driverId === driverId) && (fuel === "all" || r.fuelType === fuel);
  }), [q, vehicleId, driverId, fuel]);
  const liters = sum(filtered.map((r) => r.liters));
  const value = sum(filtered.map((r) => r.totalValue));
  const avg = liters ? value / liters : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Abastecimentos", subtitle: "Controle operacional de consumo. Motorista registra litros e KM; admin fecha valores.", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "+ Lançar valor", title: "Lançar abastecimento", description: "Registre KM, combustível, litros e valor do abastecimento.", submitLabel: "Salvar abastecimento", fields: [{
      label: "Veículo",
      type: "select",
      options: vehicles.map((v) => ({
        label: `${v.plate} · ${v.model}`,
        value: v.id
      }))
    }, {
      label: "Motorista",
      type: "select",
      options: drivers.map((d) => ({
        label: d.name,
        value: d.id
      }))
    }, {
      label: "Viagem",
      type: "select",
      options: [{
        label: "Avulso",
        value: "none"
      }, ...trips.map((t) => ({
        label: `${t.origin} → ${t.destination}`,
        value: t.id
      }))]
    }, {
      label: "Combustível",
      type: "select",
      options: Object.entries(fuelTypeLabel).map(([value2, label]) => ({
        label,
        value: value2
      }))
    }, {
      label: "KM atual",
      type: "number",
      placeholder: "412000"
    }, {
      label: "Litros",
      type: "number",
      placeholder: "220"
    }, {
      label: "Preço unitário",
      type: "number",
      placeholder: "6,18"
    }, {
      label: "Valor total",
      type: "number",
      placeholder: "1359,60"
    }, {
      label: "Observação",
      type: "textarea",
      wide: true
    }] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Registros", value: filtered.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Litros", value: `${num(liters)} L` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Valor total", value: brl(value) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Preço médio", value: brl(avg) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterBar, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar motorista, placa ou rota...", className: "rounded-md border border-input bg-background px-3 py-2 text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: vehicleId, onChange: (e) => setVehicleId(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todos os veículos" }),
          vehicles.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: v.id, children: [
            v.plate,
            " · ",
            v.model
          ] }, v.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: driverId, onChange: (e) => setDriverId(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todos os motoristas" }),
          drivers.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d.id, children: d.name }, d.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: fuel, onChange: (e) => setFuel(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todos combustíveis" }),
          Object.entries(fuelTypeLabel).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableShell, { head: ["Data", "Veículo", "Motorista", "Viagem", "KM", "Combustível", "Litros", "Valor"], children: filtered.map((r) => {
        const d = drivers.find((x) => x.id === r.driverId);
        const v = vehicles.find((x) => x.id === r.vehicleId);
        const t = trips.find((x) => x.id === r.tripId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: formatDateTime(r.date) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: v?.plate ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: d?.name ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: t ? `${t.origin} → ${t.destination}` : "Avulso" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: num(r.currentKm) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: fuelTypeLabel[r.fuelType] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right", children: [
            num(r.liters),
            " L"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: brl(r.totalValue) })
        ] }, r.id);
      }) })
    ] })
  ] });
}
export {
  RefuelsPage as component
};
