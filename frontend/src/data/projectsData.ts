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
    urlRepo: 'https://github.com/user/portfolio',
    urlDemo: 'https://portfolio-demo.com',
    images: [
      // 📁 IMÁGENES LOCALES: Tus imágenes del proyecto Reten +
      '/images/projects/reten/reten + 1.png',
      '/images/projects/reten/reten + 2.png',
      '/images/projects/reten/reten + 3.png',
      '/images/projects/reten/reten + 4.png',
      '/images/projects/reten/reten + 5.png',
      '/images/projects/reten/reten + 6.png'
    ]
  },
  {
    id: 2,
    title: 'E-commerce App',
    description: '', // Se obtendrá de los archivos de traducción
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Stripe'],
    urlRepo: 'https://github.com/user/ecommerce',
    urlDemo: 'https://ecommerce-demo.com',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 3,
    title: 'Task Manager API',
    description: '', // Se obtendrá de los archivos de traducción
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Socket.io'],
    urlRepo: 'https://github.com/user/task-api',
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 4,
    title: 'Weather App',
    description: '', // Se obtendrá de los archivos de traducción
    tags: ['React', 'OpenWeather API', 'CSS Animations', 'Geolocation'],
    urlRepo: 'https://github.com/user/weather-app',
    urlDemo: 'https://weather-app-demo.com',
    images: [
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&h=600&fit=crop'
    ]
  }
]

// Función para obtener proyectos con soporte de internacionalización
export const getProjects = async (locale: string = 'es'): Promise<Project[]> => {
  // 🚀 PARA CAMBIAR A BASE DE DATOS:
  // 1. Configura tu base de datos (PostgreSQL con Prisma)
  // 2. Ejecuta: cd portfolio/backend && npx prisma migrate dev && npx prisma generate
  // 3. Cambia esta función por:
  // return await fetch('/api/projects').then(res => res.json())

  // Por ahora retorna datos estáticos con descripciones traducidas
  return new Promise((resolve) => {
    setTimeout(() => {
      const translatedProjects = projectsData.map(project => ({
        ...project,
        // Usa la descripción traducida según el idioma actual
        description: getTranslatedDescription(project.title, locale)
      }))
      resolve(translatedProjects)
    }, 100) // Simula delay de API
  })
}

// Función auxiliar para obtener la descripción traducida
const getTranslatedDescription = (projectTitle: string, locale: string): string => {
  // Mapeo de títulos a claves de traducción
  const titleToKey: { [key: string]: keyof typeof import('../content/es/projects').projects } = {
    'Reten +': 'reten',
    'E-commerce App': 'ecommerce',
    'Task Manager API': 'taskManager',
    'Weather App': 'weatherApp'
  }

  const key = titleToKey[projectTitle]
  if (!key) return 'Descripción no disponible'

  // Importar dinámicamente el contenido según el idioma
  try {
    if (locale === 'es') {
      const { projects: projectsES } = require('../content/es/projects')
      return projectsES[key]?.description || 'Descripción no disponible'
    } else {
      const { projects: projectsEN } = require('../content/en/projects')
      return projectsEN[key]?.description || 'Description not available'
    }
  } catch (error) {
    console.error('Error loading translated content:', error)
    return 'Descripción no disponible'
  }
}