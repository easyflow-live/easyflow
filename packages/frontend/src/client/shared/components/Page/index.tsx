import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import { LeftHeader, MiddleHeader, RightHeader } from '../Header'
import { Layout } from '../Layout'

type PageProps = {
  title: string
}

const responsiveRisplay = { base: 'none', md: 'block' }

export function Page({ children, title }: WithChildren<PageProps>) {
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
