interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  url?: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h3 className="text-xl font-semibold text-azul-medio mb-2">{project.title}</h3>
      <p className="text-gray-700 mb-4">{project.description}</p>
      <div className="mb-4">
        {project.tags.map(tag => (
          <span key={tag} className="inline-block bg-azul-claro text-white px-2 py-1 rounded-full text-sm mr-2">
            {tag}
          </span>
        ))}
      </div>
      {project.url && (
        <a href={project.url} className="text-azul-oscuro hover:underline">
          View Project
        </a>
      )}
    </div>
  )
}