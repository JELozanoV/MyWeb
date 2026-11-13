import type { ServicesContent } from '../types'

// Textos propuestos: ajústalos a lo que realmente ofreces a tus clientes.
export const services: ServicesContent = {
  eyebrow: 'Servicios',
  title: '¿En qué te puedo ayudar?',
  description: 'Trabajo con empresas y emprendedores que necesitan un producto web bien hecho, de la idea a producción.',
  cta: 'Cotizar proyecto',
  items: [
    {
      icon: 'web',
      title: 'Desarrollo web a medida',
      description: 'Sitios y aplicaciones web rápidas, responsivas y fáciles de mantener con React y Next.js.',
      features: [
        'Landing pages y sitios corporativos',
        'Aplicaciones web y paneles de gestión',
        'Diseño adaptable a móvil y escritorio'
      ]
    },
    {
      icon: 'api',
      title: 'Backend y APIs',
      description: 'La lógica de tu negocio con Node.js y Express, sobre bases de datos SQL o NoSQL.',
      features: [
        'APIs REST para web y móvil',
        'Modelado de datos en PostgreSQL y MongoDB',
        'Integración con servicios de terceros'
      ]
    },
    {
      icon: 'ai',
      title: 'Integraciones con IA',
      description: 'Incorporo modelos de OpenAI, Gemini o Claude a tu producto o a tus procesos internos.',
      features: [
        'Chatbots con el contexto de tu negocio',
        'Asistentes y recomendaciones para tu equipo',
        'Automatización de tareas repetitivas'
      ]
    },
    {
      icon: 'speed',
      title: 'Optimización y mantenimiento',
      description: 'Mejoro el rendimiento y la calidad de proyectos que ya están en marcha.',
      features: [
        'Velocidad de carga y Core Web Vitals',
        'Actualización de dependencias y migraciones',
        'Corrección de errores y nuevas funciones'
      ]
    }
  ]
}
