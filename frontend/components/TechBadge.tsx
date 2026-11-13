import { motion } from 'motion/react';
import { TechIcon, hasTechIcon, getTechBrandColor } from '../src/utils/getTechIcon';
import { useTheme } from '../src/context/ThemeContext';

interface TechBadgeProps {
  name: string;
  level: string;
  iconKey: string;
}

const WHITES = ['#ffffff', 'white'];
const BLACKS = ['#181717', '#000000', '#1a1a1a', 'black'];

/** Insignia de tecnología: ícono con su color de marca + nombre siempre visible. */
export default function TechBadge({ name, level, iconKey }: TechBadgeProps) {
  const { theme } = useTheme();
  const rawBrandColor = getTechBrandColor(iconKey).toLowerCase();
  // Las marcas blancas o negras se invierten según el tema para que no desaparezcan
  const brandColor =
    WHITES.includes(rawBrandColor) && theme === 'light' ? '#1a1a1a' :
    BLACKS.includes(rawBrandColor) && theme === 'dark' ? '#ffffff' :
    rawBrandColor;
  const isDisabled = level !== 'production';

  return (
    <motion.span
      className={`tech-badge ${isDisabled ? 'opacity-50' : ''}`}
      style={{ '--brand': brandColor } as React.CSSProperties}
      whileHover={{ y: -3, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
    >
      {hasTechIcon(iconKey) && (
        <TechIcon iconKey={iconKey} size={18} className="shrink-0" style={{ color: brandColor }} />
      )}
      {name}
    </motion.span>
  );
}
