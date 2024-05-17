import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

type UseFetchParams<T, A extends Array<unknown>> = {
  fetcher: (...args: A) => Promise<T | null>;
  shouldThrow?: boolean;
}

export default function useErrorHandler<T, A extends Array<unknown>>({ fetcher, shouldThrow = false }: UseFetchParams<T, A>): (...args: A) => Promise<T | null | undefined> {
  const { toast, dismiss } = useToast();

  const doAction = useCallback(async (...args: A) => {
    dismiss();
    try {
      const data = await fetcher(...args);
      return data
    } catch (error) {

      if (error instanceof Error) {
        toast({
          title: "Something went wrong!",
          description: error.message,
        });
        if (!shouldThrow) {
          throw error
        }
      } else {
        throw error;
      }
    }
  }, [fetcher, dismiss, toast, shouldThrow]);

  return doAction;
}