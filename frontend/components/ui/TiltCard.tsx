import { ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Inclinación máxima en grados (0 deja solo el brillo que sigue al cursor) */
  maxTilt?: number;
}

/**
 * Tarjeta con brillo que sigue al cursor (variables `--mouse-x/y` que usa
 * `.card::before`) e inclinación 3D sutil. En pantallas táctiles queda estática.
 */
export default function TiltCard({ children, className = '', maxTilt = 5 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (event.pointerType !== 'mouse' || !card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    rotateY.set((x / rect.width - 0.5) * 2 * maxTilt);
    rotateX.set(-(y / rect.height - 0.5) * 2 * maxTilt);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`card ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
