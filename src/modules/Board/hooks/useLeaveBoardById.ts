import { useMutation } from '@tanstack/react-query'

import { leaveBoard } from '@/modules/Board/queries/leaveBoard'
import { supabase } from '@/libs/supabase/supabase-client'

export function useLeaveBoardById() {
  return useMutation({
    mutationFn: ({
      boardId,
      memberId,
    }: {
      boardId: string
      memberId: string
    }) => leaveBoard(supabase, boardId, memberId),
  })
}
