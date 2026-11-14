/**
 * 📁 ARCHIVO PARA EDITAR LOS PROYECTOS
 *
 * Aquí puedes agregar, editar o eliminar proyectos.
 * Cada proyecto puede tener múltiples imágenes que se mostrarán en un carrusel.
 *
 * 📸 OPCIONES PARA IMÁGENES:
 *
 * 1. 📁 ARCHIVOS LOCALES (recomendado):
 *    - Sube imágenes a: portfolio/frontend/public/images/projects/
 *    - Ruta en código: '/images/projects/tu-imagen.jpg'
 *    - Ventajas: Rápido, funciona sin internet, control total
 *
 * 2. 🌐 URLs EXTERNAS:
 *    - Unsplash: https://images.unsplash.com/photo-xxx?w=800&h=600&fit=crop
 *    - Tu servidor: https://tu-dominio.com/images/imagen.jpg
 *    - Ventajas: No ocupa espacio en repo
 *
 * 📖 Lee el README: portfolio/frontend/public/images/projects/README.md
 *
 * Cuando tengas la base de datos lista, este archivo se puede eliminar
 * y los datos vendrán desde la API.
 */

import { projects as projectsES } from '../content/es/projects'
import { projects as projectsEN } from '../content/en/projects'

export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  urlRepo?: string
  urlDemo?: string
  coverImage?: string
  images?: string[]
  /** Herramienta interna: sin demo pública (se indica en la barra del navegador) */
  internal?: boolean
  /** Persona acreditada, con enlace a su perfil */
  credit?: { name: string; url: string }
  /** Texto alrededor del nombre acreditado; se obtiene de los archivos de traducción */
  creditText?: { before: string; after: string }
}

// 🎯 EDITA AQUÍ TUS PROYECTOS - El primero del arreglo es el que se muestra primero
export const projectsData: Project[] = [
  {
    id: 2,
    title: 'Inside Sales Academy',
    description: '', // Se obtendrá de los archivos de traducción
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Better Auth', 'Zod', 'Playwright', 'Vitest'],
    internal: true,
    credit: {
      name: 'María Colorado',
      url: 'https://www.linkedin.com/in/maria-angelica-colorado/'
    },
    images: [
      '/images/projects/inside-sales-academy/portada.webp',
      '/images/projects/inside-sales-academy/02-home.webp',
      '/images/projects/inside-sales-academy/03-academia.webp',
      '/images/projects/inside-sales-academy/04-modulo.webp',
      '/images/projects/inside-sales-academy/06-quiz.webp',
      '/images/projects/inside-sales-academy/08-ranking.webp',
      '/images/projects/inside-sales-academy/10-max-buscador.webp',
      '/images/projects/inside-sales-academy/11-mi-equipo.webp',
      '/images/projects/inside-sales-academy/12-admin-panel.webp',
      '/images/projects/inside-sales-academy/14-matriz-persona-modulo.webp',
      '/images/projects/inside-sales-academy/15-editor-academia.webp',
      '/images/projects/inside-sales-academy/movil-1.webp',
      '/images/projects/inside-sales-academy/movil-2.webp'
    ]
  },
  {
    id: 1,
    title: 'Reten +',
    description: '', // Se obtendrá de los archivos de traducción
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Express', 'Prisma', 'TypeScript'],
    urlDemo: 'https://reten-plus-demo.onrender.com/',
    images: [
      // 📁 IMÁGENES LOCALES: Tus imágenes del proyecto Reten +
      '/images/projects/reten/Banner.webp',
      '/images/projects/reten/reten0.1.webp',
      '/images/projects/reten/reten0.2.webp',
      '/images/projects/reten/reten2.webp',
      '/images/projects/reten/reten3.webp',
      '/images/projects/reten/reten4.webp',
      '/images/projects/reten/reten5.webp',
      '/images/projects/reten/reten6.webp',
      '/images/projects/reten/reten7.webp',
      '/images/projects/reten/reten8.webp',
      '/images/projects/reten/reten9.webp',
      '/images/projects/reten/reten10.webp',
      '/images/projects/reten/reten11.webp',
      '/images/projects/reten/reten12.webp',
      '/images/projects/reten/reten13.webp'
    ]
  }
]

// Mapeo de títulos a claves de traducción (content/{locale}/projects.ts)
const titleToKey: { [key: string]: keyof typeof projectsES } = {
  'Inside Sales Academy': 'insideSales',
  'Reten +': 'reten'
}

const getTranslatedCredit = (projectTitle: string, locale: string) => {
  const key = titleToKey[projectTitle]
  if (!key) return undefined
  return (locale === 'es' ? projectsES : projectsEN)[key]?.credit
}

const getTranslatedDescription = (projectTitle: string, locale: string): string => {
  const key = titleToKey[projectTitle]
  if (!key) return locale === 'es' ? 'Descripción no disponible' : 'Description not available'

  if (locale === 'es') {
    return projectsES[key]?.description || 'Descripción no disponible'
  }
  return projectsEN[key]?.description || 'Description not available'
}

// Devuelve los proyectos con la descripción en el idioma indicado.
// Si algún día vienen de la API (/api/projects), este es el punto a cambiar.
export const getProjects = (locale: string = 'es'): Project[] =>
  projectsData.map(project => ({
    ...project,
    description: getTranslatedDescription(project.title, locale),
    creditText: getTranslatedCredit(project.title, locale)
  }))
