import { ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: '0px 0px -80px 0px' } as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Desplazamiento vertical inicial en px */
  y?: number;
}

/** Entrada suave (fade + subida) la primera vez que el elemento entra en pantalla. */
export default function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, delay, ease: EASE }}
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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  /** Segundos entre la entrada de cada hijo */
  stagger?: number;
}

/** Contenedor que hace entrar a sus `RevealItem` de forma escalonada. */
export function RevealGroup({ children, className, stagger = 0.08 }: RevealGroupProps) {
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
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
