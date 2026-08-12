'use client'

export default function VideoBackground() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      zIndex: 0,
      background: '#0a0a0a',
    }}>
      {/*
        Vimeo background embed:
        background=1 → no controls, no title, no byline, autoplay, loop, muted
        The iframe is sized to always cover the viewport (object-fit: cover equivalent)
        width = 100vw, height = 56.25vw (16:9)
        minHeight = 100vh forces full coverage when viewport is portrait
        minWidth = 177.78vh covers the horizontal axis when viewport is tall
      */}
      <iframe
        src="https://player.vimeo.com/video/472121042?background=1&autoplay=1&loop=1&muted=1"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '56.25vw',
          minHeight: '100vh',
          minWidth: '177.78vh',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          pointerEvents: 'none',
        }}
        allow="autoplay; fullscreen; picture-in-picture"
        title="dr Berendje — background film"
      />
      {/* Subtle dark overlay — keeps corner text legible over any frame */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.28)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
