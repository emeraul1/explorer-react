import { useEffect, useState } from "react";
import type { Country } from "../types/country";
import { fetchCountries } from "../api/countries";

export interface UseCountriesResult {
  countries: Country[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useCountries(): UseCountriesResult {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCountries(): Promise<void> {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCountries(controller.signal);

        if (!controller.signal.aborted) {
          setCountries(data);
        }
      } catch (cause: unknown) {
        if (!controller.signal.aborted) {
          const message =
            cause instanceof Error
              ? cause.message
              : "Ocurrió un error desconocido.";

          setError(message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadCountries();

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  function retry(): void {
    setRetryCount((previous) => previous + 1);
  }

  return {
    countries,
    loading,
    error,
    retry,
  };
}