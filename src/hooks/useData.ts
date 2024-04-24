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

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await doAction();
      setData(response);
    } finally {
      setLoading(false);
    }
  }, [doAction]);

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
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [doAction])

  return { data, loading, refetch};
}