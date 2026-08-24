'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type VimeoPlayer from '@vimeo/player'
import VideoBackground from './VideoBackground'

// ── CONFIG ────────────────────────────────────────────────────────────────────
const SHOW_IN_NO_PARTICULAR_ORDER = true
const LEGIBILITY_MODE: 'scrim' | 'blend' = 'scrim'
const DEV_SHORTCUTS = false

type Variant = 'a' | 'b' | 'c' | 'd'
const VARIANTS: Variant[] = ['a', 'b', 'c', 'd']

const CORNERS = {
  topLeft: {
    label: 'DOC. B',
    href: '/about',
    variantCLabel: 'DR. B',
    variantBLabel: 'DOC. B',
    variantDLabel: 'ABOUT',
  },
  topRight: {
    primary: 'Artistic Research in Repair',
    secondary: '“broken can be fixed”',
    variantCLabel: 'ARTISTIC RESEARCH',
    variantBLabel: 'Artistic Research in Repair',
  },
  bottomRight: {
    archive: {
      label: 'Enter Archive',
      href: '/archive',
      variantCLabel: 'ARCHIVE',
      variantBLabel: 'ENTER ARCHIVE',
      variantBMenuLabel: 'Menu',
    },
    instagram: {
      label: 'Instagram',
      url: 'https://www.instagram.com/drberendje',
      variantCLabel: 'INSTAGRAM',
      variantBLabel: 'INSTAGRAM',
      variantDLabel: 'INSTAGRAM',
    },
  },
  floating: {
    label: '“In No Particular Order”',
    href: '/in-no-particular-order',
    variantCLabel: 'IN NO PARTICULAR ORDER',
    variantBLabel: 'IN NO PARTICULAR ORDER',
  },
  about: { variantBLabel: 'ABOUT', href: '/about' },
  wordmark: { label: 'DOC. B' },
}

// Variant D index. Items 1 and 6 use the real config hrefs.
// TODO: real routes for items 2–5 once those sections exist.
const D_INDEX = [
  { title: 'In No Particular Order', href: CORNERS.floating.href },
  { title: 'Repair', href: '#' },
  { title: 'Textile Trade', href: '#' },
  { title: 'Material Culture', href: '#' },
  { title: 'Decolonial Praxis', href: '#' },
  { title: 'Archive', href: CORNERS.bottomRight.archive.href },
]

// ── SHARED TYPE ───────────────────────────────────────────────────────────────
const cornerStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: '10px',
  fontWeight: 400,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#fff',
  lineHeight: 1.6,
  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
}

