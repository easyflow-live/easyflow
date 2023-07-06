import React from 'react'
import { AppProps } from 'next/app'
import { observer } from 'mobx-react-lite'
import { HeadProvider, Link } from 'react-head'
// import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { Header } from '@/components/Header'
// import { initGA, logPageView } from '@/libs/analytics'
import { InterfaceProvider } from '@/components/providers/InterfaceProvider'
// import { SessionProvider } from '@/modules/Auth/components/SessionProvider'

import '@/services/firebase.service'
import '@/styles/style.css'

function MyApp({ Component, pageProps }: AppProps) {
  // const { events } = useRouter()

  // useEffect(() => {
  //   initGA()
  //   events.on('routeChangeComplete', (url) => logPageView(url))
  // }, [])

  return (
    // <SessionProvider>
    <HeadProvider headTags={[]}>
      <InterfaceProvider>
        <Link rel="shortcut icon" href="/static/images/icon.ico" />
        <Header />
        <Component {...pageProps} />
        <ToastContainer
          closeOnClick={false}
          closeButton={false}
          toastClassName="Toast-background"
        />
      </InterfaceProvider>
    </HeadProvider>
    // </SessionProvider>
  )
}

export default observer(MyApp)
