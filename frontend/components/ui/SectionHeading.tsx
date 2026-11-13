import Reveal from './Reveal';
import SplitWords from './SplitWords';

interface SectionHeadingProps {
  /** Etiqueta corta sobre el título */
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

/** Encabezado común de sección: etiqueta mono + título revelado por palabras. */
export default function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={`mb-8 md:mb-12 ${centered ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'}`}>
      <Reveal y={12}>
        <p className={`eyebrow flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-accent-fg/60" />
          {eyebrow}
        </p>
      </Reveal>
      <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold">
        {/* key: al cambiar de idioma el título vuelve a animarse */}
        <SplitWords key={title} text={title} />
      </h2>
      {description && (
        <Reveal delay={0.15}>
          <p className="mt-4 text-base md:text-lg text-muted whitespace-pre-line">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
