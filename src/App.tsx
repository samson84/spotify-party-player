import Layout from "./pages/Layout"
import LoginPage from "./pages/LoginPage"
import { Route, Routes } from "react-router-dom"
import ProfilePage from "./pages/ProfilePage"
import RequireAuth from "./pages/RequireAuth"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<p>Home page</p>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/profile' element={
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        } />
      </Route>
    </Routes>
  )
}

export default App
