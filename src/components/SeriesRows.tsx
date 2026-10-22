'use client'
import { useEffect, useRef, useState } from 'react'
import type { SeriesRow } from '@/types'
import ImageSlot from './ImageSlot'
import Placeholder from './Placeholder'

/*
  'series' layout — zohraopoku.com / scheltens-abbenes.com.

  A vertical sequence: one main image per row, centred, with generous white
  space between rows. An optional smaller companion image sits offset to the
  right and fades in as the row enters the viewport.

  INTERPRETATION: the brief calls for the companion to "pop" on entering the
  viewport. Implemented as opacity 0->1 with a 12px rise over 500ms, triggered
  by IntersectionObserver. prefers-reduced-motion skips it and renders the
  companion simply visible.

  Below 768px the companion drops under its main image at 60% width, aligned
  left, and the max-width caps are released so images use the full column.
*/

const MAIN_MAX_W = '60vw'
const MAIN_MAX_H = '85vh'
const COMPANION_W = '28vw'
const ROW_GAP = '18vh'

const capLine1: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '13px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#000',
  margin: 0,
}

const capDetail: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '12px',
  lineHeight: 1.4,
  color: '#000',
  margin: 0,
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setShown(true) }),
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, shown }
}

function Row({ row }: { row: SeriesRow }) {
  const { ref, shown } = useReveal()

  // Only render the fields that exist; mark the row when none do.
  const details = [row.medium, row.variation, row.dimensions].filter(Boolean)
  const hasAnyCaption = Boolean(row.title || row.year || details.length)

  return (
    <div ref={ref} style={{ marginBottom: ROW_GAP }}>
      <div className="series-row" style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 32,
      }}>
        {/* Main image, centred */}
        <div className="series-main" style={{ maxWidth: MAIN_MAX_W }}>
          <ImageSlot
            src={row.image}
            alt={row.title ?? ''}
            style={{
              width: '100%',
              height: row.image ? 'auto' : 420,
              maxHeight: MAIN_MAX_H,
              objectFit: 'contain',
              display: 'block',
            }}
          />

          <div style={{ marginTop: 12 }}>
            {hasAnyCaption ? (
              <>
                {(row.title || row.year) && (
                  <p style={capLine1}>
                    {[row.title, row.year].filter(Boolean).join(' | ')}
                  </p>
                )}
                {details.map((d, i) => (
                  <p key={i} style={{ ...capDetail, marginTop: i === 0 ? 4 : 0 }}>{d}</p>
                ))}
              </>
            ) : (
              <Placeholder note="title, year, medium, edition, dimensions" />
            )}
          </div>
        </div>

        {/* Companion, offset right, revealed on entering the viewport */}
        <div className="series-companion" style={{ width: COMPANION_W, flexShrink: 0 }}>
          <div style={{
            opacity: shown ? 1 : 0,
            transform: shown ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 500ms ease, transform 500ms ease',
          }}>
            <ImageSlot
              src={row.companion ?? ''}
              alt=""
              style={{
                width: '100%',
                height: row.companion ? 'auto' : 220,
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SeriesRows({ rows }: { rows: SeriesRow[] }) {
  if (!rows || rows.length === 0) return null
  return (
    <div>
      <style>{`
        @media (max-width: 767px) {
          .series-row { flex-direction: column; align-items: flex-start; gap: 20px; }
          .series-main { max-width: 100% !important; width: 100%; }
          .series-companion { width: 60% !important; }
        }
      `}</style>
      {rows.map((r, i) => <Row key={i} row={r} />)}
    </div>
  )
}
