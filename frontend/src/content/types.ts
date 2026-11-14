// Tipos compartidos por el contenido de ambos idiomas

export interface EducationItem {
  institution: string;
  degree: string;
  status?: 'inProgress' | 'completed';
  logo?: string;
  logoUrl?: string;
  /** true: el logo cubre todo el recuadro; false: se muestra contenido con padding */
  logoFill?: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url?: string;
  logo?: string;
  logoUrl?: string;
  logoFill?: boolean;
}

/** Textos de un proyecto (el resto de sus datos está en src/data/projectsData.ts) */
export interface ProjectContent {
  description: string;
  /** Texto que rodea al nombre enlazado de la persona acreditada */
  credit?: { before: string; after: string };
}

/** Clave de ícono de un servicio; el componente Services la traduce a un ícono */
export type ServiceIcon = 'web' | 'api' | 'ai' | 'speed';

export interface ServiceItem {
  icon: ServiceIcon;
  title: string;
  description: string;
  features: string[];
}

export interface ServicesContent {
  eyebrow: string;
  title: string;
  description: string;
  /** Bloque de cierre de la sección: título, texto y botón */
  ctaTitle: string;
  ctaText: string;
  cta: string;
  items: ServiceItem[];
}
