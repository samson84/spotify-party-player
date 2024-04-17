import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";
import useFetch from "@/hooks/useFetch";
import { useToast } from "./ui/use-toast";

function debounce(func: (...args: unknown[]) => unknown, timeout: number = 500) {
  let timer: NodeJS.Timeout | null = null;
  return function (...args: unknown[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func(...args);
    }, timeout);
  };
}

type SearchProps<T> = {
  resultItemComponent: (item: T, select: (item: T) => void) => JSX.Element;
  loadingComponent?: ReactNode;
  onSearch: (query: string) => Promise<T[] | null>;
  onSelect: (item: T) => void;
}

export default function Search<T>({
  resultItemComponent,
  loadingComponent = 'Loading...',
  onSearch,
  onSelect
}: SearchProps<T>) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { doFetch, error, data, loading } = useFetch<T[]>({ fetcher: onSearch });
  const { toast, dismiss } = useToast();

  const debounced = useMemo(() => debounce((v) => {
    doFetch(v as string)
  }, 1500), [doFetch]);


  const handleQueryChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
    debounced(value);
  }, [debounced])

  useEffect(() => {
    
    if (error !== null) {
      toast({
        title: "Something went wrong!",
        description: error.message,
      });
    } else {
      dismiss();
    }
  }, [error, toast, dismiss])

  return (
    <>
      <div className="p-4">
        <Input
          ref={inputRef}
          value={query}
          onChange={handleQueryChange}
          className="w-full"
          placeholder="Start typing..."
        />
      </div>
      <div className="flex flex-row flex-wrap gap-md px-4 overflow-y-scroll">
        {loading && loadingComponent}
        {data && !loading && (
          data.map(item => resultItemComponent(item, onSelect))
        )}
      </div>
    </>
  )
}