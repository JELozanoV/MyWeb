import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden gradient-bg">
      {/* Blobs animados de fondo */}
      <div className="absolute inset-0 opacity-40">
        <div
          className={`absolute top-16 left-8 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl ${
            prefersReducedMotion ? '' : 'animate-blob'
          }`}
        ></div>
        <div
          className={`absolute -top-8 right-24 w-80 h-80 bg-accent rounded-full mix-blend-multiply filter blur-3xl ${
            prefersReducedMotion ? '' : 'animate-blob animation-delay-2000'
          }`}
        ></div>
        <div
          className={`absolute bottom-8 left-1/3 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl ${
            prefersReducedMotion ? '' : 'animate-blob animation-delay-4000'
          }`}
        ></div>
      </div>
    </div>
  );
}