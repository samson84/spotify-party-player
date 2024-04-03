import { ReactNode, createContext, useContext } from "react";
import { useCallback, useEffect, useState } from 'react'
import { SpotifyApi, AuthorizationCodeWithPKCEStrategy } from '@spotify/web-api-ts-sdk';
import { Scopes } from '@spotify/web-api-ts-sdk';

type SpotifyContextType = {
  loggedIn: boolean,
  login: () => void,
  logout: () => void,
  sdk: SpotifyApi | null,
  error: Error | null
}

const SpotifyContext = createContext<SpotifyContextType>(null!);

type SpotifyProviderProps = {
  children: ReactNode
}

const CLIENT_ID = '29b12131f1fc46c586009a6570aad5da';
const SCOPES = Scopes.userDetails;
const REDIRECT_URI = 'http://localhost:5173';

function createSdk() {
  const auth = new AuthorizationCodeWithPKCEStrategy(CLIENT_ID, REDIRECT_URI, SCOPES);
  return new SpotifyApi(auth);
}

function hasCode() {
  const code = new URLSearchParams(window.location.search).get('code')
  return code !== null
}


export default function SpotifyProvider({ children }: SpotifyProviderProps) {
  const [sdk, setSdk] = useState<SpotifyApi | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = useCallback(() => {
    sdk?.logOut();
    setSdk(null);
    setLoggedIn(false);
  }, [sdk])

  const login = useCallback(async () => {
    setError(null);
    const internalSdk = createSdk();

    try {
      const { authenticated } = await internalSdk.authenticate();

      if (authenticated) {
        console.log('loggedIn')
        setSdk(() => internalSdk);
        setLoggedIn(true);
      } else {
        setSdk(null);
      }
    } catch (e) {
      if(!(e instanceof Error)) {
        throw e
      }
      if (e && e.message && e.message.includes("No verifier found in cache")) {
        console.error("If you are seeing this error in a React Development Environment it's because React calls useEffect twice. Using the Spotify SDK performs a token exchange that is only valid once, so React re-rendering this component will result in a second, failed authentication. This will not impact your production applications (or anything running outside of Strict Mode - which is designed for debugging components).", e);
      } else {
        setError(e);
        setLoggedIn(false);
        setSdk(null);
      }
    }
  }, [])

  useEffect(() => {
    (async () => {
      const internalSdk = createSdk();
      const accessToken = await internalSdk.getAccessToken()
      if(accessToken) {
        setSdk(internalSdk)
        setLoggedIn(true)
      } else if(hasCode()) {
        await login()
      }

    })()
  }, [login]);

  const contextValue = { sdk, login, logout, error, loggedIn };
  return <SpotifyContext.Provider value={contextValue}>{children}</SpotifyContext.Provider>
}

export function useSpotify() {
  return useContext(SpotifyContext)
}