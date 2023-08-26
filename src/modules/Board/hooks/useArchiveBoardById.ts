import { useMutation } from '@tanstack/react-query'

import { archiveBoard } from '@/modules/Board/queries/archiveBoard'
import { supabase } from '@/libs/supabase/supabase-client'

export function useArchiveBoardById() {
  return useMutation({
    mutationFn: (id: string) => archiveBoard(supabase, id),
  })
}
