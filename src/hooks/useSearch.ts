import { useState } from "react";
import type { Country } from "../types/country";
import { filterCountries } from "../utils/filterCountries";

export interface UseSearchResult {
  query: string;
  region: string;
  regions: string[];
  filteredCountries: Country[];
  setQuery: (value: string) => void;
  setRegion: (value: string) => void;
  clearFilters: () => void;
}

export function useSearch(
  countries: Country[],
): UseSearchResult {
  const [query, setQuery] = useState<string>("");
  const [region, setRegion] = useState<string>("");

  const regions = Array.from(
    new Set(countries.map((country) => country.region)),
  );

  const filteredCountries = filterCountries(
    countries,
    query,
    region,
  );

  function clearFilters(): void {
    setQuery("");
    setRegion("");
  }

  return {
    query,
    region,
    regions,
    filteredCountries,
    setQuery,
    setRegion,
    clearFilters,
  };
}