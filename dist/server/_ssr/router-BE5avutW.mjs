import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, d as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { J as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
const appCss = "/assets/styles-DwEaEaGp.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Ctx = reactExports.createContext({ profile: null, setProfile: () => {
} });
const KEY = "fleet:profile";
function ProfileProvider({ children }) {
  const [profile, setProfileState] = reactExports.useState(null);
  reactExports.useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === "admin" || v === "driver" || v === "mechanic") setProfileState(v);
    } catch {
    }
  }, []);
  const setProfile = (p) => {
    setProfileState(p);
    try {
      if (p) localStorage.setItem(KEY, p);
      else localStorage.removeItem(KEY);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Ctx.Provider, { value: { profile, setProfile }, children });
}
const useProfile = () => reactExports.useContext(Ctx);
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$r = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Frota — Gestão de Frota" },
      { name: "description", content: "Protótipo mockado de ERP para gestão de frota" },
      { name: "author", content: "Prodexy" },
      { property: "og:title", content: "Frota ERP" },
      { property: "og:description", content: "Protótipo mockado de ERP para gestão de frota" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "theme-color", content: "#0056a3" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      {
        rel: "manifest",
        href: "/manifest.webmanifest"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$r.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) });
}
const $$splitComponentImporter$p = () => import("./mechanic-CDY6IatA.mjs");
const Route$q = createFileRoute("/mechanic")({
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./driver-BFsOu0JM.mjs");
const Route$p = createFileRoute("/driver")({
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./admin-zWaZBSV5.mjs");
const Route$o = createFileRoute("/admin")({
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./index-DnetNW-D.mjs");
const Route$n = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Frota — Selecionar perfil"
    }, {
      name: "description",
      content: "Selecione o perfil para entrar no sistema de gestão de frota."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./mechanic.index-DdTz3IfM.mjs");
const Route$m = createFileRoute("/mechanic/")({
  head: () => ({
    meta: [{
      title: "Mecânico — Manutenções"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./driver.index-CnyzjXgi.mjs");
const Route$l = createFileRoute("/driver/")({
  head: () => ({
    meta: [{
      title: "Motorista — Operação"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const Route$k = createFileRoute("/admin/")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/dashboard" });
  }
});
const $$splitComponentImporter$j = () => import("./mechanic.veiculos-IrZLifdh.mjs");
const Route$j = createFileRoute("/mechanic/veiculos")({
  head: () => ({
    meta: [{
      title: "Mecânico — Veículos"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./mechanic.servicos-DGMY3qKU.mjs");
const Route$i = createFileRoute("/mechanic/servicos")({
  head: () => ({
    meta: [{
      title: "Mecânico — Serviços"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./mechanic.pendencias-DpFO54kw.mjs");
const Route$h = createFileRoute("/mechanic/pendencias")({
  head: () => ({
    meta: [{
      title: "Mecânico — Pendências"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./admin.viagens-CdJ-0cjI.mjs");
const Route$g = createFileRoute("/admin/viagens")({
  head: () => ({
    meta: [{
      title: "Viagens — Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./admin.veiculos-QyO5v7Do.mjs");
const Route$f = createFileRoute("/admin/veiculos")({
  head: () => ({
    meta: [{
      title: "Veículos — Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./admin.servicos-De0XWx1J.mjs");
const Route$e = createFileRoute("/admin/servicos")({
  head: () => ({
    meta: [{
      title: "Serviços — Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./admin.relatorios-r2LlBMYS.mjs");
const Route$d = createFileRoute("/admin/relatorios")({
  head: () => ({
    meta: [{
      title: "Relatórios — Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./admin.pendencias-HhcIpNG-.mjs");
const Route$c = createFileRoute("/admin/pendencias")({
  head: () => ({
    meta: [{
      title: "Pendências — Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./admin.motoristas-B2ThgQIM.mjs");
const Route$b = createFileRoute("/admin/motoristas")({
  head: () => ({
    meta: [{
      title: "Motoristas — Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./admin.mecanicos-DzkRAEkr.mjs");
const Route$a = createFileRoute("/admin/mecanicos")({
  head: () => ({
    meta: [{
      title: "Mecânicos — Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin.manutencoes-C-TFd5nb.mjs");
const Route$9 = createFileRoute("/admin/manutencoes")({
  head: () => ({
    meta: [{
      title: "Manutenções — Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./admin.despesas-0glsgZZv.mjs");
const Route$8 = createFileRoute("/admin/despesas")({
  head: () => ({
    meta: [{
      title: "Despesas — Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin.dashboard-D6j0LBGw.mjs");
const Route$7 = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.abastecimentos-CZqVMNtd.mjs");
const Route$6 = createFileRoute("/admin/abastecimentos")({
  head: () => ({
    meta: [{
      title: "Abastecimentos — Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const vehicles = [
  {
    id: "v1",
    type: "caminhao",
    brand: "Scania",
    model: "R 450",
    plate: "RIO-2A45",
    year: 2021,
    status: "ativo",
    currentKm: 412300,
    capacity: "29 ton",
    mainDriverId: "d1",
    documentationDueDate: "2026-09-12",
    tachographDueDate: "2026-04-18",
    documentationStatus: "ok",
    tachographStatus: "proximo",
    averageConsumption: 2.4,
    totalMaintenanceCost: 38450,
    createdAt: "2022-03-10"
  },
  {
    id: "v2",
    type: "caminhao",
    brand: "Volvo",
    model: "FH 540",
    plate: "SPA-7B12",
    year: 2020,
    status: "manutencao",
    currentKm: 528900,
    capacity: "32 ton",
    mainDriverId: "d2",
    documentationDueDate: "2026-02-02",
    tachographDueDate: "2026-01-15",
    documentationStatus: "proximo",
    tachographStatus: "proximo",
    averageConsumption: 2.2,
    totalMaintenanceCost: 61200,
    createdAt: "2021-06-22"
  },
  {
    id: "v3",
    type: "cavalinho",
    brand: "Mercedes-Benz",
    model: "Actros 2651",
    plate: "MGE-9C77",
    year: 2022,
    status: "ativo",
    currentKm: 198400,
    capacity: "40 ton",
    mainDriverId: "d3",
    documentationDueDate: "2026-11-30",
    tachographDueDate: "2026-08-04",
    documentationStatus: "ok",
    tachographStatus: "ok",
    averageConsumption: 2.6,
    totalMaintenanceCost: 21400,
    createdAt: "2023-01-15"
  },
  {
    id: "v4",
    type: "reboque",
    brand: "Randon",
    model: "SR Bitrem",
    plate: "PRC-4D33",
    year: 2019,
    status: "ativo",
    currentKm: 312100,
    capacity: "37 ton",
    mainDriverId: null,
    documentationDueDate: "2025-12-20",
    tachographDueDate: "2026-06-10",
    documentationStatus: "vencido",
    tachographStatus: "ok",
    averageConsumption: 0,
    totalMaintenanceCost: 14800,
    createdAt: "2020-08-04"
  },
  {
    id: "v5",
    type: "onibus",
    brand: "Marcopolo",
    model: "Paradiso G7",
    plate: "BAH-1E58",
    year: 2018,
    status: "inativo",
    currentKm: 689200,
    capacity: "46 pax",
    mainDriverId: null,
    documentationDueDate: "2025-10-15",
    tachographDueDate: "2025-09-30",
    documentationStatus: "vencido",
    tachographStatus: "vencido",
    averageConsumption: 3.1,
    totalMaintenanceCost: 73100,
    createdAt: "2019-04-19"
  },
  {
    id: "v6",
    type: "caminhao",
    brand: "Iveco",
    model: "Tector 240E28",
    plate: "GOA-6F02",
    year: 2023,
    status: "ativo",
    currentKm: 84300,
    capacity: "16 ton",
    mainDriverId: "d4",
    documentationDueDate: "2027-01-22",
    tachographDueDate: "2027-01-22",
    documentationStatus: "ok",
    tachographStatus: "ok",
    averageConsumption: 3,
    totalMaintenanceCost: 6200,
    createdAt: "2023-08-30"
  },
  {
    id: "v7",
    type: "cavalinho",
    brand: "DAF",
    model: "XF 530",
    plate: "PEL-3G19",
    year: 2021,
    status: "reservado",
    currentKm: 256800,
    capacity: "40 ton",
    mainDriverId: "d5",
    documentationDueDate: "2026-07-09",
    tachographDueDate: "2026-05-04",
    documentationStatus: "ok",
    tachographStatus: "ok",
    averageConsumption: 2.5,
    totalMaintenanceCost: 19400,
    createdAt: "2022-02-11"
  },
  {
    id: "v8",
    type: "utilitario",
    brand: "Fiat",
    model: "Fiorino",
    plate: "CWB-8H64",
    year: 2022,
    status: "indisponivel",
    currentKm: 67500,
    capacity: "650 kg",
    mainDriverId: null,
    documentationDueDate: "2026-03-15",
    tachographDueDate: "2026-03-15",
    documentationStatus: "proximo",
    tachographStatus: "ok",
    averageConsumption: 11.4,
    totalMaintenanceCost: 3100,
    createdAt: "2023-02-22"
  }
];
const drivers = [
  {
    id: "d1",
    name: "Carlos Almeida",
    address: "Rua das Acácias, 312 - São Paulo/SP",
    phone: "(11) 98745-2210",
    cpf: "421.998.110-22",
    licenseNumber: "04125698710",
    licenseDueDate: "2026-10-04",
    licenseStatus: "ok",
    mainVehicleId: "v1",
    status: "ativo",
    totalTrips: 84,
    totalKm: 122400,
    totalLiters: 51e3,
    totalTravelExpenses: 32400
  },
  {
    id: "d2",
    name: "Rafael Souza",
    address: "Av. Atlântica, 805 - Rio de Janeiro/RJ",
    phone: "(21) 99214-7733",
    cpf: "532.114.005-19",
    licenseNumber: "08214479902",
    licenseDueDate: "2026-01-22",
    licenseStatus: "proximo",
    mainVehicleId: "v2",
    status: "ativo",
    totalTrips: 102,
    totalKm: 168900,
    totalLiters: 76800,
    totalTravelExpenses: 41200
  },
  {
    id: "d3",
    name: "João Pereira",
    address: "Rua XV de Novembro, 50 - Curitiba/PR",
    phone: "(41) 99812-4456",
    cpf: "118.224.097-04",
    licenseNumber: "05569821100",
    licenseDueDate: "2025-12-10",
    licenseStatus: "vencido",
    mainVehicleId: "v3",
    status: "afastado",
    totalTrips: 67,
    totalKm: 89200,
    totalLiters: 34300,
    totalTravelExpenses: 22800
  },
  {
    id: "d4",
    name: "Marcos Lima",
    address: "Rua Goiás, 121 - Goiânia/GO",
    phone: "(62) 99554-1188",
    cpf: "709.330.221-88",
    licenseNumber: "07733512244",
    licenseDueDate: "2027-03-19",
    licenseStatus: "ok",
    mainVehicleId: "v6",
    status: "ativo",
    totalTrips: 31,
    totalKm: 41200,
    totalLiters: 13700,
    totalTravelExpenses: 8400
  },
  {
    id: "d5",
    name: "Anderson Ribeiro",
    address: "Av. Brasil, 998 - Belo Horizonte/MG",
    phone: "(31) 99102-5577",
    cpf: "884.117.560-30",
    licenseNumber: "02211897733",
    licenseDueDate: "2026-08-30",
    licenseStatus: "ok",
    mainVehicleId: "v7",
    status: "ativo",
    totalTrips: 58,
    totalKm: 95400,
    totalLiters: 38100,
    totalTravelExpenses: 19700
  }
];
const mechanics = [
  { id: "m1", name: "Edson Martins", phone: "(11) 97712-0021", specialty: "Motor e Diesel", status: "ativo" },
  { id: "m2", name: "Paulo Henrique", phone: "(11) 96623-8809", specialty: "Freios e Suspensão", status: "ativo" },
  { id: "m3", name: "Luiz Cardoso", phone: "(11) 98890-3344", specialty: "Elétrica e Tacógrafo", status: "ativo" }
];
const services = [
  { id: "s1", name: "Troca de óleo do motor", category: "oleo", suggestedMaintenanceType: "preventiva", periodicityType: "km", periodicityKm: 1e4, description: "Troca de óleo lubrificante do motor.", status: "ativo" },
  { id: "s2", name: "Troca de filtro de óleo", category: "oleo", suggestedMaintenanceType: "preventiva", periodicityType: "km", periodicityKm: 1e4, description: "Substituição do filtro de óleo.", status: "ativo" },
  { id: "s3", name: "Troca de filtro de ar", category: "motor", suggestedMaintenanceType: "preventiva", periodicityType: "km", periodicityKm: 2e4, description: "Substituição do filtro de ar do motor.", status: "ativo" },
  { id: "s4", name: "Revisão de freios", category: "freios", suggestedMaintenanceType: "preventiva", periodicityType: "km", periodicityKm: 25e3, description: "Inspeção e ajuste do sistema de freios.", status: "ativo" },
  { id: "s5", name: "Alinhamento", category: "suspensao", suggestedMaintenanceType: "preventiva", periodicityType: "km", periodicityKm: 15e3, description: "Alinhamento da direção.", status: "ativo" },
  { id: "s6", name: "Balanceamento", category: "pneus", suggestedMaintenanceType: "preventiva", periodicityType: "km", periodicityKm: 15e3, description: "Balanceamento de rodas.", status: "ativo" },
  { id: "s7", name: "Rodízio de pneus", category: "pneus", suggestedMaintenanceType: "preventiva", periodicityType: "km", periodicityKm: 2e4, description: "Rodízio para desgaste uniforme.", status: "ativo" },
  { id: "s8", name: "Troca de pneus", category: "pneus", suggestedMaintenanceType: "preventiva", periodicityType: "km", periodicityKm: 8e4, description: "Substituição completa dos pneus.", status: "ativo" },
  { id: "s9", name: "Revisão geral", category: "revisao_geral", suggestedMaintenanceType: "preventiva", periodicityType: "km", periodicityKm: 3e4, description: "Revisão completa programada.", status: "ativo" },
  { id: "s10", name: "Troca de óleo do câmbio", category: "cambio", suggestedMaintenanceType: "preventiva", periodicityType: "km", periodicityKm: 6e4, description: "Troca do óleo da transmissão.", status: "ativo" },
  { id: "s11", name: "Troca de óleo do diferencial", category: "cambio", suggestedMaintenanceType: "preventiva", periodicityType: "km", periodicityKm: 6e4, description: "Troca de óleo do diferencial.", status: "ativo" },
  { id: "s12", name: "Inspeção de tacógrafo", category: "documentacao", suggestedMaintenanceType: "preventiva", periodicityType: "time", periodicityDays: 730, description: "Aferição obrigatória do tacógrafo.", status: "ativo" },
  { id: "s13", name: "Revisão elétrica", category: "eletrica", suggestedMaintenanceType: "preventiva", periodicityType: "km", periodicityKm: 4e4, description: "Diagnóstico geral do sistema elétrico.", status: "ativo" },
  { id: "s14", name: "Renovação de licenciamento", category: "documentacao", suggestedMaintenanceType: "preventiva", periodicityType: "time", periodicityDays: 365, description: "Renovação anual do documento do veículo.", status: "ativo" },
  { id: "s15", name: "Reparo corretivo emergencial", category: "outros", suggestedMaintenanceType: "corretiva", periodicityType: "none", description: "Atendimento emergencial em panes ou quebras.", status: "ativo" }
];
const trips = [
  { id: "t1", driverId: "d1", vehicleId: "v1", origin: "São Paulo/SP", destination: "Curitiba/PR", startedAt: "2026-05-28T07:10:00", finishedAt: null, status: "em_andamento", initialKm: 411800, finalKm: null, totalKm: null, notes: "Carga: bobinas de aço.", temporaryVehicleAssignment: false },
  { id: "t2", driverId: "d2", vehicleId: "v3", origin: "Rio de Janeiro/RJ", destination: "Belo Horizonte/MG", startedAt: "2026-05-27T05:00:00", finishedAt: null, status: "em_andamento", initialKm: 198100, finalKm: null, totalKm: null, notes: "Substituição temporária por manutenção do V2.", temporaryVehicleAssignment: true },
  { id: "t3", driverId: "d4", vehicleId: "v6", origin: "Goiânia/GO", destination: "Brasília/DF", startedAt: "2026-05-26T08:30:00", finishedAt: "2026-05-26T15:40:00", status: "concluida", initialKm: 83900, finalKm: 84300, totalKm: 400, notes: "", temporaryVehicleAssignment: false },
  { id: "t4", driverId: "d5", vehicleId: "v7", origin: "Belo Horizonte/MG", destination: "Salvador/BA", startedAt: "2026-05-22T04:00:00", finishedAt: "2026-05-24T19:20:00", status: "concluida", initialKm: 254800, finalKm: 256800, totalKm: 2e3, notes: "Frete fechado para distribuidor.", temporaryVehicleAssignment: false },
  { id: "t5", driverId: "d1", vehicleId: "v1", origin: "São Paulo/SP", destination: "Porto Alegre/RS", startedAt: "2026-05-18T06:30:00", finishedAt: "2026-05-20T20:00:00", status: "concluida", initialKm: 410200, finalKm: 411800, totalKm: 1600, notes: "", temporaryVehicleAssignment: false },
  { id: "t6", driverId: "d2", vehicleId: "v2", origin: "Rio de Janeiro/RJ", destination: "Vitória/ES", startedAt: "2026-05-15T06:00:00", finishedAt: "2026-05-16T11:00:00", status: "concluida", initialKm: 527600, finalKm: 528900, totalKm: 1300, notes: "", temporaryVehicleAssignment: false },
  { id: "t7", driverId: "d4", vehicleId: "v6", origin: "Goiânia/GO", destination: "Anápolis/GO", startedAt: "2026-05-12T09:00:00", finishedAt: "2026-05-12T11:00:00", status: "concluida", initialKm: 83700, finalKm: 83900, totalKm: 200, notes: "", temporaryVehicleAssignment: false },
  { id: "t8", driverId: "d5", vehicleId: "v7", origin: "Belo Horizonte/MG", destination: "Uberlândia/MG", startedAt: "2026-05-08T07:00:00", finishedAt: "2026-05-08T15:00:00", status: "concluida", initialKm: 254200, finalKm: 254800, totalKm: 600, notes: "", temporaryVehicleAssignment: false },
  { id: "t9", driverId: "d3", vehicleId: "v3", origin: "Curitiba/PR", destination: "Florianópolis/SC", startedAt: "2026-05-05T05:00:00", finishedAt: "2026-05-05T12:00:00", status: "cancelada", initialKm: 198100, finalKm: 198100, totalKm: 0, notes: "Cancelada: cliente recusou carga.", temporaryVehicleAssignment: false },
  { id: "t10", driverId: "d1", vehicleId: "v1", origin: "São Paulo/SP", destination: "Campinas/SP", startedAt: "2026-05-02T08:00:00", finishedAt: "2026-05-02T11:30:00", status: "concluida", initialKm: 409900, finalKm: 410200, totalKm: 300, notes: "", temporaryVehicleAssignment: false }
];
const refuels = [
  { id: "r1", tripId: "t1", driverId: "d1", vehicleId: "v1", date: "2026-05-28T11:00:00", currentKm: 412e3, fuelType: "diesel_s10", liters: 220, unitPrice: 6.18, totalValue: 1359.6, notes: "Posto BR Rod. Régis Bittencourt" },
  { id: "r2", tripId: "t2", driverId: "d2", vehicleId: "v3", date: "2026-05-27T10:00:00", currentKm: 198300, fuelType: "diesel_s10", liters: 180, unitPrice: 6.22, totalValue: 1119.6, notes: "" },
  { id: "r3", tripId: "t3", driverId: "d4", vehicleId: "v6", date: "2026-05-26T12:00:00", currentKm: 84100, fuelType: "diesel", liters: 60, unitPrice: 5.99, totalValue: 359.4, notes: "" },
  { id: "r4", tripId: "t4", driverId: "d5", vehicleId: "v7", date: "2026-05-23T08:00:00", currentKm: 255600, fuelType: "diesel_s10", liters: 300, unitPrice: 6.25, totalValue: 1875, notes: "" },
  { id: "r5", tripId: "t4", driverId: "d5", vehicleId: "v7", date: "2026-05-24T07:00:00", currentKm: 256400, fuelType: "diesel_s10", liters: 240, unitPrice: 6.2, totalValue: 1488, notes: "" },
  { id: "r6", tripId: "t5", driverId: "d1", vehicleId: "v1", date: "2026-05-19T10:00:00", currentKm: 411e3, fuelType: "diesel_s10", liters: 250, unitPrice: 6.1, totalValue: 1525, notes: "" },
  { id: "r7", tripId: "t6", driverId: "d2", vehicleId: "v2", date: "2026-05-15T15:00:00", currentKm: 528200, fuelType: "diesel_s10", liters: 290, unitPrice: 6.18, totalValue: 1792.2, notes: "" },
  { id: "r8", tripId: "t7", driverId: "d4", vehicleId: "v6", date: "2026-05-12T10:00:00", currentKm: 83800, fuelType: "diesel", liters: 35, unitPrice: 6, totalValue: 210, notes: "" },
  { id: "r9", tripId: "t8", driverId: "d5", vehicleId: "v7", date: "2026-05-08T11:00:00", currentKm: 254500, fuelType: "diesel_s10", liters: 110, unitPrice: 6.15, totalValue: 676.5, notes: "" },
  { id: "r10", tripId: "t10", driverId: "d1", vehicleId: "v1", date: "2026-05-02T09:00:00", currentKm: 410050, fuelType: "diesel_s10", liters: 60, unitPrice: 6.05, totalValue: 363, notes: "" },
  { id: "r11", tripId: "t1", driverId: "d1", vehicleId: "v1", date: "2026-05-28T16:00:00", currentKm: 412200, fuelType: "arla", liters: 30, unitPrice: 7.1, totalValue: 213, notes: "Arla32" },
  { id: "r12", tripId: "t2", driverId: "d2", vehicleId: "v3", date: "2026-05-27T17:00:00", currentKm: 198380, fuelType: "diesel_s10", liters: 90, unitPrice: 6.22, totalValue: 559.8, notes: "" }
];
const expenses = [
  { id: "e1", tripId: "t1", driverId: "d1", vehicleId: "v1", type: "pedagio", value: 180, date: "2026-05-28T09:00:00", notes: "Praças SP-PR" },
  { id: "e2", tripId: "t1", driverId: "d1", vehicleId: "v1", type: "alimentacao", value: 65, date: "2026-05-28T13:00:00", notes: "" },
  { id: "e3", tripId: "t2", driverId: "d2", vehicleId: "v3", type: "pedagio", value: 145, date: "2026-05-27T09:30:00", notes: "" },
  { id: "e4", tripId: "t2", driverId: "d2", vehicleId: "v3", type: "hospedagem", value: 220, date: "2026-05-27T22:00:00", notes: "Hotel rodoviário" },
  { id: "e5", tripId: "t4", driverId: "d5", vehicleId: "v7", type: "pedagio", value: 320, date: "2026-05-22T18:00:00", notes: "" },
  { id: "e6", tripId: "t4", driverId: "d5", vehicleId: "v7", type: "alimentacao", value: 110, date: "2026-05-23T13:00:00", notes: "" },
  { id: "e7", tripId: "t4", driverId: "d5", vehicleId: "v7", type: "descarga", value: 400, date: "2026-05-24T18:30:00", notes: "Carregadores" },
  { id: "e8", tripId: "t5", driverId: "d1", vehicleId: "v1", type: "pedagio", value: 290, date: "2026-05-19T08:00:00", notes: "" },
  { id: "e9", tripId: "t6", driverId: "d2", vehicleId: "v2", type: "pedagio", value: 95, date: "2026-05-15T12:00:00", notes: "" },
  { id: "e10", tripId: "t6", driverId: "d2", vehicleId: "v2", type: "alimentacao", value: 75, date: "2026-05-16T08:00:00", notes: "" },
  { id: "e11", tripId: "t8", driverId: "d5", vehicleId: "v7", type: "outros", value: 50, date: "2026-05-08T12:30:00", notes: "Lavagem expressa" },
  { id: "e12", tripId: "t3", driverId: "d4", vehicleId: "v6", type: "pedagio", value: 35, date: "2026-05-26T10:00:00", notes: "" }
];
const maintenances = [
  { id: "ma1", vehicleId: "v2", maintenanceType: "corretiva", serviceIds: ["s4", "s13"], cause: "Pedal de freio com folga e luz de injeção", date: "2026-05-26", currentKm: 528900, value: 3850, mechanicId: "m2", status: "em_andamento", notes: "Aguardando peça de sensor." },
  { id: "ma2", vehicleId: "v1", maintenanceType: "preventiva", serviceIds: ["s1", "s2", "s5"], cause: "Revisão programada de 410k", date: "2026-05-01", currentKm: 41e4, value: 1740, mechanicId: "m1", status: "concluida", notes: "" },
  { id: "ma3", vehicleId: "v3", maintenanceType: "preventiva", serviceIds: ["s1", "s2"], cause: "Troca de óleo programada", date: "2026-04-22", currentKm: 195e3, value: 980, mechanicId: "m1", status: "concluida", notes: "" },
  { id: "ma4", vehicleId: "v5", maintenanceType: "corretiva", serviceIds: ["s15"], cause: "Motor superaquecendo", date: "2026-04-10", currentKm: 689e3, value: 12400, mechanicId: "m1", status: "aberta", notes: "Necessário retífica parcial." },
  { id: "ma5", vehicleId: "v6", maintenanceType: "preventiva", serviceIds: ["s1", "s2", "s3", "s4"], cause: "Revisão 80k", date: "2026-03-15", currentKm: 8e4, value: 1650, mechanicId: "m1", status: "concluida", notes: "" },
  { id: "ma6", vehicleId: "v7", maintenanceType: "preventiva", serviceIds: ["s6", "s7"], cause: "Rodízio e balanceamento", date: "2026-03-02", currentKm: 25e4, value: 720, mechanicId: "m2", status: "concluida", notes: "" },
  { id: "ma7", vehicleId: "v4", maintenanceType: "corretiva", serviceIds: ["s13"], cause: "Sistema elétrico de iluminação intermitente", date: "2026-02-18", currentKm: 311e3, value: 1180, mechanicId: "m3", status: "concluida", notes: "" },
  { id: "ma8", vehicleId: "v8", maintenanceType: "corretiva", serviceIds: ["s15"], cause: "Veículo não dá partida", date: "2026-05-20", currentKm: 67500, value: 0, mechanicId: "m3", status: "aberta", notes: "Bateria suspeita." },
  { id: "ma9", vehicleId: "v1", maintenanceType: "preventiva", serviceIds: ["s10", "s11"], cause: "Troca de óleos câmbio/diferencial", date: "2026-01-12", currentKm: 4e5, value: 2100, mechanicId: "m1", status: "concluida", notes: "" },
  { id: "ma10", vehicleId: "v2", maintenanceType: "preventiva", serviceIds: ["s9"], cause: "Revisão geral 520k", date: "2026-04-30", currentKm: 52e4, value: 4800, mechanicId: "m1", status: "concluida", notes: "" }
];
const pendencies = [
  { id: "p1", type: "veiculo_manutencao", severity: "critica", vehicleId: "v2", title: "Veículo SPA-7B12 em manutenção corretiva", description: "Aguardando peça do sensor de injeção.", status: "aberta", actionLabel: "Ver manutenção" },
  { id: "p2", type: "manutencao_aberta", severity: "critica", vehicleId: "v5", title: "Manutenção aberta em BAH-1E58", description: "Necessário retífica parcial do motor.", status: "aberta", actionLabel: "Abrir manutenção" },
  { id: "p3", type: "documentacao_vencida", severity: "critica", vehicleId: "v4", title: "Documentação vencida em PRC-4D33", description: "CRLV expirado em 2025-12-20.", dueDate: "2025-12-20", status: "aberta", actionLabel: "Regularizar" },
  { id: "p4", type: "cnh_vencida", severity: "critica", driverId: "d3", title: "CNH vencida — João Pereira", description: "Habilitação expirada em 2025-12-10.", dueDate: "2025-12-10", status: "aberta", actionLabel: "Notificar motorista" },
  { id: "p5", type: "tacografo_vencido", severity: "critica", vehicleId: "v5", title: "Tacógrafo vencido em BAH-1E58", description: "Aferição expirada em 2025-09-30.", dueDate: "2025-09-30", status: "aberta", actionLabel: "Agendar aferição" },
  { id: "p6", type: "servico_km_vencido", severity: "atencao", vehicleId: "v1", serviceId: "s1", title: "Troca de óleo do motor vencida — RIO-2A45", description: "Última troca em 410.000 km, próxima em 420.000 km. KM atual: 412.300.", dueKm: 42e4, currentKm: 412300, status: "aberta", actionLabel: "Agendar serviço" },
  { id: "p7", type: "servico_km_proximo", severity: "atencao", vehicleId: "v3", serviceId: "s5", title: "Alinhamento próximo do vencimento — MGE-9C77", description: "Próximo em 210.000 km. KM atual: 198.400.", dueKm: 21e4, currentKm: 198400, status: "aberta", actionLabel: "Agendar serviço" },
  { id: "p8", type: "servico_tempo_proximo", severity: "atencao", vehicleId: "v1", serviceId: "s12", title: "Inspeção de tacógrafo próxima — RIO-2A45", description: "Vence em 2026-04-18.", dueDate: "2026-04-18", status: "aberta", actionLabel: "Agendar inspeção" },
  { id: "p9", type: "documentacao_vencida", severity: "atencao", vehicleId: "v8", title: "Documentação próxima do vencimento — CWB-8H64", description: "CRLV vence em 2026-03-15.", dueDate: "2026-03-15", status: "aberta", actionLabel: "Regularizar" },
  { id: "p10", type: "servico_km_proximo", severity: "baixa", vehicleId: "v6", serviceId: "s3", title: "Filtro de ar próximo do vencimento — GOA-6F02", description: "Próximo em 100.000 km. KM atual: 84.300.", dueKm: 1e5, currentKm: 84300, status: "aberta", actionLabel: "Agendar serviço" }
];
const $$splitComponentImporter$5 = () => import("./mechanic.veiculos._id-DfI85cmm.mjs");
const Route$5 = createFileRoute("/mechanic/veiculos/$id")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `${vehicles.find((v) => v.id === params.id)?.plate ?? "Veículo"} — Mecânico`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.viagens._id-DXvz9LdG.mjs");
const Route$4 = createFileRoute("/admin/viagens/$id")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `${trips.find((t) => t.id === params.id)?.origin ?? "Viagem"} — Admin`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.veiculos._id-BW3_mQFi.mjs");
const $$splitErrorComponentImporter = () => import("./admin.veiculos._id-BVdIPtT0.mjs");
const $$splitNotFoundComponentImporter = () => import("./admin.veiculos._id-GJ19hAx5.mjs");
const Route$3 = createFileRoute("/admin/veiculos/$id")({
  head: ({
    params
  }) => {
    const v = vehicles.find((x) => x.id === params.id);
    return {
      meta: [{
        title: `${v?.plate ?? "Veículo"} — Admin`
      }]
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.servicos._id-B0YZ5yQp.mjs");
const Route$2 = createFileRoute("/admin/servicos/$id")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `${services.find((s) => s.id === params.id)?.name ?? "Serviço"} — Admin`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.motoristas._id-BBScrxTo.mjs");
const Route$1 = createFileRoute("/admin/motoristas/$id")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `${drivers.find((d) => d.id === params.id)?.name ?? "Motorista"} — Admin`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.manutencoes._id-Dhv-nEIU.mjs");
const Route = createFileRoute("/admin/manutencoes/$id")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `Manutenção ${params.id} — Admin`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const MechanicRoute = Route$q.update({
  id: "/mechanic",
  path: "/mechanic",
  getParentRoute: () => Route$r
});
const DriverRoute = Route$p.update({
  id: "/driver",
  path: "/driver",
  getParentRoute: () => Route$r
});
const AdminRoute = Route$o.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$r
});
const IndexRoute = Route$n.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$r
});
const MechanicIndexRoute = Route$m.update({
  id: "/",
  path: "/",
  getParentRoute: () => MechanicRoute
});
const DriverIndexRoute = Route$l.update({
  id: "/",
  path: "/",
  getParentRoute: () => DriverRoute
});
const AdminIndexRoute = Route$k.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const MechanicVeiculosRoute = Route$j.update({
  id: "/veiculos",
  path: "/veiculos",
  getParentRoute: () => MechanicRoute
});
const MechanicServicosRoute = Route$i.update({
  id: "/servicos",
  path: "/servicos",
  getParentRoute: () => MechanicRoute
});
const MechanicPendenciasRoute = Route$h.update({
  id: "/pendencias",
  path: "/pendencias",
  getParentRoute: () => MechanicRoute
});
const AdminViagensRoute = Route$g.update({
  id: "/viagens",
  path: "/viagens",
  getParentRoute: () => AdminRoute
});
const AdminVeiculosRoute = Route$f.update({
  id: "/veiculos",
  path: "/veiculos",
  getParentRoute: () => AdminRoute
});
const AdminServicosRoute = Route$e.update({
  id: "/servicos",
  path: "/servicos",
  getParentRoute: () => AdminRoute
});
const AdminRelatoriosRoute = Route$d.update({
  id: "/relatorios",
  path: "/relatorios",
  getParentRoute: () => AdminRoute
});
const AdminPendenciasRoute = Route$c.update({
  id: "/pendencias",
  path: "/pendencias",
  getParentRoute: () => AdminRoute
});
const AdminMotoristasRoute = Route$b.update({
  id: "/motoristas",
  path: "/motoristas",
  getParentRoute: () => AdminRoute
});
const AdminMecanicosRoute = Route$a.update({
  id: "/mecanicos",
  path: "/mecanicos",
  getParentRoute: () => AdminRoute
});
const AdminManutencoesRoute = Route$9.update({
  id: "/manutencoes",
  path: "/manutencoes",
  getParentRoute: () => AdminRoute
});
const AdminDespesasRoute = Route$8.update({
  id: "/despesas",
  path: "/despesas",
  getParentRoute: () => AdminRoute
});
const AdminDashboardRoute = Route$7.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AdminRoute
});
const AdminAbastecimentosRoute = Route$6.update({
  id: "/abastecimentos",
  path: "/abastecimentos",
  getParentRoute: () => AdminRoute
});
const MechanicVeiculosIdRoute = Route$5.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => MechanicVeiculosRoute
});
const AdminViagensIdRoute = Route$4.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => AdminViagensRoute
});
const AdminVeiculosIdRoute = Route$3.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => AdminVeiculosRoute
});
const AdminServicosIdRoute = Route$2.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => AdminServicosRoute
});
const AdminMotoristasIdRoute = Route$1.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => AdminMotoristasRoute
});
const AdminManutencoesIdRoute = Route.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => AdminManutencoesRoute
});
const AdminManutencoesRouteChildren = {
  AdminManutencoesIdRoute
};
const AdminManutencoesRouteWithChildren = AdminManutencoesRoute._addFileChildren(AdminManutencoesRouteChildren);
const AdminMotoristasRouteChildren = {
  AdminMotoristasIdRoute
};
const AdminMotoristasRouteWithChildren = AdminMotoristasRoute._addFileChildren(
  AdminMotoristasRouteChildren
);
const AdminServicosRouteChildren = {
  AdminServicosIdRoute
};
const AdminServicosRouteWithChildren = AdminServicosRoute._addFileChildren(
  AdminServicosRouteChildren
);
const AdminVeiculosRouteChildren = {
  AdminVeiculosIdRoute
};
const AdminVeiculosRouteWithChildren = AdminVeiculosRoute._addFileChildren(
  AdminVeiculosRouteChildren
);
const AdminViagensRouteChildren = {
  AdminViagensIdRoute
};
const AdminViagensRouteWithChildren = AdminViagensRoute._addFileChildren(
  AdminViagensRouteChildren
);
const AdminRouteChildren = {
  AdminAbastecimentosRoute,
  AdminDashboardRoute,
  AdminDespesasRoute,
  AdminManutencoesRoute: AdminManutencoesRouteWithChildren,
  AdminMecanicosRoute,
  AdminMotoristasRoute: AdminMotoristasRouteWithChildren,
  AdminPendenciasRoute,
  AdminRelatoriosRoute,
  AdminServicosRoute: AdminServicosRouteWithChildren,
  AdminVeiculosRoute: AdminVeiculosRouteWithChildren,
  AdminViagensRoute: AdminViagensRouteWithChildren,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const DriverRouteChildren = {
  DriverIndexRoute
};
const DriverRouteWithChildren = DriverRoute._addFileChildren(DriverRouteChildren);
const MechanicVeiculosRouteChildren = {
  MechanicVeiculosIdRoute
};
const MechanicVeiculosRouteWithChildren = MechanicVeiculosRoute._addFileChildren(MechanicVeiculosRouteChildren);
const MechanicRouteChildren = {
  MechanicPendenciasRoute,
  MechanicServicosRoute,
  MechanicVeiculosRoute: MechanicVeiculosRouteWithChildren,
  MechanicIndexRoute
};
const MechanicRouteWithChildren = MechanicRoute._addFileChildren(
  MechanicRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  DriverRoute: DriverRouteWithChildren,
  MechanicRoute: MechanicRouteWithChildren
};
const routeTree = Route$r._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$5 as R,
  Route$4 as a,
  Route$3 as b,
  Route$2 as c,
  Route$1 as d,
  Route as e,
  drivers as f,
  expenses as g,
  mechanics as h,
  router as i,
  maintenances as m,
  pendencies as p,
  refuels as r,
  services as s,
  trips as t,
  useProfile as u,
  vehicles as v
};
