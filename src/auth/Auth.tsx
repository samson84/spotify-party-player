import { createContext, useContext, useState } from "react";

type AuthContextType = {
  credentials: {
    status: boolean
  } | null,
  signIn: (onSignIn?: () => void) => void,
  signOut: (onSignOut?: () => void) => void
}

const AuthContext = createContext<AuthContextType>(null!)

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  let [credentials, setCredentials] = useState<AuthContextType['credentials']>(null)

  const providerValue: AuthContextType = {
    signIn(onSignIn) { 
      setCredentials({status: true})
      onSignIn?.()
    },
    signOut(onSignOut) {
      setCredentials(null)
      onSignOut?.() 
    },
    credentials
  }

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}