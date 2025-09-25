import { useContent } from '../src/hooks/useContent';
import { useTheme } from '../src/context/ThemeContext';

export default function Hero() {
  const { personal, about, nav } = useContent();
  const { theme } = useTheme();

  console.log('Current theme:', theme);
  console.log('Avatar URLs:', {
    light: personal.avatarUrlLight,
    dark: personal.avatarUrlDark
  });

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center gradient-bg relative overflow-hidden">
      {/* Blobs animados de fondo */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-16 left-8 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -top-8 right-24 w-80 h-80 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-8 left-1/3 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Avatar y tarjeta de vidrio */}
        <div className="order-2 md:order-1 flex justify-center md:justify-start">
          <div className="glass rounded-3xl p-6 md:p-8 flex items-center gap-6 md:gap-8">
            <div className="relative">
              <img
                src={personal.avatarUrlLight || '/avatar.svg'}
                alt={`${personal.name} - light mode`}
                className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-lg absolute inset-0 transition-opacity duration-10000
                  ease-in-out ${
                  theme === 'light' ? 'opacity-100' : 'opacity-0'
                }`}
                onError={(e) => console.log('Light avatar failed to load:', e)}
                onLoad={() => console.log('Light avatar loaded successfully')}
              />
              <img
                src={personal.avatarUrlDark || personal.avatarUrlLight || '/avatar.svg'}
                alt={`${personal.name} - dark mode`}
                className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-lg transition-opacity duration-1000 ease-in-out ${
                  theme === 'dark' ? 'opacity-100' : 'opacity-0'
                }`}
                onError={(e) => console.log('Dark avatar failed to load:', e)}
                onLoad={() => console.log('Dark avatar loaded successfully')}
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">{personal.name}</h1>
              <h2 className="text-lg md:text-2xl text-primary-700 mt-2 font-medium">{personal.title}</h2>
            </div>
          </div>
        </div>

        {/* Texto de presentación */}
        <div className="order-1 md:order-2 text-center md:text-left">
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-10 leading-relaxed max-w-2xl">
            {about.summary}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 md:justify-start justify-center">
            <button onClick={scrollToProjects} className="btn-primary">
              {nav.viewProjects}
            </button>
            <a href={personal.resumeUrl} download className="btn-secondary">
              {nav.downloadCV}
            </a>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-12 left-1/2 md:left-auto md:right-8 transform -translate-x-1/2 md:translate-x-0 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-400 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}