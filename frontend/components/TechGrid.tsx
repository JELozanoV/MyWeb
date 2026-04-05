import TechBadge from './TechBadge';

interface Tech {
  name: string;
  level: string;
  iconKey: string;
}

interface TechGridProps {
  title: string;
  techs: Tech[];
}

export default function TechGrid({ title, techs }: TechGridProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">{title}</h3>
      <div className="grid grid-cols-3 gap-3 justify-items-center">
        {techs.map((tech, index) => (
          <TechBadge key={index} name={tech.name} level={tech.level} iconKey={tech.iconKey} />
        ))}
      </div>
    </div>
  );
}