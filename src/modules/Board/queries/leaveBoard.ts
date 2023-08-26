import { AppSupabaseClient } from '@/libs/supabase/types'

export async function leaveBoard(
  supabase: AppSupabaseClient,
  boardId: string,
  memberId: string
) {
  const { error } = await supabase
    .from('members')
    .delete()
    .eq('member_id', memberId)
    .eq('board_id', boardId)

  if (error) {
    throw error
  }
}
