import { FiArrowUp, FiGithub, FiHeart, FiLinkedin, FiMail } from 'react-icons/fi';
import { useContent } from '../src/hooks/useContent';
import { useScrollToSection } from '../src/hooks/useScrollToSection';

const iconLinkClass =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-fg';

export default function Footer() {
  const { personal, ui } = useContent();
  const scrollToSection = useScrollToSection();

  return (
    <footer className="relative border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 container-padding md:flex-row">
        <p className="flex items-center text-sm text-muted">
          {ui.footer.madeWith} <FiHeart className="mx-2 text-accent-fg" size={14} /> {ui.footer.by} {personal.name}
        </p>

        <div className="flex items-center gap-2">
          <a href={`mailto:${personal.email}`} aria-label={ui.contact.email} className={iconLinkClass}>
            <FiMail size={16} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ui.contact.linkedin}
            className={iconLinkClass}
          >
            <FiLinkedin size={16} />
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ui.contact.github}
            className={iconLinkClass}
          >
            <FiGithub size={16} />
          </a>
          <button onClick={() => scrollToSection('hero')} aria-label={ui.footer.backToTop} className={iconLinkClass}>
            <FiArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
