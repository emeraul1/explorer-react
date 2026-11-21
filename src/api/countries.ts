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