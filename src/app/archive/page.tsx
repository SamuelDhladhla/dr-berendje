'use client'
import { useState } from 'react'
import Link from 'next/link'
import Img from '@/components/Img'
import { projects } from '@/data/projects'

const BODY = "'Suisse Intl', 'Neue Haas Grotesk Text', Inter, -apple-system, Arial, sans-serif"
const ACCENT = '#C8553D'

const WORK = [
  {
    slug: 'in-no-particular-order',
    cat: 'Visual Essays & Film', year: '2008 —',
    font: "'Instrument Serif', Georgia, serif",
    weight: 400, style: 'italic',
    sub: 'An ongoing visual archive — personal, political, poetic',
  },
  {
    slug: 'the-ecologies-of-repair',
    cat: 'Research', year: '2026 —',
    font: "'Cormorant Garamond', Georgia, serif",
    weight: 400, style: 'italic',
    sub: 'Repair as material, social, and epistemic healing',
  },
  {
    slug: 'tsht-tales',
    cat: 'Publication & Exhibition', year: '2025 —',
    font: "'Big Shoulders Display', 'Arial Black', sans-serif",
    weight: 900, style: 'normal',
    sub: 'The secondhand T-shirt as archive and site of decolonial fashion',
  },
  {
    slug: 'dead-white-mans-clothes',
    cat: 'Fashion Research', year: '2011 — 2025',
    font: "'Space Grotesk', Arial, sans-serif",
    weight: 700, style: 'normal',
    sub: 'The secondhand clothing trade and waste colonialism',
  },
  {
    slug: 'black-botanicals',
    cat: 'Publication', year: '2017 —',
    font: "'Libre Baskerville', Georgia, serif",
    weight: 700, style: 'italic',
    sub: 'Colonial plant knowledge, dyeing, and botanical history',
  },
  {
    slug: 'the-fine-art-of-fakery',
    cat: 'Ceramic Research', year: '2015',
    font: "'Jost', 'Futura', Arial, sans-serif",
    weight: 700, style: 'normal',
    sub: 'Authenticity, imitation, and the politics of the copy in Jingdezhen',
  },
  {
    slug: 'blueprint',
    cat: 'Textile Research', year: '2014',
    font: "'Archivo Black', 'Arial Black', sans-serif",
    weight: 400, style: 'normal',
    sub: 'Delftware, blue-and-white porcelain, and cross-cultural exchange',
  },
  {
    slug: 'textile-trade-book',
    cat: 'Photography', year: '2013',
    font: "'Great Vibes', cursive",
    weight: 400, style: 'normal',
    sub: 'Documenting the fabric trade between Ghana and the Netherlands',
  },
  {
    slug: 'post-fossils',
    cat: 'Speculative', year: '2015',
    font: "Inter, 'Helvetica Neue', Arial, sans-serif",
    weight: 300, style: 'normal',
    sub: 'The material record of the present — what we leave behind',
  },
  {
    slug: 'waste-colonialism',
    cat: 'Policy Design', year: '2020 —',
    font: "'Syne', sans-serif",
    weight: 800, style: 'normal',
    sub: 'A policy campaign for systemic change in global fashion waste',
  },
  {
    slug: 'sender-receiver-residence',
    cat: 'Residency', year: '2023 —',
    font: "'Courier Prime', 'Courier New', monospace",
    weight: 700, style: 'normal',
    sub: 'A curriculum for repair across geographies',
  },
  {
    slug: 'secondhand-speculation',
    cat: 'Pedagogy', year: '2019 —',
    font: "'DM Sans', 'Helvetica Neue', sans-serif",
    weight: 700, style: 'normal',
    sub: 'An oracle deck as pedagogical methodology',
  },
  {
    slug: 'moving-material-museum',
    cat: 'Platform', year: '2015',
    font: "'IBM Plex Sans', 'Helvetica Neue', sans-serif",
    weight: 700, style: 'normal',
    sub: 'A nomadic platform for material culture and globalisation',
  },
  {
    slug: 'paper-making',
    cat: 'Material', year: '2018 —',
    font: "'EB Garamond', Georgia, serif",
    weight: 400, style: 'italic',
    sub: 'Hand papermaking as material transformation and memory',
  },
]

