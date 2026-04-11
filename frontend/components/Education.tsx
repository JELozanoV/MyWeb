import { useContent } from '../src/hooks/useContent';

export default function Education() {
  const { education, certifications, ui } = useContent();

  return (
    <section id="education" className="section-padding">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{ui.sections.education}</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
              <div className="w-3 h-8 bg-accent rounded-full mr-4"></div>
              {ui.education.certifications}
            </h3>
            <div className="space-y-8">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-4">
                  {'logo' in cert && cert.logo && (
                    <a
                      href={'logoUrl' in cert ? (cert as any).logoUrl : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0"
                    >
                      <img
                        src={cert.logo}
                        alt={cert.issuer}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-contain bg-white border border-gray-200 dark:border-gray-600 p-1.5 transition-all duration-200 hover:scale-110 hover:shadow-md cursor-pointer"
                      />
                    </a>
                  )}
                  <div className="border-l-4 border-accent pl-4 min-w-0">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{cert.name}</h4>
                    <p className="text-brown dark:text-accent font-medium mb-1">{cert.issuer}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{cert.year}</p>
                    {cert.url && cert.url !== '' && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-200 font-medium transition-colors duration-200 hover:underline"
                      >
                        {ui.education.viewCertificate}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
              <div className="w-3 h-8 bg-primary rounded-full mr-4"></div>
              {ui.education.education}
            </h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="flex items-start gap-4">
                  {'logo' in edu && (edu as any).logo && (
                    <a
                      href={'logoUrl' in edu ? (edu as any).logoUrl : '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0"
                    >
                      <img
                        src={(edu as any).logo}
                        alt={edu.institution}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-contain bg-white border border-gray-200 dark:border-gray-600 p-1.5 transition-all duration-200 hover:scale-110 hover:shadow-md cursor-pointer"
                      />
                    </a>
                  )}
                  <div className="border-l-4 border-primary-200 dark:border-primary-700 pl-4 min-w-0">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{edu.degree}</h4>
                    <p className="text-primary-700 dark:text-primary-300 font-medium mb-1">{edu.institution}</p>
                    {'status' in edu && edu.status === 'inProgress' && (
                      <span className="inline-block text-xs font-medium text-primary-600 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full mt-2">
                        {ui.education.inProgress}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}