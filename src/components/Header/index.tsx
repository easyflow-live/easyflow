'use client'

import React from 'react'
import Link from 'next/link'
import { useGetUser, useSignOut } from '@/libs/supabase/supabase-client'
import { Button } from '@/components/ui/Button'
import { ModeToggle } from '../ModeToggle'

// import { Avatar } from '@/components/shared/Avatar'
// import UserMenu from '@/components/shared/UserMenu'
// import { GiveFeedback } from '@/components/shared/Feedback/GiveFeedback'
// import { useInterface } from '@/components/providers/InterfaceProvider'

function LogoutButton() {
  const { mutate } = useSignOut()

  return (
    <Button variant="ghost" onClick={() => mutate()}>
      Logout
    </Button>
  )
}

export function Header() {
  const { data: user } = useGetUser()
  const hasUser = !!user

  return (
    <header className="z-100 bg-background inset-x-0 top-0 lg:static flex items-center shadow-md">
      <nav className="w-full relative mx-auto px-6">
        <div className="h-20 flex flex-col justify-center">
          <div className="flex items-center -mx-6 justify-between">
            <div className="lg:w-1/4 xl:w-1/5 pl-6 pr-6">
              <div className="flex items-center">
                <Link href="/" className="text-2xl text-foreground">
                  <span className="text-teal-500">easy</span>flow
                  <small className="text-pink-500 text-xs ml-2">beta</small>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/4 xl:w-1/5 pl-6 pr-6">
              <div className="flex items-center justify-end gap-2">
                <ModeToggle />
                {hasUser && <LogoutButton />}
              </div>
              {/* {user && (
                <div className="flex items-center justify-end">
                  <GiveFeedback user={userDoc} />
                  {<UserMenu
                    userName={user.displayName}
                    userEmail={user.email}
                    trigger={
                      <div className="flex items-center">
                        <Avatar
                          src={user.photoURL}
                          username={user.displayName}
                          className="cursor-pointer"
                        />
                      </div>
                    }
                  />
                </div>
              )}} */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
