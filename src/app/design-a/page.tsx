'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { projects } from '@/data/projects'

const HEADING = "'Instrument Serif', Georgia, serif"
const BODY = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
const ACCENT = '#C8553D'

const WORK = [
  { slug: 'the-ecologies-of-repair',   cat: 'Research · Spatial',     year: '2024 —',      status: 'Active' },
  { slug: 'dead-white-mans-clothes',   cat: 'Fashion · Documentary',  year: '2011 — 2025', status: 'Ongoing' },
  { slug: 'waste-colonialism',         cat: 'Policy · Campaign',      year: '2020 —',      status: 'Ongoing' },
  { slug: 'sender-receiver-residence', cat: 'Residency · Exchange',   year: '2023 —',      status: 'Active' },
  { slug: 'secondhand-speculation',    cat: 'Pedagogy · Oracle',      year: '2019 —',      status: 'Ongoing' },
  { slug: 'black-botanicals',          cat: 'Publication · Archive',  year: '2017 —',      status: 'Ongoing' },
  { slug: 'the-fine-art-of-fakery',    cat: 'Exhibition · Lecture',   year: '2015',         status: 'Complete' },
  { slug: 'blueprint',                 cat: 'Textile · Craft',        year: '2014',         status: 'Complete' },
  { slug: 'post-fossils',              cat: 'Material · Speculative', year: '2015',         status: 'Complete' },
  { slug: 'moving-material-museum',    cat: 'Nomadic · Platform',     year: '2015',         status: 'Complete' },
  { slug: 'paper-making',              cat: 'Material · Process',     year: '2018 —',       status: 'Ongoing' },
]

