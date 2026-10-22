'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { EducationItem } from '@/content/education'

/*
  Nested programme list, shared by Education and Consultancy.

  Top-level entries are large; each level of nesting steps down in size and
  indents, so the hierarchy is legible as structure rather than as one flat run
  of names. Hovering a top-level entry dims the others, the same behaviour the
  other list pages use.

  An item whose href is "#" is not yet a destination: it renders as plain text
  with the awaiting-client marker rather than as a dead link.
*/

const LEVEL_SIZE = ['clamp(28px, 3.4vw, 52px)', '17px', '14px']
const LEVEL_INDENT = [0, 28, 56]

function Label({ item, level }: { item: EducationItem; level: number }) {
  const size = LEVEL_SIZE[Math.min(level, LEVEL_SIZE.length - 1)]
  const style: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: size,
    lineHeight: level === 0 ? 1.1 : 1.45,
    letterSpacing: level === 0 ? '-0.02em' : '0',
    color: '#000',
    textDecoration: 'none',
    display: 'inline-block',
  }

  if (item.href === '#') {
    return (
      <span style={style}>
        {item.label}
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#B00020',
          marginLeft: 10,
          whiteSpace: 'nowrap',
        }}>
          [no destination yet]
        </span>
      </span>
    )
  }

  return (
    <Link href={item.href} style={{ ...style, textDecoration: 'underline', textUnderlineOffset: 4 }}>
      {item.label}
    </Link>
  )
}

function Branch({ item, level }: { item: EducationItem; level: number }) {
  return (
    <li style={{
      listStyle: 'none',
      marginLeft: LEVEL_INDENT[Math.min(level, LEVEL_INDENT.length - 1)],
      marginBottom: level === 0 ? 10 : 6,
    }}>
      <Label item={item} level={level} />
      {item.children && item.children.length > 0 && (
        <ul style={{ margin: '8px 0 0', padding: 0 }}>
          {item.children.map(c => <Branch key={c.label} item={c} level={level + 1} />)}
        </ul>
      )}
    </li>
  )
}

export default function NestedList({ items }: { items: EducationItem[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <ul
      onMouseLeave={() => setHovered(null)}
      style={{ margin: 0, padding: '72px 40px 120px', listStyle: 'none' }}
    >
      {items.map((item, i) => (
        <li
          key={item.label}
          onMouseOver={() => setHovered(i)}
          style={{
            listStyle: 'none',
            marginBottom: 64,
            opacity: hovered !== null && hovered !== i ? 0.45 : 1,
            transition: 'opacity 200ms ease',
          }}
        >
          <Label item={item} level={0} />
          {item.children && item.children.length > 0 && (
            <ul style={{ margin: '16px 0 0', padding: 0 }}>
              {item.children.map(c => <Branch key={c.label} item={c} level={1} />)}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}
