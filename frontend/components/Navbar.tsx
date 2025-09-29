import { useState, useEffect } from 'react';
import { useLocale } from '../src/context/LocaleContext';
import { useContent } from '../src/hooks/useContent';
import { useTheme } from '../src/context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function Navbar() {
  const { locale, setLocale } = useLocale();
  const { nav } = useContent();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);


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
              className="group transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg p-1"
              aria-label="Ir al inicio"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 40"
                aria-labelledby="jl-logo-title"
                className={`w-12 h-8 transition-all duration-300 group-hover:drop-shadow-lg ${
                  isScrolled
                    ? 'text-primary-700 dark:text-primary-300'
                    : 'text-gray-800 dark:text-white'
                }`}
              >
                <title id="jl-logo-title">JL - Logo Minimalista</title>
                <desc>Logo minimalista con iniciales JL en diseño geométrico moderno</desc>
                
                <defs>
                  {/* Gradiente para modo claro */}
                  <linearGradient id="logoGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5D7CA6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#73A2BF" stopOpacity="0.9" />
                  </linearGradient>
                  
                  {/* Gradiente para modo oscuro */}
                  <linearGradient id="logoGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#e5e7eb" stopOpacity="0.9" />
                  </linearGradient>
                  
                  {/* Gradiente hover */}
                  <linearGradient id="logoGradientHover" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F2CAA7" stopOpacity="1" />
                    <stop offset="100%" stopColor="#5D7CA6" stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* Letra J - Diseño minimalista con curva */}
                <g className="transition-all duration-300 group-hover:fill-accent">
                  {/* Punto decorativo de la J */}
                  <circle
                    cx="8"
                    cy="8"
                    r="3"
                    fill={isScrolled ? "url(#logoGradientLight)" : "currentColor"}
                    className="dark:fill-white group-hover:fill-accent transition-all duration-300"
                  />
                  
                  {/* Cuerpo principal de la J */}
                  <path
                    d="M8 16 L8 28 Q8 34 14 34 L20 34 Q26 34 26 28 L26 24 L20 24 L20 28 Q20 30 18 30 L14 30 Q12 30 12 28 L12 16 Z"
                    fill={isScrolled ? "url(#logoGradientLight)" : "currentColor"}
                    className="dark:fill-white group-hover:fill-accent transition-all duration-300"
                  />
                </g>

                {/* Letra L - Diseño angular minimalista */}
                <g className="transition-all duration-300 group-hover:fill-accent">
                  {/* Trazo vertical de L */}
                  <rect
                    x="45"
                    y="8"
                    width="4"
                    height="22"
                    fill={isScrolled ? "url(#logoGradientLight)" : "currentColor"}
                    className="dark:fill-white group-hover:fill-accent transition-all duration-300"
                  />
                  
                  {/* Trazo horizontal de L */}
                  <rect
                    x="45"
                    y="26"
                    width="20"
                    height="4"
                    fill={isScrolled ? "url(#logoGradientLight)" : "currentColor"}
                    className="dark:fill-white group-hover:fill-accent transition-all duration-300"
                  />
                  
                  {/* Elemento decorativo angular */}
                  <polygon
                    points="68,26 72,22 72,30"
                    fill={isScrolled ? "url(#logoGradientLight)" : "currentColor"}
                    className="dark:fill-white group-hover:fill-accent transition-all duration-300"
                  />
                </g>

                {/* Elementos decorativos minimalistas */}
                <g fill="currentColor" opacity="0.6" className="group-hover:opacity-80 transition-opacity duration-300">
                  {/* Puntos minimalistas */}
                  <rect x="78" y="18" width="2" height="2" className="group-hover:fill-accent" />
                  <rect x="85" y="14" width="2" height="2" className="group-hover:fill-accent" />
                </g>
              </svg>
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