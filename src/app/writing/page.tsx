import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import ImageSlot from '@/components/ImageSlot'
import { WRITING_ENTRIES, type WritingEntry } from '@/content/writing'

/*
  Writing — an editorial grid, after jessicahemmings.com.

  Replaces the hover-list that was on this page. Entries are lined out to the
  left in a responsive grid: 4 columns at 1200px, 3 at 900px, 2 at 600px, 1
  below. Images keep their natural proportions — no fixed aspect ratio and no
  cropping — so the rows settle at whatever height the material gives them.

  Each entry is a single link. External destinations open in a new tab; internal
  routes go through next/link.
*/

const GRID_CLASS = 'writing-grid'

const dateTitle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '15px',
  lineHeight: 1.3,
  color: '#000',
  margin: '10px 0 0',
}

const details: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '13px',
  lineHeight: 1.35,
  color: '#000',
  margin: '3px 0 0',
}

function EntryBody({ entry }: { entry: WritingEntry }) {
  return (
    <>
      <ImageSlot
        src={entry.image}
        alt={entry.image ? entry.title : ''}
        style={{
          width: '100%',
          height: entry.image ? 'auto' : 240,
          objectFit: 'contain',
          display: 'block',
        }}
      />
      <p style={dateTitle}>{entry.date} {entry.title}</p>
      <p style={details}>{entry.details}</p>
    </>
  )
}

export default function WritingPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <SiteHeader active="/writing" />

      <style>{`
        .${GRID_CLASS} {
          display: grid;
          grid-template-columns: 1fr;
          column-gap: 40px;
          row-gap: 72px;
          align-items: start;
        }
        @media (min-width: 600px)  { .${GRID_CLASS} { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px)  { .${GRID_CLASS} { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1200px) { .${GRID_CLASS} { grid-template-columns: repeat(4, 1fr); } }
        .writing-entry { display: block; text-decoration: none; }
      `}</style>

      <div style={{ padding: '72px 40px 120px' }}>
        <div className={GRID_CLASS}>
          {WRITING_ENTRIES.map(entry => {
            const external = /^https?:\/\//.test(entry.url)
            return external ? (
              <a
                key={entry.title}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="writing-entry"
              >
                <EntryBody entry={entry} />
              </a>
            ) : (
              <Link key={entry.title} href={entry.url} className="writing-entry">
                <EntryBody entry={entry} />
              </Link>
            )
          })}
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
