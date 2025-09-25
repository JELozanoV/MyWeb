import { useContent } from '../src/hooks/useContent';
import TechGrid from './TechGrid';

export default function Skills() {
  const { skills, ui } = useContent();

  return (
    <section id="skills" className="section-padding subtle-gradient dark:bg-gray-950">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{ui.sections.skills}</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="card">
            <TechGrid title="Frontend" techs={skills.frontend} />
          </div>
          <div className="card">
            <TechGrid title="Backend" techs={skills.backend} />
          </div>
          <div className="card">
            <TechGrid title="Base de Datos" techs={skills.database} />
          </div>
          <div className="card">
            <TechGrid title="Herramientas" techs={skills.tools} />
          </div>
        </div>
      </div>
    </section>
  );
}