export default function DesignA() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [mouseX, setMouseX]   = useState(0)
  const [mouseY, setMouseY]   = useState(0)
  const [view, setView]       = useState<'list' | 'grid'>('list')

  const hoveredProj = hovered ? projects.find(p => p.slug === hovered) : null

  return (
    <main
      style={{ background: '#fff', minHeight: '100vh' }}
      onMouseMove={e => { setMouseX(e.clientX); setMouseY(e.clientY) }}
    >
      <style>{`
        .da-row { display: block; text-decoration: none; transition: background 0.12s; }
        .da-row:hover { background: #fafafa; }
        .da-location { opacity: 0; transition: opacity 0.15s; }
        .da-row:hover .da-location { opacity: 1; }
        .da-grid-item:hover img { transform: scale(1.03); }
        .da-toggle-active { border-bottom: 1.5px solid #000; color: #000; }
        .da-toggle-inactive { color: #000; opacity: 0.3; }
        .da-toggle-inactive:hover { opacity: 0.6; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 32px',
        borderBottom: '1px solid #000',
        position: 'sticky',
        top: 0,
        background: '#fff',
        zIndex: 50,
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: HEADING, fontSize: '18px', fontWeight: 400, color: '#000' }}>
            dr<span style={{ color: ACCENT }}>.</span> Berendje
          </span>
        </Link>

        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <span style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 500, color: '#000', borderBottom: '1px solid #000', paddingBottom: 1 }}>Research Projects</span>
          <span style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 400, color: '#000' }}>Writing</span>
          <span style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 400, color: '#000' }}>Pedagogies</span>
          <span style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 400, color: '#000' }}>Consultancy</span>
          <Link href="/about" style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 400, color: '#000', textDecoration: 'none' }}>About</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setView('list')}
            style={{ background: 'none', border: 'none', padding: '2px 0', fontFamily: BODY, fontSize: '12px', letterSpacing: '0.04em' }}
            className={view === 'list' ? 'da-toggle-active' : 'da-toggle-inactive'}
          >List</button>
          <span style={{ fontFamily: BODY, fontSize: '12px', color: '#000', opacity: 0.2 }}>/</span>
          <button
            onClick={() => setView('grid')}
            style={{ background: 'none', border: 'none', padding: '2px 0', fontFamily: BODY, fontSize: '12px', letterSpacing: '0.04em' }}
            className={view === 'grid' ? 'da-toggle-active' : 'da-toggle-inactive'}
          >Grid</button>
        </div>
      </nav>

      {/* ── FLOATING CURSOR IMAGE ── */}
      {hoveredProj && (
        <div style={{
          position: 'fixed', left: mouseX + 24, top: mouseY - 100,
          width: 200, height: 260,
          zIndex: 200, pointerEvents: 'none',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', background: '#f5f5f5', overflow: 'hidden' }}>
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
          {WORK.map((item, i) => {
            const proj = projects.find(p => p.slug === item.slug)
            if (!proj) return null
            return (
              <div key={item.slug}>
                {i > 0 && (
                  <div style={{ textAlign: 'center', padding: '0' }}>
                    <span style={{ fontSize: '9px', color: ACCENT, letterSpacing: '0.4em' }}>— — —</span>
                  </div>
                )}
                <Link
                  href={`/design-a/project/${item.slug}`}
                  className="da-row"
                  style={{ padding: '28px 32px 24px', display: 'block' }}
                  onMouseEnter={() => setHovered(item.slug)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: 6,
                  }}>
                    <span style={{
                      fontFamily: BODY, fontSize: '11px', fontWeight: 500,
                      color: '#000', letterSpacing: '0.04em',
                    }}>
                      {item.cat}
                    </span>
                    <span style={{
                      fontFamily: BODY, fontSize: '11px', fontWeight: 400,
                      color: '#000', letterSpacing: '0.04em',
                    }}>
                      {item.year}
                    </span>
                  </div>

                  <h2 style={{
                    fontFamily: HEADING,
                    fontSize: 'clamp(2rem, 5.5vw, 5.5rem)',
                    fontWeight: 400,
                    color: '#000',
                    lineHeight: 1.0,
                    letterSpacing: '-0.02em',
                    fontStyle: 'italic',
                    marginBottom: 8,
                  }}>
                    {proj.title}
                  </h2>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}>
                    <span style={{
                      fontFamily: BODY, fontSize: '10px', fontWeight: 300,
                      color: '#000', letterSpacing: '0.04em',
                    }}>
                      {item.status}
                    </span>
                    <span className="da-location" style={{
                      fontFamily: BODY, fontSize: '10px', fontWeight: 300,
                      color: '#000', letterSpacing: '0.04em',
                    }}>
                      {proj.location}
                    </span>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      )}

      {/* ── GRID VIEW ── */}
      {view === 'grid' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          padding: '32px',
        }}>
          {WORK.map(item => {
            const proj = projects.find(p => p.slug === item.slug)
            if (!proj) return null
            return (
              <Link
                key={item.slug}
                href={`/design-a/project/${item.slug}`}
                className="da-grid-item"
                style={{
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  background: '#f5f5f5',
                  display: 'block',
                  textDecoration: 'none',
                  position: 'relative',
                }}
              >
                <Image
                  src={proj.coverImage}
                  alt={proj.title}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'rgba(255,255,255,0.94)',
                  padding: '12px 14px 10px',
                  borderTop: '1px solid rgba(0,0,0,0.06)',
                }}>
                  <span style={{
                    display: 'block',
                    fontFamily: HEADING,
                    fontSize: '14px',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: '#000',
                    marginBottom: 3,
                    textAlign: 'left',
                  }}>
                    {proj.title}
                  </span>
                  <span style={{
                    fontFamily: BODY,
                    fontSize: '10px',
                    fontWeight: 300,
                    color: '#000',
                    letterSpacing: '0.04em',
                    textAlign: 'left',
                    display: 'block',
                  }}>
                    {item.cat} · {item.year}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid #000',
        padding: '24px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      }}>
        <span style={{ fontSize: '9px', color: ACCENT, letterSpacing: '0.4em' }}>— — —</span>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}>
          <span style={{
            fontFamily: BODY, fontSize: '11px', fontWeight: 400,
            color: '#000', letterSpacing: '0.04em',
          }}>
            PhD Design Research · ArtEZ University of the Arts
          </span>
          <a href="mailto:linda@drberendje.com" style={{
            fontFamily: BODY, fontSize: '11px', fontWeight: 400,
            color: '#000', letterSpacing: '0.04em', textDecoration: 'none',
          }}>
            linda@drberendje.com
          </a>
        </div>
      </footer>
    </main>
  )
}
