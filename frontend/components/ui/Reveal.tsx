import { ReactNode, RefObject, useRef } from 'react';
import { motion, useInView, type Variants } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Zona en la que un elemento cuenta como "revelado":
 * - Margen inferior positivo: la animación arranca un poco ANTES de que el
 *   elemento entre en pantalla, así nunca se percibe como un hueco vacío.
 * - Margen superior enorme: todo lo que ya quedó por encima de la pantalla
 *   también cuenta. Sin esto, un bloque que se salta sin pasar por la pantalla
 *   (scroll muy rápido, salto desde el menú, recarga a mitad de página) se
 *   quedaba invisible.
 */
const REVEAL_OPTIONS = { once: true, margin: '100000px 0px 15% 0px' } as const;

/**
 * true desde la primera vez que el elemento se acerca a la pantalla.
 *
 * Todas las entradas por scroll pasan por aquí y se aplican con `animate`
 * (no con `whileInView`): `whileInView` dejaba bloques invisibles cuando sus
 * hijos se montaban después (cambio de idioma) y no propaga el estado a los
 * hijos con `variants`.
 */
export function useRevealed(ref: RefObject<Element | null>): boolean {
  return useInView(ref, REVEAL_OPTIONS);
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Desplazamiento vertical inicial en px */
  y?: number;
}

/** Entrada suave (fade + subida) la primera vez que el elemento se acerca a la pantalla. */
export default function Reveal({ children, className, delay = 0, y = 20 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRevealed(ref);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /** Segundos entre la entrada de cada hijo */
  stagger?: number;
}

/** Contenedor que hace entrar a sus `RevealItem` de forma escalonada. */
export function RevealGroup({ children, className, stagger = 0.06 }: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRevealed(ref);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={groupVariants}
      custom={stagger}
      initial="hidden"
      animate={revealed ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
