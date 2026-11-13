import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useLocale } from '../src/context/LocaleContext';
import { useContent } from '../src/hooks/useContent';
import { useTheme } from '../src/context/ThemeContext';
import { useActiveSection } from '../src/hooks/useActiveSection';
import { useScrollToSection } from '../src/hooks/useScrollToSection';

// Secciones del menú, en el orden en que aparecen en la página.
// Cada id debe existir como clave en content/{locale}/nav.ts
const NAV_SECTIONS = ['services', 'projects', 'skills', 'experience', 'about', 'education', 'contact'] as const;
// Se observa también el hero para apagar el indicador al volver arriba
const OBSERVED_SECTIONS = ['hero', ...NAV_SECTIONS] as const;

const controlBtnClass =
  'inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-xs font-semibold text-muted transition-colors hover:bg-surface-2 hover:text-fg';

export default function Navbar() {
  const { locale, toggleLocale } = useLocale();
  const { nav, labels } = useContent();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection(OBSERVED_SECTIONS);
  const scrollToSection = useScrollToSection();
  const { scrollYProgress } = useScroll();

  const goTo = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Progreso de lectura */}
      <motion.div
        aria-hidden
        className="h-0.5 origin-left"
        style={{
          scaleX: scrollYProgress,
          backgroundImage: 'linear-gradient(90deg, var(--grad-from), var(--grad-to))',
        }}
      />

      <div className="mx-auto mt-3 max-w-5xl px-4">
        <nav className="flex h-14 items-center justify-between gap-2 rounded-full border border-line bg-surface/75 pl-4 pr-2.5 shadow-lg shadow-black/5 backdrop-blur-xl">
          <button
            onClick={() => goTo('hero')}
            className="shrink-0 rounded-lg p-1 transition-transform duration-300 hover:scale-110"
            aria-label={labels.nav.home}
          >
            <Image
              src="/logo.svg"
              alt=""
              width={48}
              height={32}
              preload
              className="h-7 w-10 object-contain brightness-0 dark:brightness-100"
            />
          </button>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_SECTIONS.map((id) => {
              const isActive = activeSection === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => goTo(id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                      isActive ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full border border-line bg-surface-2"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{nav[id]}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              onClick={toggleLocale}
              aria-label={labels.nav.toggleLanguage}
              data-id="lang-toggle"
              className={controlBtnClass}
            >
              {locale.toUpperCase()}
            </button>
            <button
              onClick={toggleTheme}
              aria-label={labels.nav.toggleTheme}
              data-id="theme-toggle"
              className={controlBtnClass}
            >
              {theme === 'dark' ? <FiMoon size={16} /> : <FiSun size={16} />}
            </button>
            <button onClick={() => goTo('contact')} className="btn-primary hidden !px-4 !py-2 sm:inline-flex">
              {nav.cta}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={labels.nav.toggleMenu}
              aria-expanded={isMenuOpen}
              className={`lg:hidden ${controlBtnClass}`}
            >
              {isMenuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
          </div>
        </nav>

        {/* Menú móvil */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 flex flex-col gap-1 rounded-3xl border border-line bg-surface/95 p-3 shadow-xl backdrop-blur-xl lg:hidden"
            >
              {NAV_SECTIONS.map((id) => (
                <li key={id}>
                  <button
                    onClick={() => goTo(id)}
                    className={`w-full rounded-2xl px-4 py-3 text-left text-base font-medium transition-colors ${
                      activeSection === id ? 'bg-surface-2 text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {nav[id]}
                  </button>
                </li>
              ))}
              <li className="pt-1 sm:hidden">
                <button onClick={() => goTo('contact')} className="btn-primary w-full py-3 text-base">
                  {nav.cta}
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
