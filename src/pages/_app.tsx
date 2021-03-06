import React from 'react';
import App from 'next/app';
import { observer } from 'mobx-react';
import { HeadProvider, Link } from 'react-head';
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from 'components/Header';
import { initGA, logPageView } from 'libs/analytics';
import { InterfaceProvider } from 'components/providers/InterfaceProvider';
import { SessionProvider } from 'modules/Auth/components/SessionProvider';
import { customTheme } from 'ui/theme';

import 'services/firebase.service';
import 'styles/style.css';

class MyApp extends App<{}> {
  componentDidMount() {
    initGA();
    Router.router.events.on('routeChangeComplete', url => logPageView(url));
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ChakraProvider theme={customTheme}>
        <SessionProvider>
          <HeadProvider headTags={[]}>
            <InterfaceProvider>
              <Link rel='shortcut icon' href='/static/images/icon.ico' />
              <Header />
              <Component {...pageProps} />
              <ToastContainer
                closeOnClick={false}
                closeButton={false}
                toastClassName='Toast-background'
              />
            </InterfaceProvider>
          </HeadProvider>
        </SessionProvider>
      </ChakraProvider>
    );
  }
}

export default observer(MyApp);
