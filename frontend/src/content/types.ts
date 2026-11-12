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
