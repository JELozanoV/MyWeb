export const labels = {
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
  projects: {
    loading: 'Cargando proyectos...',
    error: 'No se pudieron cargar los proyectos. Inténtalo de nuevo más tarde.'
  },
  carousel: {
    previous: 'Imagen anterior',
    next: 'Imagen siguiente',
    goTo: 'Ir a imagen',
    image: 'Imagen'
  },
  nav: {
    home: 'Ir al inicio',
    toggleTheme: 'Cambiar tema',
    toggleMenu: 'Abrir o cerrar menú',
    toggleLanguage: 'Cambiar idioma'
  }
}
