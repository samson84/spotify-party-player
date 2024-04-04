import usePlayer from "../spotify/usePlayer"
import usePlayList from "../spotify/usePlaylist"
import useProfile from "../spotify/useProfile"

const DEVICE_ID = '02940197b816cec9220982859d06013182f80dd4'

export default function ProfilePage() {
  const { error, data: profile, loading: userLoading } = useProfile()
  const { data: playlist, loading: playlistLoading } = usePlayList('3RKHhNbHpcbrunYzfBKOfA')
  const { play, stop, enqueue, queue, resume } = usePlayer({ deviceId: DEVICE_ID })

  async function handlePlay(trackId: string) {
    await play([`spotify:track:${trackId}`])
  }

  if (userLoading || playlistLoading) {
    return '...loading'
  }

  if (error) {
    return <p>Ooops: {error.message}</p>
  }

  if (profile && playlist) {
    return (
      <div>
        <h2>Profile Page</h2>
        <div>
          <button onClick={stop}>⏹️ Stop</button>
          <button onClick={resume}>▶️ Resume</button>
        </div>
        <p>{profile.display_name}</p>
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