import useSpotify from "../spotify/useSpotify";

export default function AuthInfo() {
  const {loggedIn, login, logout} = useSpotify()
  
  if (loggedIn) {
    return <>
      <p>Logged in!</p>
      <button onClick={logout}>Logout</button>
    </>
  } else {
    return <>
      <p>Logged out!</p>
      <button onClick={login}>Login</button>
    </>
  }
}