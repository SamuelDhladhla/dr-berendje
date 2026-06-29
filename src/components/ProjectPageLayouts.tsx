'use client'
import React from 'react'
import Link from 'next/link'
import Img from '@/components/Img'
import { Project } from '@/types'

const HEADING = "'Instrument Serif', Georgia, serif"
const BODY = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
const ACCENT = '#C8553D'

export interface LayoutProps {
  project: Project
  prev?: Project
  next?: Project
  designPrefix: string
  font: string
  color: string
}

function FillImg({
  src, alt, wrapStyle, imgStyle,
}: {
  src: string; alt: string;
  wrapStyle?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
}) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...wrapStyle }}>
      <Img src={src} alt={alt} fill style={{ objectFit: 'cover', ...imgStyle }} />
    </div>
  )
}

function RepairMark({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0', ...style }}>
      <span style={{ fontSize: '9px', color: ACCENT, letterSpacing: '0.4em' }}>— — —</span>
    </div>
  )
}

function ProjectNav({ designPrefix }: { designPrefix: string }) {
  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '20px 32px', borderBottom: '1px solid #000',
      background: '#fff', position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Link href={designPrefix}
        style={{ fontFamily: BODY, fontSize: '12px', fontWeight: 400, color: '#000', letterSpacing: '0.04em', textDecoration: 'none' }}>
        ← Back
      </Link>
      <Link href={designPrefix} style={{ textDecoration: 'none' }}>
        <span style={{ fontFamily: HEADING, fontSize: '16px', fontWeight: 400, color: '#000' }}>
          dr<span style={{ color: ACCENT }}>.</span> Berendje
        </span>
      </Link>
    </nav>
  )
}

function PrevNext({ prev, next, designPrefix }: { prev?: Project; next?: Project; designPrefix: string }) {
  return (
    <>
      <RepairMark style={{ padding: '32px 0' }} />
      <div style={{ borderTop: '1px solid #000', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {prev ? (
          <Link href={`${designPrefix}/project/${prev.slug}`}
            style={{ textDecoration: 'none', padding: '24px 32px', borderRight: '1px solid #000' }}>
            <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 300, color: '#000', marginBottom: 6, letterSpacing: '0.04em' }}>← Previous</p>
            <p style={{ fontFamily: HEADING, fontSize: '1rem', fontStyle: 'italic', color: '#000' }}>{prev.title}</p>
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`${designPrefix}/project/${next.slug}`}
            style={{ textDecoration: 'none', padding: '24px 32px', textAlign: 'right' }}>
            <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 300, color: '#000', marginBottom: 6, letterSpacing: '0.04em' }}>Next →</p>
            <p style={{ fontFamily: HEADING, fontSize: '1rem', fontStyle: 'italic', color: '#000' }}>{next.title}</p>
          </Link>
        ) : <div />}
      </div>
    </>
  )
}

function PageFooter() {
  return (
    <footer style={{ borderTop: '1px solid #000', padding: '24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: '9px', color: ACCENT, letterSpacing: '0.4em' }}>— — —</span>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <span style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 400, color: '#000', letterSpacing: '0.04em' }}>
          PhD Design Research · ArtEZ University of the Arts
        </span>
        <a href="mailto:linda@drberendje.com"
          style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 400, color: '#000', letterSpacing: '0.04em', textDecoration: 'none' }}>
          linda@drberendje.com
        </a>
      </div>
    </footer>
  )
}

