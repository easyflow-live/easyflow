import React from 'react';
import App, { Container } from 'next/app';
import { HeadProvider, Style } from 'react-head';
import { FirebaseProvider } from '../src/components/Firebase/Firebase';
import { UserProvider } from '../src/hooks/useSession';
import firebase from 'firebase';

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
    this.state = {
      user: null,
      initializing: true,
    };

    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ user, initializing: false }));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { Component, pageProps } = this.props;
    const { user, initializing } = this.state;

    return (
      <HeadProvider headTags={[]}>
        <Container>
          <FirebaseProvider>
            <UserProvider value={{ user, initializing }}>
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
            </UserProvider>
          </FirebaseProvider>
        </Container>
      </HeadProvider>
    );
  }
}

export default MyApp;
