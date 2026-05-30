import type { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type FieldOption = {
  label: string;
  value?: string;
};

export type ActionField = {
  label: string;
  type?: "text" | "number" | "date" | "select" | "textarea" | "checkboxes" | "summary";
  value?: string | number;
  placeholder?: string;
  options?: FieldOption[];
  wide?: boolean;
};

type ActionDialogProps = {
  triggerLabel: ReactNode;
  title: string;
  description?: string;
  fields?: ActionField[];
  children?: ReactNode;
  submitLabel?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

const defaultTrigger =
  "rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90";

export function ActionDialog({
  triggerLabel,
  title,
  description,
  fields = [],
  children,
  submitLabel = "Salvar",
  triggerClassName = defaultTrigger,
  contentClassName,
}: ActionDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={triggerClassName}>
          {triggerLabel}
        </button>
      </DialogTrigger>
      <DialogContent className={contentClassName ?? "max-h-[90vh] overflow-y-auto sm:max-w-2xl"}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="grid gap-3 sm:grid-cols-2">
          {fields.map((field) => (
            <ActionFieldControl key={`${field.label}-${field.type ?? "text"}`} field={field} />
          ))}
        </div>
        {children}

        <DialogFooter>
          <DialogClose asChild>
            <button type="button" className="rounded-md border border-input bg-card px-3 py-2 text-sm hover:bg-accent">
              Cancelar
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button type="button" className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              {submitLabel}
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ActionFieldControl({ field }: { field: ActionField }) {
  const type = field.type ?? "text";
  const className = field.wide || type === "textarea" || type === "checkboxes" || type === "summary" ? "sm:col-span-2" : "";

  if (type === "summary") {
    return (
      <div className={className}>
        <div className="rounded-md border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{field.label}</span>
          {field.value != null && <p className="mt-1">{field.value}</p>}
        </div>
      </div>
    );
  }

  if (type === "checkboxes") {
    return (
      <label className={className}>
        <span className="mb-1 block text-xs font-medium text-muted-foreground">{field.label}</span>
        <div className="max-h-40 space-y-1 overflow-y-auto rounded-md border border-input bg-background p-2">
          {(field.options ?? []).map((option) => (
            <label key={option.value ?? option.label} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-accent">
              <input type="checkbox" defaultChecked={false} />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </label>
    );
  }

  return (
    <label className={className}>
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{field.label}</span>
      {type === "select" ? (
        <select defaultValue={String(field.value ?? field.options?.[0]?.value ?? field.options?.[0]?.label ?? "")} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
          {(field.options ?? []).map((option) => (
            <option key={option.value ?? option.label} value={option.value ?? option.label}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          defaultValue={field.value ?? ""}
          placeholder={field.placeholder}
          className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      ) : (
        <input
          type={type}
          defaultValue={field.value ?? ""}
          placeholder={field.placeholder}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      )}
    </label>
  );
}
