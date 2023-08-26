'use client'

import cn from 'classnames'
import Link from 'next/link'

import { Button, buttonVariants } from '@/components/ui/Button'
import { useGetUser, useSignOut } from '@/libs/supabase/supabase-client'

export function LoginLogoutButton() {
  const { data: user } = useGetUser()
  const { mutate } = useSignOut()

  return !user ? (
    <Link
      href="/auth"
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'absolute right-4 top-4 md:right-8 md:top-8'
      )}
    >
      Login
    </Link>
  ) : (
    <div className={'absolute right-4 top-4 md:right-8 md:top-8 flex gap-2'}>
      <Link href="/dashboard" className={buttonVariants({ variant: 'ghost' })}>
        Dashboard
      </Link>
      <Button variant="ghost" onClick={() => mutate()}>
        Logout
      </Button>
    </div>
  )
}
