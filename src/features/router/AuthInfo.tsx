import { Button } from "@/components/ui/button";
import useSpotify from "../spotify/useSpotify";

export default function AuthInfo() {
  const { loggedIn, logout } = useSpotify()

  return (
    <>
      {loggedIn && <Button variant='secondary' onClick={logout}>Logout</Button>}
    </>
  )
}