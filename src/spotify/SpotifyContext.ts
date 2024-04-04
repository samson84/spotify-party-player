import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { createContext } from "react";

type SpotifyContextType = {
  loggedIn: boolean,
  login: () => void,
  logout: () => void,
  sdk: SpotifyApi | null,
  error: Error | null,
  loading: boolean
}

export const SpotifyContext = createContext<SpotifyContextType>(null!);
