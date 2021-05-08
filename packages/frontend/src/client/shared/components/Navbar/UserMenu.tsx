import { Menu, MenuButton } from '@chakra-ui/menu'
import { Avatar, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
import { useSession, signOut } from 'next-auth/client'
import Link from 'next/link'
import React from 'react'

export function UserMenu() {
  const [session] = useSession()

  if (!session || !session.user) {
    return null
  }

  return (
    <Menu isLazy>
      <MenuButton>
        <Avatar src={session.user.image ?? ''} size="sm" />
      </MenuButton>

      <MenuList bg="gray.700" border="gray">
        <MenuItem
          isFocusable={false}
          closeOnSelect={false}
          _hover={{ backgroundColor: 'inherit' }}
          _focus={{ backgroundColor: 'inherit' }}
          _active={{ backgroundColor: 'inherit' }}
          as="span"
        >
          <div>{session.user.name || 'Fellipe Pinheiro'}</div>
        </MenuItem>
        <MenuItem
          isFocusable={false}
          closeOnSelect={false}
          _hover={{ backgroundColor: 'inherit' }}
          _focus={{ backgroundColor: 'inherit' }}
          _active={{ backgroundColor: 'inherit' }}
          as="span"
        >
          <div>{session.user.email}</div>
        </MenuItem>
        <MenuDivider />
        <MenuItem>
          <Link href="/api/auth/signout">
            <div
              onClick={(e) => {
                e.preventDefault()
                signOut()
              }}
            >
              Sign Out
            </div>
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
