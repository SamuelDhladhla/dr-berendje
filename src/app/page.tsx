'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

// ─── WINDOWS 98 DESKTOP — dr Berendje Presentation ───────────────────────────

const FONT = "Tahoma, 'Microsoft Sans Serif', Arial, sans-serif"
const DESKTOP_BG = '#008080'
const WIN_BG = '#d4d0c8'
const TITLE_ACTIVE = 'linear-gradient(to right, #000080, #1084D0)'
const TITLE_INACTIVE = 'linear-gradient(to right, #7B7B7B, #BFBFBF)'
const BORDER_RAISED = {
  borderTop: '2px solid #ffffff',
  borderLeft: '2px solid #ffffff',
  borderBottom: '2px solid #404040',
  borderRight: '2px solid #404040',
  outline: '1px solid #000',
}
const BTN_RAISED = {
  borderTop: '1.5px solid #ffffff',
  borderLeft: '1.5px solid #ffffff',
  borderBottom: '1.5px solid #808080',
  borderRight: '1.5px solid #808080',
}
const BTN_SUNKEN = {
  borderTop: '1.5px solid #808080',
  borderLeft: '1.5px solid #808080',
  borderBottom: '1.5px solid #ffffff',
  borderRight: '1.5px solid #ffffff',
}

const README_TEXT = `dr Berendje — Linda Valkeman
PhD Design Research, ArtEZ University of the Arts
════════════════════════════════════════

PORTFOLIO PRESENTATION — CLIENT REVIEW
Date: ${new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}

════════════════════════════════════════
THREE DESIGN DIRECTIONS ARE PRESENTED:
════════════════════════════════════════

[Design A] — THE LIST VIEW
   Academic list layout. Monospaced type,
   per-project fonts and colours. Hover
   to reveal imagery. Citation metadata
   above each title.

   Double-click "Design A" icon to open.

[Design C] — THE CAROUSEL
   Full-height image carousel. Custom
   crosshair cursor in terracotta.
   Images fill the viewport. Active
   project stands tall above the rest.

   Double-click "Design C" icon to open.

[Design E] — EXPERIMENT SPACE
   Scattered floating images across the
   full viewport. Preloader counter.
   Custom cursor. Editorial title.
   Click any image to open focus panel.

   Double-click "Design E" icon to open.

════════════════════════════════════════
ABOUT
════════════════════════════════════════

   linda@drberendje.com
   ArtEZ University, Arnhem NL

   Research: Repair as Social and
   Material Healing · Decolonial Fashion
   · Waste Colonialism · Textiles

════════════════════════════════════════
   PhD Design Research
   ArtEZ University of the Arts
   © Linda Valkeman 2025
════════════════════════════════════════`

type WinId = 'notepad' | 'design-a' | 'design-c' | 'design-e' | 'about' | 'recyclebin'

interface Win {
  id: WinId
  title: string
  x: number
  y: number
  w: number
  h: number
  minimized: boolean
  maximized: boolean
  zIndex: number
}

const INITIAL_WINDOWS: Win[] = [
  { id: 'notepad', title: 'README.txt - Notepad', x: 280, y: 60, w: 520, h: 380, minimized: false, maximized: false, zIndex: 10 },
]

let zCounter = 20

