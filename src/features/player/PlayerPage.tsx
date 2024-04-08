import { Button } from "@/components/ui/button"
import usePlayer from "../spotify/usePlayer"
import usePlayList from "../spotify/usePlaylist"
import Player from "./Player"
import { Muted } from "@/components/Typography"
import AddSong from "./AddSong"

const DEVICE_ID = '02940197b816cec9220982859d06013182f80dd4'
const PLAYLIST_ID = '3RKHhNbHpcbrunYzfBKOfA'
const PLAYLIST_URI = 'spotify:playlist:3RKHhNbHpcbrunYzfBKOfA'

export default function ProfilePage() {
  const { data: playlist, loading: playlistLoading, error } = usePlayList(PLAYLIST_ID)
  const { playContext, pause, enqueue, queue, resume, playbackState, update } = usePlayer({ deviceId: DEVICE_ID })

  async function handlePlay() {
    await playContext(PLAYLIST_URI)
  }

  if (playlistLoading) {
    return '...loading'
  }

  if (error) {
    return <p>Ooops: {error.message}</p>
  }

  if (playlist) {
    return (
      <div className="mt-md">
        <Player
          playbackState={playbackState}
          onPause={pause}
          onResume={resume}
          onTrackFinish={update}
        />
        <section className="flex gap-sm items-center">
          <AddSong />
          <Button
            variant={"outline"}
            onClick={handlePlay}
            disabled={playbackState?.playing}
          >
            Start playlist
          </Button>
          <Muted>{playlist.name}</Muted>
        </section>
        <h3>⏳Queue</h3>
        {queue.map((item, index) => <div key={index}>🎶 {item.name}</div>)}
      </div>
    )
  }

}