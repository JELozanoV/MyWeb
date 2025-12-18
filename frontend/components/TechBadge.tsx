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
      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium border border-primary-200/20 transition-all duration-200 ${
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