export default function ArchivePage() {
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [hovered, setHovered] = useState<string | null>(null)

  const hoveredProj = hovered ? projects.find(p => p.slug === hovered) : null

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <style>{`
        .ct-item { transition: background 0.1s; }
        .ct-item:hover { background: #fafafa; }
        .ct-sub { opacity: 0; transition: opacity 0.2s; max-height: 0; overflow: hidden; }
        .ct-item:hover .ct-sub { opacity: 1; max-height: 80px; }
        .gi { overflow: hidden; }
        .gi-img { filter: grayscale(100%); transition: filter 0.6s ease; }
        .gi:hover .gi-img { filter: grayscale(0%); }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ borderBottom: '1px solid #000', position: 'sticky', top: 0, background: '#fff', zIndex: 50 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 40px' }}>
          <Link href="/" style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '15px', fontWeight: 400, color: '#000', textDecoration: 'none', fontStyle: 'italic' }}>
            dr<span style={{ color: ACCENT }}>.</span> Berendje
          </Link>
          <div style={{ display: 'flex', gap: 32 }}>
            {[
              { label: 'Research Projects', href: '/archive', active: true },
              { label: 'Writing', href: '/writing' },
              { label: 'Education', href: '/education' },
              { label: 'Consultancy', href: '/consultancy' },
              { label: 'Playtime', href: '/playtime' },
              { label: 'About', href: '/about' },
            ].map(n => (
              <Link key={n.label} href={n.href} style={{
                fontFamily: BODY, fontSize: '11px', fontWeight: n.active ? 500 : 400,
                color: '#000', textDecoration: 'none', letterSpacing: '0.04em',
                borderBottom: n.active ? '1px solid #000' : 'none', paddingBottom: n.active ? 1 : 0,
              }}>{n.label}</Link>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {(['list', 'grid'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                background: 'none', border: 'none', fontFamily: BODY, fontSize: '11px',
                letterSpacing: '0.06em', color: '#000', fontWeight: view === v ? 500 : 400,
                opacity: view === v ? 1 : 0.35,
                borderBottom: view === v ? '1px solid #000' : 'none', paddingBottom: 1,
              }}>{v.charAt(0).toUpperCase() + v.slice(1)}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 40px' }}>
          <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.08em', color: '#000', opacity: 0.4, textTransform: 'uppercase' }}>{WORK.length} Projects</span>
          <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.08em', color: '#000', opacity: 0.4, textTransform: 'uppercase' }}>2008 — Ongoing</span>
        </div>
      </nav>

      {/* ══ LIST VIEW — 65/35 split, fixed right image panel ══ */}
      {view === 'list' && (
        <div style={{ display: 'grid', gridTemplateColumns: '65fr 35fr', alignItems: 'start', minHeight: 'calc(100vh - 76px)' }}>

          {/* Left: scrollable index */}
          <div>
            {WORK.map(item => {
              const proj = projects.find(p => p.slug === item.slug)
              if (!proj) return null
              return (
                <Link
                  key={item.slug}
                  href={`/archive/${item.slug}`}
                  className="ct-item"
                  style={{ display: 'block', textDecoration: 'none' }}
                  onMouseEnter={() => setHovered(item.slug)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Meta row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '32px 40px 0' }}>
                    <span style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 400, color: '#000', opacity: 0.4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {item.cat}
                    </span>
                    <span style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 400, color: '#000', opacity: 0.4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {item.year}
                    </span>
                  </div>

                  {/* Title — centered, project's own font */}
                  <div style={{ padding: '8px 40px 0', textAlign: 'center' }}>
                    <h2 style={{
                      fontFamily: item.font,
                      fontSize: 'clamp(2.8rem, 6.5vw, 7rem)',
                      fontWeight: item.weight,
                      fontStyle: item.style as 'normal' | 'italic',
                      color: '#000',
                      lineHeight: 1.0,
                      letterSpacing: item.style === 'normal' ? '-0.02em' : '-0.01em',
                      margin: 0,
                    }}>
                      {proj.title}
                    </h2>
                  </div>

                  {/* Sub + date — centered, appears on hover */}
                  <div className="ct-sub" style={{ textAlign: 'center', padding: '12px 40px 0' }}>
                    <p style={{ fontFamily: BODY, fontSize: '12px', fontWeight: 400, color: '#000', opacity: 0.55, lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
                      {item.sub}
                    </p>
                  </div>

                  <div style={{ height: 40 }} />
                </Link>
              )
            })}
          </div>

          {/* Right: fixed image preview panel */}
          <div style={{
            position: 'sticky',
            top: 76,
            height: 'calc(100vh - 76px)',
            overflow: 'hidden',
            background: '#f5f5f5',
          }}>
            {hoveredProj ? (
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Img src={hoveredProj.coverImage} alt={hoveredProj.title} fill style={{ objectFit: 'cover' }} />
              </div>
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', opacity: 0.2 }}>— — —</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ GRID VIEW — B&W hover reveal ══ */}
      {view === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '56px 40px', padding: '64px 48px 96px' }}>
          {WORK.map(item => {
            const proj = projects.find(p => p.slug === item.slug)
            if (!proj) return null
            return (
              <Link key={item.slug} href={`/archive/${item.slug}`} className="gi" style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', background: '#eee', marginBottom: 14 }}>
                  <img
                    className="gi-img"
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${proj.coverImage}`}
                    alt={proj.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <p style={{ fontFamily: item.font, fontSize: '14px', fontStyle: item.style as 'normal' | 'italic', fontWeight: item.weight > 600 ? 700 : 400, color: '#000', lineHeight: 1.3, marginBottom: 5 }}>
                  {proj.title}
                </p>
                <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 400, color: '#000', opacity: 0.4, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {item.cat} · {item.year}
                </p>
              </Link>
            )
          })}
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ padding: '60px 40px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000' }}>— — —</span>
        <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.06em', color: '#000', opacity: 0.5 }}>PhD Design Research · ArtEZ University of the Arts</span>
        <a href="mailto:linda@drberendje.com" style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.06em', color: '#000', textDecoration: 'none', borderBottom: '1px solid #000', paddingBottom: 1 }}>
          linda@drberendje.com
        </a>
      </footer>
    </main>
  )
}
