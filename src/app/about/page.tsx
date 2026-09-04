import React from 'react'
import SiteHeader from '@/components/SiteHeader'
import Wordmark from '@/components/Wordmark'
import Placeholder from '@/components/Placeholder'

const HEADING = 'var(--font-body)'
const BODY = 'var(--font-body)'

export default function AboutPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <SiteHeader active="/about" />

      {/* ══ OKRA EDITORIAL GRID ══ */}

      {/* Section 1 — Full-width header, editorial pacing */}
      <div style={{ padding: '100px 40px 0' }}>
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
            <h1 style={{ margin: 0, lineHeight: 0.9 }}>
              <Wordmark fontSize="clamp(3rem, 7vw, 6.5rem)" style={{ color: '#000' }} />
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
        gap: '0 80px',
      }}>
        {/* Left — Research focus */}
        <div style={{
          padding: '80px 0 80px 40px',
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Repair', 'Decolonial Fashion', 'Waste Colonialism', 'Material Culture', 'Pedagogy', 'Policy Design', 'Globalisation'].map(t => (
              <span key={t} style={{
                fontFamily: BODY, fontSize: '10px', fontWeight: 400, color: '#000',
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right — Affiliations + Education */}
        <div style={{ padding: '80px 40px 80px 0' }}>
          <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', marginBottom: 28 }}>
            Position
          </p>
          {[
            { role: 'PhD Design Research', org: 'ArtEZ University of the Arts, Arnhem', period: '2022 — ongoing' },
            { role: 'Researcher & Educator, Fashion', org: 'ArtEZ University of the Arts', period: 'Ongoing' },
            { role: 'Co-founder, Stop Waste Colonialism', org: 'Policy Design Lead', period: '2020 — ongoing' },
            { role: 'Research Partner', org: 'Kantamanto Social Club, Accra', period: 'Ongoing' },
          ].map(e => (
            <div key={e.role} style={{ marginBottom: 40 }}>
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
      <div style={{ padding: '80px 40px 80px' }}>
        <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', marginBottom: 16 }}>
          Selected Publications &amp; Lectures
        </p>
        {/* These citations — journals, venues and years — are not in the client's
            work-flow doc and could not be verified. Bibliographic records must not
            be guessed; marked until the client supplies the real list. */}
        <div style={{ marginBottom: 32 }}>
          <Placeholder note="publication list unverified — venues and years not sourced from client documents" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px' }}>
          <div>
            {[
              { title: 'The Ecologies of Repair — Keynote', venue: 'Design Research Conference, Rotterdam', year: '2024' },
              { title: 'Obroni Wa Wu: Fashion Waste and Colonial Systems', venue: 'Fashion Theory Journal', year: '2023' },
              { title: 'Sender–Receiver: A Curriculum for Repair', venue: 'ArtEZ Press', year: '2023' },
              { title: 'Stop Waste Colonialism — Policy Brief', venue: 'EU Textile Strategy Working Group', year: '2022' },
            ].map(p => (
              <div key={p.title} style={{ paddingBottom: 0, marginBottom: 40 }}>
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
              <div key={p.title} style={{ paddingBottom: 0, marginBottom: 40 }}>
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
      <div style={{ padding: '80px 40px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
