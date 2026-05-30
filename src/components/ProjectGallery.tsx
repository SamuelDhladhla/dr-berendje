'use client'
import { useRef, useState } from 'react'

interface ProjectGalleryProps {
  images: string[]
  title: string
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX)
    setScrollStart(trackRef.current?.scrollLeft ?? 0)
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return
    const dx = e.pageX - startX
    trackRef.current.scrollLeft = scrollStart - dx
  }

  const onMouseUp = () => setIsDragging(false)

  // Filter to only valid image paths (skip placeholder paths)
  const validImages = images.filter((img) => img && !img.includes('placeholder'))

  if (validImages.length === 0) {
    return (
      <div
        style={{
          width: '100%',
          height: '60vh',
          background: '#111',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p className="font-mono" style={{ color: '#333', fontSize: '11px', letterSpacing: '0.08em' }}>
          [ images forthcoming ]
        </p>
      </div>
    )
  }

  return (
    <div
      className="project-gallery-track"
      ref={trackRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{ height: '65vh' }}
    >
      {validImages.map((src, i) => (
        <div
          key={i}
          style={{
            flexShrink: 0,
            height: '100%',
            width: 'auto',
            aspectRatio: '3/4',
            position: 'relative',
            background: '#111',
          }}
        >
          <img
            src={src}
            alt={`${title} — ${i + 1}`}
            draggable={false}
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              display: 'block',
              userSelect: 'none',
            }}
            onError={(e) => {
              const el = e.currentTarget.parentElement
              if (el) {
                el.style.background = '#0f0f0f'
                e.currentTarget.style.display = 'none'
              }
            }}
          />
        </div>
      ))}

      {/* Drag hint */}
      <div
        style={{
          flexShrink: 0,
          height: '100%',
          width: '120px',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: '24px',
          paddingLeft: '24px',
        }}
      >
        <p className="font-mono" style={{ fontSize: '10px', color: '#333', letterSpacing: '0.06em' }}>
          drag →
        </p>
      </div>
    </div>
  )
}
