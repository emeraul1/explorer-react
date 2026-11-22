import { useState } from "react";
import type { JSX } from "react";
import type { Country } from "../../types/country";
import { getFlagDescription } from "../../utils/format";

interface FlagProps {
  country: Country;
  size?: "card" | "detail";
}

export function Flag({
  country,
  size = "card",
}: FlagProps): JSX.Element {
  const [imageError, setImageError] = useState(false);

  const isDetail = size === "detail";

  const imageClassName = isDetail
    ? "block h-auto w-full rounded-2xl object-contain shadow-md"
    : "block aspect-3/2 w-full object-contain";

  const fallbackClassName = isDetail
    ? "flex min-h-64 w-full items-center justify-center rounded-2xl bg-neutral-100 px-6 text-center text-neutral-600 shadow-md"
    : "flex aspect-3/2 w-full items-center justify-center bg-neutral-100 px-4 text-center text-sm text-neutral-600";

  if (!country.flag.url_svg || imageError) {
    return (
      <div
        role="img"
        aria-label={getFlagDescription(country)}
        className={fallbackClassName}
      >
        Bandera no disponible
      </div>
    );
  }

  return (
    <img
      src={country.flag.url_svg}
      alt={getFlagDescription(country)}
      className={imageClassName}
      loading="lazy"
      onError={() => setImageError(true)}
    />
  );
}