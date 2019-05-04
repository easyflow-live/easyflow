import React from 'react';
import App, { Container } from 'next/app';
import { HeadProvider } from 'react-head';
import { FirebaseProvider } from '../src/components/Firebase/Firebase';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <HeadProvider headTags={[]}>
        <Container>
          <FirebaseProvider>
            <Component {...pageProps} />
          </FirebaseProvider>
        </Container>
      </HeadProvider>
    );
  }
}

export default MyApp;
