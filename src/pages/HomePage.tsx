import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../components/organisms/Header";
import { CountryGrid } from "../components/organisms/CountryGrid";
import { SearchBar } from "../components/molecules/SearchBar";
import { RegionFilter } from "../components/molecules/RegionFilter";

import { useCountries } from "../hooks/useCountries";
import { useSearch } from "../hooks/useSearch";

export function HomePage(): JSX.Element {
  const navigate = useNavigate();

  const { countries, loading, error, retry } = useCountries();

  const {
    query,
    region,
    regions,
    filteredCountries,
    setQuery,
    setRegion,
    clearFilters,
  } = useSearch(countries);

  function handleSelectCountry(code: string): void {
    navigate(`/country/${code}`);
  }

  return (
    <main
      id="inicio"
      className="min-h-screen bg-white px-4 py-10"
    >
      <div className="mx-auto max-w-7xl">
        <Header title="Países destacados">
          <p>
            Explora los países del mundo y consulta su información.
          </p>
        </Header>

        {loading && (
          <p
            role="status"
            className="py-12 text-center text-lg text-neutral-600"
          >
            Cargando países...
          </p>
        )}

        {error && (
          <section
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center"
          >
            <h2 className="text-xl font-bold text-red-700">
              No se pudieron cargar los países
            </h2>

            <p className="mt-2 text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={retry}
              className="mt-5 rounded-full bg-accent px-6 py-3 font-bold text-white"
            >
              Reintentar
            </button>
          </section>
        )}

        {!loading && !error && (
          <>
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

            <button
              type="button"
              onClick={clearFilters}
              className="mb-6 rounded-full border border-neutral-300 px-5 py-2 text-sm hover:bg-neutral-100"
            >
              Limpiar filtros
            </button>

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
          </>
        )}

        <div id="acerca-de" className="mt-16 text-center">
          <h2 className="text-2xl font-bold">
            Acerca de Explorer App
          </h2>

          <p className="mt-2 text-neutral-600">
            Una aplicación para explorar información de países del mundo.
          </p>
        </div>
      </div>
    </main>
  );
}