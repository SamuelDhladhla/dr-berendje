import type { CSSProperties } from 'react'

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

/*
  Renders a project image, or — when the project has no image of its own — a
  visibly obvious placeholder box occupying the same slot.

  A blank gap reads as a layout bug; a borrowed photo from another project reads
  as finished work. Neither is acceptable in review, so an empty slot is drawn
  explicitly instead.
*/

interface Props {
  src?: string
  alt: string
  className?: string
  style?: CSSProperties
}

export default function ImageSlot({ src, alt, className, style }: Props) {
  if (src && src.trim()) {
    return (
      <img
        className={className}
        src={`${BASE_PATH}${src}`}
        alt={alt}
        loading="lazy"
        style={style}
      />
    )
  }

  return (
    <div
      data-image-placeholder="true"
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed #B00020',
        background: 'rgba(176,0,32,0.04)',
        color: '#B00020',
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: 12,
      }}
    >
      [Image placeholder]
    </div>
  )
}
