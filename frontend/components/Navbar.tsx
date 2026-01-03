import { useState, useEffect } from 'react';
import { useLocale } from '../src/context/LocaleContext';
import { useContent } from '../src/hooks/useContent';
import { useTheme } from '../src/context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const getControlBtnClass = (isScrolled: boolean, theme: string) => {
  const baseClasses = 'inline-flex items-center justify-center h-10 w-10 rounded-xl border text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2';
  let colorClasses = '';

  if (theme === 'light' && isScrolled) {
    colorClasses = 'bg-primary-900 text-white border-primary hover:bg-primary active:opacity-80';
  } else if (isScrolled) {
    colorClasses = 'bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100 active:bg-primary-200';
  } else {
    colorClasses = 'bg-white/10 text-gray-700 dark:text-gray-200 border-white/20 hover:bg-white/20 active:bg-white/30 backdrop-blur-sm';
  }

  return `${baseClasses} ${colorClasses}`;
};

export default function Navbar() {
  const { locale, setLocale } = useLocale();
  const { nav } = useContent();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLocale = () => {
    setLocale(locale === 'es' ? 'en' : 'es');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed navbar height
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-primary-200/10 ${
      isScrolled
        ? 'bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="group transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg p-1"
              aria-label="Ir al inicio"
            >
              <img
                src="/logo.svg"
                alt="Logo"
                className={`w-12 h-8 transition-all duration-300 group-hover:drop-shadow-lg object-contain ${theme === 'light' ? 'brightness-0' : ''}`}
              />
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {[
              { id: 'projects', label: nav.projects },
              { id: 'skills', label: nav.skills },
              { id: 'experience', label: nav.experience },
              { id: 'about', label: nav.about },
              { id: 'education', label: nav.education },
              { id: 'contact', label: nav.contact },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary-600 hover:scale-105 hover:border-b-2 hover:border-primary-200 ${
                  isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="ml-auto">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLocale}
                data-id="lang-toggle"
                className={getControlBtnClass(isScrolled, theme)}
              >
                {locale.toUpperCase()}
              </button>
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                data-id="theme-toggle"
                className={getControlBtnClass(isScrolled, theme)}
              >
                {theme === 'dark' ? <FiMoon size={18} /> : <FiSun size={18} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                className={`md:hidden ${getControlBtnClass(isScrolled, theme)}`}
              >
                {isMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-primary-200/10 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          <div className="flex flex-col items-center space-y-4 py-4">
            {[
              { id: 'projects', label: nav.projects },
              { id: 'skills', label: nav.skills },
              { id: 'experience', label: nav.experience },
              { id: 'about', label: nav.about },
              { id: 'education', label: nav.education },
              { id: 'contact', label: nav.contact },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary-600 hover:scale-105 ${
                  isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}