import '../styles/globals.css'
import { LocaleProvider } from '../src/context/LocaleContext'
import { ThemeProvider } from '../src/context/ThemeContext'
import AnimatedBackground from '../components/AnimatedBackground'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AnimatedBackground />
        <Component {...pageProps} />
      </LocaleProvider>
    </ThemeProvider>
  )
}