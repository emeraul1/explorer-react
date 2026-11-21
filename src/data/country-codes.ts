const borderCodeToAlpha2: Record<string, string> = {
  AND: "AD",
  ARG: "AR",
  AUT: "AT",
  BEL: "BE",
  BLZ: "BZ",
  BOL: "BO",
  BRA: "BR",
  CAN: "CA",
  CHE: "CH",
  CHL: "CL",
  CHN: "CN",
  COL: "CO",
  CRI: "CR",
  CZE: "CZ",
  DEU: "DE",
  DNK: "DK",
  ECU: "EC",
  ESP: "ES",
  FRA: "FR",
  GTM: "GT",
  GUY: "GY",
  HND: "HN",
  ITA: "IT",
  LUX: "LU",
  MEX: "MX",
  NIC: "NI",
  NLD: "NL",
  PAN: "PA",
  PER: "PE",
  POL: "PL",
  PRT: "PT",
  SLV: "SV",
  SUR: "SR",
  URY: "UY",
  USA: "US",
  VEN: "VE",
};

export function getRouteCountryCode(
  borderCode: string,
): string {
  const normalizedCode = borderCode.toUpperCase();

  return (
    borderCodeToAlpha2[normalizedCode] ??
    normalizedCode
  );
}