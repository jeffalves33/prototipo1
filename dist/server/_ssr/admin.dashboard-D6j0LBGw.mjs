import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AdminTopbar } from "./AdminTopbar-RNvBK5Sw.mjs";
import { S as StatCard } from "./StatCard-xjKm0zZI.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { v as vehicles, f as drivers, t as trips, r as refuels, m as maintenances, g as expenses, p as pendencies } from "./router-BE5avutW.mjs";
import { s as sum, n as num, b as brl } from "./calculations-o3_zsC-D.mjs";
import { p as pendencySeverityLabel, j as pendencySeverityTone, v as vehicleStatusLabel, o as vehicleStatusTone } from "./status-rules-wijUZOgZ.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function AdminDashboard() {
  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter((v) => v.status === "ativo").length;
  const inMaintenance = vehicles.filter((v) => v.status === "manutencao").length;
  const activeDrivers = drivers.filter((d) => d.status === "ativo").length;
  const inProgressTrips = trips.filter((t) => t.status === "em_andamento").length;
  const kmTotal = sum(trips.filter((t) => t.totalKm != null).map((t) => t.totalKm));
  const litersTotal = sum(refuels.map((r) => r.liters));
  const avgConsumption = litersTotal > 0 ? kmTotal / litersTotal : 0;
  const fuelCost = sum(refuels.map((r) => r.totalValue));
  const maintCost = sum(maintenances.map((m) => m.value));
  const tripExpensesTotal = sum(expenses.map((e) => e.value));
  const totalSpend = fuelCost + maintCost + tripExpensesTotal;
  const criticalPendencies = pendencies.filter((p) => p.severity === "critica").length;
  const costByVehicle = vehicles.map((v) => {
    const c = sum(refuels.filter((r) => r.vehicleId === v.id).map((r) => r.totalValue)) + sum(maintenances.filter((m) => m.vehicleId === v.id).map((m) => m.value)) + sum(expenses.filter((e) => e.vehicleId === v.id).map((e) => e.value));
    return {
      v,
      c
    };
  }).sort((a, b) => b.c - a.c);
  const topCost = costByVehicle.slice(0, 5);
  const maxCost = topCost[0]?.c || 1;
  const consumptionByVehicle = vehicles.map((v) => {
    const km = sum(trips.filter((t) => t.vehicleId === v.id && t.totalKm != null).map((t) => t.totalKm));
    const liters = sum(refuels.filter((r) => r.vehicleId === v.id).map((r) => r.liters));
    return {
      v,
      value: liters > 0 ? km / liters : 0
    };
  }).filter((x) => x.value > 0).sort((a, b) => b.value - a.value);
  const preventive = maintenances.filter((m) => m.maintenanceType === "preventiva").length;
  const corrective = maintenances.filter((m) => m.maintenanceType === "corretiva").length;
  const expByCat = ["pedagio", "alimentacao", "hospedagem", "descarga", "outros"].map((t) => ({
    t,
    v: sum(expenses.filter((e) => e.type === t).map((e) => e.value))
  }));
  const expCatMax = Math.max(...expByCat.map((x) => x.v), 1);
  const catLabels = {
    pedagio: "Pedágio",
    alimentacao: "Alimentação",
    hospedagem: "Hospedagem",
    descarga: "Descarga",
    outros: "Outros"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminTopbar, { title: "Dashboard", subtitle: "Visão geral da operação", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "rounded-md border border-input bg-card px-2 py-1.5 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Últimos 30 dias" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Este mês" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Últimos 90 dias" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "rounded-md border border-input bg-card px-2 py-1.5 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Todos os veículos" }),
        vehicles.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: v.plate }, v.id))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "rounded-md border border-input bg-card px-2 py-1.5 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Todos os motoristas" }),
        drivers.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: d.name }, d.id))
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total de veículos", value: totalVehicles }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Veículos ativos", value: activeVehicles, tone: "ok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Em manutenção", value: inMaintenance, tone: "warn" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Motoristas ativos", value: activeDrivers }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Viagens em andamento", value: inProgressTrips, tone: "ok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Pendências críticas", value: criticalPendencies, tone: "danger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "KM rodados", value: num(kmTotal), hint: "no período" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Litros abastecidos", value: num(litersTotal), hint: "no período" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Consumo médio", value: `${avgConsumption.toFixed(2)} km/L`, hint: "frota" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Gasto total", value: brl(totalSpend), tone: "danger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Manutenção", value: brl(maintCost), hint: "período" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Despesas viagem", value: brl(tripExpensesTotal), hint: "período" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Top veículos por custo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Combustível + manutenção + despesas" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: topCost.map(({
            v,
            c
          }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: v.plate }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums text-muted-foreground", children: brl(c) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-1.5 w-full rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-primary", style: {
              width: `${c / maxCost * 100}%`
            } }) })
          ] }, v.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Consumo médio por veículo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: consumptionByVehicle.map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
              x.v.plate,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "— ",
                x.v.model
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums text-foreground", children: [
              x.value.toFixed(2),
              " km/L"
            ] })
          ] }, x.v.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Manutenção preventiva vs corretiva" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-success/10 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium uppercase tracking-wide text-success", children: "Preventiva" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-3xl font-semibold text-foreground tabular-nums", children: preventive })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md bg-destructive/10 p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium uppercase tracking-wide text-destructive", children: "Corretiva" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-3xl font-semibold text-foreground tabular-nums", children: corrective })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Despesas por categoria" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: expByCat.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: catLabels[c.t] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums text-muted-foreground", children: brl(c.v) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-1.5 w-full rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-info", style: {
              width: `${c.v / expCatMax * 100}%`
            } }) })
          ] }, c.t)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-5 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Alertas recentes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/pendencias", className: "text-xs font-medium text-primary hover:underline", children: "Ver todas →" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: pendencies.slice(0, 5).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start justify-between gap-3 px-5 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground", children: p.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: p.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: pendencySeverityTone[p.severity], children: pendencySeverityLabel[p.severity] })
          ] }, p.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-5 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Status dos veículos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/veiculos", className: "text-xs font-medium text-primary hover:underline", children: "Ver todos →" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: vehicles.slice(0, 6).map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between px-5 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-medium text-foreground", children: [
                v.plate,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  "— ",
                  v.brand,
                  " ",
                  v.model
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                "KM atual: ",
                num(v.currentKm)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: vehicleStatusTone[v.status], children: vehicleStatusLabel[v.status] })
          ] }, v.id)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminDashboard as component
};
