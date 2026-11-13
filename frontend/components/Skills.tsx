import { useContent } from '../src/hooks/useContent';
import { TechIcon } from '../src/utils/getTechIcon';
import TechBadge from './TechBadge';
import SectionHeading from './ui/SectionHeading';
import TiltCard from './ui/TiltCard';
import Marquee from './ui/Marquee';
import { RevealGroup, RevealItem } from './ui/Reveal';

interface Tech {
  name: string;
  level: string;
  iconKey: string;
}

interface BentoCellProps {
  title: string;
  techs: Tech[];
  description?: string;
  /** Celda destacada con el degradado de marca */
  featured?: boolean;
  /** Clases de tamaño dentro de la rejilla (col-span) */
  className: string;
}

function BentoCell({ title, techs, description, featured = false, className }: BentoCellProps) {
  return (
    <RevealItem className={className}>
      <TiltCard className="h-full">
        {featured && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, rgb(var(--accent) / 0.22), transparent 55%, rgb(var(--accent-2) / 0.16))',
            }}
          />
        )}
        <div className="relative">
          <h3 className="mb-5 text-xl font-semibold">{title}</h3>
          {description && <p className="mb-5 text-sm">{description}</p>}
          <div className="flex flex-wrap gap-2">
            {techs.map((tech) => (
              <TechBadge key={tech.name} name={tech.name} level={tech.level} iconKey={tech.iconKey} />
            ))}
          </div>
        </div>
      </TiltCard>
    </RevealItem>
  );
}

export default function Skills() {
  const { skills, ui } = useContent();

  // Logos de la cinta: una entrada por tecnología (sin repetir íconos).
  // Van primero las herramientas para que gane su nombre corto ("ChatGPT" y no "API ChatGPT").
  const marqueeTechs = [...skills.frontend, ...skills.backend, ...skills.database, ...skills.tools, ...skills.ai]
    .filter((tech, index, all) => all.findIndex((other) => other.iconKey === tech.iconKey) === index);

  const renderMarqueeRow = (techs: Tech[]) =>
    techs.map((tech) => (
      <span key={tech.iconKey} className="mx-7 flex items-center gap-3 text-muted">
        <TechIcon iconKey={tech.iconKey} size={24} />
        <span className="font-display text-lg font-medium">{tech.name}</span>
      </span>
    ));

  return (
    <section id="skills" className="section-padding">
      <div className="mx-auto max-w-6xl container-padding">
        <SectionHeading eyebrow={ui.eyebrows.skills} title={ui.sections.skills} />

        <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          <BentoCell title={skills.frontendTitle} techs={skills.frontend} className="lg:col-span-2" />
          <BentoCell title={skills.toolsTitle} techs={skills.tools} className="lg:col-span-2" />
          <BentoCell
            title={skills.aiTitle}
            techs={skills.ai}
            description={skills.aiDescription}
            featured
            className="md:col-span-2 lg:col-span-2"
          />
          <BentoCell title={skills.backendTitle} techs={skills.backend} className="lg:col-span-3" />
          <BentoCell title={skills.databaseTitle} techs={skills.database} className="lg:col-span-3" />
        </RevealGroup>
      </div>

      {/* Cinta de logos a todo el ancho, dos filas en sentidos opuestos */}
      <div className="mt-10 space-y-5 md:mt-14">
        <Marquee duration={45}>{renderMarqueeRow(marqueeTechs)}</Marquee>
        <Marquee duration={55} reverse>
          {renderMarqueeRow([...marqueeTechs].reverse())}
        </Marquee>
      </div>
    </section>
  );
}
