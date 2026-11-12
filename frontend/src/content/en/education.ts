import type { Certification, EducationItem } from '../types'

export const education: EducationItem[] = [
  {
    institution: 'Corporación Unificada Nacional de Educación Superior CUN',
    degree: 'Bachelor of Science in Computer Science',
    status: 'inProgress',
    logo: '/images/Logos/cun.webp',
    logoUrl: 'https://cun.edu.co/blog/'
  }
]

export const certifications: Certification[] = [
  {
    name: 'SQL & MySQL Course',
    issuer: 'Platzi',
    year: 'Issued: Jul. 2025',
    url: '',
    logo: '/images/Logos/platzi.webp',
    logoUrl: 'https://platzi.com/p/john331/curso/11975-course/diploma/detalle/',
    logoFill: true
  },
  {
    name: 'Full Stack Web Developer',
    issuer: 'Talento Tech 2.0',
    year: 'Issued: Dec. 2024',
    url: '',
    logo: '/images/Logos/talento_tech.webp',
    logoUrl: 'https://talentotech.gov.co/portal/'
  }
]