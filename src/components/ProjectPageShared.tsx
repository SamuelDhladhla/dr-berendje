'use client'
import { Project } from '@/types'
import { LAYOUT_MAP, LayoutDefault } from './ProjectPageLayouts'

const HEADING = "'Instrument Serif', Georgia, serif"

interface Props {
  project: Project
  prev?: Project
  next?: Project
  designPrefix: string
  variant: string
}

export default function ProjectPageShared({ project, prev, next, designPrefix }: Props) {
  const Layout = LAYOUT_MAP[project.slug] ?? LayoutDefault

  return (
    <Layout
      project={project}
      prev={prev}
      next={next}
      designPrefix={designPrefix}
      font={HEADING}
      color="#000"
    />
  )
}
