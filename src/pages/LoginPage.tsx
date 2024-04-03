import { Navigate } from "react-router-dom";
import { useSpotify } from "./SpotifyProvider"

export default function LoginPage() {
  const {login, loggedIn} = useSpotify();

  if(loggedIn) {
    return <Navigate to='/'/>
  }

  return (
    <>
      <p>You are not logged in.</p>
      <button onClick={login}>Login with Spotify 🔑</button>
    </>
  )
}