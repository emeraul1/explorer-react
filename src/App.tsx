import { useEffect, useState } from "react";
import type { JSX } from "react";
import type { Country } from "./types/country";

import { CountryGrid } from "./components/organisms/CountryGrid";
import { CountryDetail } from "./components/organisms/CountryDetail";
import { Header } from "./components/organisms/Header";
import { SiteHeader } from "./components/organisms/SiteHeader";
import { Footer } from "./components/organisms/Footer";

import { SearchBar } from "./components/molecules/SearchBar";
import { RegionFilter } from "./components/molecules/RegionFilter";

import { fetchCountries } from "./api/countries";
import { filterCountries } from "./utils/filterCountries";

export default function App(): JSX.Element {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  const [query, setQuery] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [selectedCountry, setSelectedCountry] =
    useState<Country | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCountries(): Promise<void> {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCountries(controller.signal);

        if (!controller.signal.aborted) {
          setCountries(data);
        }
      } catch (cause: unknown) {
        if (!controller.signal.aborted) {
          const message =
            cause instanceof Error
              ? cause.message
              : "Ocurrió un error desconocido.";

          setError(message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadCountries();

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  const regions = Array.from(
    new Set(countries.map((country) => country.region)),
  );

  const filteredCountries = filterCountries(
    countries,
    query,
    region,
  );

  function handleSelectCountry(code: string): void {
    const country = countries.find(
      (item) => item.codes.alpha_2 === code,
    );

    if (country) {
      setSelectedCountry(country);
    }
  }

  function clearFilters(): void {
    setQuery("");
    setRegion("");
  }

  function handleRetry(): void {
    setRetryCount((previous) => previous + 1);
  }

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
                    onClick={handleRetry}
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
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}