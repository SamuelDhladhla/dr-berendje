'use client'

interface Props {
  iframeRef?: React.RefObject<HTMLIFrameElement | null>
}

export default function VideoBackground({ iframeRef }: Props) {
  const minH = '100vh'
  const minW = '177.78vh'

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      zIndex: 0,
      background: '#0a0a0a',
    }}>
      <iframe
        ref={iframeRef}
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
