import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: "default" | "danger" | "warn" | "ok";
}) {
  const accent =
    tone === "danger"
      ? "border-l-destructive"
      : tone === "warn"
      ? "border-l-warning"
      : tone === "ok"
      ? "border-l-success"
      : "border-l-primary";
  return (
    <div className={`rounded-lg border border-l-4 ${accent} bg-card p-4 shadow-sm`}>
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-foreground tabular-nums">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}
