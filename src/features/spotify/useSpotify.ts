import { useContext } from "react";
import { SpotifyContext } from "./SpotifyContext";

export default function useSpotify() {
  return useContext(SpotifyContext)
}