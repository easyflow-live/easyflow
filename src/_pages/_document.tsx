import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
} from 'next/document'

class MyDocument extends Document<DocumentProps> {
  render() {
    return (
      <Html className="bg-gray-800" lang="en">
        <Head>
          <meta
            name="description"
            content="Easy Flow is a real time collaborative project manager based on
              Kanban methodology. We make everything easier so you and your team
              can focus on complete tasks and ship great products."
          />

          {/* <!-- Google / Search Engine Tags --> */}
          <meta
            itemProp="name"
            content="Easyflow - Everything a project manager should be."
          />
          <meta
            itemProp="description"
            content="Easy Flow is a real time collaborative project manager based on
              Kanban methodology. We make everything easier so you and your team
              can focus on complete tasks and ship great products."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
