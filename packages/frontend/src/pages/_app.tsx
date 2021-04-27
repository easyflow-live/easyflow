import React, { PropsWithChildren } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { Session } from 'next-auth'
import { Layout } from 'client/components/Layout'
import { AuthProvider } from 'client/modules/Auth/components/AuthProvider'
import { GraphQLProvider } from 'client/lib/graphql/GraphQLProvider'
import { WithAdditionalParams } from 'next-auth/_utils'

function AppProviders({
  session,
  children,
}: PropsWithChildren<{ session: WithAdditionalParams<Session> }>) {
  return (
    <GraphQLProvider>
      <NextAuthProvider session={session}>
        <AuthProvider>{children}</AuthProvider>
      </NextAuthProvider>
    </GraphQLProvider>
  )
}

function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
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
