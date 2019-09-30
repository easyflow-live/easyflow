import React from 'react';
import App from 'next/app';
import { observer } from 'mobx-react';
import { HeadProvider, Link } from 'react-head';
import * as app from 'firebase/app';
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { SessionProvider } from '../src/hooks/use-session';
import UserDocument from '../src/documents/user.doc';
import firebaseService from '../src/services/firebase.service';
import userStore from '../src/store/users';
import Header from '../src/components/Header/Header';
import { initGA, logPageView } from '../src/libs/analytics';
import { InterfaceProvider } from '../src/components/providers/InterfaceProvider';
import '../src/styles/style.css';

export default observer(
  class MyApp extends App {
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
      Router.router.events.on('routeChangeComplete', url => logPageView(url));
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.user !== this.state.user) {
        if (this.state.user) {
          const userDoc = new UserDocument(`users/${this.state.user.email}`);
          this.setState({ userDoc });
          userStore.setCurrentUser(userDoc);
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
        </HeadProvider>
      );
    }
  }
);
