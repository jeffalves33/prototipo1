import type {
  VehicleStatus,
  DriverStatus,
  LicenseStatus,
  DocStatus,
  TripStatus,
  MaintenanceStatus,
  PendencySeverity,
  ServiceCategory,
  PeriodicityType,
  ExpenseType,
  FuelType,
  MaintenanceType,
  VehicleType,
} from "@/types/fleet";

export const vehicleStatusLabel: Record<VehicleStatus, string> = {
  ativo: "Ativo",
  manutencao: "Em manutenção",
  inativo: "Inativo",
  reservado: "Reservado",
  indisponivel: "Indisponível",
};

export const vehicleStatusTone: Record<VehicleStatus, "ok" | "warn" | "danger" | "info" | "muted"> = {
  ativo: "ok",
  manutencao: "warn",
  inativo: "muted",
  reservado: "info",
  indisponivel: "danger",
};

export const vehicleTypeLabel: Record<VehicleType, string> = {
  caminhao: "Caminhão",
  onibus: "Ônibus",
  cavalinho: "Cavalinho",
  reboque: "Reboque",
  utilitario: "Utilitário",
};

export const driverStatusLabel: Record<DriverStatus, string> = {
  ativo: "Ativo",
  ferias: "Férias",
  afastado: "Afastado",
  inativo: "Inativo",
};

export const driverStatusTone: Record<DriverStatus, "ok" | "warn" | "danger" | "muted"> = {
  ativo: "ok",
  ferias: "warn",
  afastado: "danger",
  inativo: "muted",
};

export const licenseStatusLabel: Record<LicenseStatus, string> = {
  ok: "Em dia",
  proximo: "Próxima do vencimento",
  vencido: "Vencida",
};

export const licenseStatusTone: Record<LicenseStatus, "ok" | "warn" | "danger"> = {
  ok: "ok",
  proximo: "warn",
  vencido: "danger",
};

export const docStatusLabel: Record<DocStatus, string> = {
  ok: "Em dia",
  proximo: "Próximo",
  vencido: "Vencido",
};

export const docStatusTone: Record<DocStatus, "ok" | "warn" | "danger"> = {
  ok: "ok",
  proximo: "warn",
  vencido: "danger",
};

export const tripStatusLabel: Record<TripStatus, string> = {
  em_andamento: "Em andamento",
  concluida: "Concluída",
  cancelada: "Cancelada",
};

export const tripStatusTone: Record<TripStatus, "ok" | "warn" | "muted" | "info"> = {
  em_andamento: "info",
  concluida: "ok",
  cancelada: "muted",
};

export const maintenanceStatusLabel: Record<MaintenanceStatus, string> = {
  aberta: "Aberta",
  em_andamento: "Em andamento",
  concluida: "Concluída",
  cancelada: "Cancelada",
};

export const maintenanceStatusTone: Record<MaintenanceStatus, "ok" | "warn" | "danger" | "muted"> = {
  aberta: "danger",
  em_andamento: "warn",
  concluida: "ok",
  cancelada: "muted",
};

export const maintenanceTypeLabel: Record<MaintenanceType, string> = {
  preventiva: "Preventiva",
  corretiva: "Corretiva",
};

export const pendencySeverityLabel: Record<PendencySeverity, string> = {
  baixa: "Baixa",
  atencao: "Atenção",
  critica: "Crítica",
};

export const pendencySeverityTone: Record<PendencySeverity, "ok" | "warn" | "danger"> = {
  baixa: "ok",
  atencao: "warn",
  critica: "danger",
};

export const serviceCategoryLabel: Record<ServiceCategory, string> = {
  oleo: "Óleo",
  pneus: "Pneus",
  freios: "Freios",
  motor: "Motor",
  cambio: "Câmbio",
  eletrica: "Elétrica",
  suspensao: "Suspensão",
  documentacao: "Documentação",
  revisao_geral: "Revisão geral",
  outros: "Outros",
};

export const periodicityLabel = (type: PeriodicityType, km?: number, days?: number) => {
  if (type === "km" && km) return `A cada ${km.toLocaleString("pt-BR")} km`;
  if (type === "time" && days) {
    if (days % 365 === 0) return `A cada ${days / 365} ano(s)`;
    if (days % 30 === 0) return `A cada ${days / 30} mês(es)`;
    return `A cada ${days} dias`;
  }
  return "Sem recorrência";
};

export const expenseTypeLabel: Record<ExpenseType, string> = {
  pedagio: "Pedágio",
  alimentacao: "Alimentação",
  hospedagem: "Hospedagem",
  descarga: "Descarga",
  outros: "Outros",
};

export const fuelTypeLabel: Record<FuelType, string> = {
  diesel: "Diesel comum",
  diesel_s10: "Diesel S10",
  arla: "Arla 32",
  gasolina: "Gasolina",
  etanol: "Etanol",
};
