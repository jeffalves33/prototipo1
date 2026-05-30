import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AdminTopbar } from "./AdminTopbar-RNvBK5Sw.mjs";
import { A as ActionDialog } from "./ActionDialog-DXo9uEYP.mjs";
import { F as FilterBar, T as TableShell } from "./AdminBlocks-DaczzGrM.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { S as StatCard } from "./StatCard-xjKm0zZI.mjs";
import { f as drivers, v as vehicles, t as trips, g as expenses } from "./router-BE5avutW.mjs";
import { b as brl, n as num } from "./calculations-o3_zsC-D.mjs";
import { b as driverStatusLabel, l as licenseStatusLabel, g as licenseStatusTone, c as driverStatusTone } from "./status-rules-wijUZOgZ.mjs";
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
function DriversPage() {
  const [q, setQ] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("all");
  const [license, setLicense] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => drivers.filter((d) => {
    const vehicle = vehicles.find((v) => v.id === d.mainVehicleId);
    const text = `${d.name} ${d.phone} ${d.cpf} ${vehicle?.plate ?? ""}`.toLowerCase();
    return text.includes(q.toLowerCase()) && (status === "all" || d.status === status) && (license === "all" || d.licenseStatus === license);
  }), [q, status, license]);
  const active = drivers.filter((d) => d.status === "ativo").length;
  const licenseAlerts = drivers.filter((d) => d.licenseStatus !== "ok").length;
  const tripCount = trips.length;
  const expenseTotal = expenses.reduce((s, e) => s + e.value, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Motoristas", subtitle: "Cadastro, vínculo com veículo, CNH e histórico operacional", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "+ Novo motorista", title: "Novo motorista", description: "Cadastre dados pessoais, CNH e veículo principal.", submitLabel: "Salvar motorista", fields: [{
      label: "Nome",
      placeholder: "Nome completo"
    }, {
      label: "Telefone",
      placeholder: "(11) 99999-9999"
    }, {
      label: "CPF",
      placeholder: "000.000.000-00"
    }, {
      label: "Endereço",
      placeholder: "Rua, número - Cidade/UF"
    }, {
      label: "Número da CNH",
      placeholder: "00000000000"
    }, {
      label: "Validade da CNH",
      type: "date"
    }, {
      label: "Veículo principal",
      type: "select",
      options: [{
        label: "Sem veículo",
        value: "none"
      }, ...vehicles.map((v) => ({
        label: `${v.plate} · ${v.model}`,
        value: v.id
      }))]
    }, {
      label: "Status",
      type: "select",
      options: Object.entries(driverStatusLabel).map(([value, label]) => ({
        label,
        value
      }))
    }] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Motoristas", value: drivers.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Ativos", value: active, tone: "ok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Alertas de CNH", value: licenseAlerts, tone: licenseAlerts ? "danger" : "ok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Despesas lançadas", value: brl(expenseTotal), hint: `${tripCount} viagens` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterBar, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar por nome, CPF, placa...", className: "rounded-md border border-input bg-background px-3 py-2 text-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: status, onChange: (e) => setStatus(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todos os status" }),
          Object.entries(driverStatusLabel).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: license, onChange: (e) => setLicense(e.target.value), className: "rounded-md border border-input bg-background px-3 py-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "Todas as CNHs" }),
          Object.entries(licenseStatusLabel).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground", children: [
          filtered.length,
          " de ",
          drivers.length,
          " registros"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableShell, { head: ["Motorista", "Contato", "Veículo principal", "CNH", "Viagens", "KM", "Despesas", "Status", ""], children: filtered.map((d) => {
        const vehicle = vehicles.find((v) => v.id === d.mainVehicleId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold text-foreground", children: [
            d.name,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-normal text-muted-foreground", children: [
              "CPF ",
              d.cpf
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: d.phone }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: vehicle ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            vehicle.plate,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              vehicle.brand,
              " ",
              vehicle.model
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Sem veículo" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: licenseStatusTone[d.licenseStatus], children: licenseStatusLabel[d.licenseStatus] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: d.licenseDueDate })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums", children: d.totalTrips }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums", children: num(d.totalKm) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums", children: brl(d.totalTravelExpenses) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: driverStatusTone[d.status], children: driverStatusLabel[d.status] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/motoristas/$id", params: {
            id: d.id
          }, className: "font-medium text-primary hover:underline", children: "Detalhes →" }) })
        ] }, d.id);
      }) })
    ] })
  ] });
}
export {
  DriversPage as component
};
