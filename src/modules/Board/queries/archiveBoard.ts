import { AppSupabaseClient } from '@/libs/supabase/types'

export async function archiveBoard(
  supabase: AppSupabaseClient,
  boardId: string
) {
  const { error } = await supabase
    .from('board')
    .update({ archived: true })
    .eq('id', boardId)

  if (error) {
    throw error
  }
}
