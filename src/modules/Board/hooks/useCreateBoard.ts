import { useMutation } from '@tanstack/react-query'

import { CreateBoard, createBoard } from '@/modules/Board/queries/createBoard'
import { supabase } from '@/libs/supabase/supabase-client'

export function useCreateBoard() {
  return useMutation({
    mutationFn: (board: CreateBoard) => createBoard(supabase, board),
  })
}
