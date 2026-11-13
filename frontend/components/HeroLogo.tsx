import { useEffect, useId } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useMediaQuery } from '../src/hooks/useMediaQuery';

// Trazos del logo JL (mismos de public/logo.svg). El viewBox de los <svg> va
// recortado al contorno real de las letras para que el logo llene su espacio.
const LOGO_TRANSFORM = 'skewX(-10) translate(20, 10)';
const PATH_J = 'M65 15 L65 75 Q65 95 40 95 L15 95 L20 75 L35 75 Q45 75 45 68 L45 15 L65 15 Z';
const PATH_L = 'M75 15 L75 95 L135 95 L140 75 L95 75 L95 15 L75 15 Z';
// Facetas claras que dan el "corte" a cada letra
const FACET_J = 'M45 25 L65 15 L65 25 L45 35 Z';
const FACET_L = 'M120 75 L140 75 L135 85 L115 85 Z';

// Copias del contorno detrás del logo: al inclinarse forman la profundidad
const DEPTH_LAYERS = 7;
const LAYER_GAP = 13; // px entre capas en el eje Z

const svgClass = 'absolute inset-0 m-auto w-[82%] overflow-visible';

/**
 * Pieza visual del hero: el logo JL se dibuja trazo a trazo, se rellena con el
 * degradado de marca y queda flotando con profundidad. Se inclina hacia el
 * cursor y lo rodean dos órbitas. Es SVG + CSS 3D (sin WebGL).
 */
export default function HeroLogo() {
  const gradientId = useId();
  const clipId = useId();
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const canHover = useMediaQuery('(hover: hover)');

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(pointerX, { stiffness: 70, damping: 16 });
  const rotateX = useSpring(pointerY, { stiffness: 70, damping: 16 });

  // Inclinación hacia el cursor (solo con mouse y sin "reducir movimiento")
  useEffect(() => {
    if (prefersReducedMotion || !canHover) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(((event.clientX / window.innerWidth) * 2 - 1) * 22);
      pointerY.set(-((event.clientY / window.innerHeight) * 2 - 1) * 16);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [prefersReducedMotion, canHover, pointerX, pointerY]);

  return (
    <div className="relative aspect-square w-full" style={{ perspective: 1100 }}>
      {/* Halo */}
      <div
        className="absolute inset-[12%] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--accent) / 0.45), transparent)' }}
      />

      <motion.div className="absolute inset-0 [transform-style:preserve-3d]" style={{ rotateX, rotateY }}>
        {/* Órbitas con un punto que las recorre */}
        <div className="absolute inset-[4%] [transform-style:preserve-3d]" style={{ transform: 'rotateX(74deg)' }}>
          <div className="orbit-ring h-full w-full animate-orbit">
            <span className="orbit-dot" />
          </div>
        </div>
        <div
          className="absolute inset-[14%] [transform-style:preserve-3d]"
          style={{ transform: 'rotateX(68deg) rotateY(38deg)' }}
        >
          <div className="orbit-ring h-full w-full animate-orbit [animation-direction:reverse] [animation-duration:16s]">
            <span className="orbit-dot" />
          </div>
        </div>

        {/* Logo flotando */}
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Capas de profundidad */}
          {Array.from({ length: DEPTH_LAYERS }, (_, index) => (
            <motion.svg
              key={index}
              viewBox="8 14 158 102"
              className={svgClass}
              style={{ transform: `translateZ(${-(index + 1) * LAYER_GAP}px)` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 - index * 0.06 }}
              transition={{ duration: 0.6, delay: 1.5 + index * 0.07 }}
            >
              <g
                transform={LOGO_TRANSFORM}
                fill="rgb(var(--accent) / 0.12)"
                stroke="rgb(var(--accent))"
                strokeWidth="1"
                strokeLinejoin="round"
              >
                <path d={PATH_J} />
                <path d={PATH_L} />
              </g>
            </motion.svg>
          ))}

          {/* Cara frontal: se dibuja el contorno y luego aparece el relleno */}
          <svg viewBox="8 14 158 102" className={svgClass} style={{ transform: 'translateZ(28px)' }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" style={{ stopColor: 'var(--grad-from)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--grad-to)' }} />
              </linearGradient>
              <clipPath id={clipId}>
                <path d={PATH_J} />
                <path d={PATH_L} />
              </clipPath>
            </defs>

            <g transform={LOGO_TRANSFORM}>
              {[PATH_J, PATH_L].map((d, index) => (
                <motion.path
                  key={d}
                  d={d}
                  fill={`url(#${gradientId})`}
                  stroke="var(--grad-from)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={{ pathLength: 1, fillOpacity: 1 }}
                  transition={{
                    pathLength: { duration: 1.4, delay: 0.3 + index * 0.25, ease: 'easeInOut' },
                    fillOpacity: { duration: 0.8, delay: 1.4 + index * 0.2 },
                  }}
                />
              ))}

              {[FACET_J, FACET_L].map((d) => (
                <motion.path
                  key={d}
                  d={d}
                  fill="#fff"
                  initial={{ fillOpacity: 0 }}
                  animate={{ fillOpacity: 0.35 }}
                  transition={{ duration: 0.6, delay: 2 }}
                />
              ))}

              {/* Destello que cruza el logo cada pocos segundos */}
              <g clipPath={`url(#${clipId})`}>
                <motion.rect
                  y="0"
                  width="34"
                  height="120"
                  fill="#fff"
                  fillOpacity="0.45"
                  transform="skewX(-20)"
                  initial={{ x: -60 }}
                  animate={{ x: 240 }}
                  transition={{ duration: 1.3, delay: 2.6, repeat: Infinity, repeatDelay: 4.5, ease: 'easeInOut' }}
                />
              </g>
            </g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
