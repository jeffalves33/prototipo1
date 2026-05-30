const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });
const num = (v, digits = 0) => v.toLocaleString("pt-BR", { maximumFractionDigits: digits, minimumFractionDigits: digits });
const formatDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR");
};
const formatDateTime = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
};
const vehicleTotalCost = (v, vRefuels, vExpenses, vMaint) => vRefuels.reduce((s, r) => s + r.totalValue, 0) + vExpenses.reduce((s, e) => s + e.value, 0) + vMaint.reduce((s, m) => s + m.value, 0);
const sum = (arr) => arr.reduce((s, n) => s + n, 0);
export {
  formatDateTime as a,
  brl as b,
  formatDate as f,
  num as n,
  sum as s,
  vehicleTotalCost as v
};
