import type { Trip, Refuel, Expense, Maintenance, Vehicle } from "@/types/fleet";

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });

export const num = (v: number, digits = 0) =>
  v.toLocaleString("pt-BR", { maximumFractionDigits: digits, minimumFractionDigits: digits });

export const formatDate = (iso: string | null | undefined) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR");
};

export const formatDateTime = (iso: string | null | undefined) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
};

export const tripTotalKm = (t: Trip) =>
  t.totalKm ?? (t.finalKm != null ? t.finalKm - t.initialKm : null);

export const tripAvgConsumption = (t: Trip, tripRefuels: Refuel[]) => {
  const km = tripTotalKm(t);
  const liters = tripRefuels.reduce((s, r) => s + r.liters, 0);
  if (!km || !liters) return null;
  return km / liters;
};

export const tripExpensesTotal = (tripExpenses: Expense[]) =>
  tripExpenses.reduce((s, e) => s + e.value, 0);

export const refuelTotal = (r: Refuel) => r.liters * r.unitPrice;

export const vehicleTotalCost = (
  v: Vehicle,
  vRefuels: Refuel[],
  vExpenses: Expense[],
  vMaint: Maintenance[],
) =>
  vRefuels.reduce((s, r) => s + r.totalValue, 0) +
  vExpenses.reduce((s, e) => s + e.value, 0) +
  vMaint.reduce((s, m) => s + m.value, 0);

export const sum = (arr: number[]) => arr.reduce((s, n) => s + n, 0);
