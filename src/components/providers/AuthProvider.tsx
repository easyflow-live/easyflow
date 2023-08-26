'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/libs/supabase/supabase-client'
import { Session } from '@supabase/supabase-js'

type AuthContextValue = {
  session: Session | null
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({
  session,
  children,
}: WithChildren<{ session: Session | null }>) => {
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.access_token !== session?.access_token) {
        router.refresh()
      }
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [session?.access_token, router])

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth should be used with AuthProvider')
  }

  return context
}
