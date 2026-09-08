'use client'
import { Project } from '@/types'
import ProjectPage from './ProjectPage'

/*
  Every research project now renders through one template.

  This previously dispatched to eight bespoke per-project layouts via LAYOUT_MAP.
  The client asked for the A4 Arts structure and hierarchy across the research
  project pages, which means one consistent template rather than eight — so the
  map is retired and ProjectPageLayouts is no longer in the render path.
*/

interface Props {
  project: Project
  prev?: Project
  next?: Project
  designPrefix: string
}

export default function ProjectPageShared({ project, prev, next, designPrefix }: Props) {
  return (
    <ProjectPage
      project={project}
      prev={prev}
      next={next}
      designPrefix={designPrefix}
    />
  )
}
