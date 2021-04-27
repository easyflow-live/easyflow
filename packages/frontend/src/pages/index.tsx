import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useCurrentUserQuery } from 'types/generated'

function Index() {
  const currentUser = useCurrentUserQuery()

  return (
    <>
      <Head>
        <title>Index Page</title>
      </Head>

      <>
        <h1>My SaaS Name</h1>
        {!currentUser ? (
          <div>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </div>
        ) : (
          <div>
            <Link href="/app">
              <a>Go to dashboard</a>
            </Link>
          </div>
        )}
      </>
    </>
  )
}

export default Index
