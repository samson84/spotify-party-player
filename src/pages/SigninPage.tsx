import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/Auth"

export default function SignInPage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()


  return (
    <div>
      <h2>Sign In Page</h2>
      <button onClick={() => {
        const from = location?.state?.from?.path ?? '/playlist'
        auth.signIn(() => navigate(from))
      }}>Sign In!</button>
    </div>
  )
}