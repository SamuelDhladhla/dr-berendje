'use client'
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Img from '@/components/Img'
import { Project } from '@/types'

const BODY = "'Suisse Intl', 'Neue Haas Grotesk Text', Inter, -apple-system, Arial, sans-serif"
const ACCENT = '#C8553D'

// Per-project font identity
const PROJECT_FONT: Record<string, { font: string; weight: number; style: string }> = {
  'in-no-particular-order':    { font: "'Instrument Serif', Georgia, serif",              weight: 400, style: 'italic'  },
  'tsht-tales':                { font: "'Big Shoulders Display', 'Arial Black', sans-serif", weight: 900, style: 'normal' },
  'the-ecologies-of-repair':   { font: "'Cormorant Garamond', Georgia, serif",            weight: 400, style: 'italic'  },
  'dead-white-mans-clothes':   { font: "'Space Grotesk', Arial, sans-serif",              weight: 700, style: 'normal' },
  'sender-receiver-residence': { font: "'Courier Prime', 'Courier New', monospace",       weight: 700, style: 'normal' },
  'secondhand-speculation':    { font: "'DM Sans', 'Helvetica Neue', sans-serif",         weight: 700, style: 'normal' },
  'black-botanicals':          { font: "'Libre Baskerville', Georgia, serif",             weight: 700, style: 'italic' },
  'the-fine-art-of-fakery':    { font: "'Jost', 'Futura', Arial, sans-serif",             weight: 700, style: 'normal' },
  'blueprint':                 { font: "'Archivo Black', 'Arial Black', sans-serif",      weight: 400, style: 'normal' },
  'textile-trade-book':        { font: "'Great Vibes', cursive",                          weight: 400, style: 'normal' },
  'post-fossils':              { font: "Inter, 'Helvetica Neue', Arial, sans-serif",      weight: 300, style: 'normal' },
  'waste-colonialism':         { font: "'Syne', sans-serif",                              weight: 800, style: 'normal' },
  'moving-material-museum':    { font: "'IBM Plex Sans', 'Helvetica Neue', sans-serif",   weight: 700, style: 'normal' },
  'paper-making':              { font: "'EB Garamond', Georgia, serif",                   weight: 400, style: 'italic' },
}

export interface LayoutProps {
  project: Project
  prev?: Project
  next?: Project
  designPrefix: string
  font: string
  color: string
}

// ── B&W → Color scroll reveal ─────────────────────────────────────────────────
function useColorReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const imgs = container.querySelectorAll<HTMLImageElement>('img.bw-reveal')
    imgs.forEach(img => { img.style.filter = 'grayscale(100%)'; img.style.transition = 'filter 0.9s ease' })
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { (e.target as HTMLImageElement).style.filter = e.isIntersecting ? 'grayscale(0%)' : 'grayscale(100%)' })
    }, { threshold: 0.3 })
    imgs.forEach(img => obs.observe(img))
    return () => obs.disconnect()
  }, [])
  return ref
}

// ── Shared micro-components ───────────────────────────────────────────────────

function BwImg({ src, alt, wrapStyle, reveal = true }: { src: string; alt: string; wrapStyle?: React.CSSProperties; reveal?: boolean }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#f0f0f0', ...wrapStyle }}>
      <Img src={src} alt={alt} fill style={{ objectFit: 'cover' }} />
      {reveal && <div style={{
        position: 'absolute', inset: 0,
        mixBlendMode: 'color',
        background: '#fff',
        transition: 'opacity 0.9s ease',
        pointerEvents: 'none',
      }} className="bw-overlay" />}
    </div>
  )
}

