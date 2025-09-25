import { useContent } from '../src/hooks/useContent';

export default function Experience() {
  const { experience, ui } = useContent();

  return (
    <section id="experience" className="section-padding bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto container-padding">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{ui.sections.experience}</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-primary-200 to-primary"></div>

          <div className="space-y-16">
            {experience.map((exp, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} relative`}>
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>

                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className="card">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="mb-2 md:mb-0">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{exp.position}</h3>
                        <h4 className="text-lg text-primary-700 dark:text-primary-300 font-medium">{exp.company}</h4>
                      </div>
                      <span className="text-sm text-primary-600 dark:text-primary-300 font-medium bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}