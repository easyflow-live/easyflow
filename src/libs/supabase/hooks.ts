import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { getProfile, getSession, signIn, signOut } from './queries'
import { supabase } from './supabase-client'

export function useSignIn() {
  const router = useRouter()

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(supabase, { email, password }),
    onSuccess: () => router.replace('/dashboard'),
  })
}

export function useGetSession() {
  return useQuery({
    queryKey: ['useGetUser'],
    queryFn: () => getSession(supabase),
    staleTime: 60000,
  })
}

export function useGetProfile(userId?: string) {
  return useQuery({
    queryKey: ['useGetProfile'],
    queryFn: () => getProfile(supabase, userId || ''),
    enabled: Boolean(userId),
    staleTime: 60000,
  })
}

export function useSignOut() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: () => signOut(supabase),
    onSuccess: async () => {
      router.replace('/login')
      await queryClient.invalidateQueries(['useGetUser'])
    },
  })
}
