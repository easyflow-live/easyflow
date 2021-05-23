import { useSession } from 'next-auth/client'
import Head from 'next/head'
import { ProfileCard } from 'src/client/modules/User/components/ProfileCard'
import { AccessDeniedIndicator } from '../AccessDeniedIndicator'
import { LeftHeader, MiddleHeader, RightHeader } from '../Header'
import { Layout } from '../Layout'
import { Loader } from '../Loader'

type PageProps = {
  title: string
}

const responsiveDisplayLeftColumn = { base: 'none', md: 'block' }
const responsiveDisplayRightColumn = { base: 'none', '2lg': 'block' }

export function Page({ children, title }: WithChildren<PageProps>) {
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
        <title>{title}</title>
      </Head>

      <Layout>
        <Layout.LeftColumn display={responsiveDisplayLeftColumn}>
          <LeftHeader />
          <ProfileCard />
        </Layout.LeftColumn>

        <Layout.MiddleColumn>
          <MiddleHeader />
          {children}
        </Layout.MiddleColumn>

        <Layout.RightColumn display={responsiveDisplayRightColumn}>
          <RightHeader />
        </Layout.RightColumn>
      </Layout>
    </>
  )
}
