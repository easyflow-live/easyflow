import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import type { Database } from '@/libs/database.types'
import { config } from './config'

export const supabase = createClientComponentClient<Database>({
  ...config,
  options: {
    global: {
      fetch,
    },
  },
})
