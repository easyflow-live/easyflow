import { HStack } from '@chakra-ui/react'
import { useSession, signIn } from 'next-auth/client'
import Link from 'next/link'
import React from 'react'
import { BasicHeader } from './BasicHeader'
import { UserMenu } from './UserMenu'

export function RightHeader() {
  const [session] = useSession()

  const signInButtonNode = () => {
    if (session) {
      return false
    }

    return (
      <div>
        <Link href="/api/auth/signin">
          <button
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}
          >
            Sign In
          </button>
        </Link>
      </div>
    )
  }

  return (
    <BasicHeader justifyContent="flex-end">
      <HStack>
        <UserMenu />
        {signInButtonNode()}
      </HStack>
    </BasicHeader>
  )
}
