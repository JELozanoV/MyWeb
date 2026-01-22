import { getTechIcon } from '../src/utils/getTechIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TechBadgeProps {
  name: string;
  level: string;
  iconKey: string;
}

export default function TechBadge({ name, level, iconKey }: TechBadgeProps) {
  const IconComponent = getTechIcon(iconKey);
  const isDisabled = level !== 'production';
  const [isHovered, setIsHovered] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    setSupportsHover(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setSupportsHover(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();

  return (
    <div
      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium border border-primary-200/20 transition-all duration-200 ${
        isDisabled ? 'opacity-50' : ''
      }`}
    >
      <motion.div
        className="relative"
        onHoverStart={supportsHover ? () => setIsHovered(true) : undefined}
        onHoverEnd={supportsHover ? () => setIsHovered(false) : undefined}
        whileHover={supportsHover ? { scale: 1.1 } : undefined}
        transition={supportsHover ? { type: 'spring', stiffness: 300, damping: 20 } : undefined}
      >
        {IconComponent ? (
          <IconComponent
            size={16}
            className={`transition-all duration-300 ${
              supportsHover ? 'grayscale opacity-70' : ''
            } ${isHovered ? 'grayscale-0 opacity-100' : ''}`}
          />
        ) : (
          <span
            className={`transition-all duration-300 ${
              supportsHover ? 'grayscale opacity-70' : ''
            } ${isHovered ? 'grayscale-0 opacity-100' : ''}`}
          >
            {initials}
          </span>
        )}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded-md shadow-lg z-10"
            >
              {name}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}