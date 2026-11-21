import { useEffect, useState } from "react";
import type { Country } from "../types/country";
import { fetchCountryByCode } from "../api/countries";

export interface UseCountryDetailResult {
  country: Country | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useCountryDetail(
  code: string,
): UseCountryDetailResult {
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCountry(): Promise<void> {
      setLoading(true);
      setError(null);
      setCountry(null);

      try {
        const data = await fetchCountryByCode(
          code,
          controller.signal,
        );

        if (!controller.signal.aborted) {
          setCountry(data);
        }
      } catch (cause: unknown) {
        if (!controller.signal.aborted) {
          setError(
            cause instanceof Error
              ? cause.message
              : "No fue posible cargar el país.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadCountry();

    return () => {
      controller.abort();
    };
  }, [code, retryCount]);

  function retry(): void {
    setRetryCount((previous) => previous + 1);
  }

  return {
    country,
    loading,
    error,
    retry,
  };
}