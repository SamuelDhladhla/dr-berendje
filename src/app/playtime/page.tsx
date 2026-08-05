import Link from 'next/link'

const BODY = "'Suisse Intl', 'Neue Haas Grotesk Text', Inter, -apple-system, Arial, sans-serif"
const HEADING = "'Cormorant Garamond', Georgia, serif"
const ACCENT = '#C8553D'

const NAV = [
  { label: 'Research Projects', href: '/archive' },
  { label: 'Writing', href: '/writing' },
  { label: 'Education', href: '/education' },
  { label: 'Consultancy', href: '/consultancy' },
  { label: 'Playtime', href: '/playtime', active: true },
  { label: 'About', href: '/about' },
]

const AREAS = [
  {
    title: 'Styling',
    description: 'Editorial and commercial styling — fashion as language, garment as communication.',
    link: 'https://www.instagram.com/drberendje',
    linkLabel: 'View on Instagram →',
  },
  {
    title: 'Productions',
    description: 'Creative productions across Lagos, Kano, Accra, Arnhem — visual, spatial, material.',
    link: 'https://www.instagram.com/drberendje',
    linkLabel: 'View on Instagram →',
  },
  {
    title: 'Print & Textile Design',
    description: 'Original print and textile design — pattern as thought.',
    link: 'https://www.instagram.com/drberendje',
    linkLabel: 'View on Instagram →',
  },
]

const PRINTS = [
  'A Striped Family',
  'Florals',
  'Tie Dye & Ink',
]

export default function PlaytimePage() {
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
          <div />
        </div>
      </nav>

      {/* ── HEADER ── */}
      <div style={{ padding: '100px 40px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px', paddingBottom: 80 }}>
          <div>
            <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', marginBottom: 28 }}>
              Styling · Productions · Print Design
            </p>
            <h1 style={{
              fontFamily: HEADING,
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#000',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              Playtime
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <p style={{
              fontFamily: BODY,
              fontSize: '14px',
              fontWeight: 400,
              color: '#000',
              lineHeight: 1.85,
              maxWidth: 440,
              opacity: 0.75,
            }}>
              The part of the practice that plays — styling, productions, and print
              design. Filtered views of an ongoing creative life, linked to Instagram.
            </p>
          </div>
        </div>
      </div>

      {/* ── AREAS ── */}
      <div style={{ padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0 60px' }}>
          {AREAS.map(area => (
            <div key={area.title} style={{ paddingBottom: 60 }}>
              <h2 style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 500, color: '#000', marginBottom: 16, letterSpacing: '0.02em' }}>
                {area.title}
              </h2>
              <p style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 400, color: '#000', lineHeight: 1.8, marginBottom: 20, opacity: 0.7 }}>
                {area.description}
              </p>
              <a href={area.link} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: BODY, fontSize: '10px', fontWeight: 400, color: '#000',
                textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase',
                borderBottom: '1px solid #000', paddingBottom: 1,
              }}>
                {area.linkLabel}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRINT SERIES ── */}
      <div style={{ padding: '40px 40px 100px' }}>
        <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#000', marginBottom: 32, opacity: 0.4 }}>
          Print & Textile Series
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {PRINTS.map(p => (
            <a key={p} href="https://www.instagram.com/drberendje" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: HEADING,
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#000',
              textDecoration: 'none',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              opacity: 0.85,
            }}>
              {p}
            </a>
          ))}
        </div>
      </div>

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
