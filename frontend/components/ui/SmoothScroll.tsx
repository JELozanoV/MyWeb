import { ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { useMediaQuery } from '../../src/hooks/useMediaQuery';

/**
 * Scroll suave (Lenis) + configuración global de Motion.
 * Con "reducir movimiento" activo no se monta Lenis y Motion omite las
 * animaciones de transformación (`reducedMotion="user"`).
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <MotionConfig reducedMotion="user">
      {!prefersReducedMotion && <ReactLenis root options={{ lerp: 0.12 }} />}
      {children}
    </MotionConfig>
  );
}