function MetaBlock({ project }: { project: Project }) {
  const statusLabel = project.status === 'complete' ? 'Complete'
    : project.status === 'in-progress' ? 'In Progress' : 'Ongoing'
  return (
    <div>
      <div style={{ fontFamily: BODY, fontSize: '11px', lineHeight: 2.2, color: '#000', fontWeight: 300, marginBottom: 12 }}>
        <span>{project.year}</span>
        <span style={{ margin: '0 8px' }}>·</span>
        <span>{project.location}</span>
        <span style={{ margin: '0 8px' }}>·</span>
        <span style={{ fontWeight: 400 }}>{statusLabel}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
        {project.tags.map(t => (
          <span key={t} style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 300, color: '#000', border: '1px solid #000', padding: '2px 8px', letterSpacing: '0.04em' }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function Paras({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((p, i) => (
        <p key={i} style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 400, color: '#000', lineHeight: 1.9, marginBottom: '22px' }}>{p}</p>
      ))}
    </>
  )
}

// ─── LAYOUT 1: The Ecologies of Repair ── Journal Article ────────────────────

export function LayoutEcologies({ project, prev, next, designPrefix, font }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />
      <FillImg src={project.coverImage} alt={project.title}
        wrapStyle={{ width: '100%', height: '62vh', background: '#f5f5f5' }} />

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '52px 28px 40px', textAlign: 'center', borderBottom: '1px solid #000' }}>
        {project.subtitle && (
          <p style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 500, color: '#000', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>{project.subtitle}</p>
        )}
        <h1 style={{ fontFamily: font, fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#000', lineHeight: 1.05, marginBottom: 20, fontStyle: 'italic' }}>
          {project.title}
        </h1>
        <p style={{ fontFamily: HEADING, fontSize: '1.05rem', fontStyle: 'italic', color: '#000', lineHeight: 1.8, fontWeight: 400 }}>
          {project.excerpt}
        </p>
      </div>

      <RepairMark />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '0 52px', padding: '32px 32px 0', maxWidth: 1100, margin: '0 auto', alignItems: 'start' }}>
        <div>
          <Paras text={project.description} />
          {project.images.slice(1).map((img, i) => (
            <div key={i} style={{ margin: '32px 0' }}>
              <FillImg src={img} alt={`Fig. ${i + 2}`}
                wrapStyle={{ width: '100%', height: 440, background: '#f5f5f5' }} />
              <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 300, color: '#000', letterSpacing: '0.04em', marginTop: 6 }}>Fig. {i + 2} — {project.location}</p>
            </div>
          ))}
        </div>
        <div style={{ borderLeft: '1px solid #000', paddingLeft: 32 }}>
          <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, color: '#000', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>Citation</p>
          <MetaBlock project={project} />
        </div>
      </div>

      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 2: Obroni Wa Wu ── Research Report ──────────────────────────────

export function LayoutDWMC({ project, prev, next, designPrefix, font }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />
      <div style={{ display: 'grid', gridTemplateColumns: '55fr 45fr', minHeight: 'calc(100vh - 57px)', alignItems: 'start' }}>
        <div style={{ padding: '60px 48px 80px 32px', borderRight: '1px solid #000' }}>
          {project.subtitle && (
            <p style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 500, color: '#000', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>{project.subtitle}</p>
          )}
          <h1 style={{ fontFamily: font, fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)', color: '#000', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: 36, fontStyle: 'italic' }}>
            {project.title}
          </h1>
          <div style={{ borderTop: '1px solid #000', paddingTop: 24, marginBottom: 28 }}>
            <MetaBlock project={project} />
          </div>
          <p style={{ fontFamily: HEADING, fontSize: '1.05rem', fontStyle: 'italic', color: '#000', lineHeight: 1.8, marginBottom: 32 }}>
            {project.excerpt}
          </p>
          <RepairMark style={{ padding: '12px 0' }} />
          <Paras text={project.description} />
        </div>

        <div style={{ padding: '60px 28px 60px 32px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {project.images.map((img, i) => (
            <div key={i}>
              <FillImg src={img} alt={`Fig. ${i + 1}`}
                wrapStyle={{ width: '100%', height: 280, background: '#f5f5f5' }} />
              <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 300, color: '#000', padding: '5px 0 12px', letterSpacing: '0.04em' }}>Fig. {i + 1}</p>
            </div>
          ))}
        </div>
      </div>

      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 3: Sender – Receiver ── Exhibition Catalog ──────────────────────

