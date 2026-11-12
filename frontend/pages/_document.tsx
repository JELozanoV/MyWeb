import { Html, Head, Main, NextScript } from 'next/document'
import { themeInitScript } from '../src/context/ThemeContext'

export default function Document() {
  return (
    <Html lang="es" suppressHydrationWarning>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="theme-color" content="#0F172A" />
        {/* Aplica el tema antes del primer pintado para evitar el parpadeo claro→oscuro */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
