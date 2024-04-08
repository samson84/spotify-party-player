import { ItemTypes, Market, MaxInt, SearchResults } from "@spotify/web-api-ts-sdk";
import { useState } from "react";
import useSpotify from "./useSpotify";

type UseSearchParams = {
  market?: Market,
  type?: ItemTypes[],
  limit?: MaxInt<50>,
}

export default function useSearch({ market = 'HU', type = ['track'], limit=50 }: UseSearchParams) {
  const [results, setResults] = useState<SearchResults<ItemTypes[]> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { sdk } = useSpotify()

  async function search(query: string) {
    if (!sdk) {
      return;
    }
    if (query === '') {
      setResults(null);
      return;
    }

    setLoading(true);
    try {
      const nextResult = await sdk.search(query, type, market, limit);
      setResults(nextResult);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        setResults(null);
      } else {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  }

  return {results, loading, error, search}
}
