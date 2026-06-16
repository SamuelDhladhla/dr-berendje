'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { projects } from '@/data/projects'

// ─── DESIGN E — Obys Agency Mirror ───────────────────────────────────────────
// Scattered floating images · Preloader counter · Custom dot/cross cursor
// Editorial title · Right-panel focus slide · Blur backdrop

const MONO = "'DM Mono', 'Courier New', monospace"
const SANS = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
const DISPLAY = "'Syne', 'Inter', sans-serif"

const WORK = [
  {
    slug: 'the-ecologies-of-repair',
    label: 'THE ECOLOGIES OF REPAIR',
    font: "'Instrument Serif', Georgia, serif",
    color: '#C8553D',
    cat: 'Research / Spatial',
    year: '2024 —',
    x: '6%', y: '9%', rot: -2, w: 210, h: 280,
  },
  {
    slug: 'dead-white-mans-clothes',
    label: 'OBRONI WA WU',
    font: "'Space Grotesk', Arial, sans-serif",
    color: '#2D5F4A',
    cat: 'Fashion / Documentary',
    year: '2011 — 2025',
    x: '29%', y: '5%', rot: 1.5, w: 235, h: 295,
  },
  {
    slug: 'sender-receiver-residence',
    label: 'SENDER – RECEIVER',
    font: "'Courier Prime', 'Courier New', monospace",
    color: '#8B6914',
    cat: 'Residency / Exchange',
    year: '2023 —',
    x: '57%', y: '7%', rot: -1, w: 198, h: 255,
  },
  {
    slug: 'secondhand-speculation',
    label: 'SECONDHAND SPECULATION',
    font: "'DM Sans', 'Helvetica Neue', sans-serif",
    color: '#3D4F7C',
    cat: 'Fashion / Material',
    year: '2019 —',
    x: '76%', y: '17%', rot: 2, w: 215, h: 275,
  },
  {
    slug: 'black-botanicals',
    label: 'BLACK BOTANICALS',
    font: "'Libre Baskerville', Georgia, serif",
    color: '#1A3A2A',
    cat: 'Publication / Archive',
    year: '2017 —',
    x: '3%', y: '43%', rot: -1.5, w: 192, h: 248,
  },
  {
    slug: 'the-fine-art-of-fakery',
    label: 'THE FINE ART OF FAKERY',
    font: "'IBM Plex Sans', 'Helvetica Neue', sans-serif",
    color: '#A0522D',
    cat: 'Exhibition / Lecture',
    year: '2015',
    x: '38%', y: '39%', rot: 1, w: 225, h: 290,
  },
  {
    slug: 'blueprint',
    label: 'BLUEPRINT',
    font: "'Archivo Black', 'Arial Black', sans-serif",
    color: '#1B3F8B',
    cat: 'Textile / Craft',
    year: '2014',
    x: '64%', y: '45%', rot: -2.5, w: 210, h: 270,
  },
  {
    slug: 'post-fossils',
    label: 'POST FOSSILS',
    font: "'Source Serif 4', Georgia, serif",
    color: '#4A4A4A',
    cat: 'Material / Speculative',
    year: '2015',
    x: '19%', y: '51%', rot: 1.5, w: 202, h: 260,
  },
]

