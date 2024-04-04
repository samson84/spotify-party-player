import { Navigate } from "react-router-dom";
import useSpotify from "../spotify/useSpotify";
import { ReactNode } from "react";
import { ROUTES } from "../routes";

type RequireAuthProps = {
  children: ReactNode
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { loggedIn, loading } = useSpotify()

  console.log('loading', loading, 'loggedIn', loggedIn)

  if (!loggedIn) {
    return <Navigate to={`${ROUTES.LOGIN}`} />
  }

  return <>{children}</>

}