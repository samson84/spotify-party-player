import { Button } from "@/components/ui/button";
import useSpotify from "../spotify/useSpotify";
import { LogOut } from "lucide-react";

export default function AuthInfo() {
  const { loggedIn, logout } = useSpotify()

  return (
    <>
      {loggedIn && <Button variant='ghost' onClick={logout} title="log out"><LogOut /></Button>}
    </>
  )
}