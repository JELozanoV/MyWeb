import Image from 'next/image';
import { FiArrowRight, FiArrowDown, FiLinkedin } from 'react-icons/fi';
import { useContent } from '../src/hooks/useContent';
import { useScrollToSection } from '../src/hooks/useScrollToSection';
import HeroLogo from './HeroLogo';
import Magnetic from './ui/Magnetic';
import SplitWords from './ui/SplitWords';

export default function Hero() {
  const { personal, hero } = useContent();
  const scrollToSection = useScrollToSection();

  return (
    <section id="hero" className="relative flex items-center overflow-hidden lg:min-h-[min(100svh,960px)]">
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-6 container-padding pb-16 pt-24 lg:gap-10 lg:pb-20 lg:pt-28 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative z-10">
          {/* Disponibilidad */}
          <div className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-sm text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {hero.badge}
          </div>

          {/* Quién soy: lo primero que busca un reclutador */}
          <div className="animate-fade-up mt-6 flex items-center gap-3 [animation-delay:80ms]">
            <Image
              src={personal.avatarUrl}
              alt=""
              width={44}
              height={44}
              preload
              className="h-11 w-11 rounded-full border border-line object-cover"
            />
            <p className="text-sm leading-tight text-muted">
              <span className="block font-display text-base font-semibold text-fg">{personal.name}</span>
              {personal.title}
            </p>
          </div>

          {/* key: al cambiar de idioma el titular vuelve a animarse */}
          <h1
            key={hero.titleStart}
            // El tamaño también depende del alto (vh) para que los botones no queden bajo el pliegue en portátiles
            className="mt-5 text-[clamp(2.25rem,min(6.4vw,9.5vh),5.25rem)] font-semibold leading-[1.03] tracking-tight"
          >
            <SplitWords text={hero.titleStart} immediate delay={0.1} />{' '}
            <SplitWords text={hero.titleHighlight} wordClassName="text-gradient" immediate delay={0.3} />{' '}
            <SplitWords text={hero.titleEnd} immediate delay={0.5} />
          </h1>

          <p className="animate-fade-up mt-5 max-w-xl text-base text-muted sm:text-lg md:text-xl [animation-delay:500ms]">
            {hero.description}
          </p>

          <div className="animate-fade-up mt-8 flex flex-wrap items-center gap-3 [animation-delay:650ms]">
            <Magnetic>
              <button onClick={() => scrollToSection('projects')} className="btn-primary px-7 py-3.5 text-base">
                {hero.ctaPrimary}
                <FiArrowRight size={18} />
              </button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <button onClick={() => scrollToSection('contact')} className="btn-secondary px-7 py-3.5 text-base">
                {hero.ctaContact}
              </button>
            </Magnetic>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost py-3.5 text-base">
              <FiLinkedin size={18} />
              {hero.ctaLinkedin}
            </a>
          </div>
        </div>

        {/* Logo animado: arriba del texto en móvil/tablet, a la derecha en escritorio */}
        <div
          className="order-first mx-auto -mb-6 w-44 sm:w-56 md:w-64 lg:order-none lg:mb-0 lg:w-full lg:max-w-[540px] lg:justify-self-end"
        >
          <HeroLogo />
        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        aria-hidden
        className="animate-fade-up absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted lg:flex [animation-delay:1100ms]"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.25em]">{hero.scroll}</span>
        <FiArrowDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
