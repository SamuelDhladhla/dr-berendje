'use client'
import Link from 'next/link'
import type { Project } from '@/types'
import SiteHeader, { navText } from './SiteHeader'
import SiteFooter from './SiteFooter'
import Placeholder from './Placeholder'
import ImageSlot from './ImageSlot'
import ImageGroupBlock, { deriveImageGroups } from './ImageGroupBlock'
import Bibliography from './Bibliography'

/*
  One structure for every research project, following the A4 Arts template:

    title
    category — dates
    hero image
    image credit
    ─────────────────────────────────────────────
    metadata (left, small)      reading text (right, large)
    ─────────────────────────────────────────────
    flexible image groups
    bibliography / resources
    prev / next

  The type hierarchy is what carries it: a large title, a small uppercase
  sub-line, very small metadata on the left, and a comfortable reading size on
  the right. The left column is deliberately quiet so the reading column stays
  the thing you actually read.
*/

const PAGE_X = 40

const titleStyle = (p: Project): React.CSSProperties => ({
  fontFamily: p.titleFont?.family ?? 'var(--font-body)',
  fontWeight: p.titleFont?.weight ?? 400,
  fontStyle: p.titleFont?.style ?? 'normal',
  fontSize: 'clamp(34px, 4.4vw, 56px)',
  lineHeight: 1.05,
  letterSpacing: '-0.02em',
  color: '#000',
  margin: 0,
})

const subInfo: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#000',
  opacity: 0.55,
  marginTop: 14,
}

const metaLabel: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '9px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#000',
  opacity: 0.4,
  marginBottom: 5,
  display: 'block',
}

const metaValue: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  lineHeight: 1.55,
  color: '#000',
  display: 'block',
}

/** The reading column — the size the client specifically asked to keep. */
const readingText: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '16px',
  lineHeight: 1.7,
  color: '#000',
  marginBottom: 22,
}

const credit: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  lineHeight: 1.5,
  color: '#000',
  opacity: 0.55,
  marginTop: 12,
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <span style={metaLabel}>{label}</span>
      <span style={metaValue}>{children}</span>
    </div>
  )
}

interface Props {
  project: Project
  prev?: Project
  next?: Project
  designPrefix: string
}

export default function ProjectPage({ project, prev, next, designPrefix }: Props) {
  const groups = project.imageGroups ?? deriveImageGroups(project.images.slice(1))
  const paragraphs = project.description.trim()
    ? project.description.split('\n\n')
    : []

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <SiteHeader active={designPrefix} />

      <div style={{ padding: `0 ${PAGE_X}px 8px` }}>
        <Link href={designPrefix} style={{ ...navText, opacity: 0.55 }}>
          ← Research Projects
        </Link>
      </div>

      {/* ── TITLE + SUB-INFO ── */}
      <header style={{ padding: `56px ${PAGE_X}px 40px` }}>
        <h1 style={titleStyle(project)}>{project.title}</h1>
        <p style={subInfo}>
          {[project.subtitle, project.year].filter(Boolean).join(' — ')}
        </p>
      </header>

      {/* ── HERO IMAGE + CREDIT ── */}
      <div style={{ padding: `0 ${PAGE_X}px` }}>
        <ImageSlot
          src={project.coverImage}
          alt={project.title}
          style={{
            width: '100%',
            height: project.coverImage ? 'auto' : 420,
            maxHeight: 760,
            objectFit: 'contain',
            display: 'block',
          }}
        />
        {project.coverCredit
          ? <p style={credit}>{project.coverCredit}</p>
          : <div style={{ marginTop: 12 }}><Placeholder note="image credit" /></div>}
      </div>

      {/* ── DETAILS: metadata left, reading text right ── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(180px, 1fr) minmax(0, 2.6fr)',
        gap: '0 80px',
        padding: `96px ${PAGE_X}px 40px`,
        alignItems: 'start',
      }}>
        {/* Left — small, quiet */}
        <div>
          <MetaRow label="Title">{project.title}</MetaRow>
          <MetaRow label="Dates">{project.year}</MetaRow>
          <MetaRow label="Location">{project.location}</MetaRow>
          <MetaRow label="Status">
            {project.status === 'complete' ? 'Complete'
              : project.status === 'in-progress' ? 'In Progress' : 'Ongoing'}
          </MetaRow>

          {project.credits?.map(c => (
            <MetaRow key={c.label} label={c.label}>
              {c.values.map(v => <span key={v} style={{ display: 'block' }}>{v}</span>)}
            </MetaRow>
          ))}

          {project.tags.length > 0 && (
            <MetaRow label="Subjects">
              {project.tags.join(', ')}
            </MetaRow>
          )}
        </div>

        {/* Right — the reading column */}
        <div>
          {project.excerpt && (
            <p style={{ ...readingText, fontStyle: 'italic', marginBottom: 32 }}>
              {project.excerpt}
            </p>
          )}
          {paragraphs.length > 0
            ? paragraphs.map((t, i) => <p key={i} style={readingText}>{t}</p>)
            : <Placeholder note="project description" />}
        </div>
      </section>

      {/* ── FLEXIBLE IMAGE GROUPS ── */}
      {groups.length > 0 && (
        <div style={{ padding: `56px ${PAGE_X}px 0` }}>
          {groups.map((g, i) => <ImageGroupBlock key={i} group={g} />)}
        </div>
      )}

      {/* ── BIBLIOGRAPHY ── */}
      <div style={{ padding: `0 ${PAGE_X}px` }}>
        <Bibliography entries={project.bibliography} />
      </div>

      {/* ── PREV / NEXT ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        padding: `0 ${PAGE_X}px`, gap: 40,
      }}>
        {prev ? (
          <Link href={`${designPrefix}/${prev.slug}`} style={{ textDecoration: 'none' }}>
            <p style={{ ...navText, opacity: 0.5, marginBottom: 10 }}>← Previous</p>
            <p style={{ ...titleStyle(prev), fontSize: '22px' }}>{prev.title}</p>
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`${designPrefix}/${next.slug}`} style={{ textDecoration: 'none', textAlign: 'right' }}>
            <p style={{ ...navText, opacity: 0.5, marginBottom: 10 }}>Next →</p>
            <p style={{ ...titleStyle(next), fontSize: '22px' }}>{next.title}</p>
          </Link>
        ) : <div />}
      </div>

      <SiteFooter />
    </main>
  )
}
