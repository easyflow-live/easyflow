import { useGetUser } from '@/libs/supabase/supabase-client'

export function useAuthUser() {
  const { data: user } = useGetUser()
  return user
}
