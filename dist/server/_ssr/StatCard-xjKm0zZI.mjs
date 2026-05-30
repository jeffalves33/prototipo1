import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function StatCard({
  label,
  value,
  hint,
  tone
}) {
  const accent = tone === "danger" ? "border-l-destructive" : tone === "warn" ? "border-l-warning" : tone === "ok" ? "border-l-success" : "border-l-primary";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-lg border border-l-4 ${accent} bg-card p-4 shadow-sm`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-2xl font-semibold text-foreground tabular-nums", children: value }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: hint })
  ] });
}
export {
  StatCard as S
};
