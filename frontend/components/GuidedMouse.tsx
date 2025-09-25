import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMousePointer } from 'react-icons/fi';

interface GuidedMouseProps {
  enabled?: boolean;
}

export default function GuidedMouse({ enabled = true }: GuidedMouseProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Check if user has seen onboarding
  const hasSeenOnboarding = typeof window !== 'undefined'
    ? localStorage.getItem('onboardingSeen') === 'true'
    : false;

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: true)').matches
    : false;

  // Start tour on mount (simplified)
  useEffect(() => {
    if (enabled && !hasSeenOnboarding && !prefersReducedMotion) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [enabled, hasSeenOnboarding, prefersReducedMotion]);

  if (!enabled || hasSeenOnboarding || prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed bottom-8 right-8 z-50 pointer-events-none"
      aria-hidden="true"
    >
      <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-lg border border-gray-200">
        <FiMousePointer className="w-5 h-5 text-primary-900" />
      </div>
    </motion.div>
  );
}

// API methods (simplified)
GuidedMouse.resetTour = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('onboardingSeen');
    window.location.reload();
  }
};