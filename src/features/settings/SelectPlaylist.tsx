import CustomDrawer from "@/components/CustomDrawer";
import usePlaylist, { PlaylistType } from "../spotify/usePlaylist";
import Playlist from "./Playlist";

type SelectPlaylistProps = {
  onSelect: (playlist: PlaylistType) => void
}

export default function SelectPlaylist({onSelect}: SelectPlaylistProps) {
  const { playlists, loading } = usePlaylist();

  return (
    <CustomDrawer
      triggerLabel="Change Playlist"
      triggerVariant="outline"
      description="You can select the base playlist to play on the Player Page. Changing the playlist won't effect the current queue."
      title="Select Playlist"
    >
      {(close) => (
        <div className="flex flex-row flex-wrap gap-md px-4 overflow-y-scroll">
          {loading && <div>Loading...</div>}
          {playlists && !loading && playlists.map(playlist => (
            <Playlist playlist={playlist} onSelect={() => {
              close();
              onSelect(playlist);
            }} />
          ))}
        </div>
      )}
    </CustomDrawer>
  )
}