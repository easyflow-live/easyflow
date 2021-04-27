import { useSession } from 'next-auth/client'
import { useEffect } from 'react'

export function AuthProvider({ children }) {
  const [session] = useSession()

  useEffect(() => {
    if (session && session.accessToken) {
      window.localStorage.setItem('token', String(session.accessToken))
    }
  }, [session])

  return children
}
