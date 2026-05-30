'use client'
import Link from 'next/link'
import { projects } from '@/data/projects'

// ─── EXACT FRAGMENT / FRAGMENTED HERO CLONE ──────────────────────────────────
// Full-bleed hero image fills entire viewport
// White rectangular blocks overlaid at various positions/sizes (the "fragment" move)
// Floating 3-label nav: Main (top-left) / Archive (top-center) / Work (top-right)
// On scroll: more sections showing project images with same white-block treatment

const MONO = "'DM Mono', 'Courier New', monospace"
const SANS = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"

// White cutout blocks: [left%, top%, width%, height%]  — carefully positioned
// so they frame the image rather than cover the most interesting parts
const HERO_BLOCKS = [
  { left: '0%',   top: '0%',    width: '18%',  height: '12%' },
  { left: '0%',   top: '88%',   width: '22%',  height: '12%' },
  { left: '82%',  top: '0%',    width: '18%',  height: '10%' },
  { left: '74%',  top: '90%',   width: '26%',  height: '10%' },
  { left: '38%',  top: '0%',    width: '24%',  height: '7%'  },
  { left: '0%',   top: '42%',   width: '10%',  height: '16%' },
  { left: '90%',  top: '38%',   width: '10%',  height: '22%' },
]

// Project sections below hero (scroll)
const SECTIONS = [
  {
    slug: 'the-ecologies-of-repair',
    label: 'THE ECOLOGIES OF REPAIR',
    year: '2022',
    blocks: [
      { left: '0%',  top: '0%',   width: '20%', height: '14%' },
      { left: '80%', top: '86%',  width: '20%', height: '14%' },
      { left: '45%', top: '0%',   width: '28%', height: '8%'  },
    ],
  },
  {
    slug: 'dead-white-mans-clothes',
    label: 'OBRONI WA WU',
    year: '2021',
    blocks: [
      { left: '0%',  top: '0%',   width: '14%', height: '100%' },
      { left: '86%', top: '0%',   width: '14%', height: '50%'  },
      { left: '60%', top: '85%',  width: '26%', height: '15%'  },
    ],
  },
  {
    slug: 'black-botanicals',
    label: 'BLACK BOTANICALS',
    year: '2022',
    blocks: [
      { left: '0%',  top: '0%',   width: '100%', height: '10%' },
      { left: '0%',  top: '90%',  width: '100%', height: '10%' },
      { left: '0%',  top: '10%',  width: '12%',  height: '80%' },
      { left: '88%', top: '10%',  width: '12%',  height: '80%' },
    ],
  },
  {
    slug: 'post-fossils',
    label: 'POST FOSSILS',
    year: '2024',
    blocks: [
      { left: '22%', top: '0%',   width: '56%', height: '12%' },
      { left: '0%',  top: '75%',  width: '30%', height: '25%' },
      { left: '70%', top: '70%',  width: '30%', height: '30%' },
    ],
  },
]

function FragBlock({ left, top, width, height }: { left: string; top: string; width: string; height: string }) {
  return (
    <div style={{
      position: 'absolute',
      left, top, width, height,
      background: '#fff',
      zIndex: 2,
    }} />
  )
}

function ProjectSection({ slug, label, year, blocks }: typeof SECTIONS[0]) {
  const proj = projects.find(p => p.slug === slug)
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      background: '#111',
    }}>
      {proj && (
        <img
          src={proj.coverImage}
          alt={label}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0' }}
        />
      )}
      {blocks.map((b, i) => (
        <FragBlock key={i} {...b} />
      ))}
      {/* Project label: bottom-left inside the image */}
      <div style={{
        position: 'absolute',
        bottom: 28,
        left: 28,
        zIndex: 10,
        display: 'flex',
        alignItems: 'baseline',
        gap: 16,
      }}>
        <Link
          href={`/design-d/project/${slug}`}
          style={{ textDecoration: 'none' }}
        >
          <span style={{
            fontFamily: MONO,
            fontSize: '13px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#fff',
            fontWeight: 400,
          }}>{label}</span>
        </Link>
        <span style={{
          fontFamily: MONO,
          fontSize: '10px',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.06em',
        }}>{year}</span>
      </div>
    </section>
  )
}

export default function DesignD() {
  const heroProj = projects.find(p => p.slug === 'black-botanicals')

  return (
    <main style={{ background: '#fff', cursor: 'auto' }}>
      <style>{`
        * { cursor: auto !important; }
      `}</style>

      {/* ── FLOATING 3-LABEL NAV ── */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        padding: '22px 28px',
        pointerEvents: 'none',
      }}>
        <Link href="/" style={{
          fontFamily: MONO,
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#fff',
          textDecoration: 'none',
          pointerEvents: 'all',
          textShadow: '0 1px 4px rgba(0,0,0,0.4)',
        }}>Main</Link>

        <div style={{
          fontFamily: MONO,
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.7)',
          textAlign: 'center',
          textShadow: '0 1px 4px rgba(0,0,0,0.4)',
        }}>Archive</div>

        <Link href="/about" style={{
          fontFamily: MONO,
          fontSize: '10px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.7)',
          textDecoration: 'none',
          textAlign: 'right',
          pointerEvents: 'all',
          textShadow: '0 1px 4px rgba(0,0,0,0.4)',
          display: 'block',
        }}>Work</Link>
      </nav>

      {/* ── HERO: FULL-BLEED IMAGE + WHITE FRAGMENT BLOCKS ── */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#111',
      }}>
        {heroProj && (
          <img
            src={heroProj.coverImage}
            alt="dr Berendje"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0' }}
          />
        )}
        {HERO_BLOCKS.map((b, i) => (
          <FragBlock key={i} {...b} />
        ))}

        {/* Artist name inside the hero */}
        <div style={{
          position: 'absolute',
          bottom: 28,
          left: 28,
          zIndex: 10,
        }}>
          <div style={{
            fontFamily: MONO,
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 4,
          }}>Design Researcher</div>
          <div style={{
            fontFamily: SANS,
            fontSize: '28px',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            color: '#fff',
            lineHeight: 1.0,
          }}>
            dr <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 400 }}>Berendje</em>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: 28,
          right: 28,
          zIndex: 10,
          fontFamily: MONO,
          fontSize: '9px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
          writingMode: 'vertical-rl',
        }}>
          Scroll
        </div>
      </section>

      {/* ── PROJECT SECTIONS (one per scroll viewport) ── */}
      {SECTIONS.map(s => (
        <ProjectSection key={s.slug} {...s} />
      ))}

      {/* ── FOOTER / INDEX ── */}
      <section style={{
        background: '#fff',
        padding: '60px 28px 80px',
        borderTop: '1px solid #ebebeb',
      }}>
        <div style={{
          fontFamily: MONO,
          fontSize: '9px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#bbb',
          marginBottom: 32,
        }}>Full Archive</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px 40px' }}>
          {projects.slice(0, 8).map((p, i) => (
            <Link
              key={p.slug}
              href={`/design-d/project/${p.slug}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '10px 0',
                borderBottom: '1px solid #f0f0f0',
                textDecoration: 'none',
              }}
            >
              <span style={{
                fontFamily: MONO,
                fontSize: '11px',
                color: '#000',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                {String(i + 1).padStart(2, '0')} — {p.title}
              </span>
              <span style={{
                fontFamily: MONO,
                fontSize: '9px',
                color: '#bbb',
                letterSpacing: '0.04em',
              }}>{p.year?.split(' ')[0]}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
