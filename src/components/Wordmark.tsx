import type { CSSProperties } from 'react'

/*
  DOC.B — the shared wordmark.

  "DOC" + a blue disc standing in for the period + "B", set solid with no space.
  The disc is a separate element so it can carry the accent colour (#002FA7, the
  same blue as the cursor) independently of the type. It is sized in em, so it
  scales with whatever font-size the wordmark is rendered at, and sits on the
  baseline where a period would.
*/

interface WordmarkProps {
  /** Any CSS length. Everything else scales from this. */
  fontSize?: string
  style?: CSSProperties
  className?: string
}

// A period sits on the baseline. Linda's cap-height is ~0.72em, and the brief
// asks for a disc at 25–30% of cap-height → ~0.2em.
const DOT_DIAMETER = '0.2em'

export default function Wordmark({ fontSize = '1em', style, className }: WordmarkProps) {
  return (
    <span
      className={className}
      aria-label="DOC.B"
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        color: '#fff',
        fontSize,
        lineHeight: 1,
        letterSpacing: '-0.02em',
        display: 'inline-flex',
        alignItems: 'baseline',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      DOC
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: DOT_DIAMETER,
          height: DOT_DIAMETER,
          borderRadius: '50%',
          background: '#002FA7',
          margin: '0 0.05em',
          flexShrink: 0,
        }}
      />
      B
    </span>
  )
}
