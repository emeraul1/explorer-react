import type { JSX } from 'react';
import type { Country } from '../../types/country';
import { Flag } from '../atoms/Flag';
import { Badge } from '../atoms/Badge';
import {formatPopulation,getCapital,} from '../../utils/format';

interface CountryCardProps {
  country: Country;
  onSelect: (code: string) => void;
}

export function CountryCard({
  country,
  onSelect,
}: CountryCardProps): JSX.Element {
  const capital = getCapital(country);

  return (
   <article className="overflow-hidden rounded-2xl border border-black bg-white shadow-md transition-shadow hover:shadow-xl">
      <Flag country={country} size="card" />

      <div className="p-5">
        <h2 className="font-primary text-xl font-bold text-neutral-900">
          {country.names.common}
        </h2>

        <p className="mt-5 text-base text-neutral-900">
          <strong>Población:</strong>{' '}
          {formatPopulation(country.population)}
        </p>

        <div className="mt-5 flex items-center gap-2">
          <strong className="text-neutral-900">Región:</strong>
          <Badge text={country.region} />
        </div>

        <p className="mt-5 text-base text-neutral-900">
          <strong>Capital:</strong> {capital}
        </p>

        <button
          type="button"
          onClick={() => onSelect(country.codes.alpha_2)}
          className="mt-7 rounded-full bg-accent px-10 py-3 text-lg font-bold text-white transition-colors hover:opacity-90"
        >
          Ver más
        </button>
      </div>
    </article>
  );
}