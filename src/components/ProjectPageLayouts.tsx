'use client'
import React from 'react'
import Link from 'next/link'
import { Project } from '@/types'

// ─── 8 UNIQUE PROJECT PAGE LAYOUTS ───────────────────────────────────────────
// Each layout is a different publication/chapter format.
// All share white background, consistent nav/footer, and per-project font+color.

const MONO = "'DM Mono', 'Courier New', monospace"
const SERIF = "'Playfair Display', Georgia, serif"

export interface LayoutProps {
  project: Project
  prev?: Project
  next?: Project
  designPrefix: string
  font: string
  color: string
}

// ── Shared micro-components ───────────────────────────────────────────────────

function SafeImg({ src, alt, style }: { src: string; alt: string; style: React.CSSProperties }) {
  return (
    <img src={src} alt={alt} style={style}
      onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0' }} />
  )
}

function ProjectNav({ designPrefix }: { designPrefix: string }) {
  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '18px 32px', borderBottom: '1px solid #f0f0f0',
      background: '#fff', position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Link href={designPrefix}
        style={{ fontFamily: MONO, fontSize: '11px', color: '#aaa', letterSpacing: '0.08em', textDecoration: 'none' }}>
        ← Back
      </Link>
      <Link href={designPrefix} style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 2 }}>
        <span style={{ fontFamily: MONO, fontSize: '13px', fontWeight: 300, color: '#ccc' }}>dr </span>
        <em style={{ fontFamily: SERIF, fontSize: '13px', fontStyle: 'italic', color: '#000' }}>Berendje</em>
      </Link>
    </nav>
  )
}

function PrevNext({ prev, next, designPrefix }: { prev?: Project; next?: Project; designPrefix: string }) {
  return (
    <div style={{ borderTop: '1px solid #f0f0f0', display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: 80 }}>
      {prev ? (
        <Link href={`${designPrefix}/project/${prev.slug}`}
          style={{ textDecoration: 'none', padding: '24px 32px', borderRight: '1px solid #f0f0f0' }}>
          <p style={{ fontFamily: MONO, fontSize: '9px', color: '#ccc', marginBottom: 6, letterSpacing: '0.08em' }}>← Previous</p>
          <p style={{ fontFamily: SERIF, fontSize: '0.95rem', fontStyle: 'italic', color: '#000' }}>{prev.title}</p>
        </Link>
      ) : <div />}
      {next ? (
        <Link href={`${designPrefix}/project/${next.slug}`}
          style={{ textDecoration: 'none', padding: '24px 32px', textAlign: 'right' }}>
          <p style={{ fontFamily: MONO, fontSize: '9px', color: '#ccc', marginBottom: 6, letterSpacing: '0.08em' }}>Next →</p>
          <p style={{ fontFamily: SERIF, fontSize: '0.95rem', fontStyle: 'italic', color: '#000' }}>{next.title}</p>
        </Link>
      ) : <div />}
    </div>
  )
}

