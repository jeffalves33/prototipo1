type AppErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type AppErrorEventDetail = {
  error: unknown;
  context: Record<string, unknown>;
  options: AppErrorOptions;
};

export function reportAppError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<AppErrorEventDetail>("prototipo1:error", {
      detail: {
        error,
        context: {
          source: "react_error_boundary",
          route: window.location.pathname,
          ...context,
        },
        options: {
          mechanism: "react_error_boundary",
          handled: false,
          severity: "error",
        },
      },
    }),
  );
}
