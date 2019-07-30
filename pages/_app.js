import React from 'react';
import App, { Container } from 'next/app';
import { observer } from 'mobx-react';
import { HeadProvider, Style, Link } from 'react-head';
import * as app from 'firebase/app';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { SessionProvider } from '../src/hooks/useSession';
import UserDocument from '../src/documents/user.doc';
import firebaseService from '../src/firebase.service';
import Header from '../src/components/Header/Header';
import { initGA, logPageView } from '../src/analytics';
import { InterfaceProvider } from '../src/components/providers/InterfaceProvider';
import '../src/styles/style.css';

export default observer(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      let pageProps = {};

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
      return { pageProps };
    }

    constructor() {
      super();
      this.unsubscribe = () => {};

      this.state = {
        user: null,
        initializing: true
      };
    }

    componentDidMount() {
      this.unsubscribe = app.auth().onAuthStateChanged(user => {
        this.setState({ user, initializing: false });
      });

      initGA();
      logPageView();
      Router.router.events.on('routeChangeComplete', logPageView);
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.user !== this.state.user) {
        if (this.state.user) {
          const userDoc = new UserDocument(`users/${this.state.user.email}`);
          this.setState({ userDoc });
        }
      }
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      const { Component, pageProps } = this.props;
      const { user, userDoc, initializing } = this.state;

      return (
        <HeadProvider headTags={[]}>
          <Container>
            <SessionProvider value={{ user, userDoc, initializing }}>
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
          </Container>
        </HeadProvider>
      );
    }
  }
);
