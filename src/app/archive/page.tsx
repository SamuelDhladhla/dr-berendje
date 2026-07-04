'use client'
import { useState } from 'react'
import Link from 'next/link'
import Img from '@/components/Img'
import { projects } from '@/data/projects'

const HEADING = "'Instrument Serif', Georgia, serif"
const BODY = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
const ACCENT = '#C8553D'

const WORK = [
  { slug: 'the-ecologies-of-repair',   cat: 'Research',      year: '2024 —', location: 'Netherlands / Ghana',         sub: 'Material, social and epistemic healing' },
  { slug: 'dead-white-mans-clothes',   cat: 'Fashion',       year: '2011 —', location: 'Ghana / Global',              sub: 'Obroni Wa Wu — the secondhand clothing trade' },
  { slug: 'waste-colonialism',         cat: 'Policy',        year: '2020 —', location: 'Ghana / Netherlands / Global', sub: 'Stop Waste Colonialism campaign' },
  { slug: 'sender-receiver-residence', cat: 'Residency',     year: '2023 —', location: 'Netherlands / Ghana / Global', sub: 'A curriculum for repair' },
  { slug: 'secondhand-speculation',    cat: 'Pedagogy',      year: '2019 —', location: 'Berlin / Arnhem / Accra',     sub: 'Oracle deck methodology' },
  { slug: 'black-botanicals',          cat: 'Publication',   year: '2017 —', location: 'India / Netherlands / SA',    sub: 'Politics of plants and colonial botanical history' },
  { slug: 'the-fine-art-of-fakery',    cat: 'Exhibition',    year: '2015',   location: 'Jingdezhen, China',           sub: 'The new fake is real' },
  { slug: 'blueprint',                 cat: 'Textile',       year: '2014',   location: 'China',                       sub: 'Delftware, blue-and-white, and the copy' },
  { slug: 'post-fossils',              cat: 'Speculative',   year: '2015',   location: 'Netherlands',                 sub: 'The material record of the present' },
  { slug: 'moving-material-museum',    cat: 'Platform',      year: '2015',   location: 'Global / Nomadic',            sub: 'Nomadic research and material culture' },
  { slug: 'paper-making',              cat: 'Material',      year: '2018 —', location: 'Netherlands',                 sub: 'Hand papermaking as research process' },
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
        .da-row { display: block; text-decoration: none; }
        .da-row:hover { background: #fafafa; }
        .da-row:hover .da-sub { opacity: 1; }
        .da-sub { opacity: 0; transition: opacity 0.15s; }
        .da-img:hover img { transform: scale(1.02); }
        .nav-link { opacity: 0.35; transition: opacity 0.15s; }
        .nav-link:hover { opacity: 1; }
        .nav-link.active { opacity: 1; border-bottom: 1px solid #000; }
      `}</style>

      {/* ── NAV — Sassen two-row structure ── */}
      <nav style={{
        borderBottom: '1px solid #000',
        position: 'sticky',
        top: 0,
        background: '#fff',
        zIndex: 50,
      }}>
        {/* Row 1 — site + section nav */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 40px',
          borderBottom: '1px solid #e8e8e8',
        }}>
          <Link href="/" style={{ fontFamily: HEADING, fontSize: '15px', fontWeight: 400, color: '#000', textDecoration: 'none', fontStyle: 'italic' }}>
            dr<span style={{ color: ACCENT }}>.</span> Berendje
          </Link>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {[
              { label: 'Research Projects', href: '/archive', active: true },
              { label: 'Writing', href: '/writing', active: false },
              { label: 'Pedagogies', href: '#', active: false },
              { label: 'Consultancy', href: '#', active: false },
              { label: 'About', href: '/about', active: false },
            ].map(n => (
              <Link key={n.label} href={n.href} style={{
                fontFamily: BODY,
                fontSize: '11px',
                fontWeight: n.active ? 500 : 400,
                color: '#000',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                borderBottom: n.active ? '1px solid #000' : 'none',
                paddingBottom: n.active ? 1 : 0,
              }}>{n.label}</Link>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button onClick={() => setView('list')} style={{
              background: 'none', border: 'none',
              fontFamily: BODY, fontSize: '11px', letterSpacing: '0.06em',
              color: '#000', fontWeight: view === 'list' ? 500 : 400,
              opacity: view === 'list' ? 1 : 0.35,
              borderBottom: view === 'list' ? '1px solid #000' : 'none',
              paddingBottom: 1,
            }}>List</button>
            <span style={{ fontFamily: BODY, fontSize: '11px', color: '#000', opacity: 0.2 }}>/</span>
            <button onClick={() => setView('grid')} style={{
              background: 'none', border: 'none',
              fontFamily: BODY, fontSize: '11px', letterSpacing: '0.06em',
              color: '#000', fontWeight: view === 'grid' ? 500 : 400,
              opacity: view === 'grid' ? 1 : 0.35,
              borderBottom: view === 'grid' ? '1px solid #000' : 'none',
              paddingBottom: 1,
            }}>Grid</button>
          </div>
        </div>

        {/* Row 2 — context labels (Sassen second row style) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 40px',
        }}>
          <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.08em', color: '#000', textTransform: 'uppercase' }}>
            {WORK.length} Projects
          </span>
          <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.08em', color: '#000', textTransform: 'uppercase' }}>
            2011 — Ongoing
          </span>
        </div>
      </nav>

      {/* ── FLOATING CURSOR IMAGE ── */}
      {hoveredProj && (
        <div style={{
          position: 'fixed', left: mouseX + 28, top: mouseY - 120,
          width: 220, height: 290,
          zIndex: 200, pointerEvents: 'none',
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        }}>
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#f0f0f0' }}>
            <Img src={hoveredProj.coverImage} alt={hoveredProj.title} fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      )}

      {/* ══ LIST VIEW — commercialtype Vault scale ══ */}
      {view === 'list' && (
        <div>
          {WORK.map((item) => {
            const proj = projects.find(p => p.slug === item.slug)
            if (!proj) return null
            return (
              <Link
                key={item.slug}
                href={`/archive/${item.slug}`}
                className="da-row"
                style={{
                  display: 'block',
                  padding: '40px 40px 32px',
                  borderBottom: '1px solid #000',
                  textDecoration: 'none',
                }}
                onMouseEnter={() => setHovered(item.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Metadata line above — small caps */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: 12,
                }}>
                  <span style={{
                    fontFamily: BODY,
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: '#000',
                  }}>
                    {item.cat}
                  </span>
                  <span style={{
                    fontFamily: BODY,
                    fontSize: '10px',
                    fontWeight: 400,
                    letterSpacing: '0.06em',
                    color: '#000',
                  }}>
                    {item.year}
                  </span>
                </div>

                {/* Project title — large, italic, display scale */}
                <h2 style={{
                  fontFamily: HEADING,
                  fontSize: 'clamp(3.2rem, 8vw, 9.5rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#000',
                  lineHeight: 0.88,
                  letterSpacing: '-0.03em',
                  marginBottom: 20,
                }}>
                  {proj.title}
                </h2>

                {/* Subline — appears on hover */}
                <div className="da-sub" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}>
                  <span style={{
                    fontFamily: HEADING,
                    fontSize: '14px',
                    fontStyle: 'italic',
                    color: '#000',
                    fontWeight: 400,
                  }}>
                    {item.sub}
                  </span>
                  <span style={{
                    fontFamily: BODY,
                    fontSize: '10px',
                    fontWeight: 300,
                    color: '#000',
                    letterSpacing: '0.04em',
                  }}>
                    {item.location}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* ══ GRID VIEW — Viviane Sassen style ══ */}
      {view === 'grid' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '56px 48px',
          padding: '56px 60px 80px',
        }}>
          {WORK.map(item => {
            const proj = projects.find(p => p.slug === item.slug)
            if (!proj) return null
            return (
              <Link
                key={item.slug}
                href={`/archive/${item.slug}`}
                className="da-img"
                style={{ display: 'block', textDecoration: 'none' }}
              >
                {/* Image */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  background: '#f0f0f0',
                  marginBottom: 12,
                }}>
                  <Img
                    src={proj.coverImage}
                    alt={proj.title}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                  />
                </div>

                {/* Caption — italic like Sassen */}
                <p style={{
                  fontFamily: HEADING,
                  fontSize: '13px',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: '#000',
                  lineHeight: 1.4,
                  marginBottom: 3,
                }}>
                  {proj.title}
                </p>
                <p style={{
                  fontFamily: BODY,
                  fontSize: '11px',
                  fontWeight: 300,
                  color: '#000',
                  letterSpacing: '0.04em',
                }}>
                  {item.cat} · {item.year}
                </p>
              </Link>
            )
          })}
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid #000',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000' }}>
          — — —
        </span>
        <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.06em', color: '#000' }}>
          PhD Design Research · ArtEZ University of the Arts
        </span>
        <a href="mailto:linda@drberendje.com" style={{
          fontFamily: BODY, fontSize: '10px', letterSpacing: '0.06em',
          color: '#000', textDecoration: 'none',
          borderBottom: '1px solid #000', paddingBottom: 1,
        }}>
          linda@drberendje.com
        </a>
      </footer>
    </main>
  )
}
