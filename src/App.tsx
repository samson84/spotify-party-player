import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./auth/Auth.js"
import SignInPage from "./pages/SigninPage.js"
import PlayListPage from "./pages/PlaylistPage.js"
import RequireAuth from "./auth/RequireAuth.js"
import Layout from "./pages/Layout.js"

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SignInPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route
            path="/playlist"
            element={
              <RequireAuth>
                <PlayListPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
