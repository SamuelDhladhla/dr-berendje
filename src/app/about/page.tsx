import Link from 'next/link'
import React from 'react'

const HEADING = "'Instrument Serif', Georgia, serif"
const BODY = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
const ACCENT = '#C8553D'

export default function AboutPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 40px',
        borderBottom: '1px solid #000',
        position: 'sticky',
        top: 0,
        background: '#fff',
        zIndex: 50,
      }}>
        <Link href="/" style={{ fontFamily: HEADING, fontSize: '15px', fontWeight: 400, color: '#000', textDecoration: 'none', fontStyle: 'italic' }}>
          dr<span style={{ color: ACCENT }}>.</span> Berendje
        </Link>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {[
            { label: 'Research Projects', href: '/archive' },
            { label: 'Writing', href: '/writing' },
            { label: 'Pedagogies', href: '#' },
            { label: 'Consultancy', href: '#' },
            { label: 'About', href: '/about', active: true },
          ].map(n => (
            <Link key={n.label} href={n.href} style={{
              fontFamily: BODY, fontSize: '11px',
              fontWeight: n.active ? 500 : 400,
              color: '#000', textDecoration: 'none',
              letterSpacing: '0.04em',
              borderBottom: n.active ? '1px solid #000' : 'none',
              paddingBottom: n.active ? 1 : 0,
            }}>{n.label}</Link>
          ))}
        </div>
        <div />
      </nav>

      {/* ══ OKRA EDITORIAL GRID ══ */}

      {/* Section 1 — Full-width header, editorial pacing */}
      <div style={{ padding: '80px 40px 0', borderBottom: '1px solid #000' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0 80px',
          alignItems: 'end',
          paddingBottom: 60,
        }}>
          <div>
            <p style={{
              fontFamily: BODY,
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#000',
              marginBottom: 28,
            }}>
              Linda Valkeman — PhD Design Researcher
            </p>
            <h1 style={{
              fontFamily: HEADING,
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#000',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              margin: 0,
            }}>
              dr<span style={{ color: ACCENT }}>.</span> Berendje
            </h1>
          </div>
          <div style={{ paddingBottom: 8 }}>
            <p style={{
              fontFamily: HEADING,
              fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#000',
              lineHeight: 1.65,
              maxWidth: 480,
            }}>
              "Design is the lens through which I observe, question, and speculate on societal shifts — a language through which new systems of value, care, and kinship may be imagined and enacted."
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 — Two-column body: Research + CV */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: '1px solid #000',
      }}>
        {/* Left — Research focus */}
        <div style={{
          padding: '60px 40px 60px 40px',
          borderRight: '1px solid #000',
        }}>
          <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', marginBottom: 28 }}>
            Research Focus
          </p>
          <p style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 400, color: '#000', lineHeight: 1.85, marginBottom: 24 }}>
            Repair as a method of material, social, and epistemic healing. Operating at the intersection of fashion, textiles, decolonial theory, and spatial practice.
          </p>
          <p style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 400, color: '#000', lineHeight: 1.85, marginBottom: 40 }}>
            Grounded in third space theory and decolonial praxis, the research moves and mediates between geographies, disciplines, and multiple ways of knowing.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['Repair', 'Decolonial Fashion', 'Waste Colonialism', 'Material Culture', 'Pedagogy', 'Policy Design', 'Globalisation'].map(t => (
              <span key={t} style={{
                fontFamily: BODY, fontSize: '10px', fontWeight: 400, color: '#000',
                border: '1px solid #000', padding: '3px 10px',
                letterSpacing: '0.04em',
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right — Affiliations + Education */}
        <div style={{ padding: '60px 40px 60px 40px' }}>
          <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', marginBottom: 28 }}>
            Position
          </p>
          {[
            { role: 'PhD Design Research', org: 'ArtEZ University of the Arts, Arnhem', period: '2022 — ongoing' },
            { role: 'Researcher & Educator, Fashion', org: 'ArtEZ University of the Arts', period: 'Ongoing' },
            { role: 'Co-founder, Stop Waste Colonialism', org: 'Policy Design Lead', period: '2020 — ongoing' },
            { role: 'Research Partner', org: 'Kantamanto Social Club, Accra', period: 'Ongoing' },
          ].map(e => (
            <div key={e.role} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid #000' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 500, color: '#000' }}>{e.role}</span>
                <span style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 300, color: '#000', letterSpacing: '0.04em' }}>{e.period}</span>
              </div>
              <span style={{ fontFamily: BODY, fontSize: '12px', fontWeight: 300, color: '#000' }}>{e.org}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 — Selected publications, full width */}
      <div style={{ padding: '60px 40px 60px' }}>
        <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', marginBottom: 40 }}>
          Selected Publications &amp; Lectures
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px' }}>
          <div>
            {[
              { title: 'The Ecologies of Repair — Keynote', venue: 'Design Research Conference, Rotterdam', year: '2024' },
              { title: 'Obroni Wa Wu: Fashion Waste and Colonial Systems', venue: 'Fashion Theory Journal', year: '2023' },
              { title: 'Sender–Receiver: A Curriculum for Repair', venue: 'ArtEZ Press', year: '2023' },
              { title: 'Stop Waste Colonialism — Policy Brief', venue: 'EU Textile Strategy Working Group', year: '2022' },
            ].map(p => (
              <div key={p.title} style={{ paddingBottom: 24, marginBottom: 24, borderBottom: '1px solid #000' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <span style={{ fontFamily: HEADING, fontSize: '14px', fontStyle: 'italic', color: '#000', fontWeight: 400 }}>{p.title}</span>
                  <span style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 300, color: '#000', letterSpacing: '0.04em', flexShrink: 0, marginLeft: 16 }}>{p.year}</span>
                </div>
                <span style={{ fontFamily: BODY, fontSize: '12px', fontWeight: 300, color: '#000' }}>{p.venue}</span>
              </div>
            ))}
          </div>
          <div>
            {[
              { title: 'Black Botanicals: Colonial Plant Knowledge', venue: 'Exhibition Catalogue, Riso Print Series', year: '2018' },
              { title: 'The Fine Art of Fakery — Lecture Series', venue: 'Design Academy Eindhoven', year: '2015' },
              { title: 'Secondhand Speculation', venue: 'Berlin · Arnhem · Accra · Johannesburg', year: '2019 —' },
              { title: 'Post Fossils', venue: 'Material Speculations Exhibition', year: '2015' },
            ].map(p => (
              <div key={p.title} style={{ paddingBottom: 24, marginBottom: 24, borderBottom: '1px solid #000' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <span style={{ fontFamily: HEADING, fontSize: '14px', fontStyle: 'italic', color: '#000', fontWeight: 400 }}>{p.title}</span>
                  <span style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 300, color: '#000', letterSpacing: '0.04em', flexShrink: 0, marginLeft: 16 }}>{p.year}</span>
                </div>
                <span style={{ fontFamily: BODY, fontSize: '12px', fontWeight: 300, color: '#000' }}>{p.venue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 4 — Contact, full-width minimal */}
      <div style={{ borderTop: '1px solid #000', padding: '40px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', marginBottom: 8 }}>Contact</p>
          <a href="mailto:linda@drberendje.com" style={{
            fontFamily: BODY, fontSize: '14px', fontWeight: 400, color: '#000',
            textDecoration: 'none', borderBottom: '1px solid #000', paddingBottom: 1,
          }}>linda@drberendje.com →</a>
        </div>
        <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.08em', color: '#000' }}>
          PhD Design Research · ArtEZ University of the Arts · Netherlands / Ghana
        </span>
      </div>
    </main>
  )
}
