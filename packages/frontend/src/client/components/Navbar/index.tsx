import React from 'react'
import Link from 'next/link'
import { Text } from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/client'

export function Navbar() {
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

  const signOutButtonNode = () => {
    if (!session) {
      return false
    }

    return (
      <div>
        <Link href="/api/auth/signout">
          <button
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Sign Out
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div>
        <Link href="/">
          <a>
            <Text fontSize="2xl" color="white">
              <Text as="span" color="teal.500">
                easy
              </Text>
              flow
              <Text as="span" fontSize="xs" color="pink.500">
                beta
              </Text>
            </Text>
          </a>
        </Link>
      </div>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/app/boards">
          <a>Boards</a>
        </Link>
      </div>

      <div>
        {signInButtonNode()}
        {signOutButtonNode()}
      </div>
    </div>
  )
}
