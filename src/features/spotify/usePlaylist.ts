import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { useCallback } from "react";
import useSpotify from "./useSpotify";
import useErrorHandler from "@/hooks/useErrorHandler";
import useData from "@/hooks/useData";

export type PlaylistType = {
  uri: string,
  name: string,
  totalTracks: number | null
};

function mapPlaylists(playlists: SimplifiedPlaylist[]): PlaylistType[] {
  return playlists.map(playlist => ({
    uri: playlist.uri,
    name: playlist.name,
    totalTracks: playlist?.tracks?.total ?? null
  }));
}

export default function usePlayList() {
  const { sdk } = useSpotify();

  const getPlaylists = useCallback(async () => {
    if (!sdk) {
      return null;
    }
    const response = await sdk.currentUser.playlists.playlists(50);
    return mapPlaylists(response.items);
  }, [sdk]);
  const getPlaylistsWithErrorHandling = useErrorHandler({fetcher: getPlaylists});
  const {data: playlists, loading} = useData({action: getPlaylistsWithErrorHandling});

  return {
    playlists,
    loading,
  };

}