import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { R as Root, b as Trigger, C as Close, P as Portal, a as Content, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { X } from "../_libs/lucide-react.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogClose = Close;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const defaultTrigger = "rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90";
function ActionDialog({
  triggerLabel,
  title,
  description,
  fields = [],
  children,
  submitLabel = "Salvar",
  triggerClassName = defaultTrigger,
  contentClassName
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: triggerClassName, children: triggerLabel }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: contentClassName ?? "max-h-[90vh] overflow-y-auto sm:max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: fields.map((field) => /* @__PURE__ */ jsxRuntimeExports.jsx(ActionFieldControl, { field }, `${field.label}-${field.type ?? "text"}`)) }),
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "rounded-md border border-input bg-card px-3 py-2 text-sm hover:bg-accent", children: "Cancelar" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: submitLabel }) })
      ] })
    ] })
  ] });
}
function ActionFieldControl({ field }) {
  const type = field.type ?? "text";
  const className = field.wide || type === "textarea" || type === "checkboxes" || type === "summary" ? "sm:col-span-2" : "";
  if (type === "summary") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-muted/50 p-3 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: field.label }),
      field.value != null && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: field.value })
    ] }) });
  }
  if (type === "checkboxes") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: field.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-40 space-y-1 overflow-y-auto rounded-md border border-input bg-background p-2", children: (field.options ?? []).map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", defaultChecked: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: option.label })
      ] }, option.value ?? option.label)) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-xs font-medium text-muted-foreground", children: field.label }),
    type === "select" ? /* @__PURE__ */ jsxRuntimeExports.jsx("select", { defaultValue: String(field.value ?? field.options?.[0]?.value ?? field.options?.[0]?.label ?? ""), className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm", children: (field.options ?? []).map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option.value ?? option.label, children: option.label }, option.value ?? option.label)) }) : type === "textarea" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        defaultValue: field.value ?? "",
        placeholder: field.placeholder,
        className: "min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        defaultValue: field.value ?? "",
        placeholder: field.placeholder,
        className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      }
    )
  ] });
}
export {
  ActionDialog as A
};
