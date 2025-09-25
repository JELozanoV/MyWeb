import { useState, useEffect } from 'react';
import { useLocale } from '../src/context/LocaleContext';
import { useContent } from '../src/hooks/useContent';
import { useTheme } from '../src/context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Navbar() {
  const { locale, setLocale } = useLocale();
  const { nav, personal } = useContent();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  // Generar iniciales del nombre
  const initials = personal.name.split(' ').map(n => n[0]).join('').toUpperCase();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-100 dark:border-gray-800'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'
              }`}
            >
              {initials}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {[
              { id: 'about', label: nav.about },
              { id: 'skills', label: nav.skills },
              { id: 'projects', label: nav.projects },
              { id: 'experience', label: nav.experience },
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

          <div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleLocale}
                data-id="lang-toggle"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled
                    ? 'bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200'
                    : 'bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-white/20 backdrop-blur-sm border border-white/20'
                }`}
              >
                {locale.toUpperCase()}
              </button>
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                data-id="theme-toggle"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center ${
                  isScrolled
                    ? 'bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200'
                    : 'bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-white/20 backdrop-blur-sm border border-white/20'
                }`}
              >
                {theme === 'dark' ? <FiMoon size={18} /> : <FiSun size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}