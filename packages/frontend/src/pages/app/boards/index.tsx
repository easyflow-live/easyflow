import React from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import { useSession } from 'next-auth/client'
import { Boards } from 'client/modules/Board/index'
import { Loader } from 'client/components/Loader'
import { AccessDeniedIndicator } from 'client/components/AccessDeniedIndicator'

const BoardsIndexPage: NextPage = () => {
  const [session, loading] = useSession()

  if (loading) {
    return <Loader />
  }

  if (!session) {
    return <AccessDeniedIndicator />
  }

  return (
    <>
      <Head>
        <title>Boards Page</title>
      </Head>
      <div>
        <Boards />
      </div>
    </>
  )
}

export default BoardsIndexPage
