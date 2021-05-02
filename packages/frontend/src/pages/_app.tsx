import React, { PropsWithChildren } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { Session } from 'next-auth'
import { Layout } from 'client/components/Layout'
import { AuthProvider } from 'client/modules/Auth/components/AuthProvider'
import { GraphQLProvider } from 'client/lib/graphql/GraphQLProvider'
import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from 'client/ui/theme'

function AppProviders({
  session,
  children,
}: PropsWithChildren<{ session: Session }>) {
  return (
    <GraphQLProvider>
      <NextAuthProvider session={session}>
        <ChakraProvider theme={customTheme}>
          <AuthProvider>{children}</AuthProvider>
        </ChakraProvider>
      </NextAuthProvider>
    </GraphQLProvider>
  )
}

function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/icon.ico" />
      </Head>
      <AppProviders session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProviders>
    </>
  )
}

export default App
