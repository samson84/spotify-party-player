import usePlayer from "../spotify/usePlayer"
import usePlayList from "../spotify/usePlaylist"
import Player from "./Player"

const DEVICE_ID = '02940197b816cec9220982859d06013182f80dd4'
const PLAYLIST_ID = '3RKHhNbHpcbrunYzfBKOfA'

export default function ProfilePage() {
  const { data: playlist, loading: playlistLoading, error } = usePlayList(PLAYLIST_ID)
  const { play, pause, enqueue, queue, resume, playbackState, update } = usePlayer({ deviceId: DEVICE_ID })

  console.log(playbackState)

  async function handlePlay(trackId: string) {
    await play([`spotify:track:${trackId}`])
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
        <h3>🎤 Playlist</h3>
        {playlist.tracks.items.map((item) => (
          <div key={item.track.id}>
            <button
              onClick={() => handlePlay(item.track.id)}
            >
              🎶{item.track.name}
            </button>
            <button
              onClick={() => enqueue(`spotify:track:${item.track.id}`)}
            >
              ⌛Enqueue
            </button>
          </div>
        ))}
        <h3>⏳Queue</h3>
        {queue.map((item, index) => <div key={index}>🎶 {item.name}</div>)}
      </div>
    )
  }

}