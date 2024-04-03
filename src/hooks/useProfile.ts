import { SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import useSdk from "./useSdk";
import { useCallback } from "react";

export default function useProfile() {
  const action = useCallback(async (sdk: SpotifyApi) => await sdk.currentUser.profile(), [])
  return useSdk<UserProfile>({ action })
}