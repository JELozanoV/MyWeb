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
              <RevealItem key={service.title}>
                <TiltCard className="h-full" maxTilt={3}>
                  <div className="relative">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent-fg">
                        <Icon size={22} />
                      </span>
                      <span className="font-mono text-sm text-muted">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-2xl font-semibold">{service.title}</h3>
                    <p className="mt-3">{service.description}</p>
                    <ul className="mt-6 space-y-2.5">
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

        <Reveal className="mt-10 flex justify-center" delay={0.1}>
          <Magnetic>
            <button onClick={() => scrollToSection('contact')} className="btn-primary px-7 py-3.5 text-base">
              {services.cta}
              <FiArrowRight size={18} />
            </button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
