import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useProfile } from "./router-BE5avutW.mjs";
import { U as UserCog, f as Truck, W as Wrench } from "../_libs/lucide-react.mjs";
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
const options = [{
  id: "admin",
  title: "Administrador",
  desc: "Gestão completa em desktop: dashboard, veículos, motoristas, manutenções, relatórios.",
  route: "/admin/dashboard",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCog, { className: "h-7 w-7" }),
  tag: "Desktop"
}, {
  id: "driver",
  title: "Motorista",
  desc: "Tela operacional simples: iniciar viagem, registrar abastecimento e despesas.",
  route: "/driver",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-7 w-7" }),
  tag: "Mobile / PWA"
}, {
  id: "mechanic",
  title: "Mecânico",
  desc: "Registro rápido de manutenções, pendências e visualização de veículos.",
  route: "/mechanic",
  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-7 w-7" }),
  tag: "Mobile / PWA"
}];
function ProfileSelector() {
  const navigate = useNavigate();
  const {
    profile,
    setProfile
  } = useProfile();
  reactExports.useEffect(() => {
    if (profile === "admin") void navigate({
      to: "/admin/dashboard"
    });
    else if (profile === "driver") void navigate({
      to: "/driver"
    });
    else if (profile === "mechanic") void navigate({
      to: "/mechanic"
    });
  }, [profile, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary", children: "Frota ERP" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl", children: "Selecione o perfil de acesso" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Protótipo funcional — cada perfil tem fluxos próprios. Sem autenticação real." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-4 sm:grid-cols-3", children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
      setProfile(o.id);
      void navigate({
        to: o.route
      });
    }, className: "group flex flex-col items-start rounded-xl border border-border bg-card p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary", children: o.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground", children: o.tag })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-lg font-semibold text-foreground", children: o.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: o.desc }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-4 text-sm font-medium text-primary group-hover:underline", children: "Entrar →" })
    ] }, o.id)) })
  ] }) });
}
export {
  ProfileSelector as component
};
