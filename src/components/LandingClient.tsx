'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type VimeoPlayer from '@vimeo/player'
import VideoBackground from './VideoBackground'

// ── CONFIG ────────────────────────────────────────────────────────────────────
const SHOW_IN_NO_PARTICULAR_ORDER = true
const LEGIBILITY_MODE: 'scrim' | 'blend' = 'scrim'

const CORNERS = {
  topLeft: {
    label: 'DOC. B',
    href: '/about',
    variantCLabel: 'DR. B',
  },
  topRight: {
    primary: 'Artistic Research in Repair',
    secondary: 'broken can be fixed',
    variantCLabel: 'ARTISTIC RESEARCH',
  },
  bottomRight: {
    archive: { label: 'Enter Archive', href: '/archive', variantCLabel: 'ARCHIVE' },
    instagram: { label: 'Instagram', url: 'https://www.instagram.com/drberendje', variantCLabel: 'INSTAGRAM' },
  },
  floating: {
    label: '“In No Particular Order”',
    href: '/in-no-particular-order',
    variantCLabel: 'IN NO PARTICULAR ORDER',
  },
}

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

const cNavBase: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#fff',
  textDecoration: 'none',
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function LandingClient() {
  const [variant, setVariant] = useState<'a' | 'b' | 'c'>('a')
  const [wordmarkVisible, setWordmarkVisible] = useState(true)
  const [wordmarkOpacity, setWordmarkOpacity] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const playerRef = useRef<VimeoPlayer | null>(null)

  // Read variant from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const v = params.get('v')
    if (v === 'b') setVariant('b')
    else if (v === 'c') setVariant('c')
  }, [])

  // V key cycles A → B → C → A
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'v' || e.key === 'V') {
        setVariant(prev => {
          const next = prev === 'a' ? 'b' : prev === 'b' ? 'c' : 'a'
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

  // Timed wordmark fade — runs once on mount (variant A only at render time)
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

  // Vimeo Player SDK — initialise when entering variant C
  useEffect(() => {
    if (variant !== 'c') {
      if (playerRef.current) {
        try { playerRef.current.off('play'); playerRef.current.off('pause') } catch {}
        playerRef.current = null
      }
      return
    }

    let cancelled = false

    import('@vimeo/player').then(({ default: VimeoPlayer }) => {
      if (cancelled || !iframeRef.current) return
      const player = new VimeoPlayer(iframeRef.current)
      playerRef.current = player
      player.on('play', () => setIsPlaying(true))
      player.on('pause', () => setIsPlaying(false))
      player.getPaused().then((p: boolean) => setIsPlaying(!p)).catch(() => {})
    })

    return () => {
      cancelled = true
      if (playerRef.current) {
        try { playerRef.current.off('play'); playerRef.current.off('pause') } catch {}
        playerRef.current = null
      }
    }
  }, [variant])

  const togglePlayPause = async () => {
    if (!playerRef.current) return
    try {
      if (isPlaying) await playerRef.current.pause()
      else await playerRef.current.play()
    } catch {}
  }

  const isB = variant === 'b'
  const isC = variant === 'c'
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
      {/* ── VARIANT C hover styles ── */}
      {isC && (
        <style>{`
          .c-nav-link { transition: opacity 150ms ease; }
          .c-nav-link:hover { opacity: 0.6; }
          .c-play-btn { font-family: var(--font-ui); font-size: 11px; font-weight: 500;
            letter-spacing: 0.08em; color: #fff; background: none; border: none; padding: 0;
            transition: opacity 150ms ease; }
          .c-play-btn:hover { opacity: 0.6; }
        `}</style>
      )}

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
        <VideoBackground iframeRef={isC ? iframeRef : undefined} />
      )}

      {/* ══════════════════════════════════
          VARIANTS A + B — corner layout
      ══════════════════════════════════ */}
      {!isC && (
        <>
          {/* TOP-LEFT: DOC. B → /about */}
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

          {/* TOP-RIGHT */}
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

          {/* FLOATING: "In No Particular Order" */}
          {SHOW_IN_NO_PARTICULAR_ORDER && (
            <Link href={CORNERS.floating.href} style={{
              ...floatStyle,
              position: 'absolute',
              left: isMobile ? pad : '25%',
              top: isMobile ? '20%' : '30%',
              zIndex: 10,
            }}>
              {CORNERS.floating.label}
            </Link>
          )}

          {/* BOTTOM-RIGHT */}
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

          {/* CENTER WORDMARK (variant A only) */}
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
        </>
      )}

      {/* ══════════════════════════════════
          VARIANT C — centreline layout
      ══════════════════════════════════ */}
      {isC && (
        <>
          {/* SCRIM / BLEND legibility layer */}
          {LEGIBILITY_MODE === 'scrim' && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: isMobile ? 0 : '50%',
                left: 0,
                right: 0,
                bottom: isMobile ? 0 : 'auto',
                height: isMobile ? '100%' : '120px',
                transform: isMobile ? 'none' : 'translateY(-50%)',
                background: isMobile
                  ? 'linear-gradient(to bottom, transparent 15%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.45) 60%, transparent 85%)'
                  : 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.35) 50%, transparent)',
                zIndex: 4,
                pointerEvents: 'none',
              }}
            />
          )}

          {/* CENTRELINE ROW — desktop */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5,
              mixBlendMode: LEGIBILITY_MODE === 'blend' ? 'difference' : undefined,
            }}>
              {/* Play/Pause — far left, absolute */}
              <button
                className="c-play-btn"
                onClick={togglePlayPause}
                style={{
                  position: 'absolute',
                  left: 32,
                  fontFamily: 'var(--font-ui)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: '#fff',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                }}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>

              {/* Centre cluster */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
                <Link href={CORNERS.topLeft.href} className="c-nav-link" style={cNavBase}>
                  {CORNERS.topLeft.variantCLabel}
                </Link>
                <span style={cNavBase}>{CORNERS.topRight.variantCLabel}</span>
                <Link href={CORNERS.floating.href} className="c-nav-link" style={cNavBase}>
                  {CORNERS.floating.variantCLabel}
                </Link>
                <Link href={CORNERS.bottomRight.archive.href} className="c-nav-link" style={cNavBase}>
                  {CORNERS.bottomRight.archive.variantCLabel}
                </Link>
                <a
                  href={CORNERS.bottomRight.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="c-nav-link"
                  style={cNavBase}
                >
                  {CORNERS.bottomRight.instagram.variantCLabel}
                </a>
              </div>
            </div>
          )}

          {/* CENTRELINE — mobile: stacked vertical list */}
          {isMobile && (
            <>
              {/* Centre cluster — vertically and horizontally centred */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                zIndex: 5,
                mixBlendMode: LEGIBILITY_MODE === 'blend' ? 'difference' : undefined,
              }}>
                <Link href={CORNERS.topLeft.href} className="c-nav-link" style={cNavBase}>
                  {CORNERS.topLeft.variantCLabel}
                </Link>
                <span style={cNavBase}>{CORNERS.topRight.variantCLabel}</span>
                <Link href={CORNERS.floating.href} className="c-nav-link" style={cNavBase}>
                  {CORNERS.floating.variantCLabel}
                </Link>
                <Link href={CORNERS.bottomRight.archive.href} className="c-nav-link" style={cNavBase}>
                  {CORNERS.bottomRight.archive.variantCLabel}
                </Link>
                <a
                  href={CORNERS.bottomRight.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="c-nav-link"
                  style={cNavBase}
                >
                  {CORNERS.bottomRight.instagram.variantCLabel}
                </a>
              </div>

              {/* Play/Pause — bottom-left */}
              <button
                className="c-play-btn"
                onClick={togglePlayPause}
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 24,
                  zIndex: 10,
                }}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </>
          )}
        </>
      )}
    </main>
  )
}
