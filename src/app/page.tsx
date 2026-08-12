import Link from 'next/link'
import VideoBackground from '@/components/VideoBackground'

const BODY = "'Suisse Intl', 'Neue Haas Grotesk Text', Inter, -apple-system, Arial, sans-serif"
const ACCENT = '#C8553D'

const micro: React.CSSProperties = {
  fontFamily: BODY,
  fontSize: '10px',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: '#fff',
  lineHeight: 1.6,
  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
}

export default function LandingPage() {
  return (
    <main style={{
      background: '#0a0a0a',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'fixed',
      inset: 0,
    }}>
      {/* ── VIDEO BACKGROUND ── */}
      <VideoBackground />

      {/* ── TOP EDGE ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.3)', zIndex: 1 }} />

      {/* ── BOTTOM EDGE ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.3)', zIndex: 1 }} />

      {/* ── TOP-LEFT ── "becoming dr Berendje" → /about */}
      <Link href="/about" style={{
        ...micro,
        position: 'absolute',
        top: 28,
        left: 32,
        zIndex: 2,
        textDecoration: 'none',
      }}>
        becoming dr Berendje
      </Link>

      {/* ── TOP-RIGHT ── "artistic research in repair" */}
      <div style={{ position: 'absolute', top: 28, right: 32, textAlign: 'right', zIndex: 2 }}>
        <div style={micro}>artistic research in repair</div>
        <div style={{ ...micro, opacity: 0.55, marginTop: 4 }}>broken can be fixed</div>
      </div>

      {/* ── LEFT EDGE ── rotated */}
      <div style={{
        ...micro,
        position: 'absolute',
        left: 32,
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        transformOrigin: 'center center',
        whiteSpace: 'nowrap',
        zIndex: 2,
      }}>
        Relational, Spatial and Material Healing
      </div>

      {/* ── RIGHT EDGE ── rotated */}
      <div style={{
        ...micro,
        position: 'absolute',
        right: 32,
        top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        transformOrigin: 'center center',
        whiteSpace: 'nowrap',
        zIndex: 2,
      }}>
        PhD Design Research · ArtEZ University of the Arts
      </div>

      {/* ── BOTTOM-LEFT ── "In No Particular Order" → /in-no-particular-order */}
      <Link href="/in-no-particular-order" style={{
        ...micro,
        position: 'absolute',
        bottom: 28,
        left: 32,
        zIndex: 2,
        textDecoration: 'none',
      }}>
        In No Particular Order
      </Link>

      {/* ── BOTTOM-RIGHT ── "Enter Archive" + Instagram */}
      <div style={{
        position: 'absolute',
        bottom: 28,
        right: 32,
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        alignItems: 'flex-end',
        zIndex: 2,
      }}>
        <Link href="/archive" style={{
          ...micro,
          textDecoration: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.5)',
          paddingBottom: 1,
        }}>
          Enter Archive →
        </Link>
        <a
          href="https://www.instagram.com/drberendje"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...micro, opacity: 0.45, textDecoration: 'none' }}
        >
          Instagram
        </a>
      </div>

      {/* ── CENTRE ── Wordmark */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 2,
        pointerEvents: 'none',
      }}>
        <h1 style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 'clamp(88px, 18vw, 180px)',
          fontWeight: 400,
          color: '#fff',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          margin: 0,
          fontStyle: 'italic',
          textShadow: '0 2px 20px rgba(0,0,0,0.3)',
        }}>
          dr<span style={{ color: ACCENT, fontStyle: 'normal' }}>.</span>B
        </h1>
      </div>
    </main>
  )
}
