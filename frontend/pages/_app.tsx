import '../styles/globals.css'
import { LocaleProvider } from '../src/context/LocaleContext'
import { ThemeProvider } from '../src/context/ThemeContext'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <Component {...pageProps} />
      </LocaleProvider>
    </ThemeProvider>
  )
}