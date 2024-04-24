import { MaxInt, PartialSearchResult } from "@spotify/web-api-ts-sdk";
import { useCallback } from "react";
import useSpotify from "./useSpotify";
import { TrackType, mapTrack } from "./track";

type TrackSearchResults = Pick<PartialSearchResult, "tracks">

function mapSearchResults(searchRresults: TrackSearchResults): TrackType[] {
  return searchRresults?.tracks?.items.map(mapTrack) ?? []
}

type UseSearchParams = {
  limit?: MaxInt<50>,
}

export default function useSearch({ limit = 50 }: UseSearchParams) {
  const { sdk } = useSpotify();

  async function search(query?: string) {
    if (!sdk) {
      return null;
    }
    if (query === '' || query === undefined) {
      return null;
    }

    const results = await sdk.search(query, ['track'], 'HU', limit);
    return mapSearchResults(results);
  }

  return { search: useCallback(search, [sdk, limit]) };
}
