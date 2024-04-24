import CustomDrawer from "@/components/CustomDrawer"
import useSearch from "../spotify/useSearch"
import SearchedTrack from "./SearchedTrack"
import Search from "@/components/Search"
import { TrackType } from "../spotify/track"
import SearchResultSkeleton from "./SearchResultSkeleton"


type AddSongProps = {
  onEnqueue: (trackUri: TrackType) => void;
}

export default function AddSong({ onEnqueue }: AddSongProps) {
  const { search } = useSearch({})

  return (
    <CustomDrawer
      triggerLabel="Add Song"
      title="Add a new song"
      description="Search for a song title or an artist or album."
    >
      {(close) => (
        <Search<TrackType>
          resultItemComponent={(track, select) => (
            <SearchedTrack key={track.id} track={track} onEnqueue={() => {
              select(track);
              close();
            }} />
          )}
          loadingComponent={<SearchResultSkeleton />}
          onSearch={search}
          onSelect={onEnqueue}
        />
      )}
    </CustomDrawer>
  )
}
