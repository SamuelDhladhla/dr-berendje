import { notFound } from 'next/navigation'
import { projects, getProjectBySlug } from '@/data/projects'
import ProjectGallery from '@/components/ProjectGallery'
import Link from 'next/link'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const statusLabel =
    project.status === 'ongoing'
      ? 'Ongoing'
      : project.status === 'in-progress'
      ? 'In Progress'
      : `${project.year}`

  return (
    <main style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '72px' }}>
      {/* Gallery — full width, drag scroll */}
      <ProjectGallery images={project.images} title={project.title} />

      {/* Content */}
      <div
        style={{
          padding: '64px 28px 120px',
          maxWidth: '1200px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
        }}
      >
        {/* Left — title block */}
        <div>
          {project.subtitle && (
            <p
              className="font-mono"
              style={{ fontSize: '11px', color: '#F5FF00', letterSpacing: '0.1em', marginBottom: '12px' }}
            >
              {project.subtitle}
            </p>
          )}

          <h1
            className="font-serif"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontStyle: 'italic',
              color: '#F5F2EB',
              lineHeight: 1.05,
              marginBottom: '24px',
            }}
          >
            {project.title}
          </h1>

          {/* Meta row */}
          <div
            className="font-mono"
            style={{
              fontSize: '11px',
              color: '#555',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginBottom: '32px',
              letterSpacing: '0.04em',
            }}
          >
            <span>{project.year}</span>
            <span>{project.location}</span>
            <span
              style={{
                color:
                  project.status === 'complete' ? '#555' : '#F5FF00',
              }}
            >
              {statusLabel}
            </span>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono"
                style={{
                  fontSize: '10px',
                  color: '#444',
                  border: '1px solid #222',
                  padding: '2px 8px',
                  letterSpacing: '0.06em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right — description */}
        <div>
          <p
            className="font-serif"
            style={{
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: '#F5F2EB',
              lineHeight: 1.6,
              marginBottom: '28px',
            }}
          >
            {project.excerpt}
          </p>

          <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '24px' }}>
            {project.description.split('\n\n').map((para, i) => (
              <p
                key={i}
                className="font-mono"
                style={{
                  fontSize: '13px',
                  color: '#888',
                  lineHeight: 1.75,
                  marginBottom: '16px',
                  letterSpacing: '0.01em',
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Footer nav */}
      <div
        style={{
          borderTop: '1px solid #1a1a1a',
          padding: '24px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link
          href="/"
          className="font-mono"
          style={{
            fontSize: '11px',
            color: '#555',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            transition: 'color 0.2s ease',
          }}
        >
          ← Return to Field
        </Link>

        <p className="font-mono" style={{ fontSize: '10px', color: '#333', letterSpacing: '0.06em' }}>
          in no{' '}
          <span style={{ color: '#F5FF00' }}>[particular]</span>{' '}
          order
        </p>
      </div>
    </main>
  )
}
