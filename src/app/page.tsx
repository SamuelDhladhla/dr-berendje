import Link from 'next/link'

const HEADING = "'Instrument Serif', Georgia, serif"
const BODY = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
const ACCENT = '#C8553D'

export default function LandingPage() {
  return (
    <main style={{
      background: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 24px',
    }}>
      {/* Wordmark */}
      <h1 style={{
        fontFamily: HEADING,
        fontSize: 'clamp(72px, 14vw, 140px)',
        fontWeight: 400,
        color: '#000',
        lineHeight: 1,
        letterSpacing: '-0.03em',
        marginBottom: 36,
      }}>
        dr<span style={{ color: ACCENT }}>.</span>B
      </h1>

      {/* Repair mark */}
      <div style={{
        fontSize: '10px',
        color: ACCENT,
        letterSpacing: '0.4em',
        marginBottom: 52,
      }}>
        — — —
      </div>

      {/* Statement */}
      <p style={{
        fontFamily: HEADING,
        fontSize: 'clamp(18px, 2.5vw, 28px)',
        fontWeight: 400,
        fontStyle: 'italic',
        color: '#000',
        textAlign: 'center',
        lineHeight: 1.5,
        maxWidth: 560,
        marginBottom: 72,
      }}>
        Broken Can Be Fixed —<br />
        Material, Environmental &amp; Social Healing
      </p>

      {/* Entry link */}
      <Link
        href="/design-a"
        style={{
          fontFamily: BODY,
          fontSize: '13px',
          fontWeight: 500,
          color: '#000',
          letterSpacing: '0.06em',
          textDecoration: 'none',
          borderBottom: '1px solid #000',
          paddingBottom: 2,
        }}
      >
        Enter Archive →
      </Link>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: 36,
        left: 0, right: 0,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '10px',
          color: ACCENT,
          letterSpacing: '0.4em',
          marginBottom: 12,
        }}>
          — — —
        </div>
        <span style={{
          fontFamily: BODY,
          fontSize: '11px',
          fontWeight: 400,
          color: '#000',
          letterSpacing: '0.04em',
        }}>
          PhD Design Research · ArtEZ University of the Arts
        </span>
      </div>
    </main>
  )
}
