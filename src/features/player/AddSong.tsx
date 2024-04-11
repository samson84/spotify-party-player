import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import useSearch from "../spotify/useSearch"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import SearchedTrack from "./SearchedTrack"
import { CircleX } from "lucide-react"

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
  const [open, setOpen] = useState(false);
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

  function handleEnqueue(trackUri: string) {
    onEnqueue(trackUri);
    setOpen(false);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (open) {
        inputRef.current?.focus();
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, [open])

  useEffect(() => {
    function escapeHandler(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', escapeHandler);
    return () => window.removeEventListener('keydown', escapeHandler);
  })

  return (
    <Drawer open={open}>
      <Button onClick={() => setOpen(true)}>Add Song</Button>
      <DrawerContent className="h-[90%]">
        <DrawerHeader className="flex">
          <div className="flex-grow">
            <DrawerTitle>Add a new song</DrawerTitle>
            <DrawerDescription>Search for a song title or an artist or album.</DrawerDescription>
          </div>
          <div className="">
            <Button variant="ghost" onClick={() => setOpen(false)}><CircleX /></Button>
          </div>
        </DrawerHeader>
        <div className="p-4">
          <Input
            ref={inputRef}
            value={query}
            onChange={handleQueryChange}
            className="w-full"
            placeholder="Start typing..."
          />
        </div>
        <div className="grow overflow-y-auto mt-md px-4">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          <div className="flex flex-row flex-wrap gap-md">
            {results && (
              results.map(track => (
                <div key={track.id} className="flex-auto">
                  <SearchedTrack track={track} onEnqueue={() => handleEnqueue(track.uri)} />
                </div>
              ))
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}


