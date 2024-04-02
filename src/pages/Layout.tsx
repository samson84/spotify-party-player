import { Outlet } from "react-router-dom";
import AuthInfo from "../auth/AuthInfo";

export default function Layout() {
  return (
    <div>
      <h1>Playlists</h1>
      <AuthInfo />
      <Outlet />
    </div>
  )
}