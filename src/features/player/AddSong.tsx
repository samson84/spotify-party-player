import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import useSearch from "../spotify/useSearch"
import { useState } from "react"
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

const debounced = debounce((v) => console.log('debounced', v), 2000);

export default function AddSong() {
  const [query, setQuery] = useState('');
  const { results, error, loading, search } = useSearch({})
  console.log('query', query)


  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await search(query)
  }


  return (
    <Drawer>
      <DrawerTrigger><Button>Add Song</Button></DrawerTrigger>
      <DrawerContent className="h-[90%]">
        <DrawerHeader>
          <DrawerTitle>Add a new song</DrawerTitle>
          <DrawerDescription>Search for a song title or an artist or album.</DrawerDescription>
        </DrawerHeader>
        <form className="p-4" onSubmit={handleSearch}>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
            placeholder="Song title, artist or album... + press ENTER"
          />
        </form>
        <div className="grow overflow-y-auto mt-md px-4">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          <div className="flex flex-row flex-wrap gap-md">
            {results && (
              results.map(track => (
              <div className="flex-auto"><SearchedTrack key={track.id} track={track} /></div>
            ))
            )}
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