function ProjectNav({ designPrefix }: { designPrefix: string; project: Project }) {
  return (
    <nav style={{ borderBottom: '1px solid #000', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 40px' }}>
        <Link href={designPrefix} style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 400, color: '#000', letterSpacing: '0.04em', textDecoration: 'none' }}>
          ← Research Projects
        </Link>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '15px', fontWeight: 400, color: '#000', fontStyle: 'italic' }}>
            dr<span style={{ color: ACCENT }}>.</span> Berendje
          </span>
        </Link>
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { label: 'Writing', href: '/writing' },
            { label: 'Education', href: '/education' },
            { label: 'About', href: '/about' },
          ].map(n => (
            <Link key={n.label} href={n.href} style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 400, color: '#000', textDecoration: 'none', letterSpacing: '0.04em', opacity: 0.5 }}>
              {n.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

function TitleBlock({ project }: { project: Project }) {
  const pf = PROJECT_FONT[project.slug] ?? { font: "'Instrument Serif', Georgia, serif", weight: 400, style: 'italic' }
  return (
    <div>
      {project.subtitle && (
        <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', marginBottom: 16 }}>{project.subtitle}</p>
      )}
      <h1 style={{
        fontFamily: pf.font,
        fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
        fontWeight: pf.weight,
        fontStyle: pf.style as 'normal' | 'italic',
        color: '#000',
        lineHeight: 0.92,
        letterSpacing: '-0.025em',
        marginBottom: 0,
      }}>
        {project.title}
      </h1>
    </div>
  )
}

function MetaBlock({ project }: { project: Project }) {
  return (
    <div style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 300, color: '#000', lineHeight: 2, marginBottom: 16 }}>
      <div>{project.year} · {project.location}</div>
      <div style={{ fontWeight: 400 }}>{project.status === 'complete' ? 'Complete' : project.status === 'in-progress' ? 'In Progress' : 'Ongoing'}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
        {project.tags.map(t => (
          <span key={t} style={{ fontSize: '10px', letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function Paras({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((p, i) => (
        <p key={i} style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 400, color: '#000', lineHeight: 1.9, marginBottom: 22 }}>{p}</p>
      ))}
    </>
  )
}

function PrevNext({ prev, next, designPrefix }: { prev?: Project; next?: Project; designPrefix: string }) {
  const pPf = prev ? (PROJECT_FONT[prev.slug] ?? { font: "'Instrument Serif'", style: 'italic' }) : null
  const nPf = next ? (PROJECT_FONT[next.slug] ?? { font: "'Instrument Serif'", style: 'italic' }) : null
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: 80 }}>
      {prev && pPf ? (
        <Link href={`${designPrefix}/${prev.slug}`} style={{ textDecoration: 'none', padding: '40px 40px' }}>
          <p style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000', marginBottom: 10 }}>← Previous</p>
          <p style={{ fontFamily: pPf.font, fontSize: '1.4rem', fontStyle: pPf.style as 'normal'|'italic', color: '#000' }}>{prev.title}</p>
        </Link>
      ) : <div />}
      {next && nPf ? (
        <Link href={`${designPrefix}/${next.slug}`} style={{ textDecoration: 'none', padding: '40px 40px', textAlign: 'right' }}>
          <p style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000', marginBottom: 10 }}>Next →</p>
          <p style={{ fontFamily: nPf.font, fontSize: '1.4rem', fontStyle: nPf.style as 'normal'|'italic', color: '#000' }}>{next.title}</p>
        </Link>
      ) : <div />}
    </div>
  )
}

function PageFooter() {
  return (
    <footer style={{ padding: '60px 40px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000' }}>— — —</span>
      <span style={{ fontFamily: BODY, fontSize: '10px', color: '#000' }}>PhD Design Research · ArtEZ University of the Arts</span>
      <a href="mailto:linda@drberendje.com" style={{ fontFamily: BODY, fontSize: '10px', color: '#000', textDecoration: 'none', borderBottom: '1px solid #000', paddingBottom: 1 }}>
        linda@drberendje.com
      </a>
    </footer>
  )
}

// ─── LAYOUT 1: Ecologies of Repair ── Vertical split: text left / image stack right ──

