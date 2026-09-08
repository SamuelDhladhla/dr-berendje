import type { ImageGroup } from '@/types'
import ImageSlot from './ImageSlot'

/*
  Flexible image layout.

  A group is one to three images sharing a row and filling the page width
  together. Each image sits in an equal-width column and is CONTAINED, so a
  portrait and a landscape can sit side by side without either being cropped to
  match the other — the row height simply follows the tallest image.

  This is why the layout can respond to the archive rather than the archive
  having to be cut to fit the layout.
*/

interface Props {
  group: ImageGroup
  /** Row height cap. A lone image is allowed to run larger than a pair. */
  maxHeight?: number
}

export default function ImageGroupBlock({ group, maxHeight }: Props) {
  const images = group.images.filter(Boolean)
  if (images.length === 0) return null

  // One image gets the room to breathe; pairs and triples share it.
  const cap = maxHeight ?? (images.length === 1 ? 720 : 460)

  return (
    <figure style={{ margin: '0 0 120px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 24,
        width: '100%',
      }}>
        {images.map((src, i) => (
          <div key={i} style={{ flex: 1, minWidth: 0 }}>
            <ImageSlot
              src={src}
              alt=""
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: cap,
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>

      {group.credit && (
        <figcaption style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          lineHeight: 1.5,
          color: '#000',
          opacity: 0.55,
          marginTop: 12,
        }}>
          {group.credit}
        </figcaption>
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
