import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

type UseSdkParams<T> = {
  action: (sdk: SpotifyApi) => Promise<T>
}

export default function useSdk<T>({ action }: UseSdkParams<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const { sdk } = useSpotify();

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        if (sdk === null) {
          return;
        }
        const response = (await action(sdk)) ?? null;

        setData(response);

      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        } else {
          throw e;
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [sdk, action])

  return { data, loading, error }
}