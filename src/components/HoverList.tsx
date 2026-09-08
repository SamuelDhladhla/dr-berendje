'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Placeholder from './Placeholder'

/*
  The shared centred hover list.

  Default state is title only, centred, with generous white space. Everything else
  — the "TYPE — DATE" index line, description, sub-items — is revealed BENEATH the
  title on hover, stacked and centred as one block. Nothing sits in permanent edge
  columns. Hover also dims every other title to 0.45.

  The hover-triggered project image is layered behind the list and crossfades
  between projects. It is rendered ONLY on devices that genuinely support hover:
  a touch screen has no hover state, so on a phone this stays a text-only list
  rather than flashing an image on tap. Detection is
  `(hover: hover) and (pointer: fine)`, which is the capability question, not a
  width guess — a small laptop window keeps the image, a large tablet does not.

  Hover state is tracked once on the container and derived from data-hl-idx, not
  per-item CSS — the same pattern used on the homepage.
*/

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

export interface TitleFont {
  family: string
  weight?: number
  style?: 'normal' | 'italic'
}

export interface HoverListItem {
  key: string
  title: string
  href: string
  external?: boolean
  category?: string
  description?: string
  /** true when no client-sourced description exists yet */
  descriptionMissing?: boolean
  date?: string
  /** Shown behind the list on hover. Pointer devices only. */
  image?: string
  titleFont?: TitleFont
  subItems?: string[]
  /** marks the whole item as awaiting a real route */
  hrefTodo?: boolean
}

interface Props {
  items: HoverListItem[]
  /** CSS length. Archive list runs large; section pages run smaller. */
  titleSize?: string
  showHoverImage?: boolean
}

export default function HoverList({
  items,
  titleSize = 'clamp(64px, 8vw, 140px)',
  showHoverImage = false,
}: Props) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [canHover, setCanHover] = useState(false)

  // Capability check, not a width check. Starts false so the server-rendered
  // markup carries no image and touch devices never receive one.
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setCanHover(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const imagesOn = showHoverImage && canHover
  const active = hovered !== null ? items[hovered] : null

  return (
    <div style={{ position: 'relative' }}>
      {/* ── Hover image, crossfaded behind the list. Pointer devices only. ── */}
      {imagesOn && (
        <div aria-hidden="true" style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: '#fff',
        }}>
          {items.filter(i => i.image).map(item => (
            <img
              key={item.key}
              src={`${BASE_PATH}${item.image}`}
              alt=""
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%', objectFit: 'cover',
                opacity: active && active.key === item.key ? 1 : 0,
                transition: 'opacity 500ms ease',
              }}
            />
          ))}
          {/* Keeps the type legible over whatever frame is behind it. */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(255,255,255,0.78)',
            opacity: active ? 1 : 0,
            transition: 'opacity 500ms ease',
          }} />
        </div>
      )}

      {/* ── The list ── */}
      <div
        onMouseOver={e => {
          const el = (e.target as HTMLElement).closest('[data-hl-idx]')
          setHovered(el ? Number(el.getAttribute('data-hl-idx')) : null)
        }}
        onMouseLeave={() => setHovered(null)}
        style={{ position: 'relative', zIndex: 1, padding: '96px 40px 120px' }}
      >
        {items.map((item, i) => {
          const isActive = hovered === i
          const dimmed = hovered !== null && !isActive
          const font = item.titleFont

          const inner = (
            <>
              <span style={{
                display: 'block',
                fontFamily: font?.family ?? 'var(--font-body)',
                fontWeight: font?.weight ?? 400,
                fontStyle: font?.style ?? 'normal',
                fontSize: titleSize,
                lineHeight: 1.02,
                letterSpacing: '-0.02em',
                color: '#000',
              }}>
                {item.title}
              </span>

              {/* Revealed beneath the title, centred as one block */}
              <span style={{
                display: 'block',
                overflow: 'hidden',
                maxHeight: isActive ? 460 : 0,
                opacity: isActive ? 1 : 0,
                transition: 'max-height 350ms ease, opacity 250ms ease',
              }}>
                <span style={{ display: 'block', paddingTop: 18 }}>
                  {/* Index line: TYPE — DATE on a single line. */}
                  {(item.category || item.date) && (
                    <span style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#000',
                      opacity: 0.55,
                      marginBottom: 12,
                    }}>
                      {[item.category, item.date].filter(Boolean).join(' — ')}
                    </span>
                  )}

                  {/* Subline, wide enough to run to roughly two lines. */}
                  {item.descriptionMissing ? (
                    <span style={{ display: 'block', marginBottom: 10 }}>
                      <Placeholder note="two-sentence project description" align="center" />
                    </span>
                  ) : item.description ? (
                    <span style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      lineHeight: 1.65,
                      color: '#000',
                      opacity: 0.8,
                      maxWidth: 'min(760px, 80vw)',
                      margin: '0 auto 10px',
                    }}>
                      {item.description}
                    </span>
                  ) : null}

                  {item.subItems && item.subItems.length > 0 && (
                    <span style={{ display: 'block', margin: '0 auto 10px', maxWidth: 560 }}>
                      {item.subItems.map(s => (
                        <span key={s} style={{
                          display: 'inline-block',
                          fontFamily: 'var(--font-body)',
                          fontStyle: 'italic',
                          fontSize: '13px',
                          color: '#000',
                          opacity: 0.6,
                          margin: '0 10px 4px',
                        }}>
                          {s}
                        </span>
                      ))}
                    </span>
                  )}

                  {item.hrefTodo && (
                    <span style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#B00020',
                      marginTop: 10,
                    }}>
                      [No destination yet — awaiting client]
                    </span>
                  )}
                </span>
              </span>
            </>
          )

          const style: React.CSSProperties = {
            display: 'block',
            textAlign: 'center',
            textDecoration: 'none',
            padding: '28px 0',
            opacity: dimmed ? 0.45 : 1,
            transition: 'opacity 200ms ease',
          }

          return item.external ? (
            <a key={item.key} href={item.href} target="_blank" rel="noopener noreferrer"
              data-hl-idx={i} style={style}>
              {inner}
            </a>
          ) : (
            <Link key={item.key} href={item.href} data-hl-idx={i} style={style}>
              {inner}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
