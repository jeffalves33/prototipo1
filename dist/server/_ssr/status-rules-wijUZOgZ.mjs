const vehicleStatusLabel = {
  ativo: "Ativo",
  manutencao: "Em manutenção",
  inativo: "Inativo",
  reservado: "Reservado",
  indisponivel: "Indisponível"
};
const vehicleStatusTone = {
  ativo: "ok",
  manutencao: "warn",
  inativo: "muted",
  reservado: "info",
  indisponivel: "danger"
};
const vehicleTypeLabel = {
  caminhao: "Caminhão",
  onibus: "Ônibus",
  cavalinho: "Cavalinho",
  reboque: "Reboque",
  utilitario: "Utilitário"
};
const driverStatusLabel = {
  ativo: "Ativo",
  ferias: "Férias",
  afastado: "Afastado",
  inativo: "Inativo"
};
const driverStatusTone = {
  ativo: "ok",
  ferias: "warn",
  afastado: "danger",
  inativo: "muted"
};
const licenseStatusLabel = {
  ok: "Em dia",
  proximo: "Próxima do vencimento",
  vencido: "Vencida"
};
const licenseStatusTone = {
  ok: "ok",
  proximo: "warn",
  vencido: "danger"
};
const docStatusLabel = {
  ok: "Em dia",
  proximo: "Próximo",
  vencido: "Vencido"
};
const docStatusTone = {
  ok: "ok",
  proximo: "warn",
  vencido: "danger"
};
const tripStatusLabel = {
  em_andamento: "Em andamento",
  concluida: "Concluída",
  cancelada: "Cancelada"
};
const tripStatusTone = {
  em_andamento: "info",
  concluida: "ok",
  cancelada: "muted"
};
const maintenanceStatusLabel = {
  aberta: "Aberta",
  em_andamento: "Em andamento",
  concluida: "Concluída",
  cancelada: "Cancelada"
};
const maintenanceStatusTone = {
  aberta: "danger",
  em_andamento: "warn",
  concluida: "ok",
  cancelada: "muted"
};
const maintenanceTypeLabel = {
  preventiva: "Preventiva",
  corretiva: "Corretiva"
};
const pendencySeverityLabel = {
  baixa: "Baixa",
  atencao: "Atenção",
  critica: "Crítica"
};
const pendencySeverityTone = {
  baixa: "ok",
  atencao: "warn",
  critica: "danger"
};
const serviceCategoryLabel = {
  oleo: "Óleo",
  pneus: "Pneus",
  freios: "Freios",
  motor: "Motor",
  cambio: "Câmbio",
  eletrica: "Elétrica",
  suspensao: "Suspensão",
  documentacao: "Documentação",
  revisao_geral: "Revisão geral",
  outros: "Outros"
};
const periodicityLabel = (type, km, days) => {
  if (type === "km" && km) return `A cada ${km.toLocaleString("pt-BR")} km`;
  if (type === "time" && days) {
    if (days % 365 === 0) return `A cada ${days / 365} ano(s)`;
    if (days % 30 === 0) return `A cada ${days / 30} mês(es)`;
    return `A cada ${days} dias`;
  }
  return "Sem recorrência";
};
const expenseTypeLabel = {
  pedagio: "Pedágio",
  alimentacao: "Alimentação",
  hospedagem: "Hospedagem",
  descarga: "Descarga",
  outros: "Outros"
};
const fuelTypeLabel = {
  diesel: "Diesel comum",
  diesel_s10: "Diesel S10",
  arla: "Arla 32",
  gasolina: "Gasolina",
  etanol: "Etanol"
};
export {
  docStatusTone as a,
  driverStatusLabel as b,
  driverStatusTone as c,
  docStatusLabel as d,
  expenseTypeLabel as e,
  fuelTypeLabel as f,
  licenseStatusTone as g,
  maintenanceStatusTone as h,
  maintenanceTypeLabel as i,
  pendencySeverityTone as j,
  periodicityLabel as k,
  licenseStatusLabel as l,
  maintenanceStatusLabel as m,
  tripStatusTone as n,
  vehicleStatusTone as o,
  pendencySeverityLabel as p,
  vehicleTypeLabel as q,
  serviceCategoryLabel as s,
  tripStatusLabel as t,
  vehicleStatusLabel as v
};
