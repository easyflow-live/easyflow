import React from 'react';
import App from 'next/app';
import { observer } from 'mobx-react';
import { HeadProvider, Link } from 'react-head';
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from '../components/Header/Header';
import { initGA, logPageView } from '../libs/analytics';
import { InterfaceProvider } from '../components/providers/InterfaceProvider';
import { SessionProvider } from '../components/providers/SessionProvider';

import '../services/firebase.service';
import '../styles/style.css';

class MyApp extends App<{}> {
  componentDidMount() {
    initGA();
    Router.router.events.on('routeChangeComplete', url => logPageView(url));
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <HeadProvider headTags={[]}>
        <SessionProvider>
          <InterfaceProvider>
            <Link rel='shortcut icon' href='/static/images/icon.png' />
            <Header />
            <Component {...pageProps} />
            <ToastContainer
              toastClassName='Toast-background'
              progressClassName='Toast-progress'
            />
          </InterfaceProvider>
        </SessionProvider>
      </HeadProvider>
    );
  }
}

export default observer(MyApp);
