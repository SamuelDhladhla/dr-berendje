'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HEADING = "'Instrument Serif', Georgia, serif"
const BODY = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
const ACCENT = '#C8553D'

export default function Nav() {
  const pathname = usePathname()

  if (
    pathname === '/' ||
    pathname.startsWith('/design-a') ||
    pathname.startsWith('/design-b') ||
    pathname.startsWith('/design-c') ||
    pathname.startsWith('/design-d') ||
    pathname.startsWith('/design-e')
  ) return null

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 32px',
      background: '#fff',
      borderBottom: '1px solid #000',
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontFamily: HEADING, fontSize: '18px', fontWeight: 400, color: '#000' }}>
          dr<span style={{ color: ACCENT }}>.</span> Berendje
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <Link href="/design-a" style={{ fontFamily: BODY, fontSize: '13px', fontWeight: 400, color: '#000', textDecoration: 'none' }}>Research Projects</Link>
        <Link href="/about" style={{
          fontFamily: BODY, fontSize: '13px', fontWeight: 400, color: '#000', textDecoration: 'none',
          borderBottom: pathname === '/about' ? '1px solid #000' : 'none',
          paddingBottom: 1,
        }}>About</Link>
      </div>
    </nav>
  )
}
