import type { JSX } from 'react';
import type { Country } from '../../types/country';
import { Flag } from '../atoms/Flag';
import {
  formatPopulation,
  getCapital,
} from '../../utils/format';

interface CountryDetailProps {
  country: Country;
  onBack: () => void;
}

export function CountryDetail({
  country,
  onBack,
}: CountryDetailProps): JSX.Element {
  return (
    <section className="mx-auto max-w-7xl">

      {/* Botón para regresar */}
      <button
        type="button"
        onClick={onBack}
        className="mb-12 rounded-full bg-teal-200 px-8 py-4 font-bold text-black transition-colors hover:bg-teal-300"
      >
        ← Atrás
      </button>

      {/* Información del país */}
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">

        {/* Bandera */}
        <div>
          <Flag country={country} size="detail" />
        </div>

        {/* Datos */}
        <div>
          <h1 className="mb-6 font-primary text-4xl font-bold md:text-5xl">
            {country.names.common}
          </h1>

          <p className="mb-12 text-lg">
            <strong>Nombre oficial:</strong>{' '}
            {country.names.official || country.names.common}
          </p>

          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">

            <p>
              <strong>Capital:</strong>{' '}
              {getCapital(country)}
            </p>

            <p>
              <strong>Población:</strong>{' '}
              {formatPopulation(country.population)}
            </p>

            <p>
              <strong>Región:</strong>{' '}
              {country.region}
            </p>

            <p>
              <strong>Subregión:</strong>{' '}
              {country.subregion || 'No disponible'}
            </p>

            <p>
              <strong>Monedas:</strong>{' '}
              {country.currencies?.length
                ? country.currencies.map(currency =>
                    `${currency.name} (${currency.code})`
                  ).join(', ')
                : 'No disponible'}
            </p>

            <p>
              <strong>Idiomas:</strong>{' '}
              {country.languages?.length
                ? country.languages.map(language =>
                    language.name
                  ).join(', ')
                : 'No disponible'}
            </p>

            <p>
              <strong>Código ISO:</strong>{' '}
              {country.codes.alpha_2}
            </p>

            {country.tlds && country.tlds.length > 0 && (
              <p>
                <strong>Dominio:</strong>{' '}
                {country.tlds.join(', ')}
              </p>
            )}

          </div>

          {/* Países fronterizos */}
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">
              Países fronterizos
            </h2>

            <div className="flex flex-wrap gap-3">
              {country.borders && country.borders.length > 0 ? (
                country.borders.map((border) => (
                  <span
                    key={border}
                    className="rounded-lg border border-neutral-200 bg-neutral-50 px-5 py-3 text-sm font-medium"
                  >
                    {border}
                  </span>
                ))
              ) : (
                <p className="text-neutral-500">
                  No tiene fronteras terrestres.
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
