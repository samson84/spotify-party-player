import { Navigate } from "react-router-dom";
import useSpotify from "../spotify/useSpotify";
import { ReactNode } from "react";

type RequireAuthProps = {
  children: ReactNode
}

export default function RequireAuth({children}: RequireAuthProps) {
  const { loggedIn } = useSpotify()

  if(!loggedIn) {
    return <Navigate to='/login' />
  }

  return <>{children}</>
  
}