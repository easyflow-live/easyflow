import React from 'react'
import Link from 'next/link'
import { useCurrentUserQuery } from 'src/types/generated'
import { Box } from '@chakra-ui/layout'

import { Page } from 'src/client/shared/components/Page'

function Index() {
  const currentUser = useCurrentUserQuery()

  return (
    <Page title="Home">
      {!currentUser ? (
        <div>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </div>
      ) : (
        <Box bg="red.300">
          <Link href="/app">
            <a>Go to dashboard</a>
          </Link>
        </Box>
      )}
    </Page>
  )
}

export default Index
