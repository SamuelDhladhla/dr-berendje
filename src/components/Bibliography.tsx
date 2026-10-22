import type { BibliographyEntry, ResourceLink } from '@/types'

/*
  Bibliography and Resources, following the A4 reference.

  Entries are Harvard-style single lines; *asterisks* mark a work title to be
  italicised. An entry with a url becomes an underlined link. Resources are a
  plain list of links beneath.

  Nothing renders at all — not even a heading — when a project has neither, so
  the thirteen projects still awaiting content show no empty furniture.
*/

const linkProps = {
  target: '_blank' as const,
  rel: 'noopener noreferrer',
}

const heading: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#000',
  marginBottom: 20,
}

const entryText: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '15px',
  lineHeight: 1.5,
  color: '#000',
}

/** Renders *asterisk-wrapped* runs as italic; everything else as plain text. */
function Italicised({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).filter(Boolean).map((part, i) =>
        part.startsWith('*') && part.endsWith('*')
          ? <em key={i} style={{ fontStyle: 'italic' }}>{part.slice(1, -1)}</em>
          : <span key={i}>{part}</span>
      )}
    </>
  )
}

interface Props {
  entries?: BibliographyEntry[]
  resources?: ResourceLink[]
}

export default function Bibliography({ entries, resources }: Props) {
  const hasEntries = Boolean(entries && entries.length > 0)
  const hasResources = Boolean(resources && resources.length > 0)
  if (!hasEntries && !hasResources) return null

  return (
    <section style={{ marginBottom: 120, maxWidth: 760 }}>
      {hasEntries && (
        <>
          <h2 style={heading}>Bibliography</h2>
          <ul style={{ margin: '0 0 56px', padding: 0, listStyle: 'none' }}>
            {entries!.map((e, i) => (
              <li key={i} style={{ ...entryText, marginBottom: 12 }}>
                {e.url ? (
                  <a
                    href={e.url}
                    {...linkProps}
                    style={{ color: '#000', textDecoration: 'underline', textUnderlineOffset: 3 }}
                  >
                    <Italicised text={e.text} />
                  </a>
                ) : (
                  <Italicised text={e.text} />
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {hasResources && (
        <>
          <h2 style={heading}>Resources</h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {resources!.map((r, i) => (
              <li key={i} style={{ ...entryText, marginBottom: 10 }}>
                <a
                  href={r.url}
                  {...linkProps}
                  style={{ color: '#000', textDecoration: 'underline', textUnderlineOffset: 3 }}
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
