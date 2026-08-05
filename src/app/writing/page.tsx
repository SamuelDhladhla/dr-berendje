'use client'
import { useState } from 'react'
import Link from 'next/link'

const BODY = "'Suisse Intl', 'Neue Haas Grotesk Text', Inter, -apple-system, Arial, sans-serif"
const HEADING = "'Cormorant Garamond', Georgia, serif"
const ACCENT = '#C8553D'

type Category = 'All' | 'Academic Writing' | 'Policy' | 'Lectures & Talks' | 'Video Essay' | 'Catalogue Essays'

const WRITINGS = [
  {
    slug: 'ecologies-of-repair-keynote',
    title: 'The Ecologies of Repair',
    sub: 'Keynote — Design Research Conference, Rotterdam',
    date: '2024',
    cat: 'Lectures & Talks' as Category,
    excerpt: 'On repair as a cultural and social practice through which more just and equitable futures can be imagined.',
  },
  {
    slug: 'obroni-wa-wu-fashion-theory',
    title: 'Obroni Wa Wu: Fashion Waste and Colonial Systems',
    sub: 'Fashion Theory Journal',
    date: '2023',
    cat: 'Academic Writing' as Category,
    excerpt: 'Tracing the systems behind the secondhand clothing trade — who benefits, who bears the environmental and social cost.',
  },
  {
    slug: 'kantabeast-video-essay',
    title: 'Kantabeast',
    sub: 'Video Essay',
    date: '2023',
    cat: 'Video Essay' as Category,
    excerpt: 'A video essay about the Kantamanto market in Accra — the secondhand clothing system from the inside.',
  },
  {
    slug: 'sender-receiver-curriculum',
    title: 'Sender–Receiver: A Curriculum for Repair',
    sub: 'ArtEZ Press',
    date: '2023',
    cat: 'Catalogue Essays' as Category,
    excerpt: 'A methodology for thinking about repair at the scale of individual wardrobes and global systems.',
  },
  {
    slug: 'utopian-resurgence',
    title: 'Utopian Resurgence',
    sub: 'Essay — Kantamanto Social Club',
    date: '2022',
    cat: 'Academic Writing' as Category,
    excerpt: 'On the possibility of utopian thinking within material culture — what does it mean to imagine repair at scale?',
  },
  {
    slug: 'stop-waste-colonialism-brief',
    title: 'Stop Waste Colonialism — Policy Brief',
    sub: 'EU Textile Strategy Working Group',
    date: '2022',
    cat: 'Policy' as Category,
    excerpt: 'Designing systems that are genuinely equitable: what repair looks like at the scale of global trade.',
  },
  {
    slug: 'kantamanto-social-club',
    title: 'Kantamanto Social Club',
    sub: 'Publication — Accra / Arnhem',
    date: '2021',
    cat: 'Catalogue Essays' as Category,
    excerpt: 'On the informal economy, the secondhand clothing trade, and the knowledge systems of Kantamanto market.',
  },
  {
    slug: 'clothing-passports',
    title: 'Clothing Passports',
    sub: 'Policy Design — Stop Waste Colonialism',
    date: '2021',
    cat: 'Policy' as Category,
    excerpt: 'A proposal for tracing garments through their lives — from production to discard, accountability at every step.',
  },
  {
    slug: 'black-botanicals-catalogue',
    title: 'Black Botanicals: Colonial Plant Knowledge',
    sub: 'Exhibition Catalogue, Riso Print Series',
    date: '2018',
    cat: 'Catalogue Essays' as Category,
    excerpt: 'Tracing indigo, madder, and other cash crops through their colonial circuits — from plantation to textile.',
  },
  {
    slug: 'fine-art-of-fakery-lecture',
    title: 'The New Fake is Real — Lecture Series',
    sub: 'Design Academy Eindhoven',
    date: '2015',
    cat: 'Lectures & Talks' as Category,
    excerpt: 'What does authenticity mean in a city built on masterful imitation? On the politics of the copy.',
  },
]

const CATS: Category[] = ['All', 'Academic Writing', 'Policy', 'Video Essay', 'Lectures & Talks', 'Catalogue Essays']

const NAV = [
  { label: 'Research Projects', href: '/archive' },
  { label: 'Writing', href: '/writing', active: true },
  { label: 'Education', href: '/education' },
  { label: 'Consultancy', href: '/consultancy' },
  { label: 'Playtime', href: '/playtime' },
  { label: 'About', href: '/about' },
]

