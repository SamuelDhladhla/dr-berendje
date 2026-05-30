'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { projects } from '@/data/projects'

// ─── DESIGN A — Academic List + Grid View ─────────────────────────────────────
// Each project title in its own font + color
// Academic citation metadata (category · year · status) below each title
// Floating cursor image uses next/image (handles basePath automatically)

const SANS = "'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif"
const MONO = "'DM Mono', 'Courier New', monospace"

const WORK = [
  {
    slug: 'the-ecologies-of-repair',
    label: 'THE ECOLOGIES OF REPAIR',
    font: "'Instrument Serif', Georgia, serif",
    color: '#C8553D',
    cat: 'Research · Spatial',
    year: '2024 —',
    status: 'Active',
  },
  {
    slug: 'dead-white-mans-clothes',
    label: 'OBRONI WA WU',
    font: "'Space Grotesk', Arial, sans-serif",
    color: '#2D5F4A',
    cat: 'Fashion · Documentary',
    year: '2011 — 2025',
    status: 'Ongoing',
  },
  {
    slug: 'sender-receiver-residence',
    label: 'SENDER – RECEIVER',
    font: "'Courier Prime', 'Courier New', monospace",
    color: '#8B6914',
    cat: 'Residency · Exchange',
    year: '2023 —',
    status: 'Active',
  },
  {
    slug: 'secondhand-speculation',
    label: 'T-SHIRT TALES',
    font: "'DM Sans', 'Helvetica Neue', sans-serif",
    color: '#3D4F7C',
    cat: 'Fashion · Material',
    year: '2019 —',
    status: 'Ongoing',
  },
  {
    slug: 'black-botanicals',
    label: 'BLACK BOTANICALS',
    font: "'Libre Baskerville', Georgia, serif",
    color: '#1A3A2A',
    cat: 'Publication · Archive',
    year: '2017 —',
    status: 'Ongoing',
  },
  {
    slug: 'the-fine-art-of-fakery',
    label: 'THE NEW FAKE IS REAL',
    font: "'IBM Plex Sans', 'Helvetica Neue', sans-serif",
    color: '#A0522D',
    cat: 'Exhibition · Lecture',
    year: '2015',
    status: 'Complete',
  },
  {
    slug: 'blueprint',
    label: 'BLUEPRINT',
    font: "'Archivo Black', 'Arial Black', sans-serif",
    color: '#1B3F8B',
    cat: 'Textile · Craft',
    year: '2014',
    status: 'Complete',
  },
  {
    slug: 'post-fossils',
    label: 'POST FOSSILS',
    font: "'Source Serif 4', Georgia, serif",
    color: '#4A4A4A',
    cat: 'Material · Speculative',
    year: '2015',
    status: 'Complete',
  },
]

