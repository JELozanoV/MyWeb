import { motion, type Variants } from 'motion/react';
import { REVEAL_VIEWPORT } from './Reveal';

interface SplitWordsProps {
  text: string;
  /** Clase extra para cada palabra (p. ej. `text-gradient`) */
  wordClassName?: string;
  /** Retraso inicial en segundos */
  delay?: number;
  /**
   * true: anima al cargar con CSS puro (no espera a que hidrate React, así el
   * titular del hero pinta rápido). false: anima al acercarse a la pantalla.
   */
  immediate?: boolean;
}

const STAGGER = 0.05;
const MASK_CLASS = 'inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]';

const wordVariants: Variants = {
  hidden: { y: '110%' },
  visible: (delay: number) => ({
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

/**
 * Revela un texto palabra por palabra, subiendo desde una máscara.
 * Los lectores de pantalla reciben el texto completo (copia `sr-only`).
 */
export default function SplitWords({ text, wordClassName = '', delay = 0, immediate = false }: SplitWordsProps) {
  const words = text.split(' ');

  return (
    <>
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden>
          {immediate ? (
            <span className={MASK_CLASS}>
              <span
                className={`inline-block animate-word-rise ${wordClassName}`}
                style={{ animationDelay: `${delay + index * STAGGER}s` }}
              >
                {word}
              </span>
            </span>
          ) : (
            // Se observa la máscara (que no se mueve) y no la palabra: la palabra
            // empieza desplazada fuera de la máscara y el navegador podría no
            // detectarla nunca como visible.
            <motion.span className={MASK_CLASS} initial="hidden" whileInView="visible" viewport={REVEAL_VIEWPORT}>
              <motion.span
                className={`inline-block ${wordClassName}`}
                variants={wordVariants}
                custom={delay + index * STAGGER}
              >
                {word}
              </motion.span>
            </motion.span>
          )}
          {index < words.length - 1 && ' '}
        </span>
      ))}
    </>
  );
}
