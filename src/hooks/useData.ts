import { useCallback, useEffect, useState } from "react";

type UseDataParams<T> = {
  action: () => Promise<T | null>;
}

export default function useData<T>({action}: UseDataParams<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const doAction = useCallback(async () => {
      const data = await action();
      return data;
  }, [action]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      setLoading(true);
      try {
        const response = await doAction();
        if (ignore) {
          return;
        }
        setData(response);
      } catch (e) {
        if (e instanceof Error) {
          throw e;
        } else {
          throw e;
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [doAction])

  return { data, loading };
}