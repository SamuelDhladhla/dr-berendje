import { notFound } from 'next/navigation'
import { projects, getProjectBySlug } from '@/data/projects'
import ProjectPageShared from '@/components/ProjectPageShared'

type Props = { params: Promise<{ slug: string }> }
export async function generateStaticParams() { return projects.map(p => ({ slug: p.slug })) }

export default async function DesignCProject({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()
  const idx = projects.findIndex(p => p.slug === slug)
  return (
    <ProjectPageShared
      project={project}
      prev={projects[idx - 1]}
      next={projects[idx + 1]}
      designPrefix="/design-c"
      variant="c"
    />
  )
}
