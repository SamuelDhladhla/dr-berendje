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

  The hover-triggered project image is a thumbnail pinned to the top-right corner
  of the viewport (position: fixed), so it stays put however far the page
  scrolls. It crossfades between projects. Nothing sits behind the type, so there
  is no scrim.

  A fixed corner alone would still collide with the text: the display titles run
  nearly the full page width, so any title scrolling past the corner would pass
  underneath it. The list therefore reserves the thumbnail's width on BOTH sides
  whenever the thumbnail is active — the text column stays centred on the page,
  and the corner is structurally clear at every scroll position.

  Top-right rather than bottom-right: it sits below the sticky header, and it can
  never meet the footer, which only rises into view below the hovered item.

  It is rendered ONLY on devices that genuinely support hover and have the width
  to spare: a touch screen has no hover state, and below 1100px the reserved
  gutters would squeeze the titles too hard. Either way the list stays full-width
  text only.

  Hover state is tracked once on the container and derived from data-hl-idx, not
  per-item CSS — the same pattern used on the homepage.
*/

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

/*
  Thumbnail geometry. Portrait frame, object-fit: cover — the one place on the
  site that crops, since a contained fit would letterbox landscape covers inside
  a portrait plate.
*/
const IMG_W = 'clamp(180px, 15vw, 260px)'
const IMG_ASPECT = '4 / 5'
const IMG_EDGE = 32   // gap from the viewport edge
const IMG_TOP = 104   // clears the sticky header
const IMG_GUTTER = 40 // gap between the thumbnail and the text column

/*
  The capability gate, shared by the JS (whether to render the image) and the CSS
  (whether to reserve the gutters). Doing the reservation in CSS means the server
  markup already has the right padding, so the text does not jump on hydration.
*/
const IMAGE_MQ = '(hover: hover) and (pointer: fine) and (min-width: 1100px)'

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

  /*
    A touch screen has no hover state, so it never gets the image — the markup is
    not rendered at all rather than hidden. Starts false, so server-rendered
    markup carries no image either way.
  */
  useEffect(() => {
    const mq = window.matchMedia(IMAGE_MQ)
    setCanHover(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const imagesOn = showHoverImage && canHover
  const active = hovered !== null ? items[hovered] : null

  return (
    <div style={{ position: 'relative' }}>
      {showHoverImage && (
        <style>{`
          @media ${IMAGE_MQ} {
            .hl-reserve {
              padding-left: calc(${IMG_W} + ${IMG_EDGE + IMG_GUTTER}px) !important;
              padding-right: calc(${IMG_W} + ${IMG_EDGE + IMG_GUTTER}px) !important;
            }
          }
        `}</style>
      )}

      {/* ── The list — centred; gutters reserved on both sides when the
             thumbnail is active so the corner can never meet the text ── */}
      <div
        className={showHoverImage ? 'hl-reserve' : undefined}
        onMouseOver={e => {
          const el = (e.target as HTMLElement).closest('[data-hl-idx]')
          setHovered(el ? Number(el.getAttribute('data-hl-idx')) : null)
        }}
        onMouseLeave={() => setHovered(null)}
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '96px 40px 120px',
        }}
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

      {/* ── Thumbnail — fixed to the top-right of the viewport ── */}
      {imagesOn && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: IMG_TOP,
            right: IMG_EDGE,
            width: IMG_W,
            aspectRatio: IMG_ASPECT,
            zIndex: 5,
            pointerEvents: 'none',
            opacity: active && active.image ? 1 : 0,
            transition: 'opacity 350ms ease',
          }}
        >
          {items.filter(i => i.image).map(item => (
            <img
              key={item.key}
              src={`${BASE_PATH}${item.image}`}
              alt=""
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: active && active.key === item.key ? 1 : 0,
                transition: 'opacity 350ms ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
