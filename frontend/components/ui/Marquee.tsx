import { ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  /** Segundos que tarda una vuelta completa */
  duration?: number;
  className?: string;
}

/**
 * Cinta infinita en CSS puro (ver `.marquee` en globals.css). El contenido se
 * duplica para que el bucle no tenga corte; la copia se oculta a lectores de pantalla.
 */
export default function Marquee({ children, reverse = false, duration = 40, className = '' }: MarqueeProps) {
  return (
    <div
      className={`marquee ${reverse ? 'marquee-reverse' : ''} ${className}`}
      style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
    >
      <div className="marquee-track">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
