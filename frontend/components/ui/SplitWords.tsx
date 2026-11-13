import { useRef } from 'react';
import { motion } from 'motion/react';
import { useRevealed } from './Reveal';

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

/**
 * Revela un texto palabra por palabra, subiendo desde una máscara.
 * Los lectores de pantalla reciben el texto completo (copia `sr-only`).
 */
export default function SplitWords({ text, wordClassName = '', delay = 0, immediate = false }: SplitWordsProps) {
  const words = text.split(' ');
  // Se observa el contenedor (que no se mueve) y no cada palabra: las palabras
  // empiezan desplazadas fuera de su máscara y podrían no detectarse nunca.
  const ref = useRef<HTMLSpanElement>(null);
  const revealed = useRevealed(ref);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden>
        {words.map((word, index) => (
          // Índice como clave: al cambiar de idioma se reutilizan los nodos
          <span key={index}>
            <span className={MASK_CLASS}>
              {immediate ? (
                <span
                  className={`inline-block animate-word-rise ${wordClassName}`}
                  style={{ animationDelay: `${delay + index * STAGGER}s` }}
                >
                  {word}
                </span>
              ) : (
                <motion.span
                  className={`inline-block ${wordClassName}`}
                  initial={{ y: '110%' }}
                  animate={{ y: revealed ? 0 : '110%' }}
                  transition={{ duration: 0.6, delay: delay + index * STAGGER, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              )}
            </span>
            {index < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    </>
  );
}
