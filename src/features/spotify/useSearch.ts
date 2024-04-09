import { ItemTypes, Market, MaxInt, PartialSearchResult } from "@spotify/web-api-ts-sdk";
import { useCallback, useState } from "react";
import useSpotify from "./useSpotify";
import { TrackType, mapTrack } from "./track";

type TrackSearchResults = Pick<PartialSearchResult, "tracks">

function mapSearchResults(searchRresults: TrackSearchResults): TrackType[] {
  return searchRresults?.tracks?.items.map(mapTrack) ?? []
}

type UseSearchParams = {
  market?: Market,
  type?: ItemTypes[],
  limit?: MaxInt<50>,
}

export default function useSearch({ limit=50 }: UseSearchParams) {
  const [results, setResults] = useState<TrackType[] | null>(null)
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
      const nextResults = await sdk.search(query, ['track'], 'HU', limit);
      setResults(mapSearchResults(nextResults));
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

  return {results, loading, error, search: useCallback(search, [sdk, limit])}
}
