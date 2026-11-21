import type { JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CountryDetail } from "../components/organisms/CountryDetail";
import { getRouteCountryCode } from "../data/country-codes";
import { useCountryDetail } from "../hooks/useCountryDetail";

export function CountryDetailPage(): JSX.Element {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();

  const countryCode = code ?? "";
  const {
    country,
    loading,
    error,
    retry,
  } = useCountryDetail(countryCode);

  function handleBack(): void {
    navigate("/");
  }

  function handleSelectBorder(borderCode: string): void {
    const routeCode = getRouteCountryCode(borderCode);

    navigate(`/country/${routeCode}`);
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10">
      {loading && (
        <section className="mx-auto max-w-7xl">
          <button
            type="button"
            onClick={handleBack}
            className="mb-12 rounded-full bg-accent px-8 py-4 font-bold text-white transition-colors hover:opacity-90"
          >
            ← Atrás
          </button>

          <p
            role="status"
            className="py-12 text-center text-lg text-neutral-600"
          >
            Cargando información del país...
          </p>
        </section>
      )}

      {error && (
        <section className="mx-auto max-w-7xl">
          <button
            type="button"
            onClick={handleBack}
            className="mb-12 rounded-full bg-accent px-8 py-4 font-bold text-white transition-colors hover:opacity-90"
          >
            ← Atrás
          </button>

          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center"
          >
            <h1 className="text-xl font-bold text-red-700">
              No se pudo cargar el país
            </h1>

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
          </div>
        </section>
      )}

      {country && (
        <CountryDetail
          country={country}
          onBack={handleBack}
          onSelectBorder={handleSelectBorder}
        />
      )}

      {!loading && !error && !country && (
        <p className="py-12 text-center text-lg text-neutral-600">
          No se encontró información del país.
        </p>
      )}
    </main>
  );
}