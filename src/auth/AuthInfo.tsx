import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";

export default function AuthInfo() {
  const auth = useAuth()
  const navigate = useNavigate()
 
  return (
    <div>
      { 
        auth.credentials 
          ? <button onClick={() => auth.signOut(() => navigate('/'))}>Sign Out</button>
          : <button onClick={() => navigate('/sign-in')}>Sign In</button>
      }
    </div>
  )
}