import { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { useContent } from '../src/hooks/useContent';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

export default function Experience() {
  const { experience, ui } = useContent();
  const timelineRef = useRef<HTMLDivElement>(null);
  // La línea de tiempo se "dibuja" a medida que la sección pasa por la pantalla
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 55%'],
  });

  return (
    <section id="experience" className="section-padding">
      <div className="mx-auto max-w-6xl container-padding lg:grid lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
        <SectionHeading eyebrow={ui.eyebrows.experience} title={ui.sections.experience} />

        <div ref={timelineRef} className="relative pl-8 md:pl-12">
          {/* Riel y progreso */}
          <div aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-[11px]" />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top md:left-[11px]"
            style={{
              scaleY: scrollYProgress,
              backgroundImage: 'linear-gradient(180deg, var(--grad-from), var(--grad-to))',
            }}
          />

          <ol className="space-y-10">
            {experience.map((exp, index) => (
              <li key={index} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-8 top-8 h-[15px] w-[15px] rounded-full border-2 border-accent bg-bg shadow-[0_0_0_4px_rgb(var(--accent)/0.18)] md:-left-12 md:h-[23px] md:w-[23px]"
                />
                <Reveal delay={index * 0.05}>
                  <div className="card">
                    <div className="relative flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold md:text-2xl">{exp.position}</h3>
                        <p className="mt-1 font-medium text-accent-fg">{exp.company}</p>
                      </div>
                      <span className="chip shrink-0 self-start font-mono">
                        {exp.startDate === exp.endDate ? exp.startDate : `${exp.startDate} - ${exp.endDate}`}
                      </span>
                    </div>
                    <p className="relative mt-4">{exp.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
