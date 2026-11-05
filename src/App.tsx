import { useState } from 'react';
import type { JSX } from 'react';
import type { Country } from './types/country';

import { CountryGrid } from './components/organisms/CountryGrid';
import { CountryDetail } from './components/organisms/CountryDetail';
import { Header } from './components/organisms/Header';
import { SiteHeader } from './components/organisms/SiteHeader';
import { Footer } from './components/organisms/Footer';

import { SearchBar } from './components/molecules/SearchBar';
import { RegionFilter } from './components/molecules/RegionFilter';

import { paises } from './data/countries-demo';
import { filterCountries } from './utils/filterCountries';

export default function App(): JSX.Element {
  const countries: Country[] = paises;

  // Estados de búsqueda, filtro y país seleccionado
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');
  const [selectedCountry, setSelectedCountry] =
    useState<Country | null>(null);

  // Obtener regiones disponibles
  const regions = Array.from(
    new Set(countries.map((country) => country.region))
  );

  // Filtrar países
  const filteredCountries = filterCountries(
    countries,
    query,
    region
  );

  // Seleccionar país
  const handleSelectCountry = (code: string): void => {
    const country = countries.find(
      (item) => item.codes.alpha_2 === code
    );

    if (country) {
      setSelectedCountry(country);
    }
  };

  // Limpiar filtros
  const clearFilters = (): void => {
    setQuery('');
    setRegion('');
  };

  return (
    <>
      <SiteHeader />

      <main
        id="inicio"
        className="min-h-screen bg-white px-4 py-10"
      >
        <div className="mx-auto max-w-7xl">

          {selectedCountry ? (
            <CountryDetail
              country={selectedCountry}
              onBack={() => setSelectedCountry(null)}
            />
          ) : (
            <>
              <Header title="Países destacados">
                <p>
                  Explora los países del mundo y consulta su información.
                </p>
              </Header>

              {/* Buscador y filtro */}
              <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
                <SearchBar
                  query={query}
                  onQueryChange={setQuery}
                />

                <RegionFilter
                  region={region}
                  regions={regions}
                  onRegionChange={setRegion}
                />
              </div>

              {/* Limpiar filtros */}
              <button
                type="button"
                onClick={clearFilters}
                className="mb-6 rounded-full border border-neutral-300 px-5 py-2 text-sm hover:bg-neutral-100"
              >
                Limpiar filtros
              </button>

              {/* Resultados */}
              {filteredCountries.length > 0 ? (
                <CountryGrid
                  countries={filteredCountries}
                  onSelect={handleSelectCountry}
                />
              ) : (
                <p className="py-12 text-center text-lg text-neutral-600">
                  No se encontraron países.
                </p>
              )}

              <div id="acerca-de" className="mt-16 text-center">
                <h2 className="text-2xl font-bold">
                  Acerca de Explorer App
                </h2>

                <p className="mt-2 text-neutral-600">
                  Una aplicación para explorar información de países del mundo.
                </p>
              </div>
            </>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
