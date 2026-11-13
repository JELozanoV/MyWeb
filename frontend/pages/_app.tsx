import '../styles/globals.css'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { LocaleProvider } from '../src/context/LocaleContext'
import { ThemeProvider } from '../src/context/ThemeContext'
import AnimatedBackground from '../components/AnimatedBackground'
import SmoothScroll from '../components/ui/SmoothScroll'

import type { AppProps } from 'next/app'

// Fuentes autoalojadas por Next (sin petición bloqueante a Google Fonts).
// Se exponen como variables CSS que consume tailwind.config.js.
const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const fontDisplay = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const fontMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <SmoothScroll>
          <div className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} font-sans`}>
            <AnimatedBackground />
            <Component {...pageProps} />
          </div>
        </SmoothScroll>
      </LocaleProvider>
    </ThemeProvider>
  )
}
