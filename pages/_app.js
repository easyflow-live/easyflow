import React from 'react';
import App, { Container } from 'next/app';
import { observer } from 'mobx-react';
import { HeadProvider, Style } from 'react-head';
import app from 'firebase/app';
import { Collection, Document } from 'firestorter';


import { SessionProvider } from '../src/hooks/useSession';
import { BoardProvider } from '../src/components/Board/BoardProvider';
import fireservice from '../src/fire.service';

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

      this.boards = new Collection('boards');
    }

    componentDidMount() {
      this.unsubscribe = app.auth().onAuthStateChanged(user => {
        this.setState({ user, initializing: false });
      });
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.user !== this.state.user) {
        const userRef = new Document(`users/${this.state.user.email}`).ref;
        this.boards.query = ref => ref.where('users', 'array-contains', userRef);
      }
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      const { Component, pageProps } = this.props;
      const { user, initializing } = this.state;
      const { docs } = this.boards;

      return (
        <HeadProvider headTags={[]}>
          <Container>
            <BoardProvider value={{ boards: docs }} >
              <SessionProvider value={{ user, initializing }}>
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
            </BoardProvider>
          </Container>
        </HeadProvider>
      );
    }
  }
);
