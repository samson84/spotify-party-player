import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./Auth"

type RequireAuthProps = {
  children: React.ReactNode
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.credentials) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  return children;
}