'use client'
import React, { useEffect, useRef } from 'react'
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

// ── B&W → Color scroll reveal hook ───────────────────────────────────────────
function useColorReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const imgs = el.querySelectorAll<HTMLImageElement>('img[data-reveal]')
    if (!imgs.length) return

    imgs.forEach(img => {
      img.style.filter = 'grayscale(100%)'
      img.style.transition = 'filter 0.8s ease'
    })

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const img = entry.target as HTMLImageElement
        img.style.filter = entry.isIntersecting ? 'grayscale(0%)' : 'grayscale(100%)'
      })
    }, { threshold: 0.35 })

    imgs.forEach(img => observer.observe(img))
    return () => observer.disconnect()
  }, [])
}

// ── Shared components ─────────────────────────────────────────────────────────

function RevealImg({ src, alt, wrapStyle, imgStyle }: {
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

function ProjectNav({ designPrefix }: { designPrefix: string }) {
  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 40px', borderBottom: '1px solid #000',
      background: '#fff', position: 'sticky', top: 0, zIndex: 100,
    }}>
      <Link href={designPrefix} style={{
        fontFamily: BODY, fontSize: '11px', fontWeight: 400,
        color: '#000', letterSpacing: '0.04em', textDecoration: 'none',
      }}>
        ← All Projects
      </Link>
      <Link href={designPrefix} style={{ textDecoration: 'none' }}>
        <span style={{ fontFamily: HEADING, fontSize: '15px', fontWeight: 400, color: '#000', fontStyle: 'italic' }}>
          dr<span style={{ color: ACCENT }}>.</span> Berendje
        </span>
      </Link>
    </nav>
  )
}

function PrevNext({ prev, next, designPrefix }: { prev?: Project; next?: Project; designPrefix: string }) {
  return (
    <div style={{ borderTop: '1px solid #000', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {prev ? (
        <Link href={`${designPrefix}/${prev.slug}`}
          style={{ textDecoration: 'none', padding: '32px 40px', borderRight: '1px solid #000' }}>
          <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 400, color: '#000', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>← Previous</p>
          <p style={{ fontFamily: HEADING, fontSize: '1.1rem', fontStyle: 'italic', color: '#000' }}>{prev.title}</p>
        </Link>
      ) : <div />}
      {next ? (
        <Link href={`${designPrefix}/${next.slug}`}
          style={{ textDecoration: 'none', padding: '32px 40px', textAlign: 'right' }}>
          <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 400, color: '#000', marginBottom: 8, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Next →</p>
          <p style={{ fontFamily: HEADING, fontSize: '1.1rem', fontStyle: 'italic', color: '#000' }}>{next.title}</p>
        </Link>
      ) : <div />}
    </div>
  )
}

function PageFooter() {
  return (
    <footer style={{ borderTop: '1px solid #000', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000' }}>— — —</span>
      <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.06em', color: '#000' }}>PhD Design Research · ArtEZ University of the Arts</span>
      <a href="mailto:linda@drberendje.com" style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.06em', color: '#000', textDecoration: 'none', borderBottom: '1px solid #000', paddingBottom: 1 }}>
        linda@drberendje.com
      </a>
    </footer>
  )
}

function MetaBlock({ project }: { project: Project }) {
  return (
    <div>
      <div style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 300, color: '#000', lineHeight: 2.2, marginBottom: 16 }}>
        <span>{project.year}</span>
        <span style={{ margin: '0 8px', opacity: 0.3 }}>·</span>
        <span>{project.location}</span>
        <span style={{ margin: '0 8px', opacity: 0.3 }}>·</span>
        <span style={{ fontWeight: 400 }}>{project.status === 'complete' ? 'Complete' : project.status === 'in-progress' ? 'In Progress' : 'Ongoing'}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
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
        <p key={i} style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 400, color: '#000', lineHeight: 1.9, marginBottom: 24 }}>{p}</p>
      ))}
    </>
  )
}

// ─── LAYOUT 1: Ecologies of Repair — Okra/Essay style ────────────────────────

