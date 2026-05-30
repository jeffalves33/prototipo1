import type { ReactNode } from "react";

type Tone = "ok" | "warn" | "danger" | "info" | "muted";

const tones: Record<Tone, string> = {
  ok: "bg-success/15 text-success border-success/25",
  warn: "bg-warning/20 text-[oklch(0.42_0.13_70)] border-warning/40",
  danger: "bg-destructive/12 text-destructive border-destructive/30",
  info: "bg-info/15 text-info border-info/25",
  muted: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({
  tone = "muted",
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
