import React from 'react'
import { Title } from 'react-head'
import { observer } from 'mobx-react-lite'

import Heading from '@/components/shared/Heading'
import Dashboard from '@/modules/Dashboard'
import { useSession } from '@/hooks/use-session'

const Home = () => {
  const { userDoc } = useSession()

  return (
    <>
      <Title>Boards | Easy Flow</Title>

      <div className="m-6">
        {userDoc ? (
          <>
            <Heading text={'Boards'} />
            <Dashboard boards={userDoc.boards} />
          </>
        ) : null}
      </div>
    </>
  )
}

export default observer(Home)
