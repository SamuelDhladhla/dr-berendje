import { SITE_INFO } from '@/data/site'

/*
  Contact / info block. Every value comes from SITE_INFO so the client can revise
  the wording without editing markup — this is a first pass and she will confirm
  final content.

  Small-caps labels, generous spacing, directional arrows on the actionable links.
  Deliberately light: a row of labelled columns, not a heavy footer slab.
*/

const label: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '10px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#000',
  opacity: 0.4,
  marginBottom: 10,
  display: 'block',
}

const value: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  lineHeight: 1.5,
  color: '#000',
  textDecoration: 'none',
}

export default function SiteFooter() {
  return (
    <footer style={{ padding: '140px 40px 56px' }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '48px 96px',
        alignItems: 'flex-start',
      }}>
        <div>
          <span style={label}>Name</span>
          <span style={value}>{SITE_INFO.fullName}</span>
        </div>

        <div>
          <span style={label}>Email</span>
          <a href={`mailto:${SITE_INFO.email}`} style={{ ...value, borderBottom: '1px solid #000', paddingBottom: 1 }}>
            {SITE_INFO.email} &rarr;
          </a>
        </div>

        <div>
          <span style={label}>Instagram</span>
          <a
            href={SITE_INFO.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...value, borderBottom: '1px solid #000', paddingBottom: 1 }}
          >
            {SITE_INFO.instagram.handle} &rarr;
          </a>
        </div>

        <div>
          <span style={label}>Affiliation</span>
          <span style={value}>{SITE_INFO.affiliation}</span>
        </div>
      </div>

      <div style={{ marginTop: 72 }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#000',
          opacity: 0.4,
        }}>
          {SITE_INFO.rights}
        </span>
      </div>
    </footer>
  )
}
