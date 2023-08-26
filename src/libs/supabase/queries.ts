import { AppSupabaseClient } from './types'

export async function getSession(supabase: AppSupabaseClient) {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  return session
}

export async function getProfile(supabase: AppSupabaseClient, userId: string) {
  const { data, error } = await supabase.from('users').select('*').single()

  if (error) {
    throw error
  }

  return data
}

export function signIn(
  supabase: AppSupabaseClient,
  { email, password }: { email: string; password: string }
) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export function signOut(supabase: AppSupabaseClient) {
  return supabase.auth.signOut()
}
