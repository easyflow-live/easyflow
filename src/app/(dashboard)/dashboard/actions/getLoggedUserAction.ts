'use server'

import { createSupabaseServerComponentClient } from '@/libs/supabase/supabase-server'
import { UserWithBoards } from '@/types/types'
import { getUserWithBoardsAction } from './getUserWithBoardsAction'

export async function getLoggedUserAction(): Promise<UserWithBoards | null> {
  const supabase = createSupabaseServerComponentClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  const userId = session?.user.id
  const user = await getUserWithBoardsAction(userId)
  return user
}
