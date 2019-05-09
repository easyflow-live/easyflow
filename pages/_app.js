import React from 'react';
import App, { Container } from 'next/app';
import { HeadProvider, Style } from 'react-head';
import { FirebaseProvider } from '../src/components/Firebase/Firebase';
import { UserProvider, BoardProvider } from '../src/hooks/useSession';
import firebase from '../src/firebase.service';

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

      boards: null,
      currentBoard: null,
    };

    this.unsubscribe = () => {};
    this.unsubscribeBoards = null;
  }

  componentDidMount() {
    this.unsubscribe = firebase
      .onAuthUserListener(user => {
        this.setState({ user, initializing: false })

        if (!this.unsubscribeBoards && user) {
          this.unsubscribeBoards = firebase.listenToBoards(boards => {
            this.setState({
              boards
            })
          });
        }
      });    
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.unsubscribeBoards && this.unsubscribeBoards();
  }

  setCurrentBoard = (board) => {
    this.setState({ currentBoard: board })
  }

  render() {
    const { Component, pageProps } = this.props;
    const { user, boards, currentBoard, initializing } = this.state;

    return (
      <HeadProvider headTags={[]}>
        <Container>
          <FirebaseProvider>
            <UserProvider value={{ user, initializing }}>
              <BoardProvider value={{ boards, currentBoard, setCurrentBoard: this.setCurrentBoard }}>
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
              </BoardProvider>
            </UserProvider>
          </FirebaseProvider>
        </Container>
      </HeadProvider>
    );
  }
}

export default MyApp;
