import type { JSX, ChangeEvent } from 'react';

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export function SearchBar({
  query,
  onQueryChange,
}: SearchBarProps): JSX.Element {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onQueryChange(event.target.value);
  };

  return (
    <div className="w-full">
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Buscar un país..."
        aria-label="Buscar países"
        className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3 text-neutral-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}