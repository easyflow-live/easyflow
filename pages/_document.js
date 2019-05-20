// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className='bg-gray-800'>
        <Head>
          <style>{`html, body { height: 100% } /* custom! */`}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
          <link
            href='https://fonts.googleapis.com/css?family=Nunito:400,600'
            rel='stylesheet'
          />
          <link rel='shortcut icon' href='/static/images/icone.png' />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
