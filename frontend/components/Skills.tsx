import { useContent } from '../src/hooks/useContent';
import TechGrid from './TechGrid';
import SpotlightCard from './SpotlightCard';

export default function Skills() {
  const { skills, ui } = useContent();

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{ui.sections.skills}</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <SpotlightCard>
             <TechGrid title={skills.frontendTitle} techs={skills.frontend} />
           </SpotlightCard>
           <SpotlightCard>
             <TechGrid title={skills.backendTitle} techs={skills.backend} />
           </SpotlightCard>
           <SpotlightCard>
             <TechGrid title={skills.databaseTitle} techs={skills.database} />
           </SpotlightCard>
           <SpotlightCard>
             <TechGrid title={skills.toolsTitle} techs={skills.tools} />
           </SpotlightCard>
         </div>
      </div>
    </section>
  );
}