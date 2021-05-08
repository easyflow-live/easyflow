import React, { PropsWithChildren } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { Session } from 'next-auth'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from 'src/client/modules/Auth/components/AuthProvider'
import { GraphQLProvider } from 'src/client/lib/graphql/GraphQLProvider'
import { customTheme } from 'src/client/ui/theme'

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
        <Component {...pageProps} />
      </AppProviders>
    </>
  )
}

export default App
