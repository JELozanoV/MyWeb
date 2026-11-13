import { useContent } from '../src/hooks/useContent';
import ContactForm from './ContactForm';
import ContactLinkCard from './ContactLinkCard';
import SectionHeading from './ui/SectionHeading';
import Reveal, { RevealGroup, RevealItem } from './ui/Reveal';
import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';

export default function Contact() {
  const { personal, ui } = useContent();

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Halo de cierre */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          background: 'radial-gradient(ellipse 60% 70% at 50% 100%, rgb(var(--accent) / 0.22), transparent)',
        }}
      />

      <div className="relative mx-auto max-w-6xl container-padding">
        <SectionHeading eyebrow={ui.eyebrows.contact} title={ui.sections.contact} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <RevealGroup className="space-y-4" stagger={0.1}>
            <RevealItem>
              <p className="mb-4 whitespace-pre-line text-base md:text-lg">{ui.contact.description}</p>
            </RevealItem>
            <RevealItem>
              <ContactLinkCard
                icon={<FiMail size={22} />}
                title={ui.contact.email}
                subtitle={personal.email}
                href={`mailto:${personal.email}`}
              />
            </RevealItem>
            <RevealItem>
              <ContactLinkCard
                icon={<FiLinkedin size={22} />}
                title={ui.contact.linkedin}
                subtitle={ui.contact.viewProfile}
                href={personal.linkedin}
                target="_blank"
              />
            </RevealItem>
            <RevealItem>
              <ContactLinkCard
                icon={<FiGithub size={22} />}
                title={ui.contact.github}
                subtitle={ui.contact.viewRepos}
                href={personal.github}
                target="_blank"
              />
            </RevealItem>
          </RevealGroup>

          <Reveal delay={0.1}>
            <div className="card">
              <h3 className="relative mb-6 text-2xl font-semibold">{ui.contact.getInTouch}</h3>
              <div className="relative">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
