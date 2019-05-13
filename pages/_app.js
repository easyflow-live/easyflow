import React from 'react';
import App, { Container } from 'next/app';
import { observer } from 'mobx-react';
import { HeadProvider, Style } from 'react-head';
import { SessionProvider } from '../src/hooks/useSession';
import { BoardProvider } from '../src/components/Board/BoardProvider';
import app from 'firebase/app';
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
        currentBoard: null,
        boards: [],
      };
    }

    componentDidMount() {
      this.setState({ boards: fireservice.getBoards('aaa') });

      this.unsubscribe = app.auth().onAuthStateChanged(user => {
        this.setState({
          user,
          initializing: false,
        });
      });
    }

    setCurrentBoard = board => {
      console.log(board);
      this.setState({ currentBoard: board });
    };

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      const { Component, pageProps } = this.props;
      const { user, initializing, currentBoard, boards } = this.state;

      return (
        <HeadProvider headTags={[]}>
          <Container>
            <BoardProvider value={{ boards }}>
              <SessionProvider
                value={{
                  user,
                  initializing,
                  currentBoard,
                  setCurrentBoard: this.setCurrentBoard,
                }}
              >
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
