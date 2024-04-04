import Layout from "./pages/Layout"
import LoginPage from "./pages/LoginPage"
import { Route, Routes } from "react-router-dom"
import PlayerPage from "./pages/PlayerPage"
import RequireAuth from "./pages/RequireAuth"
import { ROUTES } from './routes'
import useSpotify from "./spotify/useSpotify"

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
