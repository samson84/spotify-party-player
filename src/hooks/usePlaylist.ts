import { Playlist, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useCallback } from "react";
import useSdk from "./useSdk";


export default function usePlayList(id: string) {
  const action = useCallback(async (sdk: SpotifyApi) => await sdk.playlists.getPlaylist(id), [id])
  return useSdk<Playlist>({ action })
}