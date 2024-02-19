import { Html, Head, Main, NextScript } from 'next/document'

// seperti index.html pada React
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" /> */}
        <meta name="description" content="My first project created with Nextjs" />
        <meta name="theme-color" content="#000" />
      </Head>
      <title>My App</title>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