function PageFooter() {
  return (
    <footer style={{ borderTop: '1px solid #f0f0f0', padding: '18px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: MONO, fontSize: '10px', color: '#ccc', letterSpacing: '0.06em' }}>
        PhD Design Research · ArtEZ University of the Arts
      </span>
      <a href="mailto:linda@drberendje.com"
        style={{ fontFamily: MONO, fontSize: '10px', color: '#ccc', letterSpacing: '0.06em', textDecoration: 'none' }}>
        linda@drberendje.com
      </a>
    </footer>
  )
}

function MetaBlock({ project }: { project: Project; color?: string }) {
  const statusLabel = project.status === 'complete' ? 'Complete'
    : project.status === 'in-progress' ? 'In Progress' : 'Ongoing'
  const statusColor = project.status === 'ongoing' ? '#8b6914'
    : project.status === 'in-progress' ? '#4a8c5c' : '#bbb'
  return (
    <div>
      <div style={{ fontFamily: MONO, fontSize: '11px', lineHeight: 2.2, color: '#aaa', marginBottom: 12 }}>
        <span>{project.year}</span>
        <span style={{ margin: '0 8px' }}>·</span>
        <span>{project.location}</span>
        <span style={{ margin: '0 8px' }}>·</span>
        <span style={{ color: statusColor }}>{statusLabel}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {project.tags.map(t => (
          <span key={t} style={{ fontFamily: MONO, fontSize: '9px', color: '#bbb', border: '1px solid #e8e8e8', padding: '2px 8px', letterSpacing: '0.04em' }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function Paras({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <>
      {text.split('\n\n').map((p, i) => (
        <p key={i} style={{ fontFamily: MONO, fontSize: '13px', color: '#444', lineHeight: 2.05, marginBottom: '22px', ...style }}>{p}</p>
      ))}
    </>
  )
}

// ─── LAYOUT 1: The Ecologies of Repair ── Journal Article ─────────────────────
// Full-width hero · title + abstract centered · two-column body (text + sidebar)

export function LayoutEcologies({ project, prev, next, designPrefix, font, color }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />

      {/* Full-width hero */}
      <div style={{ width: '100%', height: '62vh', overflow: 'hidden', background: '#f5f5f5' }}>
        <SafeImg src={project.coverImage} alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>

      {/* Centered title + abstract */}
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '52px 28px 40px', textAlign: 'center', borderBottom: '1px solid #e8e8e8' }}>
        {project.subtitle && (
          <p style={{ fontFamily: MONO, fontSize: '10px', color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{project.subtitle}</p>
        )}
        <h1 style={{ fontFamily: font, fontSize: 'clamp(2rem, 5vw, 4rem)', color, lineHeight: 1.05, marginBottom: 20, fontStyle: 'italic' }}>
          {project.title}
        </h1>
        <p style={{ fontFamily: SERIF, fontSize: '1.05rem', fontStyle: 'italic', color: '#555', lineHeight: 1.8 }}>
          {project.excerpt}
        </p>
      </div>

      {/* Two-column journal body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '0 52px', padding: '52px 32px 0', maxWidth: 1100, margin: '0 auto', alignItems: 'start' }}>
        {/* Left: article text + inline extra images */}
        <div>
          <Paras text={project.description} />
          {project.images.slice(1).map((img, i) => (
            <div key={i} style={{ margin: '32px 0' }}>
              <div style={{ background: '#f5f5f5', overflow: 'hidden', marginBottom: 6 }}>
                <SafeImg src={img} alt={`Fig. ${i + 2}`} style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 440 }} />
              </div>
              <p style={{ fontFamily: MONO, fontSize: '9px', color: '#bbb', letterSpacing: '0.06em' }}>Fig. {i + 2} — {project.location}</p>
            </div>
          ))}
        </div>
        {/* Right: citation sidebar */}
        <div style={{ borderLeft: '1px solid #f0f0f0', paddingLeft: 32 }}>
          <p style={{ fontFamily: MONO, fontSize: '9px', color: '#ccc', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Citation</p>
          <MetaBlock project={project} color={color} />
        </div>
      </div>

      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 2: Obroni Wa Wu ── Research Report ────────────────────────────────
// Large title left (55%) · images stacked right (45%) like a research report figure panel

export function LayoutDWMC({ project, prev, next, designPrefix, font, color }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />

      <div style={{ display: 'grid', gridTemplateColumns: '55fr 45fr', minHeight: 'calc(100vh - 57px)', alignItems: 'start' }}>
        {/* Left: title block + body */}
        <div style={{ padding: '60px 48px 80px 32px', borderRight: '1px solid #f0f0f0' }}>
          {project.subtitle && (
            <p style={{ fontFamily: MONO, fontSize: '10px', color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{project.subtitle}</p>
          )}
          <h1 style={{ fontFamily: font, fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)', color, lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: 36 }}>
            {project.title}
          </h1>
          <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: 24, marginBottom: 28 }}>
            <MetaBlock project={project} color={color} />
          </div>
          <p style={{ fontFamily: SERIF, fontSize: '1.05rem', fontStyle: 'italic', color: '#333', lineHeight: 1.8, marginBottom: 32 }}>
            {project.excerpt}
          </p>
          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 28 }}>
            <Paras text={project.description} />
          </div>
        </div>

        {/* Right: stacked figure images */}
        <div style={{ padding: '60px 28px 60px 32px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {project.images.map((img, i) => (
            <div key={i}>
              <div style={{ background: '#f5f5f5', overflow: 'hidden' }}>
                <SafeImg src={img} alt={`Fig. ${i + 1}`} style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '4/5' }} />
              </div>
              <p style={{ fontFamily: MONO, fontSize: '9px', color: '#ccc', padding: '5px 0 12px', letterSpacing: '0.06em' }}>Fig. {i + 1}</p>
            </div>
          ))}
        </div>
      </div>

      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 3: Sender – Receiver ── Exhibition Catalog ────────────────────────
// Image grid across full width at top · catalog number · narrow centered text column

export function LayoutSender({ project, prev, next, designPrefix, font, color }: LayoutProps) {
  const n = project.images.length
  const cols = n >= 3 ? 3 : n === 2 ? 2 : 1
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />

      {/* Image grid */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 2 }}>
        {project.images.map((img, i) => (
          <div key={i} style={{ background: '#f0f0f0', overflow: 'hidden', height: cols === 1 ? '62vh' : '52vh' }}>
            <SafeImg src={img} alt={`${project.title} ${i + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        ))}
      </div>

      {/* Catalog divider */}
      <div style={{ textAlign: 'center', padding: '36px 0 0', borderBottom: '1px solid #e8e8e8' }}>
        <span style={{ fontFamily: MONO, fontSize: '10px', color: '#ccc', letterSpacing: '0.14em', textTransform: 'uppercase' }}>— Exhibition Catalog —</span>
      </div>

      {/* Centered narrow column */}
      <div style={{ maxWidth: 620, margin: '0 auto', padding: '48px 28px 80px' }}>
        {project.subtitle && (
          <p style={{ fontFamily: MONO, fontSize: '10px', color, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>{project.subtitle}</p>
        )}
        <h1 style={{ fontFamily: font, fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', color, lineHeight: 1.05, textAlign: 'center', marginBottom: 28, textTransform: 'uppercase' }}>
          {project.title}
        </h1>
        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 20, marginBottom: 24 }}>
          <MetaBlock project={project} color={color} />
        </div>
        <p style={{ fontFamily: SERIF, fontSize: '1.05rem', fontStyle: 'italic', color: '#333', lineHeight: 1.8, marginBottom: 28, textAlign: 'center' }}>
          {project.excerpt}
        </p>
        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 24 }}>
          <Paras text={project.description} />
        </div>
      </div>

      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 4: T-Shirt Tales ── Zine ──────────────────────────────────────────
// Horizontal scrolling image strip · oversized title · two-column body

export function LayoutTShirt({ project, prev, next, designPrefix, font, color }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />

      {/* Horizontal scroll strip */}
      <div style={{ overflowX: 'auto', scrollbarWidth: 'none', borderBottom: '2px solid #000' }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {project.images.map((img, i) => (
            <div key={i} style={{
              flexShrink: 0,
              width: project.images.length === 1 ? '100vw' : '68vw',
              height: '64vh',
              background: '#f0f0f0', overflow: 'hidden',
            }}>
              <SafeImg src={img} alt={`${project.title} ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Zine text area */}
      <div style={{ padding: '48px 32px 80px', maxWidth: 1100 }}>
        {project.subtitle && (
          <p style={{ fontFamily: MONO, fontSize: '10px', color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{project.subtitle}</p>
        )}
        <h1 style={{ fontFamily: font, fontSize: 'clamp(3rem, 8vw, 9rem)', color, lineHeight: 0.88, letterSpacing: '-0.03em', marginBottom: 44, textTransform: 'uppercase' }}>
          {project.title}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px', borderTop: '1px solid #e8e8e8', paddingTop: 32 }}>
          <div>
            <p style={{ fontFamily: SERIF, fontSize: '1.1rem', fontStyle: 'italic', color: '#333', lineHeight: 1.8, marginBottom: 28 }}>{project.excerpt}</p>
            <MetaBlock project={project} color={color} />
          </div>
          <div>
            <Paras text={project.description} />
          </div>
        </div>
      </div>

      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 5: Black Botanicals ── Pull Quotes in Margins ─────────────────────
// Full-bleed hero with white title overlay · three-column body (margin/text/keywords)

export function LayoutBotanicals({ project, prev, next, designPrefix, font, color }: LayoutProps) {
  const paras = project.description.split('\n\n')
  const pullQuote = project.excerpt.length > 120 ? project.excerpt.slice(0, 118) + '…' : project.excerpt

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />

      {/* Full-bleed hero with title + side images */}
      <div style={{ position: 'relative', width: '100%', height: '76vh', overflow: 'hidden', background: '#111' }}>
        <SafeImg src={project.coverImage} alt={project.title}
          style={{ width: project.images.length > 1 ? '70%' : '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.88 }} />

        {/* Side images */}
        {project.images.length > 1 && (
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '30%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {project.images.slice(1, 3).map((img, i) => (
              <div key={i} style={{ flex: 1, overflow: 'hidden' }}>
                <SafeImg src={img} alt={`Fig. ${i + 2}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.88 }} />
              </div>
            ))}
          </div>
        )}

        {/* White title overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: project.images.length > 1 ? '70%' : '100%',
          padding: '60px 40px 36px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
        }}>
          {project.subtitle && (
            <p style={{ fontFamily: MONO, fontSize: '10px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{project.subtitle}</p>
          )}
          <h1 style={{ fontFamily: font, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', color: '#fff', lineHeight: 1.0, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            {project.title}
          </h1>
        </div>
      </div>

      {/* Three-column body */}
      <div style={{ display: 'grid', gridTemplateColumns: '190px 1fr 190px', gap: '0 40px', padding: '60px 32px 80px', maxWidth: 1200, margin: '0 auto', alignItems: 'start' }}>
        {/* Left margin: pull quote + meta */}
        <div>
          <div style={{ borderLeft: `2px solid ${color}`, paddingLeft: 14, marginBottom: 36 }}>
            <p style={{ fontFamily: SERIF, fontSize: '0.85rem', fontStyle: 'italic', color: '#888', lineHeight: 1.75 }}>"{pullQuote}"</p>
          </div>
          <div style={{ fontFamily: MONO, fontSize: '10px', color: '#bbb', lineHeight: 2.2 }}>
            <p>{project.year}</p>
            <p>{project.location}</p>
          </div>
        </div>

        {/* Center: body text */}
        <div>
          <p style={{ fontFamily: SERIF, fontSize: '1.1rem', fontStyle: 'italic', color: '#333', lineHeight: 1.8, marginBottom: 32 }}>{project.excerpt}</p>
          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 28 }}>
            {paras.map((p, i) => (
              <p key={i} style={{ fontFamily: MONO, fontSize: '13px', color: '#444', lineHeight: 2.1, marginBottom: '22px' }}>{p}</p>
            ))}
          </div>
          {project.images.slice(3).map((img, i) => (
            <div key={i} style={{ margin: '32px 0', background: '#f5f5f5' }}>
              <SafeImg src={img} alt={`Fig. ${i + 4}`} style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 400 }} />
            </div>
          ))}
        </div>

        {/* Right margin: keywords */}
        <div>
          <p style={{ fontFamily: MONO, fontSize: '9px', color: '#ccc', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Keywords</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {project.tags.map(t => (
              <span key={t} style={{ fontFamily: MONO, fontSize: '10px', color: '#888', borderBottom: '1px solid #f0f0f0', paddingBottom: 8, marginBottom: 8, letterSpacing: '0.04em' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 6: The New Fake is Real ── Book Page ──────────────────────────────
// Centered narrow column · alternating image / text like a book

export function LayoutFakery({ project, prev, next, designPrefix, font, color }: LayoutProps) {
  const paras = project.description.split('\n\n')
  const half = Math.ceil(paras.length / 2)

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />

      <div style={{ maxWidth: 660, margin: '0 auto', padding: '64px 28px 80px' }}>
        {project.subtitle && (
          <p style={{ fontFamily: MONO, fontSize: '10px', color, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>{project.subtitle}</p>
        )}
        <h1 style={{ fontFamily: font, fontSize: 'clamp(1.8rem, 4vw, 3rem)', color, lineHeight: 1.05, textAlign: 'center', marginBottom: 12, textTransform: 'uppercase' }}>
          {project.title}
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 40, fontFamily: MONO, fontSize: '10px', color: '#bbb', letterSpacing: '0.06em' }}>
          <span>{project.year}</span><span>·</span><span>{project.location}</span>
        </div>

        <p style={{ fontFamily: SERIF, fontSize: '1.1rem', fontStyle: 'italic', color: '#333', lineHeight: 1.8, marginBottom: 36, textAlign: 'center' }}>
          {project.excerpt}
        </p>

        {/* First image */}
        {project.images[0] && (
          <div style={{ margin: '0 0 8px' }}>
            <div style={{ background: '#f5f5f5', overflow: 'hidden' }}>
              <SafeImg src={project.images[0]} alt={project.title} style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 500 }} />
            </div>
            <p style={{ fontFamily: MONO, fontSize: '9px', color: '#bbb', padding: '6px 0', letterSpacing: '0.06em' }}>Fig. 1</p>
          </div>
        )}

        <div style={{ borderTop: '1px solid #e8e8e8', padding: '36px 0 0', marginBottom: 0 }}>
          {paras.slice(0, half).map((p, i) => (
            <p key={i} style={{ fontFamily: MONO, fontSize: '13px', color: '#444', lineHeight: 2.1, marginBottom: '22px' }}>{p}</p>
          ))}
        </div>

        {/* Second image */}
        {project.images[1] && (
          <div style={{ margin: '8px 0 8px' }}>
            <div style={{ background: '#f5f5f5', overflow: 'hidden' }}>
              <SafeImg src={project.images[1]} alt={`${project.title} 2`} style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 420 }} />
            </div>
            <p style={{ fontFamily: MONO, fontSize: '9px', color: '#bbb', padding: '6px 0', letterSpacing: '0.06em' }}>Fig. 2</p>
          </div>
        )}

        {paras.slice(half).map((p, i) => (
          <p key={i} style={{ fontFamily: MONO, fontSize: '13px', color: '#444', lineHeight: 2.1, marginBottom: '22px' }}>{p}</p>
        ))}

        <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontFamily: MONO, fontSize: '9px', color: '#aaa', border: '1px solid #e8e8e8', padding: '2px 8px', letterSpacing: '0.04em' }}>{t}</span>
          ))}
        </div>
      </div>

      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 7: Blueprint ── 60/40 Split Screen ────────────────────────────────
// Sticky image left (60%) · scrollable details right (40%)

export function LayoutBlueprint({ project, prev, next, designPrefix, font, color }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr' }}>
        {/* Left 60%: sticky image */}
        <div style={{ position: 'sticky', top: 57, height: 'calc(100vh - 57px)', overflow: 'hidden', background: '#f5f5f5' }}>
          <SafeImg src={project.coverImage} alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>

        {/* Right 40%: scrollable project details */}
        <div style={{ padding: '56px 36px 80px 40px', borderLeft: '1px solid #f0f0f0', minHeight: '100vh' }}>
          {project.subtitle && (
            <p style={{ fontFamily: MONO, fontSize: '10px', color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>{project.subtitle}</p>
          )}
          <h1 style={{ fontFamily: font, fontSize: 'clamp(1.8rem, 3vw, 3.2rem)', color, lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: 32, textTransform: 'uppercase' }}>
            {project.title}
          </h1>
          <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: 24, marginBottom: 28 }}>
            <MetaBlock project={project} color={color} />
          </div>
          <p style={{ fontFamily: SERIF, fontSize: '1rem', fontStyle: 'italic', color: '#333', lineHeight: 1.8, marginBottom: 28 }}>
            {project.excerpt}
          </p>
          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 24 }}>
            <Paras text={project.description} />
          </div>
          {project.images[1] && (
            <div style={{ marginTop: 32, overflow: 'hidden', background: '#f5f5f5' }}>
              <SafeImg src={project.images[1]} alt={`${project.title} 2`}
                style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '4/3' }} />
              <p style={{ fontFamily: MONO, fontSize: '9px', color: '#bbb', padding: '6px 0', letterSpacing: '0.06em' }}>Fig. 2</p>
            </div>
          )}
        </div>
      </div>

      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 8: Post Fossils ── Masonry Grid + White Card ──────────────────────
// Alternating-height image grid · white description card overlapping from below

export function LayoutPostFossils({ project, prev, next, designPrefix, font, color }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />

      {/* Masonry-style grid — alternating heights */}
      {project.images.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {project.images.map((img, i) => (
            <div key={i} style={{
              background: '#f0f0f0', overflow: 'hidden',
              height: i % 2 === 0 ? '56vh' : '44vh',
            }}>
              <SafeImg src={img} alt={`${project.title} ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      )}

      {/* Elevated white description card */}
      <div style={{ position: 'relative', margin: '-52px 52px 0', zIndex: 10 }}>
        <div style={{ background: '#fff', border: '1px solid #e8e8e8', padding: '52px 48px', boxShadow: '0 4px 40px rgba(0,0,0,0.06)' }}>
          {project.subtitle && (
            <p style={{ fontFamily: MONO, fontSize: '10px', color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{project.subtitle}</p>
          )}
          <h1 style={{ fontFamily: font, fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', color, lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: 32, textTransform: 'uppercase' }}>
            {project.title}
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 60px', alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: SERIF, fontSize: '1.05rem', fontStyle: 'italic', color: '#333', lineHeight: 1.8, marginBottom: 28 }}>
                {project.excerpt}
              </p>
              <Paras text={project.description} />
            </div>
            <div style={{ borderLeft: '1px solid #f0f0f0', paddingLeft: 40 }}>
              <MetaBlock project={project} color={color} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 80 }} />
      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── Fallback layout for any project without a specific layout ────────────────
export function LayoutDefault({ project, prev, next, designPrefix, font, color }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />
      <div style={{ width: '100%', height: '60vh', overflow: 'hidden', background: '#f5f5f5' }}>
        <SafeImg src={project.coverImage} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '52px 28px 80px' }}>
        <h1 style={{ fontFamily: font, fontSize: 'clamp(2rem, 5vw, 4rem)', color, lineHeight: 1.05, marginBottom: 20, fontStyle: 'italic' }}>{project.title}</h1>
        <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: 24, marginBottom: 28 }}>
          <MetaBlock project={project} color={color} />
        </div>
        <p style={{ fontFamily: SERIF, fontSize: '1.05rem', fontStyle: 'italic', color: '#333', lineHeight: 1.8, marginBottom: 28 }}>{project.excerpt}</p>
        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 24 }}>
          <Paras text={project.description} />
        </div>
      </div>
      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── Routing map ──────────────────────────────────────────────────────────────
export const LAYOUT_MAP: Record<string, (props: LayoutProps) => React.ReactElement> = {
  'the-ecologies-of-repair':   LayoutEcologies,
  'dead-white-mans-clothes':   LayoutDWMC,
  'sender-receiver-residence': LayoutSender,
  'secondhand-speculation':    LayoutTShirt,
  'black-botanicals':          LayoutBotanicals,
  'the-fine-art-of-fakery':    LayoutFakery,
  'blueprint':                 LayoutBlueprint,
  'post-fossils':              LayoutPostFossils,
}
