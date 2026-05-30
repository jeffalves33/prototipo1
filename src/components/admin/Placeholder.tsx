import { createFileRoute } from "@tanstack/react-router";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export function makePlaceholder(title: string, hint: string) {
  return function Placeholder() {
    return (
      <>
        <AdminTopbar title={title} subtitle={hint} />
        <div className="p-6">
          <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
            <div className="text-sm font-medium text-foreground">Em construção</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Esta tela será detalhada na próxima fase do protótipo.
            </p>
          </div>
        </div>
      </>
    );
  };
}

// re-export for convenience
export { createFileRoute };
