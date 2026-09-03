'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type VimeoPlayer from '@vimeo/player'
import VideoBackground from './VideoBackground'
import Wordmark from './Wordmark'

// ── CONFIG ────────────────────────────────────────────────────────────────────
const LEGIBILITY_MODE: 'scrim' | 'blend' = 'scrim'

const NAV = {
  about: { label: 'DR. B', href: '/about' },
  research: { label: 'ARTISTIC RESEARCH' },
  inNoParticularOrder: { label: 'IN NO PARTICULAR ORDER', href: '/in-no-particular-order' },
  archive: { label: 'ARCHIVE', href: '/archive' },
  instagram: { label: 'INSTAGRAM', url: 'https://www.instagram.com/drberendje' },
}

// Intro wordmark timing
const WORDMARK_HOLD_MS = 3500
const WORDMARK_FADE_MS = 800

// ── TYPE ──────────────────────────────────────────────────────────────────────
const navBase: React.CSSProperties = {
  fontFamily: 'var(--font-ui)',
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#fff',
  textDecoration: 'none',
}

// "In No Particular Order" reads as a quoted aside — Sabon italic, not the UI face.
const navSerif: React.CSSProperties = {
  ...navBase,
  fontFamily: 'var(--font-serif)',
  fontStyle: 'italic',
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function Homepage() {
  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [wordmarkVisible, setWordmarkVisible] = useState(true)
  const [wordmarkOpacity, setWordmarkOpacity] = useState(1)
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const playerRef = useRef<VimeoPlayer | null>(null)

  // Intro wordmark: hold, fade, gone. Reduced motion skips straight to gone.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setWordmarkOpacity(0)
      setWordmarkVisible(false)
      return
    }
    const holdTimer = setTimeout(() => {
      setWordmarkOpacity(0)
      fadeTimerRef.current = setTimeout(() => setWordmarkVisible(false), WORDMARK_FADE_MS)
    }, WORDMARK_HOLD_MS)
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

  // Vimeo Player SDK — drives the Play/Pause control
  useEffect(() => {
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
  }, [])

  const togglePlayPause = async () => {
    if (!playerRef.current) return
    try {
      if (isPlaying) await playerRef.current.pause()
      else await playerRef.current.play()
    } catch {}
  }

  const scrim = LEGIBILITY_MODE === 'scrim'
  const blend = LEGIBILITY_MODE === 'blend'

  const navItems = (
    <>
      <Link href={NAV.about.href} className="hov-6" style={navBase}>
        {NAV.about.label}
      </Link>
      <span style={navBase}>{NAV.research.label}</span>
      <Link href={NAV.inNoParticularOrder.href} className="hov-6" style={navSerif}>
        {NAV.inNoParticularOrder.label}
      </Link>
      <Link href={NAV.archive.href} className="hov-6" style={navBase}>
        {NAV.archive.label}
      </Link>
      <a href={NAV.instagram.url} target="_blank" rel="noopener noreferrer"
        className="hov-6" style={navBase}>
        {NAV.instagram.label}
      </a>
    </>
  )

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
        .play-btn {
          font-family: var(--font-ui); font-size: 11px; font-weight: 500;
          letter-spacing: 0.08em; color: #fff; background: none; border: none;
          padding: 0; transition: opacity 150ms ease;
        }
        .play-btn:hover { opacity: 0.6; }
      `}</style>

      {/* ── VIDEO — full bleed ── */}
      <VideoBackground iframeRef={iframeRef} />

      {/* ── LEGIBILITY SCRIM — banded behind the centreline only ── */}
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

      {/* ── INTRO WORDMARK — above the nav row, independently positioned ── */}
      {wordmarkVisible && (
        <div aria-hidden="true" style={{
          position: 'absolute',
          top: isMobile ? '32%' : '34%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 6,
          pointerEvents: 'none',
          opacity: wordmarkOpacity,
          transition: `opacity ${WORDMARK_FADE_MS}ms ease`,
        }}>
          <Wordmark
            fontSize={isMobile ? 'clamp(48px, 18vw, 88px)' : 'clamp(72px, 11vw, 150px)'}
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
          />
        </div>
      )}

      {/* ── CENTRELINE NAV ROW ── */}
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
            {navItems}
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
            {navItems}
          </div>
          <button className="play-btn" onClick={togglePlayPause}
            style={{ position: 'absolute', bottom: 24, left: 24, zIndex: 10 }}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </>
      )}
    </main>
  )
}
