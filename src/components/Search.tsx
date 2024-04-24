import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";

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
  onSearch: (query?: string) => Promise<T[] | null>;
  onSelect: (item: T) => void;
}

export default function Search<T>({
  resultItemComponent,
  loadingComponent = 'Loading...',
  onSearch,
  onSelect
}: SearchProps<T>) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debounced = useMemo(() => debounce(async (v) => {
    const results = await onSearch(v as string);
    setSearchResults(results ?? []);
    setLoading(false);
  }, 1500), [onSearch]);

  const handleQueryChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const { value } = event.target;
    setQuery(value);
    debounced(value);
  }, [debounced])

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
        {searchResults && !loading && (
          searchResults.map(item => resultItemComponent(item, onSelect))
        )}
      </div>
    </>
  )
}