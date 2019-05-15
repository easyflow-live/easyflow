import React from 'react';
import App, { Container } from 'next/app';
import { observer } from 'mobx-react';
import { HeadProvider, Style } from 'react-head';
import app from 'firebase/app';


import { SessionProvider } from '../src/hooks/useSession';
import UserDocument from '../src/stores/user.doc';

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
        initializing: true,
      };
    }

    componentDidMount() {
      this.unsubscribe = app.auth().onAuthStateChanged(user => {
        this.setState({ user, initializing: false });
      });
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.user !== this.state.user) {
        const userDoc = new UserDocument(`users/${this.state.user.email}`);
        this.setState({ userDoc })
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
              <Style>
                {`
                  * {
                    padding: 0;
                    margin: 0;
                  }
                  body {
                    background-color: #2d2d2d;
                  }
                `}
              </Style>

              <Component {...pageProps} />
            </SessionProvider>
          </Container>
        </HeadProvider>
      );
    }
  }
);
