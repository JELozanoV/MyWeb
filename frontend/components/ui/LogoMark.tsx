// Trazos del logo JL (mismos de public/logo.svg), compartidos por el logo del
// hero (HeroLogo) y la marca de la barra de navegación.
export const LOGO_TRANSFORM = 'skewX(-10) translate(20, 10)';
export const PATH_J = 'M65 15 L65 75 Q65 95 40 95 L15 95 L20 75 L35 75 Q45 75 45 68 L45 15 L65 15 Z';
export const PATH_L = 'M75 15 L75 95 L135 95 L140 75 L95 75 L95 15 L75 15 Z';
// Facetas claras que dan el "corte" a cada letra
export const FACET_J = 'M45 25 L65 15 L65 25 L45 35 Z';
export const FACET_L = 'M120 75 L140 75 L135 85 L115 85 Z';
// viewBox recortado al contorno real de las letras
export const LOGO_VIEW_BOX = '8 14 158 102';

/** Logo JL plano en `currentColor`: toma el color del texto según el tema. */
export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox={LOGO_VIEW_BOX} className={className} aria-hidden fill="currentColor">
      <g transform={LOGO_TRANSFORM}>
        <path d={PATH_J} />
        <path d={PATH_L} />
        <path d={FACET_J} fillOpacity="0.35" />
        <path d={FACET_L} fillOpacity="0.35" />
      </g>
    </svg>
  );
}
