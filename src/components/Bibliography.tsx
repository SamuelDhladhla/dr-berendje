import type { BibliographyEntry } from '@/types'
import Placeholder from './Placeholder'

/*
  Bibliography / Resources.

  Entries follow the academic order of the A4 reference — author (year) Title,
  publisher, location — with the title in italics. Any entry can carry a `url`,
  which turns the title into a link; entries without one render as plain text, so
  a reference that simply has no online home still sits correctly in the list.
*/

const meta: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  lineHeight: 1.7,
  color: '#000',
}

function Entry({ e }: { e: BibliographyEntry }) {
  const title = (
    <em style={{ fontStyle: 'italic' }}>{e.title}</em>
  )
  return (
    <li style={{ ...meta, marginBottom: 14, listStyle: 'none', paddingLeft: 0 }}>
      {e.author && <>{e.author} </>}
      {e.year && <>({e.year}) </>}
      {e.url ? (
        <a
          href={e.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#000', textDecoration: 'underline', textUnderlineOffset: 3 }}
        >
          {title}
        </a>
      ) : title}
      {e.publisher && <>, {e.publisher}</>}
      {e.location && <>, {e.location}</>}
      {e.note && (
        <span style={{ opacity: 0.55 }}> — {e.note}</span>
      )}
    </li>
  )
}

export default function Bibliography({ entries }: { entries?: BibliographyEntry[] }) {
  return (
    <section style={{ marginBottom: 120 }}>
      <h2 style={{
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#000',
        opacity: 0.45,
        marginBottom: 24,
      }}>
        Bibliography &amp; Resources
      </h2>

      {entries && entries.length > 0 ? (
        <ul style={{ margin: 0, padding: 0, maxWidth: 720 }}>
          {entries.map((e, i) => <Entry key={i} e={e} />)}
        </ul>
      ) : (
        <Placeholder note="sources, references, further reading — entries can be hyperlinked" />
      )}
    </section>
  )
}
