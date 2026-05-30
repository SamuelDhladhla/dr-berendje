'use client'
import { useState } from 'react'
import Link from 'next/link'
import { projects } from '@/data/projects'

// ─── EXACT PHOTOGRAPHY STRIPS / FILM STRIP CLONE ─────────────────────────────
// White background, top-left stacked monospace nav
// Full-viewport horizontal strip of vertical image slices
// Varying widths — hover to expand + show project info

const MONO = "'DM Mono', 'Courier New', monospace"

const WORK = [
  { slug: 'the-ecologies-of-repair',  label: 'THE ECOLOGIES OF REPAIR', year: '2022' },
  { slug: 'dead-white-mans-clothes',  label: 'OBRONI WA WU',            year: '2021' },
  { slug: 'sender-receiver-residence',label: 'SENDER – RECEIVER',       year: '2023' },
  { slug: 'secondhand-speculation',   label: 'T-SHIRT TALES',           year: '2020' },
  { slug: 'black-botanicals',         label: 'BLACK BOTANICALS',        year: '2022' },
  { slug: 'the-fine-art-of-fakery',   label: 'THE NEW FAKE IS REAL',    year: '2021' },
  { slug: 'blueprint',                label: 'BLUEPRINT',               year: '2023' },
  { slug: 'post-fossils',             label: 'POST FOSSILS',            year: '2024' },
]

// Varying flex-grow values to create unequal widths — film strip feel
const FLEX_WEIGHTS = [3, 1.4, 2.2, 1.2, 2.8, 1.6, 1.8, 2.4]

export default function DesignB() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <main style={{
      background: '#fff',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <style>{`
        * { cursor: auto !important; }

        .strip-item {
          position: relative;
          height: 100vh;
          overflow: hidden;
          flex-shrink: 0;
          transition: flex-grow 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer !important;
        }

        .strip-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: filter 0.4s ease;
        }

        .strip-item:not(.strip-active) img {
          filter: grayscale(30%);
        }

        .strip-item.strip-active img {
          filter: none;
        }

        .strip-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 16px;
          background: linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 100%);
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .strip-item.strip-active .strip-overlay {
          opacity: 1;
        }

        .strip-index {
          font-family: ${MONO};
          font-size: 9px;
          color: #bbb;
          letter-spacing: 0.08em;
          margin-bottom: 4px;
        }

        .strip-title {
          font-family: ${MONO};
          font-size: 11px;
          font-weight: 500;
          color: #000;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .strip-year {
          font-family: ${MONO};
          font-size: 9px;
          color: #999;
          letter-spacing: 0.04em;
          margin-top: 2px;
        }

        .nav-label {
          font-family: ${MONO};
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          line-height: 2.0;
          text-decoration: none;
        }
      `}</style>

      {/* ── TOP-LEFT STACKED NAV ── */}
      <nav style={{
        position: 'fixed',
        top: 20,
        left: 24,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 0,
      }}>
        <Link href="/" className="nav-label" style={{ color: '#0055ff', fontWeight: 500 }}>HOME</Link>
        <span className="nav-label" style={{ color: '#000', fontWeight: 500 }}>PROJECTS</span>
        <Link href="/about" className="nav-label" style={{ color: '#aaa' }}>ABOUT</Link>
      </nav>

      {/* ── TOP-RIGHT: ARTIST NAME ── */}
      <div style={{
        position: 'fixed',
        top: 20,
        right: 24,
        zIndex: 100,
        fontFamily: MONO,
        fontSize: '10px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#bbb',
      }}>
        dr Berendje
      </div>

      {/* ── FILM STRIP: FULL VIEWPORT HEIGHT, HORIZONTAL ROW OF SLICES ── */}
      <div style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        gap: 2,
      }}>
        {WORK.map((item, i) => {
          const proj = projects.find(p => p.slug === item.slug)
          const isActive = hovered === i
          const baseWeight = FLEX_WEIGHTS[i]
          const flexGrow = isActive ? baseWeight * 2.2 : baseWeight

          return (
            <Link
              key={item.slug}
              href={`/design-b/project/${item.slug}`}
              className={`strip-item${isActive ? ' strip-active' : ''}`}
              style={{ flexGrow }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {proj && (
                <img
                  src={proj.coverImage}
                  alt={item.label}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0' }}
                />
              )}
              <div className="strip-overlay">
                <div className="strip-index">({String(i + 1).padStart(2, '0')})</div>
                <div className="strip-title">{item.label}</div>
                <div className="strip-year">{item.year}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
