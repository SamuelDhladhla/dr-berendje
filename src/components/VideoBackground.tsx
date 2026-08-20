'use client'

interface Props {
  inset?: boolean
}

export default function VideoBackground({ inset = false }: Props) {
  // When inset (variant B), video fills an 84vh container (100vh minus 2×8vh bars)
  const minH = inset ? '84vh' : '100vh'
  const minW = inset ? '149.33vh' : '177.78vh'

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      zIndex: 0,
      background: '#0a0a0a',
    }}>
      <iframe
        src="https://player.vimeo.com/video/472121042?background=1&autoplay=1&loop=1&muted=1"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '56.25vw',
          minHeight: minH,
          minWidth: minW,
          transform: 'translate(-50%, -50%)',
          border: 'none',
          pointerEvents: 'none',
        }}
        allow="autoplay; fullscreen; picture-in-picture"
        title="dr Berendje — background film"
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.28)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}
