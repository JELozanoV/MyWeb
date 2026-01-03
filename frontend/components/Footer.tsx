import { useContent } from '../src/hooks/useContent';
import { FiMail, FiLinkedin, FiGithub, FiHeart } from 'react-icons/fi';

export default function Footer() {
  const { personal, ui } = useContent();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center">
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