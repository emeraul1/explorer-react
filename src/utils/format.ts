import type { Country } from '../types/country';

// Formatear la población
export function formatPopulation(population: number): string {
  return new Intl.NumberFormat('es-SV').format(population);
}

// Obtener la capital
export function getCapital(country: Country): string {
  return country.capitals[0]?.name ?? 'No disponible';
}

// Obtener la descripción de la bandera
export function getFlagDescription(country: Country): string {
  return country.flag.description || `Bandera de ${country.names.common}`;
}