import { useContent } from '../src/hooks/useContent';
import { FiMail, FiLinkedin, FiGithub, FiHeart } from 'react-icons/fi';

export default function Footer() {
  const { personal, ui } = useContent();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center">
          <div className="flex justify-center space-x-12 mb-8">
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center justify-center w-14 h-14 bg-gray-800 rounded-2xl hover:bg-primary transition-all duration-300 hover:scale-110 group"
              aria-label="Email"
            >
              <FiMail className="group-hover:text-white transition-colors" size={20} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-gray-800 rounded-2xl hover:bg-primary transition-all duration-300 hover:scale-110 group"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="group-hover:text-white transition-colors" size={20} />
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-gray-800 rounded-2xl hover:bg-primary transition-all duration-300 hover:scale-110 group"
              aria-label="GitHub"
            >
              <FiGithub className="group-hover:text-white transition-colors" size={20} />
            </a>
          </div>

          <p className="text-gray-400 mb-4 flex items-center justify-center">
            {ui.footer.madeWith} <FiHeart className="text-red-500 mx-2" size={16} /> {ui.footer.by} {personal.name}
          </p>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {personal.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}