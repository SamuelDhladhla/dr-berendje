import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import ImageGroupBlock from '@/components/ImageGroupBlock'
import Placeholder from '@/components/Placeholder'
import type { ImageGroup } from '@/types'

/*
  In No Particular Order — visual essays & film.

  Reference: amiedicke.com. The previous version was a fixed two-column grid,
  every image the same size in the same rhythm. This uses the same flexible
  grouping as the project pages, so images sit alongside one another in varying
  runs — one large, then a pair, then three across — and read as a sequence that
  responds to itself rather than a uniform contact sheet.

  Images are contained, so portrait and landscape can share a row without either
  being cropped to match the other.
*/

const BODY = 'var(--font-body)'

/*
  Sequenced deliberately rather than derived, so the pacing is editorial: a
  single image lands, a pair answers it, a run of three moves quickly, then the
  eye rests again. Captions are the client's own location/year notes.
*/
const SEQUENCE: ImageGroup[] = [
  { images: ['/images/ecologies/1.jpg'], credit: 'Arnhem, 2024' },
  { images: ['/images/botanicals/1.jpg', '/images/botanicals/2.jpg'], credit: 'India, 2017 · Indigo, Netherlands, 2018' },
  { images: ['/images/dwmc/1.jpg'], credit: 'Kantamanto, Accra, 2019' },
  { images: ['/images/waste/1.jpg', '/images/waste/2.jpg', '/images/waste/3.jpg'], credit: 'Ghana, 2020' },
  { images: ['/images/sender/1.jpg'], credit: 'Sender–Receiver Residence, 2023' },
  { images: ['/images/paper/1.jpg', '/images/mmm/1.jpg'], credit: 'Studio, 2018 · Moving Material Museum, 2015' },
  { images: ['/images/fakery/1.jpg'], credit: 'Jingdezhen, China, 2015' },
  { images: ['/images/postfossils/1.jpg', '/images/blueprint/1.jpg', '/images/botanicals/3.jpg'], credit: 'Netherlands, 2015 · China, 2014 · Natural dyeing, 2017' },
  { images: ['/images/ecologies/2.jpg', '/images/dwmc/2.jpg'], credit: 'Repair Session, 2024 · Accra, 2021' },
  { images: ['/images/speculation/1.jpg'], credit: 'Secondhand Speculation, Berlin, 2019' },
]

export default function InNoParticularOrderPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <SiteHeader active="/archive" />

      {/* ── TITLE ── */}
      <header style={{ padding: '56px 40px 40px' }}>
        <h1 style={{
          fontFamily: BODY,
          fontSize: 'clamp(34px, 4.4vw, 56px)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#000',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          margin: 0,
        }}>
          In No Particular Order
        </h1>
        <p style={{
          fontFamily: BODY,
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#000',
          opacity: 0.55,
          marginTop: 14,
        }}>
          Visual Essays &amp; Film — 2008 —
        </p>
      </header>

      {/* Sequencing is ours; the client has not supplied an order or captions. */}
      <div style={{ padding: '0 40px 40px' }}>
        <Placeholder note="image selection, sequence and captions — provisional" />
      </div>

      {/* ── SEQUENCE ── */}
      <div style={{ padding: '56px 40px 0' }}>
        {SEQUENCE.map((g, i) => <ImageGroupBlock key={i} group={g} />)}
      </div>

      <SiteFooter />
    </main>
  )
}
