'use client'
import { useState } from 'react'
import Link from 'next/link'
import Img from '@/components/Img'
import { projects } from '@/data/projects'

const BODY = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
const ACCENT = '#C8553D'

// Per-project font identity — each title shown in its own typeface
const WORK = [
  {
    slug: 'the-ecologies-of-repair',
    cat: 'Research', year: '2024 —',
    font: "'Instrument Serif', Georgia, serif",
    weight: 400, style: 'italic',
    sub: 'Repair as material, social, and epistemic healing',
  },
  {
    slug: 'dead-white-mans-clothes',
    cat: 'Fashion', year: '2011 — 2025',
    font: "'Space Grotesk', Arial, sans-serif",
    weight: 700, style: 'normal',
    sub: 'The secondhand clothing trade and waste colonialism',
  },
  {
    slug: 'waste-colonialism',
    cat: 'Policy', year: '2020 —',
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
    slug: 'black-botanicals',
    cat: 'Publication', year: '2017 —',
    font: "'Libre Baskerville', Georgia, serif",
    weight: 700, style: 'italic',
    sub: 'Colonial plant knowledge, dyeing, and botanical history',
  },
  {
    slug: 'the-fine-art-of-fakery',
    cat: 'Exhibition', year: '2015',
    font: "'Playfair Display', Georgia, serif",
    weight: 700, style: 'italic',
    sub: 'Authenticity, imitation, and the politics of the copy',
  },
  {
    slug: 'blueprint',
    cat: 'Textile', year: '2014',
    font: "'Archivo Black', 'Arial Black', sans-serif",
    weight: 400, style: 'normal',
    sub: 'Delftware, blue-and-white porcelain, and cross-cultural exchange',
  },
  {
    slug: 'post-fossils',
    cat: 'Speculative', year: '2015',
    font: "'Source Serif 4', Georgia, serif",
    weight: 600, style: 'italic',
    sub: 'The material record of the present — what we leave behind',
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
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  const hoveredProj = hovered ? projects.find(p => p.slug === hovered) : null

  return (
    <main
      style={{ background: '#fff', minHeight: '100vh' }}
      onMouseMove={e => { setMouseX(e.clientX); setMouseY(e.clientY) }}
    >
      <style>{`
        .ct-item:hover { background: #fafafa; }
        .ct-sub { opacity: 0; transition: opacity 0.15s; }
        .ct-item:hover .ct-sub { opacity: 1; }
        .gi:hover img { transform: scale(1.03); }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ borderBottom: '1px solid #000', position: 'sticky', top: 0, background: '#fff', zIndex: 50 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 40px', borderBottom: '1px solid #e8e8e8' }}>
          <Link href="/" style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '15px', fontWeight: 400, color: '#000', textDecoration: 'none', fontStyle: 'italic' }}>
            dr<span style={{ color: ACCENT }}>.</span> Berendje
          </Link>
          <div style={{ display: 'flex', gap: 32 }}>
            {[
              { label: 'Research Projects', href: '/archive', active: true },
              { label: 'Writing', href: '/writing' },
              { label: 'Pedagogies', href: '#' },
              { label: 'Consultancy', href: '#' },
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
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 40px' }}>
          <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.08em', color: '#000', textTransform: 'uppercase' }}>{WORK.length} Projects</span>
          <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.08em', color: '#000', textTransform: 'uppercase' }}>2011 — Ongoing</span>
        </div>
      </nav>

      {/* ── FLOATING CURSOR IMAGE ── */}
      {hoveredProj && (
        <div style={{ position: 'fixed', left: mouseX + 28, top: mouseY - 140, width: 240, height: 300, zIndex: 200, pointerEvents: 'none', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#f0f0f0' }}>
            <Img src={hoveredProj.coverImage} alt={hoveredProj.title} fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      )}

      {/* ══ LIST VIEW — CommercialType Catalog exactly ══ */}
      {view === 'list' && (
        <div>
          {WORK.map(item => {
            const proj = projects.find(p => p.slug === item.slug)
            if (!proj) return null
            return (
              <Link
                key={item.slug}
                href={`/archive/${item.slug}`}
                className="ct-item"
                style={{ display: 'block', textDecoration: 'none', borderBottom: '1px solid #000' }}
                onMouseEnter={() => setHovered(item.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Meta row — exactly like "4 Styles · CLASSICS" */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 40px 0' }}>
                  <span style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 400, color: '#888', letterSpacing: '0.04em' }}>
                    {item.cat}
                  </span>
                  <span style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 400, color: '#888', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {item.year}
                  </span>
                </div>

                {/* Title — centred in project's own font */}
                <div style={{ padding: '8px 40px 0', textAlign: 'center' }}>
                  <h2 style={{
                    fontFamily: item.font,
                    fontSize: 'clamp(2.2rem, 5.5vw, 6rem)',
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

                {/* Sub description — centered, narrow, small — appears on hover */}
                <div className="ct-sub" style={{ textAlign: 'center', padding: '16px 40px 20px' }}>
                  <p style={{ fontFamily: BODY, fontSize: '12px', fontWeight: 400, color: '#444', lineHeight: 1.6, maxWidth: 560, margin: '0 auto' }}>
                    {item.sub}
                  </p>
                </div>

                {/* Spacer when not hovering */}
                <div className="ct-sub" style={{ display: 'none' }} />
                <div style={{ height: 20 }} />
              </Link>
            )
          })}
        </div>
      )}

      {/* ══ GRID VIEW — Sassen style ══ */}
      {view === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '56px 48px', padding: '56px 60px 80px' }}>
          {WORK.map(item => {
            const proj = projects.find(p => p.slug === item.slug)
            if (!proj) return null
            return (
              <Link key={item.slug} href={`/archive/${item.slug}`} className="gi" style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', background: '#f0f0f0', marginBottom: 12 }}>
                  <Img src={proj.coverImage} alt={proj.title} fill style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                </div>
                <p style={{ fontFamily: item.font, fontSize: '14px', fontStyle: item.style as 'normal' | 'italic', fontWeight: item.weight > 600 ? 700 : 400, color: '#000', lineHeight: 1.3, marginBottom: 4 }}>
                  {proj.title}
                </p>
                <p style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 300, color: '#000', letterSpacing: '0.04em' }}>
                  {item.cat} · {item.year}
                </p>
              </Link>
            )
          })}
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #000', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000' }}>— — —</span>
        <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.06em', color: '#000' }}>PhD Design Research · ArtEZ University of the Arts</span>
        <a href="mailto:linda@drberendje.com" style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.06em', color: '#000', textDecoration: 'none', borderBottom: '1px solid #000', paddingBottom: 1 }}>
          linda@drberendje.com
        </a>
      </footer>
    </main>
  )
}
