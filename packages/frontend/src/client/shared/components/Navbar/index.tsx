import React from 'react'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/client'
import { Box, HStack } from '@chakra-ui/layout'
import { UserMenu } from './UserMenu'

function Icon() {
  return (
    <svg width={31} height={32} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x={12} y={12} width={16} height={16} rx={4} fill="#ED64A6" />
      <rect x={2} y={2} width={16} height={16} rx={4} fill="#4FD1C5" />
    </svg>
  )
}

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

  return (
    <Box p={4}>
      <HStack justifyContent="space-between">
        <Link href="/">
          <a>
            <Icon />
          </a>
        </Link>

        <HStack>
          <UserMenu />
          {signInButtonNode()}
        </HStack>
      </HStack>
    </Box>
  )
}
