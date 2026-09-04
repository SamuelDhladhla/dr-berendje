'use client'
import Link from 'next/link'
import Wordmark from './Wordmark'

/*
  One header for every interior page. The top-left mark is the shared <Wordmark />
  component (DOC.B with the blue-dot period) — not a separately styled script logo.
  All nav type is var(--font-body) (Sabon).
*/

export const SITE_NAV = [
  { label: 'Research Projects', href: '/archive' },
  { label: 'Writing', href: '/writing' },
  { label: 'Education', href: '/education' },
  { label: 'Consultancy', href: '/consultancy' },
  { label: 'Playtime', href: '/playtime' },
  { label: 'About', href: '/about' },
]

/*
  THE single source of truth for navigation type, site-wide.

  Every nav-like control — main nav, List/Grid toggle, prev/next, back links —
  must spread this rather than restating the properties, so the uppercase rule
  cannot drift out of sync again. Titles, category labels and body copy keep
  their own case and must NOT use this.
*/
export const navText: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '12px',
  fontWeight: 400,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '#000',
  textDecoration: 'none',
}

const navLink = (active: boolean): React.CSSProperties => ({
  ...navText,
  opacity: active ? 1 : 0.55,
  borderBottom: active ? '1px solid #000' : '1px solid transparent',
  paddingBottom: 1,
  transition: 'opacity 150ms ease',
})

interface Props {
  /** href of the current section, used to mark the active nav item */
  active?: string
  /** optional controls rendered at the right of the bar (e.g. List / Grid) */
  right?: React.ReactNode
}

export default function SiteHeader({ active, right }: Props) {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      background: '#fff',
      zIndex: 50,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      gap: 32,
    }}>
      <Link href="/" aria-label="doc.B — home" style={{ textDecoration: 'none', flexShrink: 0 }}>
        <Wordmark fontSize="18px" style={{ color: '#000' }} />
      </Link>

      <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
        {SITE_NAV.map(n => (
          <Link key={n.href} href={n.href} style={navLink(active === n.href)}>
            {n.label}
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0 }}>
        {right}
      </div>
    </nav>
  )
}
