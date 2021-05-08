import { useSession } from 'next-auth/client'
import Link from 'next/link'
import { AccessDeniedIndicator } from 'src/client/shared/components/AccessDeniedIndicator'
import { Loader } from 'src/client/shared/components/Loader'

function Index() {
  const [session, loading] = useSession()

  if (loading) {
    return <Loader />
  }

  if (!session) {
    return <AccessDeniedIndicator />
  }

  return (
    <div>
      <h1>Hello {session?.user?.email}</h1>
      <div>
        <Link href="/app/boards">
          <a>Boards</a>
        </Link>
      </div>
    </div>
  )
}

export default Index
