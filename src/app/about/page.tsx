import Link from 'next/link'
import React from 'react'

// ─── ACADEMIC CV — dr Berendje / Linda Valkeman ───────────────────────────────
// White background · journal formatting · CV sections

const MONO = "'DM Mono', 'Courier New', monospace"
const SERIF = "'Playfair Display', Georgia, serif"

function CVSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: '20px', marginBottom: '24px' }}>
        <span style={{ fontFamily: MONO, fontSize: '9px', color: '#aaa', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}

function CVEntry({ title, subtitle, meta, note }: { title: string; subtitle?: string; meta?: string; note?: string }) {
  return (
    <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20, marginBottom: subtitle || note ? 4 : 0 }}>
        <span style={{ fontFamily: MONO, fontSize: '12px', color: '#222', lineHeight: 1.6 }}>{title}</span>
        {meta && <span style={{ fontFamily: MONO, fontSize: '10px', color: '#bbb', letterSpacing: '0.04em', flexShrink: 0 }}>{meta}</span>}
      </div>
      {subtitle && <p style={{ fontFamily: MONO, fontSize: '11px', color: '#888', lineHeight: 1.6, marginBottom: note ? 4 : 0 }}>{subtitle}</p>}
      {note && <p style={{ fontFamily: SERIF, fontSize: '12px', fontStyle: 'italic', color: '#999', lineHeight: 1.7 }}>{note}</p>}
    </div>
  )
}

export default function AboutPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh', paddingBottom: '100px' }}>

      {/* ── HEADER ── */}
      <div style={{ padding: '72px 32px 0', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ borderBottom: '1px solid #e8e8e8', paddingBottom: '40px', marginBottom: '0' }}>

          {/* Name */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 0, marginBottom: '20px' }}>
            <span style={{ fontFamily: MONO, fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 300, color: '#ccc', letterSpacing: '-0.02em' }}>
              dr&nbsp;
            </span>
            <em style={{ fontFamily: SERIF, fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontStyle: 'italic', fontWeight: 400, color: '#000', letterSpacing: '-0.01em' }}>
              Berendje
            </em>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
            <div>
              <p style={{ fontFamily: MONO, fontSize: '11px', color: '#888', letterSpacing: '0.06em', marginBottom: '4px' }}>Linda Valkeman</p>
              <p style={{ fontFamily: MONO, fontSize: '11px', color: '#aaa', letterSpacing: '0.06em', marginBottom: '16px' }}>
                PhD Researcher in Design · ArtEZ University of the Arts
              </p>
              <p style={{ fontFamily: MONO, fontSize: '11px', color: '#bbb', letterSpacing: '0.06em' }}>Netherlands / Ghana</p>
            </div>
            <div>
              <p style={{ fontFamily: SERIF, fontSize: '1rem', fontStyle: 'italic', color: '#888', lineHeight: 1.75 }}>
                "Design is the lens through which I observe, question, and speculate on societal shifts
                — a language through which new systems of value, care, and kinship may be imagined and enacted."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CV BODY ── */}
      <div style={{ padding: '52px 32px 0', maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px', alignItems: 'start' }}>

        {/* LEFT COLUMN */}
        <div>
          <CVSection label="Research Focus">
            <p style={{ fontFamily: MONO, fontSize: '12px', color: '#555', lineHeight: 2.0, marginBottom: '16px' }}>
              Repair as a method of material, social, and epistemic healing. Operating at the intersection of fashion, textiles, decolonial theory, and spatial practice.
            </p>
            <p style={{ fontFamily: MONO, fontSize: '12px', color: '#666', lineHeight: 2.0, marginBottom: '16px' }}>
              Grounded in third space theory and decolonial praxis, the research moves and mediates between geographies, disciplines, and multiple ways of knowing.
            </p>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {['Repair', 'Decolonial Fashion', 'Waste Colonialism', 'Material Culture', 'Pedagogy', 'Policy Design', 'Globalisation'].map(t => (
                <span key={t} style={{ fontFamily: MONO, fontSize: '9px', color: '#aaa', border: '1px solid #e8e8e8', padding: '3px 8px', letterSpacing: '0.05em' }}>{t}</span>
              ))}
            </div>
          </CVSection>

          <CVSection label="Education">
            <CVEntry
              title="PhD Design Research"
              subtitle="ArtEZ University of the Arts, Arnhem"
              meta="2022 — ongoing"
              note="Dissertation: Repair as Social and Material Healing"
            />
            <CVEntry
              title="MA Fashion Strategy"
              subtitle="ArtEZ University of the Arts, Arnhem"
              meta="2008 — 2010"
            />
          </CVSection>

          <CVSection label="Affiliations">
            <CVEntry
              title="ArtEZ University of the Arts"
              subtitle="Researcher & Educator, Fashion Department"
              meta="Arnhem, NL"
            />
            <CVEntry
              title="Stop Waste Colonialism"
              subtitle="Co-founder & Policy Design Lead"
              meta="2020 — ongoing"
            />
            <CVEntry
              title="Kantamanto Social Club"
              subtitle="Research Partner"
              meta="Accra, GH"
            />
          </CVSection>

          <CVSection label="Contact">
            <a href="mailto:linda@drberendje.com" style={{ fontFamily: MONO, fontSize: '12px', color: '#888', letterSpacing: '0.04em', textDecoration: 'none' }}>
              linda@drberendje.com →
            </a>
          </CVSection>
        </div>

        {/* RIGHT COLUMN */}
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
                <p key={a} style={{ fontFamily: MONO, fontSize: '12px', color: '#888', lineHeight: 2.4, borderBottom: '1px solid #f5f5f5' }}>{a}</p>
              ))}
            </div>
          </CVSection>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ maxWidth: '1100px', margin: '52px auto 0', padding: '0 32px' }}>
        <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ fontFamily: MONO, fontSize: '10px', color: '#bbb', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
            ← Return
          </Link>
          <span style={{ fontFamily: MONO, fontSize: '10px', color: '#ccc', letterSpacing: '0.06em' }}>
            PhD Design Research · ArtEZ University of the Arts
          </span>
        </div>
      </div>

    </main>
  )
}