// The two quoted asides — italic, one step down from the nav.
const asideStyle: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: '9px',
  fontWeight: 400,
  fontStyle: 'italic',
  letterSpacing: '0.04em',
  color: '#fff',
  lineHeight: 1.6,
  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
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
  const [variant, setVariant] = useState<Variant>('a')
  const [wordmarkVisible, setWordmarkVisible] = useState(true)
  const [wordmarkOpacity, setWordmarkOpacity] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [hoveredD, setHoveredD] = useState<number | null>(null)
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const playerRef = useRef<VimeoPlayer | null>(null)

  // Read variant from URL on mount. window.location.search, never useSearchParams
  // — useSearchParams forces a Suspense boundary and breaks static export.
  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get('v')?.toLowerCase()
    // numeric aliases: 1→a, 2→b, 3→c, 4→d
    const numeric: Record<string, Variant> = { '1': 'a', '2': 'b', '3': 'c', '4': 'd' }
    const resolved = raw && (VARIANTS.includes(raw as Variant) ? (raw as Variant) : numeric[raw])
    if (resolved) setVariant(resolved)
  }, [])

  // V key cycles a → b → c → d → a. Gated: off in production.
  useEffect(() => {
    if (!DEV_SHORTCUTS) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'v' && e.key !== 'V') return
      setVariant(prev => {
        const next = VARIANTS[(VARIANTS.indexOf(prev) + 1) % VARIANTS.length]
        const url = new URL(window.location.href)
        url.searchParams.set('v', next)
        window.history.replaceState(null, '', url.toString())
        return next
      })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Timed wordmark fade — variant A's intro moment
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const holdTimer = setTimeout(() => {
      if (prefersReduced) { setWordmarkVisible(false); return }
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

  // Vimeo Player SDK — only variant C exposes transport controls
  useEffect(() => {
    if (variant !== 'c') {
      playerRef.current = null
      return
    }
    let cancelled = false
    import('@vimeo/player').then(({ default: Player }) => {
      if (cancelled || !iframeRef.current) return
      const player = new Player(iframeRef.current)
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

  const isA = variant === 'a'
  const isB = variant === 'b'
  const isC = variant === 'c'
  const isD = variant === 'd'
  const scrim = LEGIBILITY_MODE === 'scrim'
  const blend = LEGIBILITY_MODE === 'blend'
  const pad = isMobile ? 16 : 32
  const topPad = isMobile ? 12 : 28

  return (
    <main style={{
      background: '#0a0a0a',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'fixed',
      inset: 0,
    }}>
      <style>{`
        .hov-6 { transition: opacity 150ms ease; }
        .hov-6:hover { opacity: 0.6; }
        .hov-5 { transition: opacity 150ms ease; }
        .hov-5:hover { opacity: 0.5; }
        .play-btn {
          font-family: var(--font-ui); font-size: 11px; font-weight: 500;
          letter-spacing: 0.08em; color: #fff; background: none; border: none;
          padding: 0; transition: opacity 150ms ease;
        }
        .play-btn:hover { opacity: 0.6; }
      `}</style>

      {/* ── VIDEO — full bleed in every variant ── */}
      <VideoBackground iframeRef={isC ? iframeRef : undefined} />

      {/* ══════════════ VARIANT A — corner layout ══════════════ */}
      {isA && (
        <>
          <Link href={CORNERS.topLeft.href} style={{
            ...cornerStyle, position: 'absolute', top: topPad, left: pad,
            zIndex: 10, textDecoration: 'none',
          }}>
            {CORNERS.topLeft.label}
          </Link>

          <div style={{ position: 'absolute', top: topPad, right: pad, textAlign: 'right', zIndex: 10 }}>
            <div style={cornerStyle}>{CORNERS.topRight.primary}</div>
            <div style={{ ...asideStyle, opacity: 0.65, marginTop: 4 }}>
              {CORNERS.topRight.secondary}
            </div>
          </div>

          {SHOW_IN_NO_PARTICULAR_ORDER && (
            <Link href={CORNERS.floating.href} style={{
              ...asideStyle, position: 'absolute',
              left: isMobile ? pad : '25%', top: isMobile ? '20%' : '30%', zIndex: 10,
            }}>
              {CORNERS.floating.label}
            </Link>
          )}

          <div style={{
            position: 'absolute', bottom: isMobile ? 12 : 28, right: pad,
            textAlign: 'right', display: 'flex', flexDirection: 'column',
            gap: 6, alignItems: 'flex-end', zIndex: 10,
          }}>
            <Link href={CORNERS.bottomRight.archive.href} style={{
              ...cornerStyle, textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom: 1,
            }}>
              {CORNERS.bottomRight.archive.label} →
            </Link>
            <a href={CORNERS.bottomRight.instagram.url} target="_blank" rel="noopener noreferrer"
              style={{ ...cornerStyle, opacity: 0.45, textDecoration: 'none' }}>
              {CORNERS.bottomRight.instagram.label}
            </a>
          </div>

          {wordmarkVisible && (
            <div aria-hidden="true" style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)', textAlign: 'center',
              zIndex: 5, pointerEvents: 'none',
              opacity: wordmarkOpacity, transition: 'opacity 800ms ease',
            }}>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(56px, 14vw, 160px)',
                fontWeight: 700, color: '#fff', lineHeight: 1,
                letterSpacing: '-0.02em', margin: 0,
                textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              }}>
                {CORNERS.wordmark.label}
              </h1>
            </div>
          )}
        </>
      )}

      {/* ══════════════ VARIANT B — top bar + bold stacked list ══════════════ */}
      {isB && (
        <>
          {/* Scrim scoped to the list column, not the whole frame */}
          {scrim && (
            <div aria-hidden="true" style={{
              position: 'absolute',
              top: 0, bottom: 0,
              left: isMobile ? 0 : '58%',
              right: 0,
              background: isMobile
                ? 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.30) 45%, transparent 75%)'
                : 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.38) 35%, rgba(0,0,0,0.42) 100%)',
              zIndex: 4, pointerEvents: 'none',
            }} />
          )}

          {/* TOP BAR */}
          <div style={{
            position: 'absolute', top: 24, left: 32, right: 32,
            zIndex: 10, mixBlendMode: blend ? 'difference' : undefined,
          }}>
            <Link href={CORNERS.topLeft.href} className="hov-6" style={{
              position: 'absolute', left: 0, top: 0,
              fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 500,
              color: '#fff', textDecoration: 'none',
            }}>
              {CORNERS.topLeft.variantBLabel}
            </Link>

            {!isMobile && (
              <span style={{
                position: 'absolute', left: '67%', top: 0,
                fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 500, color: '#fff',
              }}>
                {CORNERS.topRight.variantBLabel}
              </span>
            )}

            <Link href={CORNERS.bottomRight.archive.href} className="hov-6" style={{
              position: 'absolute', right: 0, top: 0,
              fontFamily: 'var(--font-ui)', fontSize: '13px', fontWeight: 500,
              color: '#fff', textDecoration: 'none',
            }}>
              {CORNERS.bottomRight.archive.variantBMenuLabel}
            </Link>
          </div>

          {/* MAIN LIST */}
          <div style={{
            position: 'absolute',
            left: isMobile ? 32 : '67%',
            top: isMobile ? '20vh' : '12vh',
            right: isMobile ? 32 : undefined,
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            zIndex: 10, mixBlendMode: blend ? 'difference' : undefined,
          }}>
            {[
              { label: CORNERS.floating.variantBLabel, href: CORNERS.floating.href, ext: false },
              { label: CORNERS.bottomRight.archive.variantBLabel, href: CORNERS.bottomRight.archive.href, ext: false },
              { label: CORNERS.about.variantBLabel, href: CORNERS.about.href, ext: false },
              { label: CORNERS.bottomRight.instagram.variantBLabel, href: CORNERS.bottomRight.instagram.url, ext: true },
            ].map(item => {
              const style: React.CSSProperties = {
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#fff',
                fontSize: isMobile ? '24px' : 'clamp(28px, 2.4vw, 44px)',
                lineHeight: 0.98,
                letterSpacing: '-0.015em',
                textDecoration: 'none',
              }
              return item.ext ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                  className="hov-5" style={style}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.label} href={item.href} className="hov-5" style={style}>
                  {item.label}
                </Link>
              )
            })}
          </div>
        </>
      )}

      {/* ══════════════ VARIANT C — centreline row ══════════════ */}
      {isC && (
        <>
          {scrim && (
            <div aria-hidden="true" style={{
              position: 'absolute',
              top: isMobile ? 0 : '50%', left: 0, right: 0,
              bottom: isMobile ? 0 : 'auto',
              height: isMobile ? '100%' : '120px',
              transform: isMobile ? 'none' : 'translateY(-50%)',
              background: isMobile
                ? 'linear-gradient(to bottom, transparent 15%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.45) 60%, transparent 85%)'
                : 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.35) 50%, transparent)',
              zIndex: 4, pointerEvents: 'none',
            }} />
          )}

          {!isMobile && (
            <div style={{
              position: 'absolute', top: '50%', left: 0, right: 0,
              transform: 'translateY(-50%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 5, mixBlendMode: blend ? 'difference' : undefined,
            }}>
              <button className="play-btn" onClick={togglePlayPause}
                style={{ position: 'absolute', left: 32 }}>
                {isPlaying ? 'Pause' : 'Play'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
                <Link href={CORNERS.topLeft.href} className="hov-6" style={cNavBase}>
                  {CORNERS.topLeft.variantCLabel}
                </Link>
                <span style={cNavBase}>{CORNERS.topRight.variantCLabel}</span>
                <Link href={CORNERS.floating.href} className="hov-6" style={cNavBase}>
                  {CORNERS.floating.variantCLabel}
                </Link>
                <Link href={CORNERS.bottomRight.archive.href} className="hov-6" style={cNavBase}>
                  {CORNERS.bottomRight.archive.variantCLabel}
                </Link>
                <a href={CORNERS.bottomRight.instagram.url} target="_blank" rel="noopener noreferrer"
                  className="hov-6" style={cNavBase}>
                  {CORNERS.bottomRight.instagram.variantCLabel}
                </a>
              </div>
            </div>
          )}

          {isMobile && (
            <>
              <div style={{
                position: 'absolute', top: '50%', left: 0, right: 0,
                transform: 'translateY(-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
                zIndex: 5, mixBlendMode: blend ? 'difference' : undefined,
              }}>
                <Link href={CORNERS.topLeft.href} className="hov-6" style={cNavBase}>
                  {CORNERS.topLeft.variantCLabel}
                </Link>
                <span style={cNavBase}>{CORNERS.topRight.variantCLabel}</span>
                <Link href={CORNERS.floating.href} className="hov-6" style={cNavBase}>
                  {CORNERS.floating.variantCLabel}
                </Link>
                <Link href={CORNERS.bottomRight.archive.href} className="hov-6" style={cNavBase}>
                  {CORNERS.bottomRight.archive.variantCLabel}
                </Link>
                <a href={CORNERS.bottomRight.instagram.url} target="_blank" rel="noopener noreferrer"
                  className="hov-6" style={cNavBase}>
                  {CORNERS.bottomRight.instagram.variantCLabel}
                </a>
              </div>
              <button className="play-btn" onClick={togglePlayPause}
                style={{ position: 'absolute', bottom: 24, left: 24, zIndex: 10 }}>
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </>
          )}
        </>
      )}

      {/* ══════════════ VARIANT D — centred index ══════════════ */}
      {isD && (
        <>
          {/* Scrim scoped to the centred index block */}
          {scrim && (
            <div aria-hidden="true" style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isMobile ? '100%' : '86%',
              height: isMobile ? '78%' : '62%',
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.46) 0%, rgba(0,0,0,0.32) 55%, transparent 78%)',
              zIndex: 4, pointerEvents: 'none',
            }} />
          )}

          {/* HEADER */}
          <div style={{
            position: 'absolute', top: 24, left: 32, right: 32,
            zIndex: 10, mixBlendMode: blend ? 'difference' : undefined,
          }}>
            {(() => {
              const h: React.CSSProperties = {
                fontFamily: 'var(--font-ui)',
                fontSize: isMobile ? '10px' : '12px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#fff',
                textDecoration: 'none',
              }
              return (
                <>
                  <Link href={CORNERS.topLeft.href} className="hov-6"
                    style={{ ...h, position: 'absolute', left: 0, top: 0 }}>
                    {CORNERS.topLeft.variantDLabel}
                  </Link>
                  <span style={{
                    position: 'absolute', left: '50%', top: 0,
                    transform: 'translateX(-50%)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px', fontWeight: 700, color: '#fff',
                    letterSpacing: '-0.01em', whiteSpace: 'nowrap',
                  }}>
                    {CORNERS.wordmark.label}
                  </span>
                  <a href={CORNERS.bottomRight.instagram.url} target="_blank" rel="noopener noreferrer"
                    className="hov-6" style={{ ...h, position: 'absolute', right: 0, top: 0 }}>
                    {CORNERS.bottomRight.instagram.variantDLabel}
                  </a>
                </>
              )
            })()}
          </div>

          {/* MAIN INDEX — flex-wrap, irregular line breaks are intended */}
          <div
            onMouseOver={e => {
              const el = (e.target as HTMLElement).closest('[data-d-idx]')
              setHoveredD(el ? Number(el.getAttribute('data-d-idx')) : null)
            }}
            onMouseLeave={() => setHoveredD(null)}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isMobile ? 'calc(100% - 48px)' : 'min(88%, 1180px)',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              flexWrap: isMobile ? 'nowrap' : 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: '0.6em',
              rowGap: isMobile ? '0.28em' : '0',
              zIndex: 5,
              mixBlendMode: blend ? 'difference' : undefined,
            }}
          >
            {D_INDEX.map((item, i) => {
              const titleSize = isMobile ? '28px' : 'clamp(36px, 4.5vw, 72px)'
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  data-d-idx={i}
                  style={{
                    fontFamily: 'var(--font-serif-d), Georgia, serif',
                    fontWeight: 300,
                    fontSize: titleSize,
                    lineHeight: 1.15,
                    color: '#fff',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    opacity: hoveredD === null || hoveredD === i ? 1 : 0.45,
                    transition: 'opacity 200ms ease',
                  }}
                >
                  {item.title}
                  <span style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 400,
                    fontSize: '38%',
                    verticalAlign: 'super',
                    marginLeft: '0.15em',
                    color: '#fff',
                  }}>
                    [&thinsp;{i + 1}&thinsp;]
                  </span>
                </Link>
              )
            })}
          </div>
        </>
      )}
    </main>
  )
}
