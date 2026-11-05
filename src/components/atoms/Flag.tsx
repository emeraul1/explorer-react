import type { JSX } from 'react';
import type { Country } from '../../types/country';
import { getFlagDescription } from '../../utils/format';

interface FlagProps {
  country: Country;
  size?: 'card' | 'detail';
}

export function Flag({
  country,
  size = 'card',
}: FlagProps): JSX.Element {
  return (
    <img
      src={country.flag.url_svg}
      alt={getFlagDescription(country)}
      className={
        size === 'detail'
          ? 'block h-auto w-full rounded-2xl object-contain shadow-md'
          : 'block aspect-3/2 w-full object-contain'
      }
      loading="lazy"
    />
  );
}
