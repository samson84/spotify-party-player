import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

type UseFetchParams<T, Q> = {
  fetcher: (query?: Q) => Promise<T | null>;
}

export default function useErrorHandler<T, Q>({ fetcher }: UseFetchParams<T, Q>) {
  const { toast, dismiss } = useToast();

  const doAction = useCallback(async (query?: Q) => {
    dismiss();
    try {
      const data = await fetcher(query);
      return data
    } catch (error) {

      if (error instanceof Error) {
        toast({
          title: "Something went wrong!",
          description: error.message,
        });
      } else {
        throw error;
      }
    }
  }, [fetcher, dismiss, toast]);

  return doAction;
}