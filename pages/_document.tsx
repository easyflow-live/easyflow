import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();

    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );

    const styles = sheet.getStyleElement();

    return { ...page, styles };
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
