import Link from 'next/link'

const HEADING = "'Instrument Serif', Georgia, serif"
const BODY = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
const ACCENT = '#C8553D'

const micro: React.CSSProperties = {
  fontFamily: BODY,
  fontSize: '10px',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: '#000',
  lineHeight: 1.6,
}

export default function LandingPage() {
  return (
    <main style={{
      background: '#fff',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'fixed',
      inset: 0,
    }}>
      {/* ── TOP EDGE ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: '#000' }} />

      {/* ── BOTTOM EDGE ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: '#000' }} />

      {/* ── TOP-LEFT ── "becoming dr Berendje" */}
      <div style={{ ...micro, position: 'absolute', top: 28, left: 32 }}>
        becoming dr Berendje
      </div>

      {/* ── TOP-RIGHT ── "Research in Repair Practices" */}
      <div style={{ ...micro, position: 'absolute', top: 28, right: 32, textAlign: 'right' }}>
        Research in Repair Practices
      </div>

      {/* ── LEFT EDGE ── "Broken Can Be Fixed" — rotated, mid-left */}
      <div style={{
        ...micro,
        position: 'absolute',
        left: 32,
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        transformOrigin: 'center center',
        whiteSpace: 'nowrap',
      }}>
        Broken Can Be Fixed
      </div>

      {/* ── RIGHT EDGE ── "Relational, Spatial and Material Healing" — rotated, mid-right */}
      <div style={{
        ...micro,
        position: 'absolute',
        right: 32,
        top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        transformOrigin: 'center center',
        whiteSpace: 'nowrap',
      }}>
        Relational, Spatial and Material Healing
      </div>

      {/* ── BOTTOM-LEFT ── "In No Particular Order" */}
      <div style={{ ...micro, position: 'absolute', bottom: 28, left: 32 }}>
        In No Particular Order
      </div>

      {/* ── BOTTOM-RIGHT ── "Enter Archive →" */}
      <Link href="/archive" style={{
        ...micro,
        position: 'absolute',
        bottom: 28,
        right: 32,
        textDecoration: 'none',
        borderBottom: '1px solid #000',
        paddingBottom: 1,
      }}>
        Enter Archive →
      </Link>

      {/* ── CENTRE ── Wordmark */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        pointerEvents: 'none',
      }}>
        <h1 style={{
          fontFamily: HEADING,
          fontSize: 'clamp(88px, 18vw, 180px)',
          fontWeight: 400,
          color: '#000',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          margin: 0,
          fontStyle: 'italic',
        }}>
          dr<span style={{ color: ACCENT, fontStyle: 'normal' }}>.</span>B
        </h1>
      </div>
    </main>
  )
}
