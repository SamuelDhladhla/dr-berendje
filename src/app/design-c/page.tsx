'use client'
import { useState } from 'react'
import Link from 'next/link'
import { projects } from '@/data/projects'

// ─── SIMANTIC CLONE — ACADEMIC IDENTITY LAYER ────────────────────────────────
// Images fill ~80% of viewport height
// Custom crosshair cursor in #C8553D — academic / specimen-examination aesthetic

const MONO = "'DM Mono', 'Courier New', monospace"
const SANS = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
const ACCENT = '#C8553D'

const WORK = [
  {
    slug: 'the-ecologies-of-repair',
    label: 'THE ECOLOGIES OF REPAIR',
    font: "'Instrument Serif', Georgia, serif",
    color: '#C8553D',
    cat: 'Research / Spatial',
    year: '2024 —',
  },
  {
    slug: 'dead-white-mans-clothes',
    label: 'OBRONI WA WU',
    font: "'Space Grotesk', Arial, sans-serif",
    color: '#2D5F4A',
    cat: 'Fashion / Documentary',
    year: '2011 — 2025',
  },
  {
    slug: 'sender-receiver-residence',
    label: 'SENDER – RECEIVER',
    font: "'Courier Prime', 'Courier New', monospace",
    color: '#8B6914',
    cat: 'Residency / Exchange',
    year: '2023 —',
  },
  {
    slug: 'secondhand-speculation',
    label: 'T-SHIRT TALES',
    font: "'DM Sans', 'Helvetica Neue', sans-serif",
    color: '#3D4F7C',
    cat: 'Fashion / Material',
    year: '2019 —',
  },
  {
    slug: 'black-botanicals',
    label: 'BLACK BOTANICALS',
    font: "'Libre Baskerville', Georgia, serif",
    color: '#1A3A2A',
    cat: 'Publication / Archive',
    year: '2017 —',
  },
  {
    slug: 'the-fine-art-of-fakery',
    label: 'THE NEW FAKE IS REAL',
    font: "'IBM Plex Sans', 'Helvetica Neue', sans-serif",
    color: '#A0522D',
    cat: 'Exhibition / Lecture',
    year: '2015',
  },
  {
    slug: 'blueprint',
    label: 'BLUEPRINT',
    font: "'Archivo Black', 'Arial Black', sans-serif",
    color: '#1B3F8B',
    cat: 'Textile / Craft',
    year: '2014',
  },
  {
    slug: 'post-fossils',
    label: 'POST FOSSILS',
    font: "'Source Serif 4', Georgia, serif",
    color: '#4A4A4A',
    cat: 'Material / Speculative',
    year: '2015',
  },
]