export function LayoutEcologies({ project, prev, next, designPrefix }: LayoutProps) {
  const mainRef = useRef<HTMLElement>(null)
  useColorReveal(mainRef as React.RefObject<HTMLElement>)

  return (
    <main ref={mainRef} style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />

      {/* Full-width header image */}
      <div style={{ position: 'relative', width: '100%', height: '70vh', background: '#f0f0f0', overflow: 'hidden' }}>
        <img data-reveal="true" src="" style={{ display: 'none' }} alt="" />
        <Img src={project.coverImage} alt={project.title} fill style={{ objectFit: 'cover' }} />
      </div>

      {/* Okra-style article layout */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 40px 0' }}>
        {project.subtitle && (
          <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', marginBottom: 20 }}>{project.subtitle}</p>
        )}
        <h1 style={{ fontFamily: HEADING, fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', fontWeight: 400, fontStyle: 'italic', color: '#000', lineHeight: 1.0, letterSpacing: '-0.025em', marginBottom: 32 }}>
          {project.title}
        </h1>
        <div style={{ borderTop: '1px solid #000', borderBottom: '1px solid #000', padding: '20px 0', marginBottom: 48 }}>
          <MetaBlock project={project} />
        </div>
        <p style={{ fontFamily: HEADING, fontSize: '1.15rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginBottom: 48 }}>
          {project.excerpt}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '0 56px', alignItems: 'start' }}>
          <div>
            <Paras text={project.description} />
            {project.images.slice(1).map((img, i) => (
              <div key={i} style={{ margin: '40px 0' }}>
                <div style={{ position: 'relative', width: '100%', height: 440, overflow: 'hidden', background: '#f0f0f0' }}>
                  <Img src={img} alt={`Fig. ${i + 2}`} fill style={{ objectFit: 'cover', filter: 'grayscale(100%)', transition: 'filter 0.8s ease' }} />
                </div>
                <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 300, color: '#000', letterSpacing: '0.04em', marginTop: 8 }}>Fig. {i + 2} — {project.location}</p>
              </div>
            ))}
          </div>
          <div style={{ borderLeft: '1px solid #000', paddingLeft: 32, paddingTop: 4 }}>
            <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#000', marginBottom: 20 }}>Citation</p>
            <MetaBlock project={project} />
          </div>
        </div>
      </div>

      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 2: Obroni Wa Wu — Research Report ────────────────────────────────

export function LayoutDWMC({ project, prev, next, designPrefix }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />
      <div style={{ display: 'grid', gridTemplateColumns: '55fr 45fr' }}>
        <div style={{ padding: '60px 48px 80px 40px', borderRight: '1px solid #000' }}>
          {project.subtitle && (
            <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', marginBottom: 20 }}>{project.subtitle}</p>
          )}
          <h1 style={{ fontFamily: HEADING, fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)', color: '#000', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: 40, fontStyle: 'italic' }}>
            {project.title}
          </h1>
          <div style={{ borderTop: '1px solid #000', paddingTop: 24, marginBottom: 36 }}>
            <MetaBlock project={project} />
          </div>
          <p style={{ fontFamily: HEADING, fontSize: '1.1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginBottom: 36 }}>
            {project.excerpt}
          </p>
          <div style={{ borderTop: '1px solid #000', paddingTop: 32 }}>
            <Paras text={project.description} />
          </div>
        </div>
        <div style={{ padding: '60px 40px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {project.images.map((img, i) => (
            <div key={i}>
              <div style={{ position: 'relative', width: '100%', height: 280, overflow: 'hidden', background: '#f0f0f0' }}>
                <Img src={img} alt={`Fig. ${i + 1}`} fill style={{ objectFit: 'cover', filter: 'grayscale(100%)', transition: 'filter 0.8s ease' }} />
              </div>
              <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 300, color: '#000', padding: '5px 0 14px', letterSpacing: '0.04em' }}>Fig. {i + 1}</p>
            </div>
          ))}
        </div>
      </div>
      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 3: Sender–Receiver — Exhibition Catalog ──────────────────────────

export function LayoutSender({ project, prev, next, designPrefix }: LayoutProps) {
  const n = project.images.length
  const cols = n >= 3 ? 3 : n === 2 ? 2 : 1
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 2 }}>
        {project.images.map((img, i) => (
          <div key={i} style={{ position: 'relative', width: '100%', height: cols === 1 ? '70vh' : '56vh', overflow: 'hidden', background: '#f0f0f0' }}>
            <Img src={img} alt={`${project.title} ${i + 1}`} fill style={{ objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '56px 40px 80px' }}>
        {project.subtitle && (
          <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', textAlign: 'center', marginBottom: 16 }}>{project.subtitle}</p>
        )}
        <h1 style={{ fontFamily: HEADING, fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', color: '#000', lineHeight: 1.05, textAlign: 'center', marginBottom: 32, fontStyle: 'italic' }}>
          {project.title}
        </h1>
        <div style={{ borderTop: '1px solid #000', paddingTop: 24, marginBottom: 32 }}>
          <MetaBlock project={project} />
        </div>
        <p style={{ fontFamily: HEADING, fontSize: '1.1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginBottom: 32, textAlign: 'center' }}>
          {project.excerpt}
        </p>
        <div style={{ borderTop: '1px solid #000', paddingTop: 32 }}>
          <Paras text={project.description} />
        </div>
      </div>
      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 4: Secondhand Speculation — Zine/Horizontal ──────────────────────

export function LayoutTShirt({ project, prev, next, designPrefix }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />
      <div style={{ overflowX: 'auto', scrollbarWidth: 'none', borderBottom: '1px solid #000' }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {project.images.map((img, i) => (
            <div key={i} style={{
              flexShrink: 0, position: 'relative',
              width: project.images.length === 1 ? '100vw' : '70vw',
              height: '70vh', background: '#f0f0f0', overflow: 'hidden',
            }}>
              <Img src={img} alt={`${project.title} ${i + 1}`} fill style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '48px 40px 80px', maxWidth: 1100 }}>
        {project.subtitle && (
          <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', marginBottom: 12 }}>{project.subtitle}</p>
        )}
        <h1 style={{ fontFamily: HEADING, fontSize: 'clamp(3rem, 8vw, 10rem)', color: '#000', lineHeight: 0.86, letterSpacing: '-0.04em', marginBottom: 48, fontStyle: 'italic' }}>
          {project.title}
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px', borderTop: '1px solid #000', paddingTop: 32 }}>
          <div>
            <p style={{ fontFamily: HEADING, fontSize: '1.1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginBottom: 32 }}>{project.excerpt}</p>
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

// ─── LAYOUT 5: Black Botanicals — Pull Quotes ────────────────────────────────

export function LayoutBotanicals({ project, prev, next, designPrefix }: LayoutProps) {
  const paras = project.description.split('\n\n')

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />

      <div style={{ position: 'relative', width: '100%', height: '76vh', overflow: 'hidden', background: '#111' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: project.images.length > 1 ? '70%' : '100%', height: '100%' }}>
          <Img src={project.coverImage} alt={project.title} fill style={{ objectFit: 'cover', opacity: 0.85 }} />
        </div>
        {project.images.length > 1 && (
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '30%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {project.images.slice(1, 3).map((img, i) => (
              <div key={i} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <Img src={img} alt={`Fig. ${i + 2}`} fill style={{ objectFit: 'cover', opacity: 0.85 }} />
              </div>
            ))}
          </div>
        )}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: project.images.length > 1 ? '70%' : '100%',
          padding: '60px 40px 40px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
        }}>
          {project.subtitle && (
            <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 400, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 8 }}>{project.subtitle}</p>
          )}
          <h1 style={{ fontFamily: HEADING, fontSize: 'clamp(2.5rem, 5.5vw, 5rem)', color: '#fff', lineHeight: 0.95, letterSpacing: '-0.03em', fontStyle: 'italic' }}>
            {project.title}
          </h1>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 200px', gap: '0 48px', padding: '60px 40px 80px', maxWidth: 1280, margin: '0 auto', alignItems: 'start' }}>
        <div>
          <div style={{ borderLeft: '2px solid #000', paddingLeft: 16, marginBottom: 40 }}>
            <p style={{ fontFamily: HEADING, fontSize: '0.9rem', fontStyle: 'italic', color: '#000', lineHeight: 1.75 }}>"{project.excerpt.slice(0, 140)}…"</p>
          </div>
          <div style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 300, color: '#000', lineHeight: 2.2 }}>
            <p>{project.year}</p>
            <p>{project.location}</p>
          </div>
        </div>
        <div>
          <p style={{ fontFamily: HEADING, fontSize: '1.1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginBottom: 36 }}>{project.excerpt}</p>
          <div style={{ borderTop: '1px solid #000', paddingTop: 32 }}>
            {paras.map((p, i) => (
              <p key={i} style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 400, color: '#000', lineHeight: 1.9, marginBottom: 24 }}>{p}</p>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#000', marginBottom: 20 }}>Keywords</p>
          {project.tags.map(t => (
            <span key={t} style={{ display: 'block', fontFamily: BODY, fontSize: '11px', fontWeight: 300, color: '#000', borderBottom: '1px solid #000', paddingBottom: 8, marginBottom: 8, letterSpacing: '0.04em' }}>{t}</span>
          ))}
        </div>
      </div>

      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 6: The Fine Art of Fakery — Book Page / Scheltens grid ───────────

export function LayoutFakery({ project, prev, next, designPrefix }: LayoutProps) {
  const paras = project.description.split('\n\n')
  const half = Math.ceil(paras.length / 2)

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />

      {/* Scheltens-style image-only header grid */}
      {project.images.length >= 2 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 0 }}>
          {project.images.slice(0, 2).map((img, i) => (
            <div key={i} style={{ position: 'relative', width: '100%', height: '52vh', overflow: 'hidden', background: '#f0f0f0' }}>
              <Img src={img} alt={`${project.title} ${i + 1}`} fill style={{ objectFit: 'cover', filter: 'grayscale(100%)', transition: 'filter 0.8s ease' }} />
            </div>
          ))}
        </div>
      )}

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '56px 40px 80px' }}>
        {project.subtitle && (
          <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', textAlign: 'center', marginBottom: 16 }}>{project.subtitle}</p>
        )}
        <h1 style={{ fontFamily: HEADING, fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', color: '#000', lineHeight: 1.05, textAlign: 'center', marginBottom: 16, fontStyle: 'italic' }}>
          {project.title}
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 40, fontFamily: BODY, fontSize: '11px', fontWeight: 300, color: '#000', letterSpacing: '0.04em' }}>
          <span>{project.year}</span><span style={{ opacity: 0.3 }}>·</span><span>{project.location}</span>
        </div>
        <p style={{ fontFamily: HEADING, fontSize: '1.1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginBottom: 40, textAlign: 'center' }}>{project.excerpt}</p>
        <div style={{ borderTop: '1px solid #000', paddingTop: 36 }}>
          {paras.map((p, i) => (
            <p key={i} style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 400, color: '#000', lineHeight: 1.9, marginBottom: 24 }}>{p}</p>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #000', paddingTop: 24, display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
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

// ─── LAYOUT 7: Blueprint — 60/40 Split Screen ────────────────────────────────

export function LayoutBlueprint({ project, prev, next, designPrefix }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr' }}>
        <div style={{ position: 'sticky', top: 57, height: 'calc(100vh - 57px)', overflow: 'hidden', background: '#f5f5f5' }}>
          <Img src={project.coverImage} alt={project.title} fill style={{ objectFit: 'cover', filter: 'grayscale(100%)', transition: 'filter 0.8s ease' }} />
        </div>
        <div style={{ padding: '60px 40px 80px 40px', borderLeft: '1px solid #000', minHeight: '100vh' }}>
          {project.subtitle && (
            <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', marginBottom: 16 }}>{project.subtitle}</p>
          )}
          <h1 style={{ fontFamily: HEADING, fontSize: 'clamp(1.8rem, 3vw, 3.2rem)', color: '#000', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: 36, fontStyle: 'italic' }}>
            {project.title}
          </h1>
          <div style={{ borderTop: '1px solid #000', paddingTop: 24, marginBottom: 32 }}>
            <MetaBlock project={project} />
          </div>
          <p style={{ fontFamily: HEADING, fontSize: '1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginBottom: 32 }}>
            {project.excerpt}
          </p>
          <div style={{ borderTop: '1px solid #000', paddingTop: 28 }}>
            <Paras text={project.description} />
          </div>
        </div>
      </div>
      <PrevNext prev={prev} next={next} designPrefix={designPrefix} />
      <PageFooter />
    </main>
  )
}

// ─── LAYOUT 8: Post Fossils — Masonry + White Card ───────────────────────────

export function LayoutPostFossils({ project, prev, next, designPrefix }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />
      {project.images.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {project.images.map((img, i) => (
            <div key={i} style={{ position: 'relative', width: '100%', height: i % 2 === 0 ? '56vh' : '44vh', overflow: 'hidden', background: '#f0f0f0' }}>
              <Img src={img} alt={`${project.title} ${i + 1}`} fill style={{ objectFit: 'cover', filter: 'grayscale(100%)', transition: 'filter 0.8s ease' }} />
            </div>
          ))}
        </div>
      )}
      <div style={{ position: 'relative', margin: '-48px 48px 0', zIndex: 10 }}>
        <div style={{ background: '#fff', border: '1px solid #000', padding: '52px 48px' }}>
          {project.subtitle && (
            <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', marginBottom: 16 }}>{project.subtitle}</p>
          )}
          <h1 style={{ fontFamily: HEADING, fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', color: '#000', lineHeight: 1.0, letterSpacing: '-0.02em', marginBottom: 32, fontStyle: 'italic' }}>
            {project.title}
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 64px', alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: HEADING, fontSize: '1.05rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginBottom: 32 }}>{project.excerpt}</p>
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

// ─── Fallback ─────────────────────────────────────────────────────────────────

export function LayoutDefault({ project, prev, next, designPrefix }: LayoutProps) {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <ProjectNav designPrefix={designPrefix} />
      <div style={{ position: 'relative', width: '100%', height: '60vh', overflow: 'hidden', background: '#f5f5f5' }}>
        <Img src={project.coverImage} alt={project.title} fill style={{ objectFit: 'cover' }} />
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '56px 40px 80px' }}>
        <h1 style={{ fontFamily: HEADING, fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#000', lineHeight: 1.05, marginBottom: 24, fontStyle: 'italic' }}>{project.title}</h1>
        <div style={{ borderTop: '1px solid #000', paddingTop: 24, marginBottom: 32 }}>
          <MetaBlock project={project} />
        </div>
        <p style={{ fontFamily: HEADING, fontSize: '1.1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.7, marginBottom: 32 }}>{project.excerpt}</p>
        <div style={{ borderTop: '1px solid #000', paddingTop: 28 }}>
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
