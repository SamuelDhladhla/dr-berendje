'use client'
import Logo from './Logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  // Desktop and design pages manage their own nav
  if (
    pathname === '/' ||
    pathname.startsWith('/design-a') ||
    pathname.startsWith('/design-b') ||
    pathname.startsWith('/design-c') ||
    pathname.startsWith('/design-d')
  ) return null

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 28px',
        background: isHome
          ? 'linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0) 100%)'
          : 'rgba(10,10,10,0.95)',
        backdropFilter: isHome ? 'none' : 'blur(8px)',
        borderBottom: isHome ? 'none' : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Logo />

      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <Link
          href="/about"
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: pathname === '/about' ? '#F5FF00' : '#888',
            transition: 'color 0.2s ease',
          }}
        >
          About
        </Link>
        <a
          href="mailto:linda@drberendje.com"
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#888',
            transition: 'color 0.2s ease',
          }}
        >
          Contact
        </a>
      </div>
    </nav>
  )
}
