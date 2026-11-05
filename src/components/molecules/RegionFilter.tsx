import type { JSX, ChangeEvent } from 'react';

interface RegionFilterProps {
  region: string;
  regions: string[];
  onRegionChange: (value: string) => void;
}

export function RegionFilter({
  region,
  regions,
  onRegionChange,
}: RegionFilterProps): JSX.Element {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    onRegionChange(event.target.value);
  };

  return (
    <div className="w-full">
      <select
        value={region}
        onChange={handleChange}
        aria-label="Filtrar por región"
        className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3 text-neutral-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <option value="">Todas las regiones</option>

        {regions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}