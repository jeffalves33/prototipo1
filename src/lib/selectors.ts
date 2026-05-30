import { vehicles, drivers, mechanics, services, trips, refuels, expenses, maintenances, pendencies } from "@/lib/mock-data";
import { sum } from "@/lib/calculations";
import type { Vehicle, Driver, Trip, Maintenance } from "@/types/fleet";

export const vehicleById = (id?: string | null) => vehicles.find((v) => v.id === id) ?? null;
export const driverById = (id?: string | null) => drivers.find((d) => d.id === id) ?? null;
export const mechanicById = (id?: string | null) => mechanics.find((m) => m.id === id) ?? null;
export const serviceById = (id?: string | null) => services.find((s) => s.id === id) ?? null;
export const tripById = (id?: string | null) => trips.find((t) => t.id === id) ?? null;
export const maintenanceById = (id?: string | null) => maintenances.find((m) => m.id === id) ?? null;

export const vehicleTrips = (vehicleId: string) => trips.filter((t) => t.vehicleId === vehicleId);
export const vehicleRefuels = (vehicleId: string) => refuels.filter((r) => r.vehicleId === vehicleId);
export const vehicleExpenses = (vehicleId: string) => expenses.filter((e) => e.vehicleId === vehicleId);
export const vehicleMaintenances = (vehicleId: string) => maintenances.filter((m) => m.vehicleId === vehicleId);
export const vehiclePendencies = (vehicleId: string) => pendencies.filter((p) => p.vehicleId === vehicleId && p.status === "aberta");

export const driverTrips = (driverId: string) => trips.filter((t) => t.driverId === driverId);
export const driverRefuels = (driverId: string) => refuels.filter((r) => r.driverId === driverId);
export const driverExpenses = (driverId: string) => expenses.filter((e) => e.driverId === driverId);

export const tripRefuels = (tripId: string) => refuels.filter((r) => r.tripId === tripId);
export const tripExpenses = (tripId: string) => expenses.filter((e) => e.tripId === tripId);

export const vehicleLabel = (v?: Vehicle | null) => v ? `${v.plate} · ${v.brand} ${v.model}` : "—";
export const driverLabel = (d?: Driver | null) => d ? d.name : "—";
export const maintenanceServices = (m: Maintenance) => m.serviceIds.map((id) => serviceById(id)).filter(Boolean);

export const totalKm = (items: Trip[]) => sum(items.map((t) => t.totalKm ?? 0));
export const totalLiters = (vehicleOrDriverRefuels: typeof refuels) => sum(vehicleOrDriverRefuels.map((r) => r.liters));
export const totalRefuelValue = (items: typeof refuels) => sum(items.map((r) => r.totalValue));
export const totalExpenses = (items: typeof expenses) => sum(items.map((e) => e.value));
export const totalMaint = (items: typeof maintenances) => sum(items.map((m) => m.value));
