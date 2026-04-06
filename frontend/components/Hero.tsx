import { useContent } from '../src/hooks/useContent';
import { useTheme } from '../src/context/ThemeContext';

export default function Hero() {
  const { personal, hero, nav } = useContent();
  const { theme } = useTheme();

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 lg:pt-0 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center hero-grid">
        {/* Avatar y tarjeta de vidrio */}
        <div className="order-1 flex justify-center lg:justify-start">
          <div className="glass rounded-3xl p-6 lg:p-8 flex items-center gap-6 lg:gap-8">
            <div className="relative w-24 h-24 lg:w-32 lg:h-32 shrink-0 lg:-translate-y-1.5">
              <img
                src={personal.avatarUrlLight || '/avatar.svg'}
                alt={`${personal.name} - light mode`}
                className={`rounded-2xl shadow-lg absolute inset-0 transition-opacity duration-500 ease-in-out object-center object-cover ${
                  theme === 'light' ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <img
                src={personal.avatarUrlDark || personal.avatarUrlLight || '/avatar.svg'}
                alt={`${personal.name} - dark mode`}
                className={`rounded-2xl shadow-lg absolute inset-0 transition-opacity duration-500 ease-in-out object-center object-cover ${
                  theme === 'dark' ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
            <div className="text-center lg:text-left flex flex-col justify-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">{personal.name}</h1>
              <h2 className="text-lg md:text-2xl text-primary-700 mt-2 font-medium">{personal.title}</h2>
            </div>
          </div>
        </div>

        {/* Texto de presentación */}
        <div className="order-2 text-center md:text-left max-w-lg md:max-w-none mx-auto md:mx-0">
          <div className="md:hidden bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-6 mb-6">
            <div className="mb-6">
              <p className="text-lg md:text-xl text-primary-600 dark:text-primary-300 font-medium mb-2">
                {hero.greeting}
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {hero.subtitle}
              </h2>
            </div>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-800 dark:text-gray-200 mb-10 leading-relaxed">
              {hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button onClick={scrollToProjects} className="btn-primary">
                {hero.ctaPrimary}
              </button>
              <a href={personal.resumeUrl} download className="hidden btn-secondary">
                {hero.ctaSecondary}
              </a>
            </div>
          </div>
          <div className="hidden md:block bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
            <div className="mb-6">
              <p className="text-lg md:text-xl text-primary-600 dark:text-primary-300 font-medium mb-2">
                {hero.greeting}
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {hero.subtitle}
              </h2>
            </div>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed max-w-2xl">
              {hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 md:justify-start justify-center">
              <button onClick={scrollToProjects} className="btn-primary">
                {hero.ctaPrimary}
              </button>
              <a href={personal.resumeUrl} download className="hidden btn-secondary">
                {hero.ctaSecondary}
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}