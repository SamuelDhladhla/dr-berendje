'use client'
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const dot = dotRef.current
    const ring = ringRef.current
    const canvas = canvasRef.current
    if (!dot || !ring || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100

    // Thread trail — array of points
    const trail: { x: number; y: number }[] = []
    const MAX_TRAIL = 80

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      trail.push({ x: mouseX, y: mouseY })
      if (trail.length > MAX_TRAIL) trail.shift()
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)

    let frame: number

    const animate = () => {
      // Smooth ring follows mouse
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12

      if (dot) {
        dot.style.left = `${mouseX}px`
        dot.style.top = `${mouseY}px`
      }
      if (ring) {
        ring.style.left = `${ringX}px`
        ring.style.top = `${ringY}px`
      }

      // Draw thread
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (trail.length > 2) {
        ctx.beginPath()
        ctx.moveTo(trail[0].x, trail[0].y)

        for (let i = 1; i < trail.length - 1; i++) {
          const mx = (trail[i].x + trail[i + 1].x) / 2
          const my = (trail[i].y + trail[i + 1].y) / 2
          ctx.quadraticCurveTo(trail[i].x, trail[i].y, mx, my)
        }

        // Gradient along trail
        const grad = ctx.createLinearGradient(
          trail[0].x, trail[0].y,
          trail[trail.length - 1].x, trail[trail.length - 1].y
        )
        grad.addColorStop(0, 'rgba(245,255,0,0)')
        grad.addColorStop(0.6, 'rgba(245,255,0,0.15)')
        grad.addColorStop(1, 'rgba(245,255,0,0.5)')

        ctx.strokeStyle = grad
        ctx.lineWidth = 1
        ctx.lineCap = 'round'
        ctx.stroke()
      }

      frame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frame)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      <canvas id="thread-canvas" ref={canvasRef} />
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}
