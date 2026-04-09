import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="theme-color" content="#0F172A" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
