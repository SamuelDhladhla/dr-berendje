import Link from 'next/link'

const BODY = "'Suisse Intl', 'Neue Haas Grotesk Text', Inter, -apple-system, Arial, sans-serif"
const HEADING = "'Cormorant Garamond', Georgia, serif"
const ACCENT = '#C8553D'

const NAV = [
  { label: 'Research Projects', href: '/archive' },
  { label: 'Writing', href: '/writing' },
  { label: 'Education', href: '/education' },
  { label: 'Consultancy', href: '/consultancy', active: true },
  { label: 'Playtime', href: '/playtime' },
  { label: 'About', href: '/about' },
]

const PRODUCTIONS = [
  {
    client: 'Julius Holland × Victoire',
    type: 'Brand Identity & Strategy',
    description: 'Brand strategy for luxury African wax print fashion — Speculative Futures / Slay Mama. Dutch Embassy Mapping.',
    locations: [],
  },
  {
    client: 'Cross Cultural Productions',
    type: 'Creative Direction & Production',
    description: 'Design research and creative direction for cultural productions across West Africa.',
    locations: [
      { city: 'Lagos', projects: 'Slay Mamma, YOYE, Every Day Lagos is Couture' },
      { city: 'Kano', projects: 'Victoire Magic x Wamball, Julius, Ali Jita' },
      { city: 'Abuja', projects: 'Soul in Motion' },
      { city: 'Accra', projects: 'Victoire Magic Princess, Soul in Motion' },
    ],
  },
]

export default function ConsultancyPage() {
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
              Cross Cultural Consultancy
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
              Making Across<br />Geographies
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
              Cross-cultural creative direction, brand strategy, and production —
              working with designers, institutions, and cultural organisations
              across West Africa and Europe.
            </p>
          </div>
        </div>
      </div>

      {/* ── PROJECTS ── */}
      <div style={{ padding: '0 40px 100px' }}>
        {PRODUCTIONS.map((prod, i) => (
          <div key={prod.client} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0 80px', paddingTop: 60, paddingBottom: 60 }}>
            {/* Left: meta */}
            <div>
              <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#000', marginBottom: 16, opacity: 0.4 }}>
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2 style={{ fontFamily: BODY, fontSize: '18px', fontWeight: 500, color: '#000', lineHeight: 1.3, marginBottom: 8 }}>
                {prod.client}
              </h2>
              <p style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 400, color: '#000', opacity: 0.4, letterSpacing: '0.04em' }}>
                {prod.type}
              </p>
            </div>

            {/* Right: content */}
            <div>
              <p style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 400, color: '#000', lineHeight: 1.85, marginBottom: 32 }}>
                {prod.description}
              </p>
              {prod.locations.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {prod.locations.map(loc => (
                    <div key={loc.city}>
                      <span style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 500, color: '#000', letterSpacing: '0.04em', display: 'block', marginBottom: 3 }}>
                        {loc.city}
                      </span>
                      <span style={{ fontFamily: BODY, fontSize: '12px', fontWeight: 400, color: '#000', opacity: 0.55 }}>
                        {loc.projects}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
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
