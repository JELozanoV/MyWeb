import { useContent } from '../src/hooks/useContent';
import SectionHeading from './ui/SectionHeading';
import Reveal, { RevealGroup, RevealItem } from './ui/Reveal';

export default function About() {
  const { about, ui } = useContent();

  return (
    <section id="about" className="section-padding">
      <div className="mx-auto max-w-6xl container-padding">
        <SectionHeading eyebrow={ui.eyebrows.about} title={ui.sections.about} />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal>
            <p className="text-xl leading-relaxed text-fg/90 md:text-2xl md:leading-relaxed">{about.summary}</p>
          </Reveal>

          <RevealGroup className="grid gap-4" stagger={0.1}>
            {about.highlights.map((item) => (
              <RevealItem key={item.label}>
                <div className="card !p-6">
                  <p className="eyebrow relative">{item.label}</p>
                  <p className="relative mt-2 font-display text-xl font-semibold text-fg">{item.value}</p>
                  <p className="relative mt-1 text-sm">{item.detail}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
