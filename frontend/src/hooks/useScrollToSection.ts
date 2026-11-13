import { useCallback } from 'react';
import { useLenis } from 'lenis/react';

// Alto aproximado de la barra de navegación flotante
const NAV_OFFSET = 88;

/**
 * Devuelve una función que desplaza la página hasta una sección por su id.
 * Usa Lenis si está activo; si no (p. ej. con "reducir movimiento"), salta
 * directo con el scroll nativo.
 */
export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (!element) return;

      if (lenis) {
        lenis.scrollTo(element, { offset: -NAV_OFFSET });
        return;
      }
      const top = element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top });
    },
    [lenis]
  );
}
