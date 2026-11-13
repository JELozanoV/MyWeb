import { useEffect, useState } from 'react';

/**
 * Devuelve el id de la sección que cruza el centro de la pantalla.
 * `ids` debe ser un arreglo estable (constante de módulo), no uno nuevo por render.
 */
export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      // Franja estrecha a media pantalla: solo una sección la cruza a la vez
      { rootMargin: '-45% 0px -50% 0px' }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
