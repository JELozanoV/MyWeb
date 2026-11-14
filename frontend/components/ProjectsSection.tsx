import { useId, useState } from 'react'
import Image from 'next/image'
import { FiArrowUpRight, FiChevronDown, FiGithub } from 'react-icons/fi'
import { useContent } from '../src/hooks/useContent'
import { useLocale } from '../src/context/LocaleContext'
import ProjectImageCarousel from './ProjectImageCarousel'
import SectionHeading from './ui/SectionHeading'
import { getProjects, Project } from '../src/data/projectsData'

// Dominio del demo para la barra del "navegador" (sin protocolo ni barra final)
const getHost = (url?: string) => (url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '')

interface ProjectCardProps {
  project: Project
  /** Tarjeta grande a todo el ancho */
  featured: boolean
}

function ProjectCard({ project, featured }: ProjectCardProps) {
  const { ui } = useContent()
  const hasCarousel = !!project.images && project.images.length > 0
  // La descripción es larga: se muestra recortada y se abre a petición
  const [expanded, setExpanded] = useState(false)
  const descriptionId = useId()

  return (
    <article className="card project-card group flex flex-col !p-0">
      {/* Marco de navegador */}
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        {project.urlDemo && (
          <span className="ml-3 truncate rounded-md bg-bg px-3 py-1 font-mono text-xs text-muted">
            {getHost(project.urlDemo)}
          </span>
        )}
        {!project.urlDemo && project.internal && (
          <span className="ml-3 truncate rounded-md bg-bg px-3 py-1 font-mono text-xs text-muted">
            {ui.projects.internal}
          </span>
        )}
      </div>

      {hasCarousel && <ProjectImageCarousel images={project.images!} title={project.title} large={featured} />}

      {!hasCarousel && project.coverImage && (
        <div className="relative aspect-[19/10] w-full overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes={featured ? '(max-width: 1152px) 100vw, 1152px' : '(max-width: 768px) 100vw, 576px'}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}

      <div className="relative flex flex-1 flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold md:text-3xl">{project.title}</h3>
          <div className="flex flex-wrap gap-2">
            {project.urlDemo && (
              <a href={project.urlDemo} target="_blank" rel="noopener noreferrer" className="btn-primary !px-4 !py-2">
                {ui.projects.demo}
                <FiArrowUpRight size={16} />
              </a>
            )}
            {project.urlRepo && (
              <a href={project.urlRepo} target="_blank" rel="noopener noreferrer" className="btn-secondary !px-4 !py-2">
                <FiGithub size={16} />
                {ui.projects.code}
              </a>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        <p
          id={descriptionId}
          className={`mt-6 whitespace-pre-line text-sm leading-relaxed md:text-base ${
            expanded ? '' : 'max-h-36 overflow-hidden [mask-image:linear-gradient(#000_45%,transparent)]'
          }`}
        >
          {project.description}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={descriptionId}
          className="mt-3 inline-flex items-center gap-1.5 self-start text-sm font-medium text-accent-fg hover:underline"
        >
          {expanded ? ui.projects.readLess : ui.projects.readMore}
          <FiChevronDown size={16} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Créditos: siempre visibles, fuera de la descripción colapsada */}
        {project.credit && project.creditText && (
          <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
            {project.creditText.before}{' '}
            <a
              href={project.credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-fg underline-offset-4 hover:underline"
            >
              {project.credit.name}
            </a>
            {project.creditText.after}
          </p>
        )}
      </div>
    </article>
  )
}

export default function ProjectsSection() {
  const { ui } = useContent()
  const { locale } = useLocale()
  const projects = getProjects(locale)

  return (
    <section id="projects" className="section-padding">
      <div className="mx-auto max-w-6xl container-padding">
        <SectionHeading eyebrow={ui.eyebrows.projects} title={ui.sections.projects} />

        {/* Cada proyecto ocupa todo el ancho, el más reciente primero */}
        <div className="space-y-8 md:space-y-12">
          {/* Sin animación de entrada: es el bloque más grande de la página y
              ocultarlo hasta el scroll dejaba una pantalla vacía */}
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </div>
      </div>
    </section>
  )
}
