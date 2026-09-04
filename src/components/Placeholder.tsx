/*
  Visible marker for any body copy that is NOT sourced from the client's own
  documents. Deliberately loud — this must be impossible to miss in review, and
  must never be mistaken for finished copy.

  Rule: empty + marker. Never invent prose to fill the gap.
*/

interface Props {
  /** Optional note on what belongs here, e.g. "Project description". */
  note?: string
  align?: 'left' | 'center'
}

export default function Placeholder({ note, align = 'left' }: Props) {
  return (
    <p
      data-placeholder="true"
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#B00020',
        border: '1px dashed #B00020',
        background: 'rgba(176,0,32,0.04)',
        padding: '8px 12px',
        display: 'inline-block',
        lineHeight: 1.5,
        textAlign: align,
        margin: 0,
      }}
    >
      [Placeholder — replace with client copy]
      {note ? <span style={{ opacity: 0.7, textTransform: 'none' }}> · {note}</span> : null}
    </p>
  )
}
