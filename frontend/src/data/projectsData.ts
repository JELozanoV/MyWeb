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
    description: 'A full-stack portfolio website built with Next.js and Express featuring bilingual support and modern UI.',
    tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Prisma'],
    urlRepo: 'https://github.com/user/portfolio',
    urlDemo: 'https://portfolio-demo.com',
    images: [
      // 📁 EJEMPLO: Para usar imágenes locales, sube archivos a:
      // portfolio/frontend/public/images/projects/
      // Y usa rutas como: '/images/projects/tu-imagen.jpg'

      // 🌐 Por ahora usando URLs externas (Unsplash):
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 2,
    title: 'E-commerce App',
    description: 'An e-commerce application with user authentication, payment integration, and admin dashboard.',
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
    description: 'RESTful API for task management with JWT authentication and real-time notifications.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Socket.io'],
    urlRepo: 'https://github.com/user/task-api',
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 4,
    title: 'Weather App',
    description: 'A responsive weather application with location-based forecasts and beautiful animations.',
    tags: ['React', 'OpenWeather API', 'CSS Animations', 'Geolocation'],
    urlRepo: 'https://github.com/user/weather-app',
    urlDemo: 'https://weather-app-demo.com',
    images: [
      'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&h=600&fit=crop'
    ]
  }
]

// Función para obtener proyectos - puedes cambiar la lógica aquí cuando integres la base de datos
export const getProjects = async (): Promise<Project[]> => {
  // 🚀 PARA CAMBIAR A BASE DE DATOS:
  // 1. Configura tu base de datos (PostgreSQL con Prisma)
  // 2. Ejecuta: cd portfolio/backend && npx prisma migrate dev && npx prisma generate
  // 3. Cambia esta función por:
  // return await fetch('/api/projects').then(res => res.json())

  // Por ahora retorna datos estáticos - puedes editar projectsData arriba
  return new Promise((resolve) => {
    setTimeout(() => resolve(projectsData), 100) // Simula delay de API
  })
}