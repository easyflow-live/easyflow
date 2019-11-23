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
import userStore from '../src/store/users';
import Header from '../src/components/Header/Header';
import { initGA, logPageView } from '../src/libs/analytics';
import { InterfaceProvider } from '../src/components/providers/InterfaceProvider';

// @ts-ignore
import firebaseService from '../src/services/firebase.service';
import '../src/styles/style.css';

interface State {
  user: app.User;
  userDoc: UserDocument;
  initializing: boolean;
}

class MyApp extends App<{}, State> {
  private unsubscribe: () => void;

  state = {
    user: null,
    userDoc: null,
    initializing: true
  };

  constructor(props) {
    super(props);

    this.unsubscribe = () => {};
  }

  componentDidMount() {
    this.unsubscribe = app.auth().onAuthStateChanged(user => {
      this.setState({ user, initializing: false });
    });

    initGA();
    Router.router.events.on('routeChangeComplete', url => logPageView(url));
  }

  // @ts-ignore
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

export default observer(MyApp);
