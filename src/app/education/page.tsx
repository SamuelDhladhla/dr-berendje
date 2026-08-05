import Link from 'next/link'

const BODY = "'Suisse Intl', 'Neue Haas Grotesk Text', Inter, -apple-system, Arial, sans-serif"
const HEADING = "'Cormorant Garamond', Georgia, serif"
const ACCENT = '#C8553D'

const NAV = [
  { label: 'Research Projects', href: '/archive' },
  { label: 'Writing', href: '/writing' },
  { label: 'Education', href: '/education', active: true },
  { label: 'Consultancy', href: '/consultancy' },
  { label: 'Playtime', href: '/playtime' },
  { label: 'About', href: '/about' },
]

const PROGRAMMES = [
  {
    title: 'Sender–Receiver Residence',
    period: '2023 —',
    location: 'Netherlands / Ghana / Global',
    description: 'A residency programme developing a curriculum for repair across geographies.',
    modules: [
      'How did we end up here? — A decolonial fashion history',
      'The Good Ancestor To-do List',
      'One Message becomes a Clothing Tag',
      'Closet Audit',
    ],
  },
  {
    title: 'Secondhand Speculation',
    period: '2019 —',
    location: 'Berlin · Arnhem · Accra · Inhambane · Johannesburg',
    description: 'An oracle deck as pedagogical methodology — used across multiple geographies to facilitate speculative conversations about fashion futures.',
    modules: [
      'Berlin Reader',
      'Arnhem Workshop',
      'Accra Sessions',
      'Inhambane Residency',
      'Johannesburg AFRI',
    ],
  },
  {
    title: 'The Craft of Upcycling / Inkube Program',
    period: '2024',
    location: 'Paris / Arnhem',
    description: 'A curriculum for material transformation — from waste to garment, from discard to design.',
    modules: [
      'Paper + Case Study',
      'Curriculum Documentation',
      'Printemps Paris Exhibition 2024',
      'Lookbook',
    ],
  },
  {
    title: 'OWO School',
    period: '2025',
    location: 'Arnhem / Global',
    description: 'A curriculum in Vital Materialism — treating materials as alive, relational, and historically embedded.',
    modules: [
      'Curriculum: Vital Materialism',
      'Case Study',
      'Lookbook',
      'OWO Festival Exhibition 2025',
    ],
  },
]

export default function EducationPage() {
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
              Education — Workshops, Curricula, Residencies
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
              Designing with<br />Others
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
              Pedagogy as practice — curricula, residencies, and workshops that
              place repair, material knowledge, and decolonial fashion at the centre
              of how design is taught and learned.
            </p>
          </div>
        </div>
      </div>

      {/* ── PROGRAMMES ── */}
      <div style={{ padding: '0 40px 100px' }}>
        {PROGRAMMES.map((prog, i) => (
          <div key={prog.title} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0 80px', paddingTop: 60, paddingBottom: 60 }}>
            {/* Left: meta */}
            <div>
              <p style={{ fontFamily: BODY, fontSize: '10px', fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#000', marginBottom: 16, opacity: 0.4 }}>
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2 style={{ fontFamily: BODY, fontSize: '18px', fontWeight: 500, color: '#000', lineHeight: 1.3, marginBottom: 12 }}>
                {prog.title}
              </h2>
              <p style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 400, color: '#000', opacity: 0.4, letterSpacing: '0.04em', marginBottom: 4 }}>
                {prog.period}
              </p>
              <p style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 400, color: '#000', opacity: 0.4, letterSpacing: '0.04em' }}>
                {prog.location}
              </p>
            </div>

            {/* Right: content */}
            <div>
              <p style={{ fontFamily: BODY, fontSize: '14px', fontWeight: 400, color: '#000', lineHeight: 1.85, marginBottom: 28 }}>
                {prog.description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {prog.modules.map(m => (
                  <span key={m} style={{ fontFamily: BODY, fontSize: '12px', fontWeight: 400, color: '#000', opacity: 0.55, letterSpacing: '0.02em' }}>
                    — {m}
                  </span>
                ))}
              </div>
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
