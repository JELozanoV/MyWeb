import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import { useContent } from '../src/hooks/useContent';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

interface LogoProps {
  src: string;
  alt: string;
  href?: string;
  /** true: el logo cubre todo el recuadro; false: va contenido sobre fondo blanco */
  fill?: boolean;
}

function Logo({ src, alt, href, fill }: LogoProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={56}
      height={56}
      className={`h-12 w-12 rounded-xl border border-line md:h-14 md:w-14 ${
        fill ? 'object-cover' : 'bg-white object-contain p-1.5'
      }`}
    />
  );

  if (!href) return <div className="shrink-0">{image}</div>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 transition-transform duration-200 hover:scale-110"
    >
      {image}
    </a>
  );
}

export default function Education() {
  const { education, certifications, ui } = useContent();

  return (
    <section id="education" className="section-padding">
      <div className="mx-auto max-w-6xl container-padding">
        <SectionHeading eyebrow={ui.eyebrows.education} title={ui.sections.education} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full">
              <h3 className="relative mb-8 text-xl font-semibold">{ui.education.certifications}</h3>
              <ul className="relative space-y-7">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-start gap-4">
                    {cert.logo && <Logo src={cert.logo} alt={cert.issuer} href={cert.logoUrl} fill={cert.logoFill} />}
                    <div className="min-w-0">
                      <h4 className="text-lg font-medium">{cert.name}</h4>
                      <p className="font-medium text-accent-fg">{cert.issuer}</p>
                      <p className="mt-1 font-mono text-xs text-muted">{cert.year}</p>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent-fg hover:underline"
                        >
                          {ui.education.viewCertificate}
                          <FiArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card h-full">
              <h3 className="relative mb-8 text-xl font-semibold">{ui.education.education}</h3>
              <ul className="relative space-y-7">
                {education.map((edu, index) => (
                  <li key={index} className="flex items-start gap-4">
                    {edu.logo && <Logo src={edu.logo} alt={edu.institution} href={edu.logoUrl} fill={edu.logoFill} />}
                    <div className="min-w-0">
                      <h4 className="text-lg font-medium">{edu.degree}</h4>
                      <p className="font-medium text-accent-fg">{edu.institution}</p>
                      {edu.status === 'inProgress' && (
                        <span className="chip mt-3 border-accent/40 text-accent-fg">{ui.education.inProgress}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
