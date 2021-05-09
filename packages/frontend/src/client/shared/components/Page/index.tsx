import { Box } from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import Head from 'next/head'
import { AccessDeniedIndicator } from '../AccessDeniedIndicator'
import { LeftHeader, MiddleHeader, RightHeader } from '../Header'
import { Layout } from '../Layout'
import { Loader } from '../Loader'

type PageProps = {
  title: string
}

const responsiveRisplay = { base: 'none', md: 'block' }

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
        <Layout.LeftColumn display={responsiveRisplay}>
          <LeftHeader />
          <Box bg="pink.300">
            <h1>My SaaS Name</h1>
          </Box>
        </Layout.LeftColumn>

        <Layout.MiddleColumn>
          <MiddleHeader />
          {children}
        </Layout.MiddleColumn>

        <Layout.RightColumn display={responsiveRisplay}>
          <RightHeader />
          <Box bg="gray.300">
            <h1>My SaaS Name</h1>
          </Box>
        </Layout.RightColumn>
      </Layout>
    </>
  )
}
