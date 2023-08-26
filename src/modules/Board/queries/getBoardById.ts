import {
  AppSupabaseClient,
  BoardWithOwnerAndMembers,
} from '@/libs/supabase/types'

export async function getBoardById(
  supabase: AppSupabaseClient,
  boardId: string
) {
  const { data, error } = await supabase
    .from('board')
    .select(
      `
      *,
      members ( member_id(*) ),
      users!owner_id( * )
    `
    )
    .eq('id', boardId)
    .order('createdAt')
    .single()

  if (error) {
    throw error
  }

  return data as unknown as BoardWithOwnerAndMembers
}