export default function WritingPage() {
  const [cat, setCat] = useState<Category>('All')
  const [view, setView] = useState<'text' | 'list'>('text')

  const filtered = cat === 'All' ? WRITINGS : WRITINGS.filter(w => w.cat === cat)

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>

      {/* ── NAV ── */}
      <nav style={{ borderBottom: '1px solid #000', position: 'sticky', top: 0, background: '#fff', zIndex: 50 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 40px' }}>
          <Link href="/" style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '15px', fontWeight: 400, color: '#000', textDecoration: 'none', fontStyle: 'italic' }}>
            dr<span style={{ color: ACCENT }}>.</span> Berendje
          </Link>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {NAV.map(n => (
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
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setView('text')} style={{
              background: 'none', border: 'none', fontFamily: BODY, fontSize: '11px', letterSpacing: '0.06em',
              color: '#000', fontWeight: view === 'text' ? 500 : 400, opacity: view === 'text' ? 1 : 0.35,
              borderBottom: view === 'text' ? '1px solid #000' : 'none', paddingBottom: 1,
            }}>Text</button>
            <span style={{ fontSize: '11px', opacity: 0.2 }}>/</span>
            <button onClick={() => setView('list')} style={{
              background: 'none', border: 'none', fontFamily: BODY, fontSize: '11px', letterSpacing: '0.06em',
              color: '#000', fontWeight: view === 'list' ? 500 : 400, opacity: view === 'list' ? 1 : 0.35,
              borderBottom: view === 'list' ? '1px solid #000' : 'none', paddingBottom: 1,
            }}>List</button>
          </div>
        </div>

        {/* Category filter row */}
        <div style={{ display: 'flex', gap: 0, padding: '0 40px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                background: 'none', border: 'none',
                borderBottom: cat === c ? '2px solid #000' : '2px solid transparent',
                fontFamily: BODY, fontSize: '10px', fontWeight: cat === c ? 500 : 400,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: '#000', opacity: cat === c ? 1 : 0.4,
                padding: '10px 16px 8px', whiteSpace: 'nowrap', transition: 'opacity 0.15s',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </nav>

      {/* ══ TEXT VIEW ══ */}
      {view === 'text' && (
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '80px 40px 120px' }}>
          <div style={{ paddingBottom: 24, marginBottom: 72 }}>
            <p style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', opacity: 0.4, marginBottom: 16 }}>
              Writing — Linda Valkeman
            </p>
            <h1 style={{ fontFamily: HEADING, fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 400, fontStyle: 'italic', color: '#000', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Essays, Lectures &amp; Policy
            </h1>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {filtered.map((w) => (
              <div key={w.slug} style={{ marginBottom: 72, display: 'grid', gridTemplateColumns: '80px 1fr', gap: '0 32px' }}>
                <div>
                  <span style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 400, letterSpacing: '0.06em', color: '#000', opacity: 0.4 }}>{w.date}</span>
                </div>
                <div>
                  <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000', opacity: 0.4, marginBottom: 10 }}>{w.cat}</p>
                  <h2 style={{ fontFamily: BODY, fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontWeight: 500, color: '#000', lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: 10 }}>{w.title}</h2>
                  <p style={{ fontFamily: BODY, fontSize: '12px', fontWeight: 400, color: '#000', opacity: 0.5, marginBottom: 14, lineHeight: 1.5 }}>{w.sub}</p>
                  <p style={{ fontFamily: HEADING, fontSize: '14px', fontStyle: 'italic', color: '#000', lineHeight: 1.7, maxWidth: 520, opacity: 0.8 }}>{w.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ LIST VIEW ══ */}
      {view === 'list' && (
        <div style={{ padding: '48px 40px 120px', maxWidth: 900, margin: '0 auto' }}>
          {filtered.map((w) => (
            <div key={w.slug} style={{
              display: 'grid', gridTemplateColumns: '80px 1fr auto',
              gap: '0 24px', alignItems: 'baseline', padding: '20px 0',
            }}>
              <span style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 400, letterSpacing: '0.04em', color: '#000', opacity: 0.4 }}>{w.date}</span>
              <div>
                <span style={{ fontFamily: BODY, fontSize: '15px', fontWeight: 500, color: '#000', display: 'block', marginBottom: 2 }}>{w.title}</span>
                <span style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 400, color: '#000', opacity: 0.45, letterSpacing: '0.02em' }}>{w.sub}</span>
              </div>
              <span style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#000', opacity: 0.4, whiteSpace: 'nowrap' }}>{w.cat}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ padding: '60px 40px 40px', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000' }}>— — —</span>
        <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.06em', color: '#000', opacity: 0.5 }}>PhD Design Research · ArtEZ University of the Arts</span>
      </footer>
    </main>
  )
}
