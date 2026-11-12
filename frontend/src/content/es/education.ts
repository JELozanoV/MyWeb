import type { Certification, EducationItem } from '../types'

export const education: EducationItem[] = [
  {
    institution: 'Corporación Unificada Nacional de Educación Superior CUN',
    degree: 'Ingeniería de Sistemas',
    status: 'inProgress',
    logo: '/images/Logos/cun.webp',
    logoUrl: 'https://cun.edu.co/blog/'
  }
]

export const certifications: Certification[] = [
  {
    name: 'Curso de SQL y MySQL',
    issuer: 'Platzi',
    year: 'Expedición: jul. 2025',
    url: '',
    logo: '/images/Logos/platzi.webp',
    logoUrl: 'https://platzi.com/p/john331/curso/11975-course/diploma/detalle/',
    logoFill: true
  },
  {
    name: 'Desarrollador Web Full Stack',
    issuer: 'Talento Tech 2.0',
    year: 'Expedición: dic. 2024',
    url: '',
    logo: '/images/Logos/talento_tech.webp',
    logoUrl: 'https://talentotech.gov.co/portal/'
  }
]