'use client'
import { useState } from 'react'
import type { ImageGroup } from '@/types'
import ImageSlot from './ImageSlot'

/*
  Flexible image layout, shared by every project layout.

  A group is one to three images sharing a row and filling the page width
  together. Each image sits in an equal-width column and is CONTAINED, so a
  portrait and a landscape can sit side by side without either being cropped to
  match the other — the row height simply follows the tallest image.

  kind: 'split' is the amiedicke.com pair: exactly two images at 50/50 with an
  8px gap, top-aligned. Hovering one drops the other to 0.45 (see
  PAIR_HOVER_DIM). Below 768px a split stacks, and touch devices get no dim.
*/

/*
  INTERPRETATION. The brief asks for a hover dim on split pairs; the amiedicke
  reference does not obviously do this. Set false to disable.
*/
const PAIR_HOVER_DIM = true

interface Props {
  group: ImageGroup
  /** Row height cap. A lone image is allowed to run larger than a pair. */
  maxHeight?: number
}

const captionStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  lineHeight: 1.5,
  color: '#000',
  marginTop: 8,
}

export default function ImageGroupBlock({ group, maxHeight }: Props) {
  const [hovered, setHovered] = useState<number | null>(null)
  const images = group.images.filter(Boolean)
  const isSplit = group.kind === 'split'

  // A split with no usable images still draws two placeholder boxes.
  const slots = isSplit && images.length === 0 ? ['', ''] : images
  if (slots.length === 0) return null

  const perImageCaptions = group.captions?.some(Boolean) ?? false
  const cap = maxHeight ?? (slots.length === 1 ? 720 : 460)

  return (
    <figure
      className={isSplit ? 'ig-split' : undefined}
      style={{ margin: '0 0 120px' }}
      onMouseLeave={() => setHovered(null)}
    >
      <div
        className={isSplit ? 'ig-split-row' : undefined}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: isSplit ? 8 : 24,
          width: '100%',
        }}
      >
        {slots.map((src, i) => {
          const dimmed = PAIR_HOVER_DIM && isSplit && hovered !== null && hovered !== i
          return (
            <div
              key={i}
              style={{ flex: 1, minWidth: 0 }}
              onMouseEnter={isSplit ? () => setHovered(i) : undefined}
            >
              <ImageSlot
                src={src}
                alt=""
                style={{
                  width: '100%',
                  height: src ? 'auto' : 320,
                  maxHeight: isSplit ? undefined : cap,
                  objectFit: 'contain',
                  display: 'block',
                  opacity: dimmed ? 0.45 : 1,
                  transition: 'opacity 200ms ease',
                }}
              />
              {perImageCaptions && group.captions?.[i] && (
                <figcaption style={captionStyle}>{group.captions[i]}</figcaption>
              )}
            </div>
          )
        })}
      </div>

      {/* One caption for the whole group — only when no image carries its own,
          so a pair is never captioned twice. */}
      {!perImageCaptions && group.credit && (
        <figcaption style={captionStyle}>{group.credit}</figcaption>
      )}
    </figure>
  )
}

/*
  Derive groups from a flat image list when a project has not specified its own.

  Runs of two or three keep the page rhythm varied rather than stacking every
  image full width. Explicit `imageGroups` in the config always wins.
*/
export function deriveImageGroups(images: string[]): ImageGroup[] {
  const usable = images.filter(Boolean)
  const groups: ImageGroup[] = []
  let i = 0
  // Alternating rhythm: single, pair, single, triple, …
  const pattern = [1, 2, 1, 3]
  let p = 0
  while (i < usable.length) {
    const take = pattern[p % pattern.length]
    groups.push({ images: usable.slice(i, i + take) })
    i += take
    p += 1
  }
  return groups
}
