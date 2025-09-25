import { getTechIcon } from '../src/utils/getTechIcon';

interface TechBadgeProps {
  name: string;
  level: string;
  iconKey: string;
}

export default function TechBadge({ name, level, iconKey }: TechBadgeProps) {
  const IconComponent = getTechIcon(iconKey);
  const isDisabled = level !== 'production';

  const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();

  return (
    <div
      className={`inline-flex items-center justify-center w-8 h-8 rounded bg-gray-100 text-gray-700 text-xs font-medium ${
        isDisabled ? 'opacity-50' : ''
      }`}
      title={name}
    >
      {IconComponent ? (
        <IconComponent size={16} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}