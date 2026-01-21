import { useContent } from '../src/hooks/useContent';
import ContactForm from './ContactForm';
import ContactLinkCard from './ContactLinkCard';
import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';

export default function Contact() {
  const { personal, ui } = useContent();

  return (
    <section id="contact" className="section-padding text-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full mix-blend-overlay animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full mix-blend-overlay animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto container-padding">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{ui.sections.contact}</h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-semibold mb-8 dark:text-white text-primary-900">{ui.contact.getInTouch}</h3>
            <p className="dark:text-primary-100 text-brown/80 mb-12 leading-relaxed text-lg whitespace-pre-line">
              {ui.contact.description}
            </p>

            <div className="space-y-8">
              <ContactLinkCard
                icon={<FiMail className="dark:text-white text-primary-900" size={24} />}
                title={ui.contact.email}
                subtitle={personal.email}
                href={`mailto:${personal.email}`}
              />

              <ContactLinkCard
                icon={<FiLinkedin className="dark:text-white text-primary-900" size={24} />}
                title={ui.contact.linkedin}
                subtitle={ui.contact.viewProfile}
                href={personal.linkedin}
                target="_blank"
              />

              <ContactLinkCard
                icon={<FiGithub className="dark:text-white text-primary-900" size={24} />}
                title={ui.contact.github}
                subtitle={ui.contact.viewRepos}
                href={personal.github}
                target="_blank"
              />
            </div>
          </div>

          <div>
            <div className="dark:bg-white/10 bg-white border border-primary-900/10 dark:border-white/10 shadow-sm dark:shadow-none backdrop-blur-sm rounded-3xl p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}