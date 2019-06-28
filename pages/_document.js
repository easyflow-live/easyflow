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
      <Html className='bg-gray-800' lang='en'>
        <Head>
          <meta
            name='description'
            content='Easy Flow is a real time collaborative project manager based on
              Kanban methodology. We make everything easier so you and your team
              can focus on complete tasks and ship great products.'
          />

          {/* <!-- Google / Search Engine Tags --> */}
          <meta
            itemProp='name'
            content='Easyflow - Everything a project manager should be.'
          />
          <meta
            itemProp='description'
            content='Easy Flow is a real time collaborative project manager based on
              Kanban methodology. We make everything easier so you and your team
              can focus on complete tasks and ship great products.'
          />

          <style>{`html, body { height: 100% } /* custom! */`}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
