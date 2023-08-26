'use server'

import { redirect } from 'next/navigation'
import prismadb from '@/libs/prismadb'
import { createSupabaseServerActionClient } from '@/libs/supabase/supabase-server'

export async function signupAction(formData: FormData, currentUrl?: string) {
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))

  const supabase = createSupabaseServerActionClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${currentUrl}/api/callback`,
    },
  })

  if (error) return { error: error.message }

  if (user) {
    await prismadb.user.create({
      data: {
        id: user.id,
        email: user.email!,
        username: user.email!.split('@')[0],
        firstName: '',
        lastName: '',
        avatarUrl: '',
        role: 'USER',
      },
    })
  }

  redirect('/login')
}