export function LayoutSender({ project, prev, next, designPrefix, font }: LayoutProps) {
  const n = project.images.length
  const cols = n >= 3 ? 3 : n === 2 ? 2 : 1
  const imgH = cols === 1 ? '62vh' : '52vh'
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 2 }}>
        {project.images.map((img, i) => (
          <FillImg key={i} src={img} alt={`${project.title} ${i + 1}`}
            wrapStyle={{ width: '100%', height: imgH, background: '#f0f0f0' }} />
        ))}
      </div>

      <RepairMark />

      <div style={{ maxWidth: 620, margin: '0 auto', padding: '28px 28px 80px' }}>
        {project.subtitle && (
          <p style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 500, color: '#000', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>{project.subtitle}</p>
        )}
        <h1 style={{ fontFamily: font, fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', color: '#000', lineHeight: 1.05, textAlign: 'center', marginBottom: 28, fontStyle: 'italic' }}>
          {project.title}
        </h1>
        <div style={{ borderTop: '1px solid #000', paddingTop: 20, marginBottom: 24 }}>
          <MetaBlock project={project} />
        </div>
        <p style={{ fontFamily: HEADING, fontSize: '1.05rem', fontStyle: 'italic', color: '#000', lineHeight: 1.8, marginBottom: 28, textAlign: 'center' }}>
          {project.excerpt}
        </p>
        <RepairMark style={{ padding: '12px 0' }} />
        <Paras text={project.description} />
      </div>

      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 4: Secondhand Speculation ── Zine ───────────────────────────────

export function LayoutTShirt({ project, prev, next, designPrefix, font }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />
      <div style={{ overflowX: 'auto', scrollbarWidth: 'none', borderBottom: '2px solid #000' }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {project.images.map((img, i) => (
            <div key={i} style={{
              flexShrink: 0, position: 'relative',
              width: project.images.length === 1 ? '100vw' : '68vw',
              height: '64vh', background: '#f0f0f0', overflow: 'hidden',
            }}>
              <Img src={img} alt={`${project.title} ${i + 1}`} fill style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '48px 32px 80px', maxWidth: 1100 }}>
        {project.subtitle && (
          <p style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 500, color: '#000', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>{project.subtitle}</p>
        )}
        <h1 style={{ fontFamily: font, fontSize: 'clamp(3rem, 8vw, 9rem)', color: '#000', lineHeight: 0.88, letterSpacing: '-0.03em', marginBottom: 44, fontStyle: 'italic' }}>
          {project.title}
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px', borderTop: '1px solid #000', paddingTop: 32 }}>
          <div>
            <p style={{ fontFamily: HEADING, fontSize: '1.1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.8, marginBottom: 28 }}>{project.excerpt}</p>
            <MetaBlock project={project} />
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

// ─── LAYOUT 5: Black Botanicals ── Pull Quotes ──────────────────────────────

export function LayoutBotanicals({ project, prev, next, designPrefix, font }: LayoutProps) {
  const paras = project.description.split('\n\n')
  const pullQuote = project.excerpt.length > 120 ? project.excerpt.slice(0, 118) + '…' : project.excerpt

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />

      <div style={{ position: 'relative', width: '100%', height: '76vh', overflow: 'hidden', background: '#111' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: project.images.length > 1 ? '70%' : '100%',
          height: '100%',
        }}>
          <Img src={project.coverImage} alt={project.title} fill style={{ objectFit: 'cover', opacity: 0.88 }} />
        </div>

        {project.images.length > 1 && (
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '30%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {project.images.slice(1, 3).map((img, i) => (
              <div key={i} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <Img src={img} alt={`Fig. ${i + 2}`} fill style={{ objectFit: 'cover', opacity: 0.88 }} />
              </div>
            ))}
          </div>
        )}

        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: project.images.length > 1 ? '70%' : '100%',
          padding: '60px 40px 36px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
        }}>
          {project.subtitle && (
            <p style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 400, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{project.subtitle}</p>
          )}
          <h1 style={{ fontFamily: font, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em', fontStyle: 'italic' }}>
            {project.title}
          </h1>
        </div>
      </div>

      <RepairMark />

      <div style={{ display: 'grid', gridTemplateColumns: '190px 1fr 190px', gap: '0 40px', padding: '32px 32px 80px', maxWidth: 1200, margin: '0 auto', alignItems: 'start' }}>
        <div>
          <div style={{ borderLeft: '2px solid #000', paddingLeft: 14, marginBottom: 36 }}>
            <p style={{ fontFamily: HEADING, fontSize: '0.85rem', fontStyle: 'italic', color: '#000', lineHeight: 1.75 }}>"{pullQuote}"</p>
          </div>
          <div style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 300, color: '#000', lineHeight: 2.2 }}>
            <p>{project.year}</p>
            <p>{project.location}</p>
          </div>
        </div>

        <div>
          <p style={{ fontFamily: HEADING, fontSize: '1.1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.8, marginBottom: 32 }}>{project.excerpt}</p>
          <div style={{ borderTop: '1px solid #000', paddingTop: 28 }}>
            {paras.map((p, i) => (
              <p key={i} style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 400, color: '#000', lineHeight: 1.9, marginBottom: '22px' }}>{p}</p>
            ))}
          </div>
          {project.images.slice(3).map((img, i) => (
            <FillImg key={i} src={img} alt={`Fig. ${i + 4}`}
              wrapStyle={{ margin: '32px 0', width: '100%', height: 400, background: '#f5f5f5' }} />
          ))}
        </div>

        <div>
          <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, color: '#000', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Keywords</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {project.tags.map(t => (
              <span key={t} style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 300, color: '#000', borderBottom: '1px solid #000', paddingBottom: 8, marginBottom: 8, letterSpacing: '0.04em' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 6: The Fine Art of Fakery ── Book Page ──────────────────────────

export function LayoutFakery({ project, prev, next, designPrefix, font }: LayoutProps) {
  const paras = project.description.split('\n\n')
  const half = Math.ceil(paras.length / 2)

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />
      <div style={{ maxWidth: 660, margin: '0 auto', padding: '64px 28px 80px' }}>
        {project.subtitle && (
          <p style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 500, color: '#000', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>{project.subtitle}</p>
        )}
        <h1 style={{ fontFamily: font, fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#000', lineHeight: 1.05, textAlign: 'center', marginBottom: 12, fontStyle: 'italic' }}>
          {project.title}
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 40, fontFamily: BODY, fontSize: '11px', fontWeight: 300, color: '#000', letterSpacing: '0.04em' }}>
          <span>{project.year}</span><span>·</span><span>{project.location}</span>
        </div>
        <p style={{ fontFamily: HEADING, fontSize: '1.1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.8, marginBottom: 36, textAlign: 'center' }}>
          {project.excerpt}
        </p>

        {project.images[0] && (
          <div style={{ marginBottom: 8 }}>
            <FillImg src={project.images[0]} alt={project.title}
              wrapStyle={{ width: '100%', height: 500, background: '#f5f5f5' }} />
            <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 300, color: '#000', padding: '6px 0', letterSpacing: '0.04em' }}>Fig. 1</p>
          </div>
        )}

        <RepairMark style={{ padding: '12px 0' }} />

        {paras.slice(0, half).map((p, i) => (
          <p key={i} style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 400, color: '#000', lineHeight: 1.9, marginBottom: '22px' }}>{p}</p>
        ))}

        {project.images[1] && (
          <div style={{ margin: '8px 0' }}>
            <FillImg src={project.images[1]} alt={`${project.title} 2`}
              wrapStyle={{ width: '100%', height: 420, background: '#f5f5f5' }} />
            <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 300, color: '#000', padding: '6px 0', letterSpacing: '0.04em' }}>Fig. 2</p>
          </div>
        )}

        {paras.slice(half).map((p, i) => (
          <p key={i} style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 400, color: '#000', lineHeight: 1.9, marginBottom: '22px' }}>{p}</p>
        ))}

        <div style={{ borderTop: '1px solid #000', paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: '4px', justifyContent: 'center' }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 300, color: '#000', border: '1px solid #000', padding: '2px 8px', letterSpacing: '0.04em' }}>{t}</span>
          ))}
        </div>
      </div>

      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 7: Blueprint ── 60/40 Split Screen ──────────────────────────────

