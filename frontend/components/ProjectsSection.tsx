import { useEffect, useState } from 'react'
import { useContent } from '../src/hooks/useContent'

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  urlRepo?: string
  urlDemo?: string
  coverImage?: string
}

export default function ProjectsSection() {
  const { ui } = useContent()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
      try {
        // Try backend first
        const backendRes = await fetch(`${baseUrl}/api/projects`)
        if (backendRes.ok) {
          const data = await backendRes.json()
          setProjects(data)
        } else {
          throw new Error('Backend not available')
        }
      } catch {
        // Fallback to frontend API
        try {
          const frontendRes = await fetch('/api/projects')
          if (frontendRes.ok) {
            const data = await frontendRes.json()
            setProjects(data)
          } else {
            throw new Error('Failed to load projects')
          }
        } catch (err) {
          setError('Unable to load projects. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading projects...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="section-padding bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto container-padding">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{ui.sections.projects}</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {project.coverImage && (
                <div className="relative overflow-hidden rounded-t-2xl mb-6">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
                {project.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-6">
                {project.urlRepo && (
                  <a
                    href={project.urlRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-200 font-medium transition-colors duration-200 hover:underline"
                  >
                    {ui.projects.code}
                  </a>
                )}
                {project.urlDemo && (
                  <a
                    href={project.urlDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-brown dark:hover:text-accent font-medium transition-colors duration-200 hover:underline"
                  >
                    {ui.projects.demo}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}