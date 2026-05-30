import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { I as notFound } from "../_libs/tanstack__router-core.mjs";
import { A as AdminTopbar } from "./AdminTopbar-RNvBK5Sw.mjs";
import { A as ActionDialog } from "./ActionDialog-DXo9uEYP.mjs";
import { S as SectionCard, D as DetailRow, T as TableShell } from "./AdminBlocks-DaczzGrM.mjs";
import { S as StatCard } from "./StatCard-xjKm0zZI.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { d as Route$1, f as drivers, v as vehicles, t as trips, r as refuels, g as expenses } from "./router-BE5avutW.mjs";
import { s as sum, n as num, b as brl, f as formatDate, a as formatDateTime } from "./calculations-o3_zsC-D.mjs";
import { b as driverStatusLabel, l as licenseStatusLabel, g as licenseStatusTone, c as driverStatusTone, v as vehicleStatusLabel, o as vehicleStatusTone, t as tripStatusLabel, n as tripStatusTone, f as fuelTypeLabel, e as expenseTypeLabel } from "./status-rules-wijUZOgZ.mjs";
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
const tabs = ["Resumo", "Viagens", "Abastecimentos", "Despesas", "Vínculo"];
function DriverDetail() {
  const {
    id
  } = Route$1.useParams();
  const d = drivers.find((x) => x.id === id);
  if (!d) throw notFound();
  const [tab, setTab] = reactExports.useState("Resumo");
  const vehicle = vehicles.find((v) => v.id === d.mainVehicleId) ?? null;
  const dTrips = trips.filter((t) => t.driverId === d.id);
  const dRefuels = refuels.filter((r) => r.driverId === d.id);
  const dExpenses = expenses.filter((e) => e.driverId === d.id);
  const km = sum(dTrips.map((t) => t.totalKm ?? 0));
  const liters = sum(dRefuels.map((r) => r.liters));
  const avg = liters > 0 ? km / liters : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: d.name, subtitle: "Detalhe do motorista, veículo vinculado e histórico operacional", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin/motoristas", className: "rounded-md border border-input bg-card px-3 py-2 text-sm", children: "← Voltar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "Editar cadastro", title: "Editar motorista", description: "Atualize dados cadastrais, CNH e status do motorista.", submitLabel: "Salvar cadastro", triggerClassName: "rounded-md border border-input bg-card px-3 py-2 text-sm hover:bg-accent", fields: [{
        label: "Nome",
        value: d.name
      }, {
        label: "Telefone",
        value: d.phone
      }, {
        label: "CPF",
        value: d.cpf
      }, {
        label: "Endereço",
        value: d.address
      }, {
        label: "Número da CNH",
        value: d.licenseNumber
      }, {
        label: "Validade CNH",
        type: "date",
        value: d.licenseDueDate
      }, {
        label: "Status",
        type: "select",
        value: d.status,
        options: Object.entries(driverStatusLabel).map(([value, label]) => ({
          label,
          value
        }))
      }] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "Trocar veículo principal", title: "Trocar veículo principal", description: "Defina o veículo padrão usado pelo motorista.", submitLabel: "Salvar vínculo", fields: [{
        label: "Motorista",
        type: "summary",
        value: d.name
      }, {
        label: "Veículo atual",
        type: "summary",
        value: vehicle ? `${vehicle.plate} · ${vehicle.brand} ${vehicle.model}` : "Sem veículo"
      }, {
        label: "Novo veículo",
        type: "select",
        value: vehicle?.id ?? "none",
        options: [{
          label: "Sem veículo",
          value: "none"
        }, ...vehicles.map((v) => ({
          label: `${v.plate} · ${v.model}`,
          value: v.id
        }))]
      }, {
        label: "Motivo",
        type: "textarea",
        wide: true
      }] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "KM rodados", value: num(km) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Litros registrados", value: num(liters) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Consumo médio", value: `${avg.toFixed(2)} km/L` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Despesas", value: brl(sum(dExpenses.map((e) => e.value))), tone: "warn" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 rounded-lg border border-border bg-card p-1", children: tabs.map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(x), className: `rounded-md px-3 py-1.5 text-sm font-medium ${tab === x ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`, children: x }, x)) }),
      tab === "Resumo" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { title: "Dados cadastrais", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Nome", value: d.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Telefone", value: d.phone }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Endereço", value: d.address }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "CPF", value: d.cpf }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "CNH", value: d.licenseNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Validade CNH", value: formatDate(d.licenseDueDate) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Status CNH", value: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: licenseStatusTone[d.licenseStatus], children: licenseStatusLabel[d.licenseStatus] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Status cadastro", value: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: driverStatusTone[d.status], children: driverStatusLabel[d.status] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Veículo principal", children: vehicle ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Placa", value: vehicle.plate }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Modelo", value: `${vehicle.brand} ${vehicle.model}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "KM atual", value: num(vehicle.currentKm) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Status", value: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: vehicleStatusTone[vehicle.status], children: vehicleStatusLabel[vehicle.status] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Observação", value: "Admin pode trocar o veículo principal ou atribuir veículo temporário em uma viagem." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Sem veículo principal atribuído." }) })
      ] }),
      tab === "Viagens" && /* @__PURE__ */ jsxRuntimeExports.jsx(TableShell, { head: ["Data", "Rota", "Veículo", "KM", "Status", ""], children: dTrips.map((t) => {
        const v = vehicles.find((x) => x.id === t.vehicleId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: formatDateTime(t.startedAt) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-medium", children: [
            t.origin,
            " → ",
            t.destination
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            v?.plate ?? "—",
            t.temporaryVehicleAssignment && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-info", children: "Veículo temporário" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: t.totalKm != null ? num(t.totalKm) : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: tripStatusTone[t.status], children: tripStatusLabel[t.status] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/admin/viagens/${t.id}`, className: "text-primary hover:underline", children: "Abrir →" }) })
        ] }, t.id);
      }) }),
      tab === "Abastecimentos" && /* @__PURE__ */ jsxRuntimeExports.jsx(TableShell, { head: ["Data", "Veículo", "KM", "Combustível", "Litros", "Valor"], children: dRefuels.map((r) => {
        const v = vehicles.find((x) => x.id === r.vehicleId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: formatDateTime(r.date) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: v?.plate ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: num(r.currentKm) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: fuelTypeLabel[r.fuelType] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right", children: [
            num(r.liters),
            " L"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: brl(r.totalValue) })
        ] }, r.id);
      }) }),
      tab === "Despesas" && /* @__PURE__ */ jsxRuntimeExports.jsx(TableShell, { head: ["Data", "Viagem", "Tipo", "Valor", "Observação"], children: dExpenses.map((e) => {
        const t = trips.find((x) => x.id === e.tripId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: formatDateTime(e.date) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            t?.origin,
            " → ",
            t?.destination
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: expenseTypeLabel[e.type] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: brl(e.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: e.notes || "—" })
        ] }, e.id);
      }) }),
      tab === "Vínculo" && /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { title: "Troca e vínculo de veículo", subtitle: "Protótipo visual da regra operacional solicitada", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Veículo principal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Usado como padrão na área do motorista. Pode ser alterado pelo admin." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-medium", children: vehicle ? `${vehicle.plate} — ${vehicle.brand} ${vehicle.model}` : "Nenhum" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Veículo temporário por viagem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Quando o veículo principal entra em manutenção, o gestor pode escolher outro veículo apenas para uma viagem." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActionDialog, { triggerLabel: "Simular troca temporária", title: "Simular veículo temporário", description: "Escolha uma viagem e o veículo substituto para este motorista.", submitLabel: "Simular troca", triggerClassName: "mt-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90", fields: [{
            label: "Viagem",
            type: "select",
            options: dTrips.map((t) => ({
              label: `${t.origin} → ${t.destination}`,
              value: t.id
            }))
          }, {
            label: "Veículo temporário",
            type: "select",
            options: vehicles.map((v) => ({
              label: `${v.plate} · ${v.model}`,
              value: v.id
            }))
          }, {
            label: "Justificativa",
            type: "textarea",
            wide: true
          }] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  DriverDetail as component
};
