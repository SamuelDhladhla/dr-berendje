import Link from 'next/link'
import React from 'react'

const HEADING = "'Instrument Serif', Georgia, serif"
const BODY = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
const ACCENT = '#C8553D'

function CVSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <div style={{ borderTop: '1px solid #000', paddingTop: '20px', marginBottom: '24px' }}>
        <span style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, color: '#000', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}

function CVEntry({ title, subtitle, meta, note }: { title: string; subtitle?: string; meta?: string; note?: string }) {
  return (
    <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #000' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20, marginBottom: subtitle || note ? 4 : 0 }}>
        <span style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 400, color: '#000', lineHeight: 1.6 }}>{title}</span>
        {meta && <span style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 300, color: '#000', letterSpacing: '0.04em', flexShrink: 0 }}>{meta}</span>}
      </div>
      {subtitle && <p style={{ fontFamily: BODY, fontSize: '12px', fontWeight: 300, color: '#000', lineHeight: 1.6, marginBottom: note ? 4 : 0 }}>{subtitle}</p>}
      {note && <p style={{ fontFamily: HEADING, fontSize: '13px', fontStyle: 'italic', color: '#000', lineHeight: 1.7 }}>{note}</p>}
    </div>
  )
}

export default function AboutPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', paddingBottom: '100px' }}>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 32px', borderBottom: '1px solid #000',
        position: 'sticky', top: 0, background: '#fff', zIndex: 50,
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: HEADING, fontSize: '18px', fontWeight: 400, color: '#000' }}>
            dr<span style={{ color: ACCENT }}>.</span> Berendje
          </span>
        </Link>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <Link href="/archive" style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 400, color: '#000', textDecoration: 'none' }}>Research Projects</Link>
          <span style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 400, color: '#000' }}>Writing</span>
          <span style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 400, color: '#000' }}>Pedagogies</span>
          <span style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 400, color: '#000' }}>Consultancy</span>
          <span style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 500, color: '#000', borderBottom: '1px solid #000', paddingBottom: 1 }}>About</span>
        </div>
        <div />
      </nav>

      {/* ── HEADER ── */}
      <div style={{ padding: '72px 32px 0', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ borderBottom: '1px solid #000', paddingBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 0, marginBottom: '20px' }}>
            <span style={{ fontFamily: HEADING, fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 400, color: '#000', letterSpacing: '-0.02em' }}>
              dr<span style={{ color: ACCENT }}>.</span> Berendje
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: BODY, fontSize: '12px', fontWeight: 500, color: '#000', letterSpacing: '0.04em', marginBottom: '4px' }}>Linda Valkeman</p>
              <p style={{ fontFamily: BODY, fontSize: '12px', fontWeight: 300, color: '#000', letterSpacing: '0.04em', marginBottom: '16px' }}>
                PhD Researcher in Design · ArtEZ University of the Arts
              </p>
              <p style={{ fontFamily: BODY, fontSize: '12px', fontWeight: 300, color: '#000', letterSpacing: '0.04em' }}>Netherlands / Ghana</p>
            </div>
            <div>
              <p style={{ fontFamily: HEADING, fontSize: '1rem', fontStyle: 'italic', color: '#000', lineHeight: 1.75 }}>
                "Design is the lens through which I observe, question, and speculate on societal shifts
                — a language through which new systems of value, care, and kinship may be imagined and enacted."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CV BODY ── */}
      <div style={{ padding: '52px 32px 0', maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px', alignItems: 'start' }}>
        <div>
          <CVSection label="Research Focus">
            <p style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 400, color: '#000', lineHeight: 1.9, marginBottom: '16px' }}>
              Repair as a method of material, social, and epistemic healing. Operating at the intersection of fashion, textiles, decolonial theory, and spatial practice.
            </p>
            <p style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 400, color: '#000', lineHeight: 1.9, marginBottom: '16px' }}>
              Grounded in third space theory and decolonial praxis, the research moves and mediates between geographies, disciplines, and multiple ways of knowing.
            </p>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {['Repair', 'Decolonial Fashion', 'Waste Colonialism', 'Material Culture', 'Pedagogy', 'Policy Design', 'Globalisation'].map(t => (
                <span key={t} style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 300, color: '#000', border: '1px solid #000', padding: '3px 8px', letterSpacing: '0.04em' }}>{t}</span>
              ))}
            </div>
          </CVSection>

          <CVSection label="Education">
            <CVEntry title="PhD Design Research" subtitle="ArtEZ University of the Arts, Arnhem" meta="2022 — ongoing" note="Dissertation: Repair as Social and Material Healing" />
            <CVEntry title="MA Fashion Strategy" subtitle="ArtEZ University of the Arts, Arnhem" meta="2008 — 2010" />
          </CVSection>

          <CVSection label="Affiliations">
            <CVEntry title="ArtEZ University of the Arts" subtitle="Researcher & Educator, Fashion Department" meta="Arnhem, NL" />
            <CVEntry title="Stop Waste Colonialism" subtitle="Co-founder & Policy Design Lead" meta="2020 — ongoing" />
            <CVEntry title="Kantamanto Social Club" subtitle="Research Partner" meta="Accra, GH" />
          </CVSection>

          <CVSection label="Contact">
            <a href="mailto:linda@drberendje.com" style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 400, color: '#000', letterSpacing: '0.04em', textDecoration: 'none', borderBottom: '1px solid #000', paddingBottom: 1 }}>
              linda@drberendje.com →
            </a>
          </CVSection>
        </div>

        <div>
          <CVSection label="Selected Publications & Lectures">
            <CVEntry title="The Ecologies of Repair — Keynote" subtitle="Design Research Conference, Rotterdam" meta="2024" />
            <CVEntry title="Obroni Wa Wu: Fashion Waste and Colonial Systems" subtitle="Fashion Theory Journal" meta="2023" />
            <CVEntry title="Sender–Receiver: A Curriculum for Repair" subtitle="ArtEZ Press" meta="2023" />
            <CVEntry title="Stop Waste Colonialism — Policy Brief" subtitle="EU Textile Strategy Working Group" meta="2022" />
            <CVEntry title="Black Botanicals: Colonial Plant Knowledge" subtitle="Exhibition Catalogue, Riso Print Series" meta="2018" />
            <CVEntry title="The Fine Art of Fakery — Lecture Series" subtitle="Design Academy Eindhoven" meta="2015" />
          </CVSection>

          <CVSection label="Exhibitions & Presentations">
            <CVEntry title="Black Botanicals" subtitle="India — Netherlands — South Africa" meta="2017 — ongoing" />
            <CVEntry title="Post Fossils" subtitle="Material Speculations Exhibition" meta="2015" />
            <CVEntry title="Blueprint" subtitle="Cross-cultural Textile Research, China" meta="2014" />
            <CVEntry title="Moving Material Museum (MMM)" subtitle="Nomadic Platform, Global" meta="2015 — 2019" />
            <CVEntry title="Secondhand Speculation" subtitle="Berlin · Arnhem · Accra · Johannesburg" meta="2019 — ongoing" />
          </CVSection>

          <CVSection label="Practice Areas">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
              {['Research', 'Teaching', 'Repair', 'Writing', 'Curating', 'Policy Design'].map(a => (
                <p key={a} style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 400, color: '#000', lineHeight: 2.4, borderBottom: '1px solid #000' }}>{a}</p>
              ))}
            </div>
          </CVSection>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ maxWidth: '1100px', margin: '52px auto 0', padding: '0 32px' }}>
        <div style={{ borderTop: '1px solid #000', paddingTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: '9px', color: '#000', letterSpacing: '0.4em' }}>— — —</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <Link href="/archive" style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 400, color: '#000', letterSpacing: '0.04em', textDecoration: 'none' }}>
              ← Archive
            </Link>
            <span style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 400, color: '#000', letterSpacing: '0.04em' }}>
              PhD Design Research · ArtEZ University of the Arts
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