export default function DesignA() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [mouseX, setMouseX]   = useState(0)
  const [mouseY, setMouseY]   = useState(0)
  const [view, setView]       = useState<'list' | 'grid'>('list')

  const hoveredItem = WORK.find(w => w.slug === hovered)
  const hoveredProj = hoveredItem ? projects.find(p => p.slug === hoveredItem.slug) : null

  return (
    <main
      style={{ background: '#fff', minHeight: '100vh', cursor: 'auto' }}
      onMouseMove={e => { setMouseX(e.clientX); setMouseY(e.clientY) }}
    >
      <style>{`
        * { cursor: auto !important; }

        .aq-row {
          display: block;
          text-decoration: none;
          border-bottom: 1px solid #f0f0f0;
          transition: background 0.12s;
        }
        .aq-row:hover { background: #fafafa; }

        .aq-citation {
          font-family: ${MONO};
          font-size: 10px;
          color: #c0c0c0;
          letter-spacing: 0.05em;
          padding: 14px 32px 2px;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .aq-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: #e0e0e0; display: inline-block; flex-shrink: 0;
        }
        .aq-active   { color: #4a8c5c; }
        .aq-ongoing  { color: #8b6914; }
        .aq-complete { color: #c8c8c8; }

        .aq-title {
          font-size: clamp(2.2rem, 6vw, 8rem);
          line-height: 1.0;
          letter-spacing: -0.02em;
          text-align: center;
          text-transform: uppercase;
          display: block;
          padding: 2px 32px 8px;
        }

        .aq-meta-row {
          display: flex;
          justify-content: space-between;
          padding: 0 32px 12px;
          font-family: ${MONO};
          font-size: 10px;
          color: #ccc;
          letter-spacing: 0.04em;
        }
        .aq-location {
          opacity: 0;
          transition: opacity 0.15s;
        }
        .aq-row:hover .aq-location { opacity: 1; }

        .aq-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3px;
          padding: 32px;
        }
        .aq-grid-item {
          aspect-ratio: 3/4;
          overflow: hidden;
          background: #f0f0f0;
          display: block;
          text-decoration: none;
          position: relative;
        }
        .aq-grid-item:hover img { transform: scale(1.04); }
        .aq-grid-img {
          transition: transform 0.5s ease;
        }
        .aq-grid-label {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: rgba(255,255,255,0.94);
          padding: 10px 12px 8px;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .aq-grid-title {
          display: block;
          font-size: 11px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 3px;
        }
        .aq-grid-meta {
          font-family: ${MONO};
          font-size: 9px;
          color: #aaa;
          letter-spacing: 0.04em;
        }

        .toggle-active   { border-bottom: 1.5px solid #000; color: #000; }
        .toggle-inactive { color: #aaa; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        padding: '18px 28px',
        alignItems: 'center',
        borderBottom: '1px solid #ebebeb',
        position: 'sticky', top: 0, background: '#fff', zIndex: 50,
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline' }}>
          <span style={{ fontFamily: SANS, fontSize: '14px', fontWeight: 300, color: '#aaa' }}>dr&nbsp;</span>
          <em style={{ fontFamily: "'Playfair Display', serif", fontSize: '14px', fontStyle: 'italic', fontWeight: 400, color: '#000' }}>Berendje</em>
        </Link>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button
            onClick={() => setView('list')}
            style={{ background: 'none', border: 'none', padding: '2px 0', fontFamily: SANS, fontSize: '13px', cursor: 'pointer' }}
            className={view === 'list' ? 'toggle-active' : 'toggle-inactive'}
          >List</button>
          <span style={{ fontFamily: SANS, fontSize: '13px', color: '#ddd', margin: '0 10px' }}>/</span>
          <button
            onClick={() => setView('grid')}
            style={{ background: 'none', border: 'none', padding: '2px 0', fontFamily: SANS, fontSize: '13px', cursor: 'pointer' }}
            className={view === 'grid' ? 'toggle-active' : 'toggle-inactive'}
          >Grid</button>
        </div>

        <div style={{ textAlign: 'right' }}>
          <Link href="/about" style={{ fontFamily: SANS, fontSize: '13px', color: '#000', textDecoration: 'none' }}>About</Link>
        </div>
      </nav>

      {/* ── FLOATING CURSOR IMAGE — uses next/image for correct basePath ── */}
      {hoveredProj && (
        <div style={{
          position: 'fixed', left: mouseX + 24, top: mouseY - 100,
          width: 200, height: 260,
          zIndex: 200, pointerEvents: 'none',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', background: '#f0f0f0', overflow: 'hidden' }}>
            <Image
              src={hoveredProj.coverImage}
              alt={hoveredProj.title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {view === 'list' && (
        <div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '8px 32px', borderBottom: '1px solid #f0f0f0', background: '#fcfcfc',
          }}>
            <span style={{ fontFamily: MONO, fontSize: '9px', color: '#d0d0d0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Title</span>
            <span style={{ fontFamily: MONO, fontSize: '9px', color: '#d0d0d0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Category · Year · Status</span>
          </div>

          {WORK.map(item => {
            const proj = projects.find(p => p.slug === item.slug)
            const sc = item.status === 'Active' ? 'aq-active' : item.status === 'Ongoing' ? 'aq-ongoing' : 'aq-complete'
            return (
              <Link
                key={item.slug}
                href={`/design-a/project/${item.slug}`}
                className="aq-row"
                onMouseEnter={() => setHovered(item.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="aq-citation">
                  <span>{item.cat}</span>
                  <span className="aq-dot" />
                  <span>{item.year}</span>
                  <span className="aq-dot" />
                  <span className={sc}>{item.status}</span>
                </div>
                <span className="aq-title" style={{ fontFamily: item.font, color: item.color }}>
                  {item.label}
                </span>
                <div className="aq-meta-row">
                  <span>{item.year}</span>
                  <span className="aq-location">{proj?.location ?? ''}</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* ── GRID VIEW ── */}
      {view === 'grid' && (
        <div className="aq-grid">
          {WORK.map(item => {
            const proj = projects.find(p => p.slug === item.slug)
            return (
              <Link key={item.slug} href={`/design-a/project/${item.slug}`} className="aq-grid-item">
                {proj && (
                  <Image
                    src={proj.coverImage}
                    alt={item.label}
                    fill
                    className="aq-grid-img"
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <div className="aq-grid-label">
                  <span className="aq-grid-title" style={{ fontFamily: item.font, color: item.color }}>
                    {item.label}
                  </span>
                  <span className="aq-grid-meta">{item.cat} · {item.year}</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid #f0f0f0',
        padding: '20px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontFamily: MONO, fontSize: '10px', color: '#ccc', letterSpacing: '0.06em' }}>
          PhD Design Research · ArtEZ University of the Arts
        </span>
        <a href="mailto:linda@drberendje.com" style={{ fontFamily: MONO, fontSize: '10px', color: '#bbb', letterSpacing: '0.06em', textDecoration: 'none' }}>
          linda@drberendje.com
        </a>
      </footer>
    </main>
  )
}
