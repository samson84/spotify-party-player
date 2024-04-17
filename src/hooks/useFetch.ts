import { useCallback, useState } from "react";

type UseFetchParams<T> = {
  fetcher: (query: string) => Promise<T|null>;
}

export default function useFetch<T>({ fetcher }: UseFetchParams<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const doFetch = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetcher(query);
      setData(data);
    } catch (error) {
      
      if(error instanceof Error) {
        setError(error);
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  return {
    data,
    loading,
    error,
    doFetch
  };
}