import { useSession } from 'next-auth/client'
import { Boards } from 'src/client/modules/Board'
import { AccessDeniedIndicator } from 'src/client/shared/components/AccessDeniedIndicator'
import { Loader } from 'src/client/shared/components/Loader'
import { Page } from 'src/client/shared/components/Page'

function Index() {
  const [session, loading] = useSession()

  if (loading) {
    return <Loader />
  }

  if (!session) {
    return <AccessDeniedIndicator />
  }

  return (
    <Page title="Home">
      <Boards />
    </Page>
  )
}

export default Index