export function LayoutBlueprint({ project, prev, next, designPrefix, font }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr' }}>
        <div style={{ position: 'sticky', top: 57, height: 'calc(100vh - 57px)', overflow: 'hidden', background: '#f5f5f5' }}>
          <Img src={project.coverImage} alt={project.title} fill style={{ objectFit: 'cover' }} />
        </div>

        <div style={{ padding: '56px 36px 80px 40px', borderLeft: '1px solid #000', minHeight: '100vh' }}>
          {project.subtitle && (
            <p style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 500, color: '#000', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>{project.subtitle}</p>
          )}
          <h1 style={{ fontFamily: font, fontSize: 'clamp(1.8rem, 3vw, 3.2rem)', color: '#000', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: 32, fontStyle: 'italic' }}>
            {project.title}
          </h1>
          <div style={{ borderTop: '1px solid #000', paddingTop: 24, marginBottom: 28 }}>
            <MetaBlock project={project} />
          </div>
          <p style={{ fontFamily: HEADING, fontSize: '1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.8, marginBottom: 28 }}>
            {project.excerpt}
          </p>
          <RepairMark style={{ padding: '12px 0' }} />
          <Paras text={project.description} />
          {project.images[1] && (
            <div style={{ marginTop: 32 }}>
              <FillImg src={project.images[1]} alt={`${project.title} 2`}
                wrapStyle={{ width: '100%', height: 280, background: '#f5f5f5' }} />
              <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 300, color: '#000', padding: '6px 0', letterSpacing: '0.04em' }}>Fig. 2</p>
            </div>
          )}
        </div>
      </div>

      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 8: Post Fossils ── Masonry Grid + White Card ────────────────────

export function LayoutPostFossils({ project, prev, next, designPrefix, font }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />

      {project.images.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {project.images.map((img, i) => (
            <FillImg key={i} src={img} alt={`${project.title} ${i + 1}`}
              wrapStyle={{ width: '100%', height: i % 2 === 0 ? '56vh' : '44vh', background: '#f0f0f0' }} />
          ))}
        </div>
      )}

      <div style={{ position: 'relative', margin: '-52px 52px 0', zIndex: 10 }}>
        <div style={{ background: '#fff', border: '1px solid #000', padding: '52px 48px' }}>
          {project.subtitle && (
            <p style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 500, color: '#000', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>{project.subtitle}</p>
          )}
          <h1 style={{ fontFamily: font, fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', color: '#000', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: 32, fontStyle: 'italic' }}>
            {project.title}
          </h1>
          <RepairMark style={{ padding: '12px 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 60px', alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: HEADING, fontSize: '1.05rem', fontStyle: 'italic', color: '#000', lineHeight: 1.8, marginBottom: 28 }}>
                {project.excerpt}
              </p>
              <Paras text={project.description} />
            </div>
            <div style={{ borderLeft: '1px solid #000', paddingLeft: 40 }}>
              <MetaBlock project={project} />
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

// ─── Fallback ────────────────────────────────────────────────────────────────

export function LayoutDefault({ project, prev, next, designPrefix, font }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />
      <FillImg src={project.coverImage} alt={project.title}
        wrapStyle={{ width: '100%', height: '60vh', background: '#f5f5f5' }} />
      <RepairMark />
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 28px 80px' }}>
        <h1 style={{ fontFamily: font, fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#000', lineHeight: 1.05, marginBottom: 20, fontStyle: 'italic' }}>{project.title}</h1>
        <div style={{ borderTop: '1px solid #000', paddingTop: 24, marginBottom: 28 }}>
          <MetaBlock project={project} />
        </div>
        <p style={{ fontFamily: HEADING, fontSize: '1.05rem', fontStyle: 'italic', color: '#000', lineHeight: 1.8, marginBottom: 28 }}>{project.excerpt}</p>
        <RepairMark style={{ padding: '12px 0' }} />
        <Paras text={project.description} />
      </div>
      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── Routing map ─────────────────────────────────────────────────────────────

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
