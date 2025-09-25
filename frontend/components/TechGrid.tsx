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
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {techs.map((tech, index) => (
          <TechBadge key={index} name={tech.name} level={tech.level} iconKey={tech.iconKey} />
        ))}
      </div>
    </div>
  );
}