export function LayoutEcologies({ project, prev, next, designPrefix }: LayoutProps) {
  const ref = useColorReveal()
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} project={project} />
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

        {/* Left — all text */}
        <div style={{ padding: '80px 64px 80px 40px' }}>
          <TitleBlock project={project} />
          <div style={{ margin: '40px 0 32px' }}>
            <MetaBlock project={project} />
          </div>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '1.1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginBottom: 40 }}>
            {project.excerpt}
          </p>
          <Paras text={project.description} />
        </div>

        {/* Right — image stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {project.images.map((img, i) => (
            <div key={i} style={{ position: 'relative', flex: 1, minHeight: 320, background: '#f0f0f0', overflow: 'hidden' }}>
              <img className="bw-reveal" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${img}`} alt={`Fig. ${i + 1}`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 2: Obroni Wa Wu ── 55/45 split, text left ────────────────────────

export function LayoutDWMC({ project, prev, next, designPrefix }: LayoutProps) {
  const ref = useColorReveal()
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} project={project} />
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '55fr 45fr' }}>
        <div style={{ padding: '80px 64px 80px 40px' }}>
          <TitleBlock project={project} />
          <div style={{ margin: '40px 0 32px' }}>
            <MetaBlock project={project} />
          </div>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '1.1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginBottom: 40 }}>
            {project.excerpt}
          </p>
          <Paras text={project.description} />
        </div>
        <div style={{ padding: '60px 40px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {project.images.map((img, i) => (
            <div key={i} style={{ position: 'relative', flex: 1, minHeight: 260, background: '#f0f0f0', overflow: 'hidden' }}>
              <img className="bw-reveal" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${img}`} alt={`Fig. ${i + 1}`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 300, color: '#000', position: 'absolute', bottom: 8, left: 12, letterSpacing: '0.04em', background: 'rgba(255,255,255,0.85)', padding: '2px 6px' }}>Fig. {i + 1}</p>
            </div>
          ))}
        </div>
      </div>
      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 3: Sender–Receiver ── Header text / Image strip below ─────────────

export function LayoutSender({ project, prev, next, designPrefix }: LayoutProps) {
  const ref = useColorReveal()
  const n = project.images.length
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} project={project} />
      <div ref={ref}>
        {/* Header — two columns: title left, excerpt right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px', padding: '80px 40px 60px' }}>
          <div>
            <TitleBlock project={project} />
            <div style={{ marginTop: 28 }}>
              <MetaBlock project={project} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '1.15rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7 }}>
              {project.excerpt}
            </p>
          </div>
        </div>

        {/* Image strip */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(n, 3)}, 1fr)`, gap: 2 }}>
          {project.images.map((img, i) => (
            <div key={i} style={{ position: 'relative', width: '100%', height: '55vh', background: '#f0f0f0', overflow: 'hidden' }}>
              <img className="bw-reveal" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${img}`} alt={`Fig. ${i + 1}`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        {/* Body text */}
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '72px 40px 100px' }}>
          <Paras text={project.description} />
        </div>
      </div>
      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 4: Secondhand Speculation ── Horizontal image scroll + body ───────

