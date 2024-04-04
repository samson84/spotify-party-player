import { Navigate } from "react-router-dom";
import useSpotify  from "../spotify/useSpotify"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const {login, loggedIn} = useSpotify();

  if(loggedIn) {
    return <Navigate to='/'/>
  }

  return (
    <>
      <p>You are not logged in.</p>
      <Button onClick={login} variant="default">Login with Spotify 🔑</Button>
    </>
  )
}