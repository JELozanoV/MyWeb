export const labels = {
  // <title> y descripción de la página (SEO y vista previa al compartir)
  meta: {
    title: 'John Lozano — Desarrollador Full Stack',
    description: 'Portafolio de John Lozano, desarrollador Full Stack especializado en React, Next.js, Node.js e integraciones con IA. Disponible para proyectos freelance y oportunidades laborales.'
  },
  form: {
    name: 'Nombre',
    email: 'Email',
    subject: 'Asunto',
    message: 'Mensaje',
    submit: 'Enviar',
    submitting: 'Enviando...',
    success: '¡Mensaje enviado exitosamente!',
    sendAnother: 'Enviar otro mensaje',
    placeholders: {
      name: 'Tu nombre',
      email: 'tu@email.com',
      subject: 'Asunto del mensaje',
      message: 'Tu mensaje...'
    },
    validation: {
      name: 'El nombre debe tener al menos 2 caracteres',
      email: 'Email inválido',
      subject: 'El asunto debe tener al menos 5 caracteres',
      message: 'El mensaje debe tener al menos 10 caracteres'
    },
    errors: {
      missingConfig: 'El formulario de contacto no está disponible en este momento. Escríbeme directamente por email.',
      network: 'No se pudo conectar con el servicio de envío. Verifica tu conexión e inténtalo nuevamente.',
      generic: 'No fue posible enviar el mensaje. Inténtalo de nuevo más tarde o escríbeme directamente por email.'
    }
  },
  carousel: {
    previous: 'Imagen anterior',
    next: 'Imagen siguiente',
    goTo: 'Ir a imagen',
    image: 'Imagen'
  },
  // Botón del logo grande del hero: al activarlo se desarma y se arma con código
  heroLogo: 'Animar el logo: se desarma en líneas de código y se vuelve a armar',
  nav: {
    home: 'Ir al inicio',
    toggleTheme: 'Cambiar tema',
    toggleMenu: 'Abrir o cerrar menú',
    toggleLanguage: 'Cambiar idioma'
  }
}
