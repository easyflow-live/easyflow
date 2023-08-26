'use server'

import { redirect } from 'next/navigation'
import { createSupabaseServerActionClient } from '@/libs/supabase/supabase-server'

export async function loginAction(formData: FormData) {
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))

  const supabase = createSupabaseServerActionClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) return { error: error.message }

  redirect('/dashboard')
}
