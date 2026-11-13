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
}

// 🎯 EDITA AQUÍ TUS PROYECTOS - Datos de ejemplo para proyectos
export const projectsData: Project[] = [
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
  'Reten +': 'reten'
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
    description: getTranslatedDescription(project.title, locale)
  }))
