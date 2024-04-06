import Layout from "./features/router/Layout"
import LoginPage from "./features/router/LoginPage"
import { Route, Routes } from "react-router-dom"
import PlayerPage from "./features/player/PlayerPage"
import RequireAuth from "./features/router/RequireAuth"
import { ROUTES } from './features/router/routes'
import useSpotify from "./features/spotify/useSpotify"

function App() {
  const { loading } = useSpotify()

  if (loading) {
    return 'Signing in...'
  }

  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path='/' element={<Layout />}>
        <Route index path={ROUTES.HOME} element={
          <RequireAuth>
            <PlayerPage />
          </RequireAuth>
        } />
      </Route>
    </Routes>
  )
}

export default App
