import { cookies } from 'next/headers'
import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs'

import { Database } from '@/libs/database.types'

export const createSupabaseServerActionClient = () =>
  createServerActionClient<Database>(
    {
      cookies,
    },
    {
      options: {
        global: {
          fetch,
        },
      },
    }
  )

export const createSupabaseServerComponentClient = () =>
  createServerComponentClient<Database>(
    {
      cookies,
    },
    {
      options: {
        global: {
          fetch,
        },
      },
    }
  )
