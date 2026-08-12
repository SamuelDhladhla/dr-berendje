import Link from 'next/link'
import Img from '@/components/Img'

const BODY = "'Suisse Intl', 'Neue Haas Grotesk Text', Inter, -apple-system, Arial, sans-serif"
const ACCENT = '#C8553D'

/*
  Layout reference: amiedicke.com
  - Minimal nav: Name (left) / Work links (right)
  - 2-column image grid, generous gap between rows
  - Images fill column width, varying heights (portrait + landscape mixed)
  - Sparse captions in small type below each image
  - No heavy typography — imagery leads
*/

const ENTRIES = [
  {
    src: '/images/ecologies/1.jpg',
    caption: 'Arnhem, 2024',
    aspect: '3/4',
  },
  {
    src: '/images/botanicals/1.jpg',
    caption: 'India, 2017',
    aspect: '3/4',
  },
  {
    src: '/images/dwmc/1.jpg',
    caption: 'Kantamanto, Accra, 2019',
    aspect: '3/4',
  },
  {
    src: '/images/sender/1.jpg',
    caption: 'Sender–Receiver Residence, 2023',
    aspect: '4/3',
  },
  {
    src: '/images/waste/1.jpg',
    caption: 'Ghana, 2020',
    aspect: '3/4',
  },
  {
    src: '/images/botanicals/2.jpg',
    caption: 'Indigo, Netherlands, 2018',
    aspect: '3/4',
  },
  {
    src: '/images/paper/1.jpg',
    caption: 'Studio, 2018',
    aspect: '4/3',
  },
  {
    src: '/images/mmm/1.jpg',
    caption: 'Moving Material Museum, 2015',
    aspect: '3/4',
  },
  {
    src: '/images/fakery/1.jpg',
    caption: 'Jingdezhen, China, 2015',
    aspect: '3/4',
  },
  {
    src: '/images/postfossils/1.jpg',
    caption: 'Netherlands, 2015',
    aspect: '4/3',
  },
  {
    src: '/images/ecologies/2.jpg',
    caption: 'Repair Session, 2024',
    aspect: '3/4',
  },
  {
    src: '/images/blueprint/1.jpg',
    caption: 'China, 2014',
    aspect: '3/4',
  },
  {
    src: '/images/dwmc/2.jpg',
    caption: 'Accra, 2021',
    aspect: '3/4',
  },
  {
    src: '/images/botanicals/3.jpg',
    caption: 'Natural dyeing, 2017',
    aspect: '4/3',
  },
  {
    src: '/images/speculation/1.jpg',
    caption: 'Secondhand Speculation, Berlin, 2019',
    aspect: '3/4',
  },
  {
    src: '/images/sender/2.jpg',
    caption: 'Curriculum workshop, 2023',
    aspect: '3/4',
  },
]

export default function InNoParticularOrderPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <style>{`
        .inpo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 0.3s ease;
        }
        .inpo-item:hover .inpo-img { opacity: 0.88; }
      `}</style>

      {/* ── NAV — amiedicke.com style: minimal, 3 items ── */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 32px',
        position: 'sticky',
        top: 0,
        background: '#fff',
        zIndex: 50,
      }}>
        <Link href="/" style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: '15px',
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#000',
          textDecoration: 'none',
        }}>
          dr<span style={{ color: ACCENT }}>.</span> Berendje
        </Link>
        <div style={{ display: 'flex', gap: 28 }}>
          <Link href="/archive" style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 400, color: '#000', textDecoration: 'none', letterSpacing: '0.04em', opacity: 0.55 }}>
            Work
          </Link>
          <Link href="/about" style={{ fontFamily: BODY, fontSize: '11px', fontWeight: 400, color: '#000', textDecoration: 'none', letterSpacing: '0.04em', opacity: 0.55 }}>
            Info
          </Link>
        </div>
      </nav>

      {/* ── TITLE ROW ── */}
      <div style={{ padding: '48px 32px 40px' }}>
        <p style={{
          fontFamily: BODY,
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#000',
          opacity: 0.35,
          marginBottom: 12,
        }}>
          Ongoing — 2008 —
        </p>
        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#000',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          margin: 0,
        }}>
          In No Particular Order
        </h1>
      </div>

      {/* ── 2-COLUMN IMAGE GRID — amiedicke.com layout ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px 24px',
        padding: '0 32px 96px',
      }}>
        {ENTRIES.map((entry, i) => (
          <div key={i} className="inpo-item">
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: entry.aspect,
              overflow: 'hidden',
              background: '#ebebeb',
              marginBottom: 10,
            }}>
              <Img
                src={entry.src}
                alt={entry.caption}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <p style={{
              fontFamily: BODY,
              fontSize: '10px',
              fontWeight: 400,
              color: '#000',
              opacity: 0.4,
              letterSpacing: '0.04em',
            }}>
              {entry.caption}
            </p>
          </div>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '40px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000' }}>— — —</span>
        <Link href="/" style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.06em', color: '#000', textDecoration: 'none', opacity: 0.4 }}>
          ← Back
        </Link>
      </footer>
    </main>
  )
}
