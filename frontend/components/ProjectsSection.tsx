import Image from 'next/image'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import { useContent } from '../src/hooks/useContent'
import { useLocale } from '../src/context/LocaleContext'
import ProjectImageCarousel from './ProjectImageCarousel'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'
import { getProjects, Project } from '../src/data/projectsData'

// Dominio del demo para la barra del "navegador" (sin protocolo ni barra final)
const getHost = (url?: string) => (url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '')

interface ProjectCardProps {
  project: Project
  /** Tarjeta grande a todo el ancho (cuando es el único proyecto) */
  featured: boolean
}

function ProjectCard({ project, featured }: ProjectCardProps) {
  const { ui } = useContent()
  const hasCarousel = !!project.images && project.images.length > 0

  return (
    <article className="card group flex flex-col !p-0">
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
      </div>

      {hasCarousel && <ProjectImageCarousel images={project.images!} title={project.title} large={featured} />}

      {!hasCarousel && project.coverImage && (
        <div className={`relative w-full overflow-hidden ${featured ? 'h-72 md:h-[28rem]' : 'h-64 md:h-80'}`}>
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes={featured ? '(max-width: 1024px) 100vw, 1024px' : '(max-width: 768px) 100vw, 576px'}
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

        <p className="mt-6 whitespace-pre-line text-sm leading-relaxed md:text-base">{project.description}</p>
      </div>
    </article>
  )
}

export default function ProjectsSection() {
  const { ui } = useContent()
  const { locale } = useLocale()
  const projects = getProjects(locale)
  const single = projects.length === 1

  return (
    <section id="projects" className="section-padding">
      <div className="mx-auto max-w-6xl container-padding">
        <SectionHeading eyebrow={ui.eyebrows.projects} title={ui.sections.projects} />

        <div className={single ? 'mx-auto max-w-5xl' : 'grid grid-cols-1 gap-8 md:grid-cols-2'}>
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={single ? 0 : (index % 2) * 0.1}>
              <ProjectCard project={project} featured={single} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
