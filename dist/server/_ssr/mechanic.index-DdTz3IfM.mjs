import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as StatusBadge } from "./StatusBadge-BlEoLYff.mjs";
import { m as maintenances, v as vehicles, p as pendencies, h as mechanics, s as services } from "./router-BE5avutW.mjs";
import { m as maintenanceStatusLabel, h as maintenanceStatusTone, i as maintenanceTypeLabel, p as pendencySeverityLabel, j as pendencySeverityTone } from "./status-rules-wijUZOgZ.mjs";
import { f as formatDate, n as num, b as brl } from "./calculations-o3_zsC-D.mjs";
import { d as Plus, S as Search } from "../_libs/lucide-react.mjs";
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
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function MechanicHome() {
  const [list, setList] = reactExports.useState(maintenances);
  const [q, setQ] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("open");
  const [openModal, setOpenModal] = reactExports.useState(false);
  const filtered = reactExports.useMemo(() => {
    return list.filter((m) => {
      if (status === "open") return m.status === "aberta" || m.status === "em_andamento";
      return m.status === status;
    }).filter((m) => {
      if (!q) return true;
      const v = vehicles.find((x) => x.id === m.vehicleId);
      return (v?.plate ?? "").toLowerCase().includes(q.toLowerCase());
    });
  }, [list, q, status]);
  const upcomingPendencies = pendencies.filter((p) => p.severity !== "baixa").slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md space-y-4 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpenModal(true), className: "flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }),
      "Registrar manutenção"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-xl border border-border bg-card p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Buscar por placa...", className: "w-full rounded-md border border-input bg-background py-2 pl-8 pr-2 text-sm" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: status, onChange: (e) => setStatus(e.target.value), className: "rounded-md border border-input bg-background px-2 py-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "open", children: "Em aberto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "aberta", children: "Aberta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "em_andamento", children: "Em andamento" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "concluida", children: "Concluída" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cancelada", children: "Cancelada" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Manutenções" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        filtered.map((m) => {
          const v = vehicles.find((x) => x.id === m.vehicleId);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-foreground", children: [
                  v?.plate,
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    "· ",
                    v?.brand,
                    " ",
                    v?.model
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-xs text-muted-foreground", children: m.cause })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: maintenanceStatusTone[m.status], children: maintenanceStatusLabel[m.status] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: maintenanceTypeLabel[m.maintenanceType] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(m.date) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "KM ",
                num(m.currentKm)
              ] }),
              m.value > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: brl(m.value) })
              ] })
            ] })
          ] }, m.id);
        }),
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground", children: "Nenhuma manutenção encontrada." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Próximas pendências" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: upcomingPendencies.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 rounded-xl border border-border bg-card p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: p.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: pendencySeverityTone[p.severity], children: pendencySeverityLabel[p.severity] })
      ] }, p.id)) })
    ] }),
    openModal && /* @__PURE__ */ jsxRuntimeExports.jsx(NewMaintenanceModal, { onClose: () => setOpenModal(false), onCreate: (m) => {
      setList((prev) => [m, ...prev]);
      setOpenModal(false);
    } })
  ] });
}
function NewMaintenanceModal({
  onClose,
  onCreate
}) {
  const [vehicleId, setVehicleId] = reactExports.useState(vehicles[0].id);
  const [maintenanceType, setMaintenanceType] = reactExports.useState("preventiva");
  const [serviceIds, setServiceIds] = reactExports.useState([]);
  const [cause, setCause] = reactExports.useState("");
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [currentKm, setCurrentKm] = reactExports.useState("");
  const [mechanicId, setMechanicId] = reactExports.useState(mechanics[0].id);
  const [value, setValue] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("aberta");
  const [notes, setNotes] = reactExports.useState("");
  const toggleService = (id) => setServiceIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 sm:items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-card p-5 shadow-xl sm:rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold text-foreground", children: "Nova manutenção" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-xs text-muted-foreground hover:underline", children: "Fechar" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Veículo", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: vehicleId, onChange: (e) => setVehicleId(e.target.value), className: "inp", children: vehicles.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: v.id, children: [
        v.plate,
        " · ",
        v.brand,
        " ",
        v.model
      ] }, v.id)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Tipo", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["preventiva", "corretiva"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMaintenanceType(t), className: `flex-1 rounded-md border py-2 text-sm font-medium ${maintenanceType === t ? "border-primary bg-primary/10 text-primary" : "border-input text-muted-foreground"}`, children: maintenanceTypeLabel[t] }, t)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Serviços realizados", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-44 space-y-1 overflow-y-auto rounded-md border border-input p-2", children: services.map((s) => {
        const checked = serviceIds.includes(s.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked, onChange: () => toggleService(s.id) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: s.name })
        ] }, s.id);
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Causa / descrição", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: cause, onChange: (e) => setCause(e.target.value), className: "inp min-h-[60px]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Data", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: date, onChange: (e) => setDate(e.target.value), className: "inp" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "KM atual", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: currentKm, onChange: (e) => setCurrentKm(e.target.value), className: "inp", inputMode: "numeric" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Mecânico", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: mechanicId, onChange: (e) => setMechanicId(e.target.value), className: "inp", children: mechanics.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m.id, children: m.name }, m.id)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Valor (R$)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => setValue(e.target.value), className: "inp", inputMode: "decimal" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: status, onChange: (e) => setStatus(e.target.value), className: "inp", children: Object.entries(maintenanceStatusLabel).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: v }, k)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Observações", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), className: "inp min-h-[60px]" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "flex-1 rounded-lg border border-input py-2.5 text-sm", children: "Cancelar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onCreate({
        id: "ma" + Math.random().toString(36).slice(2, 8),
        vehicleId,
        maintenanceType,
        serviceIds,
        cause,
        date,
        currentKm: Number(currentKm) || 0,
        value: Number(value) || 0,
        mechanicId,
        status,
        notes
      }), className: "flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: "Registrar" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `.inp{width:100%;border:1px solid var(--input);background:var(--background);border-radius:8px;padding:8px 10px;font-size:14px}` })
  ] }) });
}
function F({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: label }),
    children
  ] });
}
export {
  MechanicHome as component
};
