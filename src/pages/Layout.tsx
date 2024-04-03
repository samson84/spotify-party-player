import { Link, Outlet } from "react-router-dom";
import AuthInfo from "./AuthInfo";

export default function Layout() {
  return (
    <div>
      <h1>Welcome to the Playlist!</h1>
      <AuthInfo />
      <nav>
        <Link to="/profile">📎 Go to Profile Page</Link>
        <Link to="/">📎 Go to Home</Link>
      </nav>
      <Outlet />
    </div>
  )
}