export default function DesignC() {
  const [active, setActive]   = useState(0)
  const [cursorX, setCursorX] = useState(-200)
  const [cursorY, setCursorY] = useState(-200)
  const [hovering, setHovering] = useState(false)

  const activeItem = WORK[active]

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorX(e.clientX)
    setCursorY(e.clientY)
    const t = e.target as HTMLElement
    setHovering(!!(t.closest('a, button, .sim-img-wrap')))
  }

  return (
    <main
      style={{ background: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setCursorX(-200); setCursorY(-200) }}
    >
      <style>{`
        * { cursor: none !important; }

        .sim-nav-label {
          font-family: ${MONO};
          font-size: 11px;
          font-weight: 400;
          color: #000;
          letter-spacing: 0.01em;
          line-height: 1.5;
          text-decoration: none;
          text-transform: uppercase;
        }
        .sim-nav-sub {
          font-family: ${MONO};
          font-size: 10px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.01em;
          margin-top: 1px;
        }
        .sim-img-wrap {
          flex-shrink: 0;
          overflow: hidden;
          background: #e8e8e8;
          cursor: none;
          transition:
            width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            opacity 0.3s ease;
        }
        .sim-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: filter 0.35s ease;
        }
      `}</style>

      {/* ── CUSTOM CROSSHAIR CURSOR ── */}
      <div
        style={{
          position: 'fixed',
          left: cursorX,
          top: cursorY,
          width: hovering ? 24 : 16,
          height: hovering ? 24 : 16,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.18s ease, height 0.18s ease',
        }}
      >
        {/* Horizontal arm */}
        <div style={{
          position: 'absolute',
          top: '50%', left: 0, right: 0,
          height: 1,
          background: ACCENT,
          transform: 'translateY(-50%)',
        }} />
        {/* Vertical arm */}
        <div style={{
          position: 'absolute',
          left: '50%', top: 0, bottom: 0,
          width: 1,
          background: ACCENT,
          transform: 'translateX(-50%)',
        }} />
        {/* Center dot — grows on hover */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: hovering ? 5 : 3,
          height: hovering ? 5 : 3,
          background: ACCENT,
          borderRadius: '50%',
          transition: 'width 0.18s ease, height 0.18s ease',
        }} />
      </div>

      {/* ── 6-COL NAV ── */}
      <nav style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
        padding: '14px 20px',
        borderBottom: '1px solid #e8e8e8',
        alignItems: 'start',
        flexShrink: 0,
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{ fontFamily: MONO, fontSize: '11px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.01em' }}>dr&nbsp;</span>
            <span style={{ fontFamily: MONO, fontSize: '11px', color: '#000', textTransform: 'uppercase', letterSpacing: '0.01em', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Berendje</span>
          </div>
          <div className="sim-nav-sub">Studio / Archive / Gallery</div>
        </Link>

        <span className="sim-nav-label">Work</span>
        <Link href="/about" className="sim-nav-label">About</Link>

        <div>
          <span className="sim-nav-label">Contact</span>
          <div className="sim-nav-sub">linda@drberendje.com</div>
        </div>

        <div>
          <span className="sim-nav-label">Instagram</span>
          <div className="sim-nav-sub">Are.na</div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span className="sim-nav-label">Research / Pedagogy</span>
          <div className="sim-nav-sub" style={{ textAlign: 'right' }}>ArtEZ University</div>
        </div>
      </nav>

      {/* ── SMALL SPACER — keeps a sliver of white above images ── */}
      <div style={{ height: '1.5vh', flexShrink: 0 }} />

      {/* ── IMAGE STRIP + INFO + FOOTER — fills all remaining height ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>

        {/* Image row — fills this container's height */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 3,
          padding: '0 20px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          minHeight: 0,
        }}>
          {WORK.map((item, i) => {
            const proj = projects.find(p => p.slug === item.slug)
            const isActive = i === active
            return (
              <div
                key={item.slug}
                className="sim-img-wrap"
                onClick={() => setActive(i)}
                style={{
                  // Active image fills 100% of the container height
                  // Inactive images sit at ~82% so the active stands clearly taller
                  width: isActive ? 260 : 170,
                  height: isActive ? '100%' : '82%',
                  opacity: isActive ? 1 : 0.55,
                }}
              >
                {proj && (
                  <img
                    src={proj.coverImage}
                    alt={item.label}
                    style={{ filter: isActive ? 'none' : 'grayscale(30%)' }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0' }}
                  />
                )}
              </div>
            )
          })}

          {/* + indicator */}
          <div style={{
            width: 40, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: '82%',
          }}>
            <span style={{ fontFamily: SANS, fontSize: '22px', color: '#ddd', fontWeight: 300 }}>+</span>
          </div>
        </div>

        {/* ── PROJECT INFO below strip ── */}
        <div style={{
          padding: '12px 20px 10px',
          display: 'flex',
          alignItems: 'baseline',
          gap: 16,
          borderTop: '1px solid #f0f0f0',
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: MONO, fontSize: '11px', color: '#bbb' }}>
            ({String(active + 1).padStart(2, '0')})
          </span>
          <Link href={`/design-c/project/${activeItem.slug}`} style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: activeItem.font,
              fontSize: '13px',
              color: activeItem.color,
              fontWeight: 700,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
            }}>
              {activeItem.label}
            </span>
          </Link>
          <span style={{ fontFamily: MONO, fontSize: '10px', color: '#bbb' }}>{activeItem.cat}</span>
          <span style={{ fontFamily: MONO, fontSize: '10px', color: '#ccc', marginLeft: 'auto' }}>
            {activeItem.year}
          </span>
        </div>

        {/* ── FOOTER ── */}
        <div style={{
          padding: '8px 20px 14px',
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: MONO, fontSize: '9px', color: '#ccc', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            PhD Design Research · ArtEZ University of the Arts
          </span>
          <span style={{ fontFamily: MONO, fontSize: '9px', color: '#ddd', letterSpacing: '0.06em' }}>
            Linda Valkeman
          </span>
        </div>
      </div>
    </main>
  )
}