export default function DesktopPage() {
  const [windows, setWindows] = useState<Win[]>(INITIAL_WINDOWS)
  const [activeWin, setActiveWin] = useState<WinId | null>('notepad')
  const [showStart, setShowStart] = useState(false)
  const [clock, setClock] = useState('')
  const [iconSelected, setIconSelected] = useState<string | null>(null)
  const dragging = useRef<{ id: WinId; offX: number; offY: number } | null>(null)

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

  // Drag handlers
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging.current) return
    const { id, offX, offY } = dragging.current
    setWindows(ws => ws.map(w =>
      w.id === id ? { ...w, x: e.clientX - offX, y: e.clientY - offY } : w
    ))
  }, [])

  const onMouseUp = useCallback(() => {
    dragging.current = null
  }, [])

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [onMouseMove, onMouseUp])

  const focusWin = (id: WinId) => {
    zCounter++
    setWindows(ws => ws.map(w => w.id === id ? { ...w, zIndex: zCounter } : w))
    setActiveWin(id)
  }

  const openOrFocus = (id: WinId, title: string, w: number, h: number, x: number, y: number) => {
    setShowStart(false)
    const existing = windows.find(win => win.id === id)
    if (existing) {
      zCounter++
      setWindows(ws => ws.map(win =>
        win.id === id ? { ...win, minimized: false, zIndex: zCounter } : win
      ))
      setActiveWin(id)
    } else {
      zCounter++
      setWindows(ws => [...ws, { id, title, x, y, w, h, minimized: false, maximized: false, zIndex: zCounter }])
      setActiveWin(id)
    }
  }

  const closeWin = (id: WinId) => {
    setWindows(ws => ws.filter(w => w.id !== id))
    setActiveWin(null)
  }

  const minimizeWin = (id: WinId) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, minimized: true } : w))
    setActiveWin(null)
  }

  const maximizeWin = (id: WinId) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w))
  }

  const taskbarClick = (id: WinId) => {
    const win = windows.find(w => w.id === id)
    if (!win) return
    if (win.minimized) {
      zCounter++
      setWindows(ws => ws.map(w => w.id === id ? { ...w, minimized: false, zIndex: zCounter } : w))
      setActiveWin(id)
    } else if (activeWin === id) {
      setWindows(ws => ws.map(w => w.id === id ? { ...w, minimized: true } : w))
      setActiveWin(null)
    } else {
      focusWin(id)
    }
  }

  const startDrag = (id: WinId, e: React.MouseEvent) => {
    const win = windows.find(w => w.id === id)
    if (!win || win.maximized) return
    focusWin(id)
    dragging.current = { id, offX: e.clientX - win.x, offY: e.clientY - win.y }
  }

  // ── COMPONENTS ──

  function TitleBtn({ label, onClick, style }: { label: string; onClick: () => void; style?: React.CSSProperties }) {
    return (
      <button
        onMouseDown={e => e.stopPropagation()}
        onClick={e => { e.stopPropagation(); onClick() }}
        style={{
          ...BTN_RAISED,
          fontFamily: FONT,
          fontSize: '11px',
          width: 16,
          height: 14,
          background: WIN_BG,
          cursor: 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          lineHeight: 1,
          color: '#000',
          ...style,
        }}
      >
        {label}
      </button>
    )
  }

  function MenuBar({ items }: { items: string[] }) {
    return (
      <div style={{ display: 'flex', gap: 0, padding: '2px 4px', background: WIN_BG, borderBottom: '1px solid #d4d0c8' }}>
        {items.map(item => (
          <span key={item} style={{
            fontFamily: FONT, fontSize: '12px', color: '#000',
            padding: '1px 6px', cursor: 'default',
          }}>
            {item}
          </span>
        ))}
      </div>
    )
  }

  function WinFrame({ win }: { win: Win }) {
    const isActive = activeWin === win.id

    const style: React.CSSProperties = win.maximized
      ? { position: 'fixed', left: 0, top: 0, width: '100vw', height: 'calc(100vh - 28px)', zIndex: win.zIndex }
      : { position: 'fixed', left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.zIndex }

    return (
      <div
        style={{
          ...style,
          ...BORDER_RAISED,
          background: WIN_BG,
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseDown={() => focusWin(win.id)}
      >
        {/* Title bar */}
        <div
          style={{
            background: isActive ? TITLE_ACTIVE : TITLE_INACTIVE,
            display: 'flex',
            alignItems: 'center',
            padding: '2px 3px',
            gap: 4,
            cursor: 'default',
            flexShrink: 0,
            userSelect: 'none',
          }}
          onMouseDown={e => startDrag(win.id, e)}
        >
          <span style={{ color: '#fff', fontFamily: FONT, fontSize: '12px', fontWeight: 700, flex: 1, paddingLeft: 2 }}>
            {win.title}
          </span>
          <div style={{ display: 'flex', gap: 2 }}>
            <TitleBtn label="—" onClick={() => minimizeWin(win.id)} />
            <TitleBtn label="□" onClick={() => maximizeWin(win.id)} style={{ fontSize: '9px' }} />
            <TitleBtn label="✕" onClick={() => closeWin(win.id)} style={{ fontWeight: 700 }} />
          </div>
        </div>

        {/* Window content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {win.id === 'notepad' && <NotepadContent />}
          {win.id === 'design-a' && <BrowserContent src="/dr-berendje/design-a" title="Design A — The List" />}
          {win.id === 'design-c' && <BrowserContent src="/dr-berendje/design-c" title="Design C — The Carousel" />}
          {win.id === 'design-e' && <BrowserContent src="/dr-berendje/design-e" title="Design E — Experiment Space" />}
          {win.id === 'about' && <AboutContent />}
          {win.id === 'recyclebin' && <RecycleBinContent />}
        </div>
      </div>
    )
  }

  function NotepadContent() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <MenuBar items={['File', 'Edit', 'Search', 'Help']} />
        <textarea
          readOnly
          value={README_TEXT}
          style={{
            flex: 1,
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '12px',
            color: '#000',
            background: '#fff',
            border: 'none',
            outline: 'none',
            padding: '4px 6px',
            resize: 'none',
            lineHeight: 1.6,
            cursor: 'text',
          }}
        />
      </div>
    )
  }

  function BrowserContent({ src, title }: { src: string; title: string }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <MenuBar items={['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help']} />
        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '3px 6px',
          background: WIN_BG, borderBottom: '1px solid #a0a0a0', flexShrink: 0,
        }}>
          {['◀', '▶', '✕', '⟳'].map(btn => (
            <button key={btn} style={{
              ...BTN_RAISED,
              fontFamily: FONT, fontSize: '11px',
              padding: '1px 6px', background: WIN_BG,
              color: '#000', cursor: 'default',
            }}>{btn}</button>
          ))}
          <div style={{
            ...BTN_SUNKEN,
            flex: 1, height: 20, background: '#fff',
            display: 'flex', alignItems: 'center', padding: '0 6px',
          }}>
            <span style={{ fontFamily: FONT, fontSize: '11px', color: '#000' }}>
              http://drberendje.com/{title.toLowerCase().replace(/[^a-z]/g, '-').replace(/-+/g, '-')}
            </span>
          </div>
          <button style={{
            ...BTN_RAISED,
            fontFamily: FONT, fontSize: '11px',
            padding: '1px 10px', background: WIN_BG,
            color: '#000', cursor: 'default',
          }}>Go</button>
        </div>
        <iframe
          src={src}
          style={{ flex: 1, border: 'none', display: 'block' }}
          title={title}
        />
        {/* Status bar */}
        <div style={{
          padding: '2px 8px', background: WIN_BG,
          borderTop: '1px solid #a0a0a0', flexShrink: 0,
          display: 'flex', gap: 8,
        }}>
          <span style={{ fontFamily: FONT, fontSize: '11px', color: '#000', flex: 1 }}>Done</span>
          <span style={{ fontFamily: FONT, fontSize: '11px', color: '#000' }}>Internet zone</span>
        </div>
      </div>
    )
  }

  function AboutContent() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <MenuBar items={['File', 'Help']} />
        <div style={{
          flex: 1, background: WIN_BG, padding: '20px 24px',
          overflow: 'auto',
        }}>
          <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            <div style={{
              width: 64, height: 64, background: '#fff',
              border: '2px inset #808080',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '32px', flexShrink: 0,
            }}>🌿</div>
            <div>
              <div style={{ fontFamily: FONT, fontSize: '14px', fontWeight: 700, color: '#000', marginBottom: 4 }}>
                dr Berendje
              </div>
              <div style={{ fontFamily: FONT, fontSize: '12px', color: '#444', lineHeight: 1.7 }}>
                Linda Valkeman<br />
                PhD Design Research<br />
                ArtEZ University of the Arts
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #808080', borderBottom: '1px solid #fff', marginBottom: 16 }} />
          <div style={{ fontFamily: FONT, fontSize: '12px', color: '#000', lineHeight: 1.8 }}>
            <strong>Research:</strong> Repair as Social & Material Healing<br />
            <strong>Focus:</strong> Decolonial Fashion, Waste Colonialism, Textiles<br />
            <strong>Contact:</strong> linda@drberendje.com<br />
            <strong>Location:</strong> Netherlands / Ghana
          </div>
          <div style={{ borderTop: '1px solid #808080', borderBottom: '1px solid #fff', margin: '16px 0' }} />
          <div style={{ fontFamily: FONT, fontSize: '11px', color: '#444', lineHeight: 1.7 }}>
            "Design is the lens through which I observe, question,<br />
            and speculate on societal shifts — a language through<br />
            which new systems of value, care, and kinship may be<br />
            imagined and enacted."
          </div>
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => openOrFocus('design-a', 'Design A — The List [Internet Explorer]', 860, 560, 80, 40)}
              style={{
                ...BTN_RAISED,
                fontFamily: FONT, fontSize: '12px',
                padding: '4px 20px', background: WIN_BG,
                color: '#000', cursor: 'default',
              }}
            >
              View Portfolio →
            </button>
          </div>
        </div>
      </div>
    )
  }

  function RecycleBinContent() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <MenuBar items={['File', 'Edit', 'View', 'Help']} />
        <div style={{
          flex: 1, background: '#fff', padding: '40px 20px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          border: '2px inset #808080',
        }}>
          <div style={{ fontSize: '48px', marginBottom: 16 }}>🗑️</div>
          <div style={{ fontFamily: FONT, fontSize: '12px', color: '#444', textAlign: 'center' }}>
            The Recycle Bin is empty.<br /><br />
            <span style={{ color: '#888' }}>All old design iterations have been<br />thoughtfully discarded.</span>
          </div>
        </div>
      </div>
    )
  }

  // Desktop icon
  function DesktopIcon({
    icon, label, id, onDoubleClick
  }: {
    icon: string; label: string; id: string; onDoubleClick: () => void
  }) {
    const selected = iconSelected === id
    return (
      <div
        onMouseDown={() => setIconSelected(id)}
        onDoubleClick={() => { setIconSelected(null); onDoubleClick() }}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 4, padding: '6px 4px', cursor: 'default',
          width: 72, userSelect: 'none',
        }}
      >
        <div style={{
          fontSize: '32px', lineHeight: 1,
          filter: selected ? 'brightness(0.7) sepia(1) hue-rotate(180deg)' : 'none',
        }}>{icon}</div>
        <span style={{
          fontFamily: FONT, fontSize: '11px', color: '#fff',
          textAlign: 'center', lineHeight: 1.3,
          padding: '1px 3px',
          background: selected ? '#000080' : 'transparent',
          outline: selected ? '1px dotted #fff' : 'none',
          textShadow: selected ? 'none' : '1px 1px 1px #000, 0 0 4px #000',
          maxWidth: 70, wordBreak: 'break-word',
        }}>{label}</span>
      </div>
    )
  }

  return (
    <div
      style={{
        width: '100vw', height: '100vh', overflow: 'hidden',
        background: DESKTOP_BG,
        fontFamily: FONT,
        position: 'relative',
      }}
      onClick={() => { if (showStart) setShowStart(false); setIconSelected(null) }}
    >
      <style>{`
        * { cursor: default !important; }
        ::-webkit-scrollbar { width: 16px; }
        ::-webkit-scrollbar-track { background: #d4d0c8; border-left: 1px solid #808080; }
        ::-webkit-scrollbar-thumb { background: #d4d0c8; border-top: 2px solid #fff; border-left: 2px solid #fff; border-bottom: 2px solid #808080; border-right: 2px solid #808080; }
      `}</style>

      {/* Desktop icons — left column */}
      <div
        style={{
          position: 'absolute', top: 16, left: 16,
          display: 'flex', flexDirection: 'column', gap: 8,
        }}
        onClick={e => e.stopPropagation()}
      >
        <DesktopIcon
          icon="🖥️" label="Design A" id="design-a"
          onDoubleClick={() => openOrFocus('design-a', 'Design A — The List [Internet Explorer]', 860, 560, 80, 40)}
        />
        <DesktopIcon
          icon="🖼️" label="Design C" id="design-c"
          onDoubleClick={() => openOrFocus('design-c', 'Design C — The Carousel [Internet Explorer]', 860, 560, 120, 60)}
        />
        <DesktopIcon
          icon="🎨" label="Design E" id="design-e"
          onDoubleClick={() => openOrFocus('design-e', 'Design E — Experiment Space [Internet Explorer]', 900, 580, 160, 80)}
        />
        <DesktopIcon
          icon="📝" label="README.txt" id="notepad"
          onDoubleClick={() => openOrFocus('notepad', 'README.txt - Notepad', 520, 380, 280, 60)}
        />
        <DesktopIcon
          icon="🌿" label="dr Berendje" id="about"
          onDoubleClick={() => openOrFocus('about', 'dr Berendje — About', 360, 340, 340, 120)}
        />
        <DesktopIcon
          icon="🗑️" label="Recycle Bin" id="recyclebin"
          onDoubleClick={() => openOrFocus('recyclebin', 'Recycle Bin', 420, 300, 400, 140)}
        />
      </div>

      {/* Windows */}
      {windows.map(win => !win.minimized && (
        <WinFrame key={win.id} win={win} />
      ))}

      {/* Start menu popup */}
      {showStart && (
        <div
          style={{
            position: 'fixed', bottom: 28, left: 0,
            width: 200,
            ...BORDER_RAISED,
            background: WIN_BG,
            zIndex: 99999,
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Side banner */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 22,
            background: 'linear-gradient(to top, #000080, #1084D0)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            padding: '8px 0',
          }}>
            <span style={{
              fontFamily: FONT, fontSize: '10px', color: '#fff',
              writingMode: 'vertical-rl', transform: 'rotate(180deg)',
              letterSpacing: '0.1em', fontWeight: 700,
            }}>dr Berendje</span>
          </div>
          <div style={{ marginLeft: 22 }}>
            {[
              { label: '🖥️  Design A', action: () => openOrFocus('design-a', 'Design A — The List [Internet Explorer]', 860, 560, 80, 40) },
              { label: '🖼️  Design C', action: () => openOrFocus('design-c', 'Design C — The Carousel [Internet Explorer]', 860, 560, 120, 60) },
              { label: '🎨  Design E', action: () => openOrFocus('design-e', 'Design E — Experiment Space [Internet Explorer]', 900, 580, 160, 80) },
              { label: '📝  README.txt', action: () => openOrFocus('notepad', 'README.txt - Notepad', 520, 380, 280, 60) },
              { label: '🌿  About', action: () => openOrFocus('about', 'dr Berendje — About', 360, 340, 340, 120) },
            ].map(item => (
              <div
                key={item.label}
                onClick={item.action}
                style={{
                  padding: '7px 16px', fontFamily: FONT, fontSize: '12px',
                  color: '#000', cursor: 'default', borderBottom: '1px solid #d4d0c8',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#000080', e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent', e.currentTarget.style.color = '#000')}
              >
                {item.label}
              </div>
            ))}
            <div style={{ borderTop: '1px solid #808080', borderBottom: '1px solid #fff', margin: '4px 0' }} />
            <div
              style={{ padding: '7px 16px', fontFamily: FONT, fontSize: '12px', color: '#000', cursor: 'default' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#000080', e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent', e.currentTarget.style.color = '#000')}
            >
              🔌  Shut Down…
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        height: 28, background: WIN_BG,
        borderTop: '2px solid #ffffff',
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '0 2px', zIndex: 9000,
      }}>
        {/* Start button */}
        <button
          onClick={e => { e.stopPropagation(); setShowStart(s => !s) }}
          style={{
            ...(showStart ? BTN_SUNKEN : BTN_RAISED),
            fontFamily: FONT, fontSize: '12px', fontWeight: 700,
            padding: '2px 8px', background: WIN_BG, color: '#000',
            display: 'flex', alignItems: 'center', gap: 4, cursor: 'default',
            height: 22, flexShrink: 0,
          }}
        >
          <span style={{ fontSize: '14px' }}>⊞</span> Start
        </button>

        {/* Separator */}
        <div style={{ width: 1, height: 20, background: '#808080', marginRight: 2 }} />
        <div style={{ width: 1, height: 20, background: '#fff', marginRight: 4 }} />

        {/* Open window buttons */}
        {windows.map(win => (
          <button
            key={win.id}
            onClick={() => taskbarClick(win.id)}
            style={{
              ...(activeWin === win.id && !win.minimized ? BTN_SUNKEN : BTN_RAISED),
              fontFamily: FONT, fontSize: '12px',
              padding: '2px 10px', background: WIN_BG, color: '#000',
              maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis',
              whiteSpace: 'nowrap', cursor: 'default', height: 22,
            }}
          >
            {win.id === 'notepad' ? '📝 ' :
             win.id === 'design-a' ? '🖥️ ' :
             win.id === 'design-c' ? '🖼️ ' :
             win.id === 'design-e' ? '🎨 ' :
             win.id === 'about' ? '🌿 ' : '🗑️ '}
            {win.title.split(' — ')[0].split(' - ')[0]}
          </button>
        ))}

        {/* Clock */}
        <div style={{
          ...BTN_SUNKEN,
          marginLeft: 'auto',
          padding: '2px 8px',
          fontFamily: FONT, fontSize: '12px', color: '#000',
          height: 22, display: 'flex', alignItems: 'center',
          flexShrink: 0,
        }}>
          {clock}
        </div>
      </div>
    </div>
  )
}
