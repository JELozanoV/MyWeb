import type { IconType } from 'react-icons';
import { FiArrowRight, FiCheck, FiCpu, FiMonitor, FiServer, FiZap } from 'react-icons/fi';
import { useContent } from '../src/hooks/useContent';
import { useScrollToSection } from '../src/hooks/useScrollToSection';
import type { ServiceIcon } from '../src/content/types';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';
import Magnetic from './ui/Magnetic';
import Reveal, { RevealGroup, RevealItem } from './ui/Reveal';

// Ícono de cada servicio según la clave `icon` del contenido
const serviceIcons: Record<ServiceIcon, IconType> = {
  web: FiMonitor,
  api: FiServer,
  ai: FiCpu,
  speed: FiZap,
};

export default function Services() {
  const { services } = useContent();
  const scrollToSection = useScrollToSection();

  return (
    <section id="services" className="section-padding">
      <div className="mx-auto max-w-6xl container-padding">
        <SectionHeading eyebrow={services.eyebrow} title={services.title} description={services.description} />

        <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-2" stagger={0.1}>
          {services.items.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              // Clave estable entre idiomas: con el título como clave, cambiar de
              // idioma remontaba las tarjetas y perdían su animación de entrada
              <RevealItem key={service.icon}>
                <TiltCard className="h-full" maxTilt={3}>
                  <div className="relative">
                    <div className="mb-4 flex items-center justify-between md:mb-5">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent-fg">
                        <Icon size={22} />
                      </span>
                      <span className="font-mono text-sm text-muted">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-xl font-semibold md:text-2xl">{service.title}</h3>
                    <p className="mt-2">{service.description}</p>
                    <ul className="mt-4 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-fg/90">
                          <FiCheck size={16} className="mt-1 shrink-0 text-accent-fg" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Cierre de la sección: va pegado a la rejilla, como una tarjeta más */}
        <Reveal className="mt-4" delay={0.1}>
          <div className="card flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(110deg, rgb(var(--accent) / 0.2), transparent 60%, rgb(var(--accent-2) / 0.14))',
              }}
            />
            <div className="relative">
              <h3 className="text-xl font-semibold md:text-2xl">{services.ctaTitle}</h3>
              <p className="mt-1.5">{services.ctaText}</p>
            </div>
            <Magnetic className="relative inline-block shrink-0">
              <button onClick={() => scrollToSection('contact')} className="btn-primary px-7 py-3.5 text-base">
                {services.cta}
                <FiArrowRight size={18} />
              </button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
