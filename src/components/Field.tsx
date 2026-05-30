'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Project, Lens } from '@/types'
import { getFieldPosition } from '@/hooks/useFieldPositions'
import FieldItem from './FieldItem'
import LensFilter from './LensFilter'

interface FieldProps {
  projects: Project[]
}

export default function Field({ projects }: FieldProps) {
  const [activeLens, setActiveLens] = useState<Lens>('all')
  const [loaded, setLoaded] = useState(false)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const fieldRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(t)
  }, [])

  // Subtle parallax on mouse move
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy
      setParallax({ x: dx * -8, y: dy * -8 })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  const filtered = useMemo(() => {
    if (activeLens === 'all') return projects
    return projects.filter((p) => p.category === activeLens)
  }, [projects, activeLens])

  const counts = useMemo(() => ({
    all: projects.length,
    studio: projects.filter((p) => p.category === 'studio').length,
    archive: projects.filter((p) => p.category === 'archive').length,
    gallery: projects.filter((p) => p.category === 'gallery').length,
  }), [projects])

  const positions = useMemo(() => {
    return filtered.map((_, i) => getFieldPosition(i, filtered.length))
  }, [filtered])

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Lens filter — fixed top bar */}
      <div
        style={{
          position: 'fixed',
          bottom: '28px',
          left: '28px',
          zIndex: 400,
        }}
      >
        <LensFilter active={activeLens} onChange={setActiveLens} counts={counts} />
      </div>

      {/* Bottom right — tagline */}
      <div
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 400,
        }}
      >
        <p
          className="font-mono"
          style={{ fontSize: '10px', color: '#333', letterSpacing: '0.06em' }}
        >
          in no{' '}
          <span style={{ color: '#F5FF00' }}>[particular]</span>{' '}
          order
        </p>
      </div>

      {/* The Field */}
      <motion.div
        ref={fieldRef}
        className="field-container"
        style={{
          minHeight: '220vh',
          x: parallax.x,
          y: parallax.y,
          transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        animate={{ x: parallax.x, y: parallax.y }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <FieldItem
              key={project.slug}
              project={project}
              position={positions[i]}
              index={i}
              visible={loaded}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
