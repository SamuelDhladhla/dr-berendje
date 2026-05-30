'use client'
import { Project } from '@/types'
import { LAYOUT_MAP, LayoutDefault } from './ProjectPageLayouts'

// ─── Per-project font + color identity ───────────────────────────────────────
const PROJECT_STYLE: Record<string, { font: string; color: string }> = {
  'the-ecologies-of-repair':   { font: "'Instrument Serif', Georgia, serif",           color: '#C8553D' },
  'dead-white-mans-clothes':   { font: "'Space Grotesk', Arial, sans-serif",            color: '#2D5F4A' },
  'sender-receiver-residence': { font: "'Courier Prime', 'Courier New', monospace",     color: '#8B6914' },
  'secondhand-speculation':    { font: "'DM Sans', 'Helvetica Neue', sans-serif",       color: '#3D4F7C' },
  'black-botanicals':          { font: "'Libre Baskerville', Georgia, serif",           color: '#1A3A2A' },
  'the-fine-art-of-fakery':    { font: "'IBM Plex Sans', 'Helvetica Neue', sans-serif", color: '#A0522D' },
  'blueprint':                 { font: "'Archivo Black', 'Arial Black', sans-serif",    color: '#1B3F8B' },
  'post-fossils':              { font: "'Source Serif 4', Georgia, serif",              color: '#4A4A4A' },
}

interface Props {
  project: Project
  prev?: Project
  next?: Project
  designPrefix: string
  variant: 'a' | 'b' | 'c' | 'd'
}

export default function ProjectPageShared({ project, prev, next, designPrefix }: Props) {
  const ps = PROJECT_STYLE[project.slug] ?? { font: "'Playfair Display', serif", color: '#555' }
  const Layout = LAYOUT_MAP[project.slug] ?? LayoutDefault

  return (
    <Layout
      project={project}
      prev={prev}
      next={next}
      designPrefix={designPrefix}
      font={ps.font}
      color={ps.color}
    />
  )
}
