import { SupabaseClient } from '@supabase/supabase-js'

import { Database } from '../database.types'

export type AppSupabaseClient = SupabaseClient<Database>

export type Table<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type Board = Table<'board'>
export type User = Table<'users'>
export type BoardInvite = Table<'board_invite'>

export type BoardMember = {
  member: User
}

export type BoardWithOwnerAndMembers = Board & {
  owner: User
  members: BoardMember[]
}
