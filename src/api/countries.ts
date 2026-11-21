import type {
  Country,
  CountriesResponse,
} from "../types/country";

const API_URL = "/api/countries";

const RESPONSE_FIELDS =
  "names.common,names.official,names.native,codes.alpha_2," +
  "codes.alpha_3,flag.url_svg,flag.description,population," +
  "region,subregion,capitals,tlds,currencies,languages,borders";

async function requestCountries(
  url: URL,
  signal?: AbortSignal,
): Promise<Country[]> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(
      `No fue posible obtener los países. Código HTTP: ${response.status}`,
    );
  }

  const result: CountriesResponse =
    await response.json() as CountriesResponse;

  if (
    !result.data ||
    !Array.isArray(result.data.objects)
  ) {
    throw new Error(
      "La respuesta de la API tiene un formato incorrecto.",
    );
  }

  return result.data.objects;
}

export async function fetchCountries(
  signal?: AbortSignal,
): Promise<Country[]> {
  const url = new URL(API_URL, window.location.origin);

  url.searchParams.set(
    "response_fields",
    RESPONSE_FIELDS,
  );
  url.searchParams.set("limit", "100");

  return requestCountries(url, signal);
}
export async function fetchCountryByCode(
  code: string,
  signal?: AbortSignal,
): Promise<Country> {
  const normalizedCode = code.trim().toUpperCase();

  if (!/^[A-Z]{2,3}$/.test(normalizedCode)) {
    throw new Error(
      "El código del país debe tener dos o tres letras.",
    );
  }

  const isAlpha2 = normalizedCode.length === 2;

  const url = new URL(API_URL, window.location.origin);

  url.searchParams.set(
    "response_fields",
    RESPONSE_FIELDS,
  );
  url.searchParams.set(
    isAlpha2 ? "codes.alpha_2" : "codes.alpha_3",
    normalizedCode,
  );
  url.searchParams.set("limit", "1");

  const countries = await requestCountries(url, signal);

  const country = countries.find((item) => {
    const itemCode = isAlpha2
      ? item.codes.alpha_2
      : item.codes.alpha_3;

    return itemCode?.trim().toUpperCase() === normalizedCode;
  });

  if (!country) {
    throw new Error(
      `No se encontró el país con el código ${normalizedCode}.`,
    );
  }

  return country;
}