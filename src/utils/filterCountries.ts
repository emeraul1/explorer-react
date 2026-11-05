import type { Country } from '../types/country';

export function filterCountries(
  countries: Country[],
  query: string,
  region: string
): Country[] {
  return countries.filter((country) => {
    const matchesName = country.names.common
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesRegion =
      region === '' || country.region === region;

    return matchesName && matchesRegion;
  });
}