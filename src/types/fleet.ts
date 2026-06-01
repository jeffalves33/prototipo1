export type Profile = "admin" | "driver" | "mechanic";

export type VehicleStatus = "ativo" | "manutencao" | "inativo" | "reservado" | "indisponivel";
export type VehicleType = "caminhao" | "onibus" | "cavalinho" | "reboque" | "utilitario";
export type DocStatus = "ok" | "proximo" | "vencido";

export interface Vehicle {
  id: string;
  type: VehicleType;
  brand: string;
  model: string;
  plate: string;
  year: number;
  status: VehicleStatus;
  currentKm: number;
  capacity: string;
  fixedRoute: string;
  mainDriverId: string | null;
  documentationDueDate: string;
  tachographDueDate: string;
  ceturbDueDate: string;
  documentationStatus: DocStatus;
  tachographStatus: DocStatus;
  ceturbStatus: DocStatus;
  averageConsumption: number;
  totalMaintenanceCost: number;
  createdAt: string;
}

export type LicenseStatus = "ok" | "proximo" | "vencido";
export type DriverStatus = "ativo" | "ferias" | "afastado" | "inativo";

export interface Driver {
  id: string;
  name: string;
  address: string;
  phone: string;
  cpf: string;
  licenseNumber: string;
  licenseDueDate: string;
  licenseStatus: LicenseStatus;
  mainVehicleId: string | null;
  status: DriverStatus;
  totalTrips: number;
  totalKm: number;
  totalLiters: number;
  totalTravelExpenses: number;
}

export interface Mechanic {
  id: string;
  name: string;
  phone: string;
  specialty: string;
  status: "ativo" | "inativo";
}

export type ServiceCategory =
  | "oleo"
  | "pneus"
  | "freios"
  | "motor"
  | "cambio"
  | "eletrica"
  | "suspensao"
  | "documentacao"
  | "revisao_geral"
  | "outros";

export type SuggestedMaintenanceType = "preventiva" | "corretiva";
export type PeriodicityType = "km" | "time" | "none";

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  suggestedMaintenanceType: SuggestedMaintenanceType;
  periodicityType: PeriodicityType;
  periodicityKm?: number;
  periodicityDays?: number;
  description: string;
  status: "ativo" | "inativo";
}

export type TripStatus = "em_andamento" | "concluida" | "cancelada";

export interface Trip {
  id: string;
  driverId: string;
  vehicleId: string;
  origin: string;
  destination: string;
  startedAt: string;
  finishedAt: string | null;
  status: TripStatus;
  initialKm: number;
  finalKm: number | null;
  totalKm: number | null;
  notes: string;
  temporaryVehicleAssignment: boolean;
}

export type FuelType = "diesel" | "diesel_s10" | "arla" | "gasolina" | "etanol";

export interface Refuel {
  id: string;
  tripId: string | null;
  driverId: string;
  vehicleId: string;
  date: string;
  currentKm: number;
  fuelType: FuelType;
  liters: number;
  unitPrice: number;
  totalValue: number;
  notes: string;
}

export type ExpenseType = "pedagio" | "alimentacao" | "hospedagem" | "descarga" | "outros";

export interface Expense {
  id: string;
  tripId: string;
  driverId: string;
  vehicleId: string;
  type: ExpenseType;
  value: number;
  date: string;
  notes: string;
}

export type MaintenanceType = "preventiva" | "corretiva";
export type MaintenanceStatus = "aberta" | "em_andamento" | "concluida" | "cancelada";

export interface Maintenance {
  id: string;
  vehicleId: string;
  maintenanceType: MaintenanceType;
  serviceIds: string[];
  cause: string;
  date: string;
  currentKm: number;
  value: number;
  mechanicId: string;
  status: MaintenanceStatus;
  notes: string;
}

export type TireStatus = "ok" | "atencao" | "critico" | "recapagem";

export interface TireRecord {
  id: string;
  vehicleId: string;
  position: string;
  brand: string;
  model: string;
  installedAtKm: number;
  currentKm: number;
  treadDepthMm: number;
  pressurePsi: number;
  life: "novo" | "primeira_recapagem" | "segunda_recapagem";
  status: TireStatus;
  lastInspectionDate: string;
  nextAction: string;
  accumulatedCost: number;
}

export type PendencyType =
  | "servico_km_vencido"
  | "servico_km_proximo"
  | "servico_tempo_vencido"
  | "servico_tempo_proximo"
  | "manutencao_aberta"
  | "veiculo_manutencao"
  | "cnh_vencida"
  | "documentacao_vencida"
  | "tacografo_vencido"
  | "ceturb_vencida";

export type PendencySeverity = "baixa" | "atencao" | "critica";

export interface Pendency {
  id: string;
  type: PendencyType;
  severity: PendencySeverity;
  vehicleId?: string;
  driverId?: string;
  serviceId?: string;
  title: string;
  description: string;
  dueKm?: number;
  dueDate?: string;
  currentKm?: number;
  status: "aberta" | "resolvida";
  actionLabel: string;
}
