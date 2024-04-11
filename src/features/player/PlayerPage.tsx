import { Button } from "@/components/ui/button"
import usePlayer from "../spotify/usePlayer"
import usePlayList from "../spotify/usePlaylist"
import Player from "./Player"
import { Muted } from "@/components/Typography"
import AddSong from "./AddSong"
import QueueList from "./QueueList"

const DEVICE_ID = '02940197b816cec9220982859d06013182f80dd4'
const PLAYLIST_ID = '3RKHhNbHpcbrunYzfBKOfA'
const PLAYLIST_URI = 'spotify:playlist:3RKHhNbHpcbrunYzfBKOfA'

export default function PlayerPage() {
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
      <div className="flex-none flex flex-col h-[86vh]">
        <section>
          <Player
            playbackState={playbackState}
            onPause={pause}
            onResume={resume}
            onTrackFinish={update}
          />
        </section>
        <section className="flex-none flex gap-sm items-center">
          <AddSong onEnqueue={enqueue} />
          <Button
            variant={"outline"}
            onClick={handlePlay}
            disabled={playbackState?.playing}
          >
            Start playlist
          </Button>
          <Muted>{playlist.name}</Muted>
        </section>
        <section className="flow-grow overflow-y-auto">
          <QueueList queue={queue} />
        </section>
      </div>
    )
  }

}