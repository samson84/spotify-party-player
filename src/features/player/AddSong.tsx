import CustomDrawer from "@/components/CustomDrawer"
import useSearch from "../spotify/useSearch"
import { useCallback, useMemo, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import SearchedTrack from "./SearchedTrack"

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

type AddSongProps = {
  onEnqueue: (trackUri: string) => void;
}

export default function AddSong({ onEnqueue }: AddSongProps) {
  const [query, setQuery] = useState('');
  const { results, error, loading, search } = useSearch({})
  const inputRef = useRef<HTMLInputElement>(null);

  const debounced = useMemo(() => debounce((v) => {
    search(v as string)
  }, 1500), [search]);


  const handleQueryChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
    debounced(value);
  }, [debounced])

  return (
    <CustomDrawer
      triggerLabel="Add Song"
      title="Add a new song"
      description="Search for a song title or an artist or album."
    >
      {(close) => (
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
          <div className="flex flex-row flex-wrap gap-md px-4">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {results && (
              results.map(track => (
                <div key={track.id} className="flex-auto">
                  <SearchedTrack track={track} onEnqueue={() => {
                    onEnqueue(track.uri);
                    close();
                  }} />
                </div>
              ))
            )}
          </div>
        </>
      )}
    </CustomDrawer>
  )
}
