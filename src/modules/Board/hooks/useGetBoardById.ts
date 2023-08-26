import { useQuery } from '@tanstack/react-query'

import { getBoardById } from '@/modules/Board/queries/getBoardById'
import { supabase } from '@/libs/supabase/supabase-client'

export function useGetBoardById(id: string) {
  return useQuery({
    queryKey: ['useGetBoardById', id],
    queryFn: () => getBoardById(supabase, id),
    staleTime: 60000,
    enabled: Boolean(id),
  })
}
