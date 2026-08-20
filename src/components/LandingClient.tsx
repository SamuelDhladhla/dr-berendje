'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import VideoBackground from './VideoBackground'

// ── CONFIG ────────────────────────────────────────────────────────────────────
const SHOW_IN_NO_PARTICULAR_ORDER = true

const CORNERS = {
  topLeft: { label: 'DOC. B', href: '/about' },
  topRight: { primary: 'Artistic Research in Repair', secondary: 'broken can be fixed' },
  bottomRight: {
    archive: { label: 'Enter Archive', href: '/archive' },
    instagram: { label: 'Instagram', url: 'https://www.instagram.com/drberendje' },
  },
  floating: { label: '“In No Particular Order”', href: '/in-no-particular-order' },
} as const

// ── HELPERS ───────────────────────────────────────────────────────────────────
function cornerStyle(isB: boolean): React.CSSProperties {
  return {
    fontFamily: 'var(--font-ui)',
    fontSize: '10px',
    fontWeight: 400,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: isB ? '#000' : '#fff',
    lineHeight: 1.6,
    textShadow: isB ? 'none' : '0 1px 3px rgba(0,0,0,0.5)',
  }
}

const floatStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: '10px',
  fontWeight: 400,
  letterSpacing: '0.06em',
  color: '#fff',
  lineHeight: 1.6,
  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
  fontStyle: 'italic',
  textDecoration: 'none',
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function LandingClient() {
  const [variant, setVariant] = useState<'a' | 'b'>('a')
  const [wordmarkVisible, setWordmarkVisible] = useState(true)
  const [wordmarkOpacity, setWordmarkOpacity] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Read variant from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('v') === 'b') setVariant('b')
  }, [])

  // V key toggles variant
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'v' || e.key === 'V') {
        setVariant(prev => {
          const next = prev === 'a' ? 'b' : 'a'
          const url = new URL(window.location.href)
          url.searchParams.set('v', next)
          window.history.replaceState(null, '', url.toString())
          return next
        })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Timed wordmark fade — runs once on mount regardless of variant
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const holdTimer = setTimeout(() => {
      if (prefersReduced) {
        setWordmarkVisible(false)
        return
      }
      setWordmarkOpacity(0)
      fadeTimerRef.current = setTimeout(() => setWordmarkVisible(false), 800)
    }, 3500)

    return () => {
      clearTimeout(holdTimer)
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
    }
  }, [])

  // Mobile detection
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const isB = variant === 'b'
  const barH = isMobile ? '5vh' : '8vh'
  const pad = isMobile ? 16 : 32
  const topPad = isMobile ? 12 : 28
  const bottomPad = isMobile ? 12 : 28
  const cs = cornerStyle(isB)

  return (
    <main style={{
      background: isB ? '#fff' : '#0a0a0a',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'fixed',
      inset: 0,
    }}>
      {/* ── VIDEO BACKGROUND ── */}
      {isB ? (
        <div style={{
          position: 'absolute',
          top: barH,
          left: 0,
          right: 0,
          bottom: barH,
          overflow: 'hidden',
          zIndex: 1,
        }}>
          <VideoBackground inset />
        </div>
      ) : (
        <VideoBackground />
      )}

      {/* ── TOP-LEFT: DOC. B → /about ── */}
      <Link href={CORNERS.topLeft.href} style={{
        ...cs,
        position: 'absolute',
        top: topPad,
        left: pad,
        zIndex: 10,
        textDecoration: 'none',
      }}>
        {CORNERS.topLeft.label}
      </Link>

      {/* ── TOP-RIGHT ── */}
      <div style={{
        position: 'absolute',
        top: topPad,
        right: pad,
        textAlign: 'right',
        zIndex: 10,
      }}>
        <div style={cs}>{CORNERS.topRight.primary}</div>
        <div style={{
          ...cs,
          fontStyle: 'italic',
          textTransform: 'none',
          opacity: 0.55,
          marginTop: 4,
        }}>
          {CORNERS.topRight.secondary}
        </div>
      </div>

      {/* ── FLOATING: "In No Particular Order" ── */}
      {SHOW_IN_NO_PARTICULAR_ORDER && (
        <Link
          href={CORNERS.floating.href}
          style={{
            ...floatStyle,
            position: 'absolute',
            left: isMobile ? pad : '25%',
            top: isMobile ? '20%' : '30%',
            zIndex: 10,
          }}
        >
          {CORNERS.floating.label}
        </Link>
      )}

      {/* ── BOTTOM-RIGHT ── */}
      <div style={{
        position: 'absolute',
        bottom: bottomPad,
        right: pad,
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        alignItems: 'flex-end',
        zIndex: 10,
      }}>
        <Link href={CORNERS.bottomRight.archive.href} style={{
          ...cs,
          textDecoration: 'none',
          borderBottom: `1px solid ${isB ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'}`,
          paddingBottom: 1,
        }}>
          {CORNERS.bottomRight.archive.label} →
        </Link>
        <a
          href={CORNERS.bottomRight.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...cs, opacity: 0.45, textDecoration: 'none' }}
        >
          {CORNERS.bottomRight.instagram.label}
        </a>
      </div>

      {/* ── CENTER WORDMARK (variant A only) ── */}
      {!isB && wordmarkVisible && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 5,
            pointerEvents: 'none',
            opacity: wordmarkOpacity,
            transition: 'opacity 800ms ease',
          }}
        >
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 14vw, 160px)',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            margin: 0,
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
          }}>
            DOC. B
          </h1>
        </div>
      )}
    </main>
  )
}