export function LayoutTShirt({ project, prev, next, designPrefix }: LayoutProps) {
  const ref = useColorReveal()
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} project={project} />
      <div ref={ref}>
        {/* Title header */}
        <div style={{ padding: '72px 40px 48px' }}>
          {project.subtitle && (
            <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', marginBottom: 16 }}>{project.subtitle}</p>
          )}
          <h1 style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", fontSize: 'clamp(3.5rem, 9vw, 10rem)', fontWeight: 700, color: '#000', lineHeight: 0.88, letterSpacing: '-0.04em', margin: 0 }}>
            {project.title}
          </h1>
        </div>

        {/* Horizontal scroll images */}
        <div style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {project.images.map((img, i) => (
              <div key={i} style={{ flexShrink: 0, position: 'relative', width: project.images.length === 1 ? '100vw' : '70vw', height: '65vh', background: '#f0f0f0', overflow: 'hidden' }}>
                <img className="bw-reveal" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${img}`} alt={`${project.title} ${i + 1}`}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Two-column body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px', padding: '72px 40px 100px' }}>
          <div>
            <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '1.1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginBottom: 32 }}>{project.excerpt}</p>
            <MetaBlock project={project} />
          </div>
          <Paras text={project.description} />
        </div>
      </div>
      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 5: Black Botanicals ── Three-column: pull quote / text / sidebar ──

export function LayoutBotanicals({ project, prev, next, designPrefix }: LayoutProps) {
  const ref = useColorReveal()
  const paras = project.description.split('\n\n')
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} project={project} />
      <div ref={ref}>
        {/* Header: title + first image side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ padding: '80px 64px 80px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <TitleBlock project={project} />
            <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '1.05rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginTop: 32 }}>{project.excerpt}</p>
          </div>
          <div style={{ position: 'relative', minHeight: 440, background: '#f0f0f0', overflow: 'hidden' }}>
            <img className="bw-reveal" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${project.coverImage}`} alt={project.title}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Three-column body */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 200px', gap: '0 48px', padding: '60px 40px 80px', alignItems: 'start' }}>
          <div>
            <div style={{ marginBottom: 40 }}>
              <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '0.9rem', fontStyle: 'italic', color: '#000', lineHeight: 1.75 }}>"{project.excerpt.slice(0, 130)}…"</p>
            </div>
            {project.images[1] && (
              <div style={{ position: 'relative', height: 240, background: '#f0f0f0', overflow: 'hidden' }}>
                <img className="bw-reveal" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${project.images[1]}`} alt="Fig. 2"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>
          <div>
            <div style={{ paddingTop: 8 }}>
              {paras.map((p, i) => (
                <p key={i} style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 400, color: '#000', lineHeight: 1.9, marginBottom: 22 }}>{p}</p>
              ))}
            </div>
            {project.images[2] && (
              <div style={{ position: 'relative', height: 360, background: '#f0f0f0', overflow: 'hidden', marginTop: 32 }}>
                <img className="bw-reveal" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${project.images[2]}`} alt="Fig. 3"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>
          <div>
            <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#000', marginBottom: 20 }}>Keywords</p>
            {project.tags.map(t => (
              <span key={t} style={{ display: 'block', fontFamily: BODY, fontSize: '10px', fontWeight: 300, color: '#000', marginBottom: 12, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{t}</span>
            ))}
            <div style={{ marginTop: 32 }}>
              <MetaBlock project={project} />
            </div>
          </div>
        </div>
      </div>
      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 6: The Fine Art of Fakery ── Images left / text right split ───────

export function LayoutFakery({ project, prev, next, designPrefix }: LayoutProps) {
  const ref = useColorReveal()
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} project={project} />
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {/* Left — stacked images */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {project.images.map((img, i) => (
            <div key={i} style={{ position: 'relative', flex: 1, minHeight: 320, background: '#f0f0f0', overflow: 'hidden' }}>
              <img className="bw-reveal" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${img}`} alt={`Fig. ${i + 1}`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        {/* Right — all text */}
        <div style={{ padding: '80px 40px 80px 64px' }}>
          <TitleBlock project={project} />
          <div style={{ margin: '40px 0 32px' }}>
            <MetaBlock project={project} />
          </div>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '1.1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginBottom: 40 }}>{project.excerpt}</p>
          <Paras text={project.description} />
        </div>
      </div>
      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 7: Blueprint ── Sticky image left / scrolling text right ──────────

export function LayoutBlueprint({ project, prev, next, designPrefix }: LayoutProps) {
  const ref = useColorReveal()
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} project={project} />
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '3fr 2fr' }}>
        <div style={{ position: 'sticky', top: 57, height: 'calc(100vh - 57px)', overflow: 'hidden', background: '#f5f5f5' }}>
          <img className="bw-reveal" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${project.coverImage}`} alt={project.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ padding: '80px 40px 80px 64px', minHeight: '100vh' }}>
          <TitleBlock project={project} />
          <div style={{ margin: '40px 0 32px' }}>
            <MetaBlock project={project} />
          </div>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginBottom: 40 }}>{project.excerpt}</p>
          <Paras text={project.description} />
          {project.images[1] && (
            <div style={{ marginTop: 32, position: 'relative', height: 280, background: '#f0f0f0', overflow: 'hidden' }}>
              <img className="bw-reveal" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${project.images[1]}`} alt="Fig. 2"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>
      </div>
      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 8: Post Fossils ── Masonry grid + floating white card ─────────────

export function LayoutPostFossils({ project, prev, next, designPrefix }: LayoutProps) {
  const ref = useColorReveal()
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} project={project} />
      <div ref={ref}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {project.images.map((img, i) => (
            <div key={i} style={{ position: 'relative', height: i % 2 === 0 ? '56vh' : '44vh', background: '#f0f0f0', overflow: 'hidden' }}>
              <img className="bw-reveal" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${img}`} alt={`${project.title} ${i + 1}`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
        <div style={{ position: 'relative', margin: '-52px 48px 0', zIndex: 10 }}>
          <div style={{ background: '#fff', padding: '72px 48px' }}>
            <TitleBlock project={project} />
            <div style={{ height: 40 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 64px' }}>
              <div>
                <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '1.05rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginBottom: 36 }}>{project.excerpt}</p>
                <Paras text={project.description} />
              </div>
              <div style={{ paddingLeft: 40 }}>
                <MetaBlock project={project} />
              </div>
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

// ─── Fallback ─────────────────────────────────────────────────────────────────

export function LayoutDefault({ project, prev, next, designPrefix }: LayoutProps) {
  const ref = useColorReveal()
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} project={project} />
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ padding: '80px 64px 80px 40px' }}>
          <TitleBlock project={project} />
          <div style={{ margin: '40px 0 32px' }}>
            <MetaBlock project={project} />
          </div>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '1.1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginBottom: 40 }}>{project.excerpt}</p>
          <Paras text={project.description} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {project.images.slice(0, 2).map((img, i) => (
            <div key={i} style={{ position: 'relative', flex: 1, minHeight: 300, background: '#f0f0f0', overflow: 'hidden' }}>
              <img className="bw-reveal" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${img}`} alt={`Fig. ${i + 1}`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
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
