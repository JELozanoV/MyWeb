/** @type {import('tailwindcss').Config} */

// Los colores salen de variables CSS (styles/globals.css) para que cada token
// cambie solo entre tema claro y oscuro, sin repetir variantes `dark:`.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: token('bg'),
        surface: {
          DEFAULT: token('surface'),
          2: token('surface-2'),
        },
        line: token('line'),
        fg: token('fg'),
        muted: token('muted'),
        accent: {
          DEFAULT: token('accent'),
          2: token('accent-2'),
          fg: token('accent-fg'),
        },
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(4%, -6%, 0) scale(1.08)' },
        },
        'orb-spin': {
          to: { transform: 'rotate(360deg)' },
        },
        'word-rise': {
          from: { transform: 'translateY(110%)' },
          to: { transform: 'translateY(0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        drift: 'drift 18s ease-in-out infinite',
        'orb-spin': 'orb-spin 24s linear infinite',
        'pulse-dot': 'pulse-dot 1.8s ease-out infinite',
        'word-rise': 'word-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