export default function DesignE() {
  const [loaded, setLoaded]           = useState(false)
  const [counter, setCounter]         = useState(0)
  const [preloaderOut, setPreloaderOut] = useState(false)
  const [titleIn, setTitleIn]         = useState(false)
  const [focusSlug, setFocusSlug]     = useState<string | null>(null)
  const [hoverSlug, setHoverSlug]     = useState<string | null>(null)
  const [cursorX, setCursorX]         = useState(-100)
  const [cursorY, setCursorY]         = useState(-100)
  const [clock, setClock]             = useState('')
  const counterRef = useRef(0)
  const rafRef = useRef<number | undefined>(undefined)

  // Clock
  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setClock(d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
    }
    tick()
    const t = setInterval(tick, 10000)
    return () => clearInterval(t)
  }, [])

  // Preloader counter animation
  useEffect(() => {
    const duration = 1800
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3)
      const value = Math.floor(eased * 100)
      if (value !== counterRef.current) {
        counterRef.current = value
        setCounter(value)
      }
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        // Done — fade out preloader, reveal content
        setTimeout(() => {
          setPreloaderOut(true)
          setTimeout(() => {
            setLoaded(true)
            setTimeout(() => setTitleIn(true), 100)
          }, 600)
        }, 200)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  const focusItem = WORK.find(w => w.slug === focusSlug)
  const focusProj = focusItem ? projects.find(p => p.slug === focusItem.slug) : null

  const isCross = hoverSlug !== null || focusSlug !== null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');

        * { cursor: none !important; box-sizing: border-box; margin: 0; padding: 0; }

        .de-preloader {
          position: fixed; inset: 0; background: #fff; z-index: 9000;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: opacity 0.6s ease;
        }
        .de-preloader.out { opacity: 0; pointer-events: none; }

        .de-cursor {
          position: fixed; top: 0; left: 0;
          width: 10px; height: 10px;
          background: #000; border-radius: 50%;
          z-index: 9999; pointer-events: none;
          transform: translate(-50%, -50%);
          transition:
            width 0.3s cubic-bezier(0.16,1,0.3,1),
            height 0.3s cubic-bezier(0.16,1,0.3,1),
            background 0.2s ease,
            border-radius 0.2s ease;
          will-change: transform;
        }
        .de-cursor.is-cross {
          background: transparent; border-radius: 0;
          width: 18px; height: 18px;
        }
        .de-cursor.is-cross::before,
        .de-cursor.is-cross::after {
          content: ''; position: absolute;
          top: 50%; left: 50%;
          width: 100%; height: 1px; background: #000;
          transform: translate(-50%, -50%) rotate(45deg);
        }
        .de-cursor.is-cross::after {
          transform: translate(-50%, -50%) rotate(-45deg);
        }

        .de-img-wrap {
          position: absolute;
          overflow: hidden;
          transition: filter 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1);
          filter: grayscale(100%) brightness(0.92);
          will-change: transform;
        }
        .de-img-wrap:hover,
        .de-img-wrap.focused {
          filter: grayscale(0%) brightness(1);
          z-index: 10;
        }
        .de-img-wrap img {
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .de-img-wrap:hover img {
          transform: scale(1.04);
        }

        .de-title-wrap {
          overflow: hidden;
          line-height: 0.86;
        }
        .de-title {
          display: block;
          font-family: ${DISPLAY};
          font-weight: 800;
          font-size: clamp(56px, 9vw, 94px);
          letter-spacing: -0.06em;
          text-transform: uppercase;
          color: #000;
          white-space: nowrap;
          transform: translateY(110%);
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .de-title.in {
          transform: translateY(0);
        }

        .de-focus-panel {
          position: fixed; top: 0; right: 0;
          width: 50%; height: 100%;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-left: 1px solid rgba(0,0,0,0.06);
          transform: translateX(100%);
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 100;
          display: flex;
          flex-direction: column;
          padding: 48px 40px;
        }
        .de-focus-panel.open {
          transform: translateX(0);
        }

        .de-mobile-block {
          display: none;
          position: fixed; inset: 0; background: #000; z-index: 99999;
          color: #fff; font-family: ${MONO}; font-size: 12px;
          align-items: center; justify-content: center;
          text-align: center; padding: 40px; line-height: 2;
        }
        @media (max-width: 767px) {
          .de-mobile-block { display: flex; }
        }

        .de-backdrop {
          position: fixed; inset: 0; z-index: 99;
          background: transparent;
          display: none;
        }
        .de-backdrop.active { display: block; }
      `}</style>

      {/* Mobile blocker */}
      <div className="de-mobile-block">
        This experience is designed<br />for desktop viewing.<br /><br />
        <span style={{ color: '#666' }}>Please open on a larger screen.</span>
      </div>

      {/* Custom cursor */}
      <div
        className={`de-cursor${isCross ? ' is-cross' : ''}`}
        style={{ left: cursorX, top: cursorY }}
      />

      {/* Preloader */}
      {!loaded && (
        <div className={`de-preloader${preloaderOut ? ' out' : ''}`}>
          <div style={{ position: 'relative', width: 280 }}>
            {/* Label */}
            <div style={{
              fontFamily: MONO, fontSize: '9px', color: '#aaa',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              marginBottom: 20, textAlign: 'center',
            }}>
              dr Berendje® Experiment Space
            </div>
            {/* Counter */}
            <div style={{
              fontFamily: DISPLAY, fontSize: '72px', fontWeight: 800,
              color: '#000', lineHeight: 1, letterSpacing: '-0.04em',
              textAlign: 'center', marginBottom: 16,
            }}>
              {String(counter).padStart(2, '0')}
            </div>
            {/* Progress bar */}
            <div style={{ width: '100%', height: 1, background: '#e8e8e8', position: 'relative' }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, height: 1,
                width: `${counter}%`,
                background: '#000',
                transition: 'width 0.05s linear',
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Main canvas */}
      <main
        style={{
          position: 'fixed', inset: 0,
          background: '#fff',
          overflow: 'hidden',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
        onMouseMove={e => { setCursorX(e.clientX); setCursorY(e.clientY) }}
        onMouseLeave={() => { setCursorX(-100); setCursorY(-100) }}
      >
        {/* ── NAV ── */}
        <nav style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
          display: 'grid', gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '18px 24px',
        }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontFamily: MONO, fontSize: '11px', color: '#aaa', letterSpacing: '0.02em' }}>dr Berendje®</span>
            <span style={{ fontFamily: MONO, fontSize: '11px', color: '#ccc' }}>/</span>
            <span style={{ fontFamily: MONO, fontSize: '11px', color: '#000', letterSpacing: '0.02em' }}>Experiment Space</span>
          </Link>

          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <span style={{ fontFamily: MONO, fontSize: '11px', color: '#000', letterSpacing: '0.02em' }}>Space</span>
            <span style={{ fontFamily: MONO, fontSize: '11px', color: '#ccc' }}>,</span>
            <Link href="/about" style={{ fontFamily: MONO, fontSize: '11px', color: '#888', textDecoration: 'none', letterSpacing: '0.02em' }}>About</Link>
          </div>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'flex-end' }}>
            <span style={{ fontFamily: MONO, fontSize: '11px', color: '#aaa', letterSpacing: '0.02em' }}>{clock}</span>
            <span style={{ fontFamily: MONO, fontSize: '11px', color: '#ccc' }}>/</span>
            <a href="mailto:linda@drberendje.com" style={{ fontFamily: MONO, fontSize: '11px', color: '#888', textDecoration: 'none', letterSpacing: '0.02em' }}>Contact</a>
          </div>
        </nav>

        {/* ── SCATTERED IMAGES ── */}
        {WORK.map(item => {
          const proj = projects.find(p => p.slug === item.slug)
          if (!proj) return null
          const isFocused = focusSlug === item.slug
          return (
            <div
              key={item.slug}
              className={`de-img-wrap${isFocused ? ' focused' : ''}`}
              style={{
                left: item.x, top: item.y,
                width: item.w, height: item.h,
                transform: `rotate(${item.rot}deg)`,
                zIndex: isFocused ? 15 : 1,
              }}
              onClick={() => setFocusSlug(isFocused ? null : item.slug)}
              onMouseEnter={() => setHoverSlug(item.slug)}
              onMouseLeave={() => setHoverSlug(null)}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                  src={proj.coverImage}
                  alt={item.label}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          )
        })}

        {/* ── EDITORIAL TITLE ── */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          left: 0, right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 40,
          pointerEvents: 'none',
        }}>
          <div className="de-title-wrap">
            <span className={`de-title${titleIn ? ' in' : ''}`}>
              DR BERENDJE
            </span>
          </div>
          <div style={{
            fontFamily: MONO, fontSize: '10px', color: '#aaa',
            letterSpacing: '0.06em', marginTop: 10,
            opacity: titleIn ? 1 : 0,
            transition: 'opacity 0.6s ease 0.4s',
          }}>
            Studio / Archive / Gallery — PhD Design Research · ArtEZ · Linda Valkeman
          </div>
        </div>

        {/* ── FOCUS PANEL BACKDROP ── */}
        <div
          className={`de-backdrop${focusSlug ? ' active' : ''}`}
          onClick={() => setFocusSlug(null)}
        />

        {/* ── FOCUS PANEL ── */}
        <div className={`de-focus-panel${focusSlug ? ' open' : ''}`}>
          {focusItem && focusProj && (
            <>
              {/* Close */}
              <button
                onClick={() => setFocusSlug(null)}
                style={{
                  position: 'absolute', top: 20, right: 24,
                  background: 'none', border: 'none',
                  fontFamily: MONO, fontSize: '11px', color: '#888',
                  letterSpacing: '0.05em', cursor: 'none',
                }}
              >
                [ close ]
              </button>

              {/* Image */}
              <div style={{
                position: 'relative',
                height: '33vh', maxHeight: '33vh',
                width: '100%',
                marginBottom: 32, flexShrink: 0,
              }}>
                <Image
                  src={focusProj.coverImage}
                  alt={focusItem.label}
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'left center' }}
                />
              </div>

              {/* Meta */}
              <div style={{
                fontFamily: MONO, fontSize: '10px', color: '#aaa',
                letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12,
              }}>
                {focusItem.cat}
              </div>

              {/* Title */}
              <div style={{
                fontFamily: focusItem.font,
                fontSize: 'clamp(22px, 3vw, 34px)',
                fontWeight: 700,
                color: focusItem.color,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                marginBottom: 16,
              }}>
                {focusItem.label}
              </div>

              {/* Year */}
              <div style={{
                fontFamily: MONO, fontSize: '11px', color: '#bbb',
                letterSpacing: '0.04em', marginBottom: 24,
              }}>
                {focusItem.year}
              </div>

              {/* Excerpt */}
              <p style={{
                fontFamily: SANS, fontSize: '13px', color: '#444',
                lineHeight: 1.75, marginBottom: 32, flex: 1,
              }}>
                {focusProj.excerpt}
              </p>

              {/* Link */}
              <Link
                href={`/design-e/project/${focusItem.slug}`}
                style={{
                  fontFamily: MONO, fontSize: '11px', color: '#000',
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderBottom: '1px solid #000',
                  paddingBottom: 2,
                  alignSelf: 'flex-start',
                }}
              >
                View Project →
              </Link>
            </>
          )}
        </div>
      </main>
    </>
  )
}
