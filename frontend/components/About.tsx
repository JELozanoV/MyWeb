import { useContent } from '../src/hooks/useContent';

export default function About() {
  const { about, ui } = useContent();

  return (
    <section id="about" className="section-padding bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{ui.sections.about}</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card">
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {about.summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}