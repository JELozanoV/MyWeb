import { getTechIcon, getTechBrandColor } from '../src/utils/getTechIcon';
import { useTheme } from '../src/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface TechBadgeProps {
  name: string;
  level: string;
  iconKey: string;
}

export default function TechBadge({ name, level, iconKey }: TechBadgeProps) {
  const IconComponent = getTechIcon(iconKey);
  const rawBrandColor = getTechBrandColor(iconKey);
  const { theme } = useTheme();
  const isWhite = ['#FFFFFF', '#ffffff', 'white'].includes(rawBrandColor);
  const brandColor = isWhite && theme === 'light' ? '#1A1A1A' : rawBrandColor;
  const isDisabled = level !== 'production';
  const [activated, setActivated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    setSupportsHover(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setSupportsHover(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const startDeactivationTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActivated(false);
      setIsHovered(false);
    }, 15000);
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const handleActivation = () => {
    if (isDisabled) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setActivated(true);
    if (!supportsHover) {
      setIsHovered(true);
      startDeactivationTimer();
    }
  };

  const isActive = activated;

  const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();

  return (
    <div
      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium border border-primary-200/20 transition-all duration-200 cursor-pointer ${
        isDisabled ? 'opacity-50' : ''
      }`}
      onMouseEnter={supportsHover ? () => { handleActivation(); setIsHovered(true); } : undefined}
      onMouseLeave={supportsHover ? () => { setIsHovered(false); startDeactivationTimer(); } : undefined}
      onClick={!supportsHover ? handleActivation : undefined}
    >
      <motion.div
        className="relative"
        whileHover={supportsHover ? { scale: 1.1 } : undefined}
        whileTap={!supportsHover && !isDisabled ? { scale: 0.96 } : undefined}
        transition={supportsHover ? { type: 'spring', stiffness: 300, damping: 20 } : undefined}
      >
        {IconComponent ? (
          <IconComponent
            size={24}
            className={`transition-all duration-300 ${
              !isActive ? 'grayscale opacity-70' : ''
            } ${isActive ? 'grayscale-0 opacity-100' : ''}`}
            style={isActive ? { color: brandColor, filter: 'drop-shadow(0 0 6px ' + brandColor + '40)' } : undefined}
          />
        ) : (
          <span
            className={`transition-all duration-300 ${
              !isActive ? 'grayscale opacity-70' : ''
            } ${isActive ? 'grayscale-0 opacity-100' : ''}`}
            style={isActive ? { color: brandColor } : undefined}
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
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded-md shadow-lg z-50 whitespace-nowrap"
            >
              {name}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}