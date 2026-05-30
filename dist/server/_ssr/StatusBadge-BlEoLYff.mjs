import { j as jsxRuntimeExports } from "../_libs/react.mjs";
const tones = {
  ok: "bg-success/15 text-success border-success/25",
  warn: "bg-warning/20 text-[oklch(0.42_0.13_70)] border-warning/40",
  danger: "bg-destructive/12 text-destructive border-destructive/30",
  info: "bg-info/15 text-info border-info/25",
  muted: "bg-muted text-muted-foreground border-border"
};
function StatusBadge({
  tone = "muted",
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${tones[tone]}`,
      children
    }
  );
}
export {
  StatusBadge as S
};
