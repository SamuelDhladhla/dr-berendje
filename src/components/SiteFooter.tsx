const meta: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  letterSpacing: '0.05em',
  color: '#000',
  opacity: 0.5,
}

export default function SiteFooter() {
  return (
    <footer style={{
      padding: '120px 40px 48px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 24,
      flexWrap: 'wrap',
    }}>
      <span style={meta}>PhD Design Research · ArtEZ University of the Arts</span>
      <a href="mailto:linda@drberendje.com" style={{
        ...meta,
        opacity: 1,
        textDecoration: 'none',
        borderBottom: '1px solid #000',
        paddingBottom: 1,
      }}>
        linda@drberendje.com
      </a>
    </footer>
  )
}
