import { motion } from 'motion/react';

interface SplitWordsProps {
  text: string;
  /** Clase extra para cada palabra (p. ej. `text-gradient`) */
  wordClassName?: string;
  /** Retraso inicial en segundos */
  delay?: number;
  /**
   * true: anima al cargar con CSS puro (no espera a que hidrate React, así el
   * titular del hero pinta rápido). false: anima al entrar en pantalla.
   */
  immediate?: boolean;
}

const STAGGER = 0.06;

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
          <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
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
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: delay + index * STAGGER, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            )}
          </span>
          {index < words.length - 1 && ' '}
        </span>
      ))}
    </>
  );
}
