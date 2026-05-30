'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Project } from '@/types'
import { FieldPosition } from '@/hooks/useFieldPositions'

interface FieldItemProps {
  project: Project
  position: FieldPosition
  index: number
  visible: boolean
}

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

export default function FieldItem({ project, position, index, visible }: FieldItemProps) {
  const hasImage = project.coverImage
  const showImage = seededRandom(index * 3 + 5) > 0.35
  const isLarge = project.fieldSize === 'large'
  const isSmall = project.fieldSize === 'small'

  const width = isLarge ? 260 : isSmall ? 160 : 200

  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      y: 20,
    },
    visible: {
      opacity: visible ? 1 : 0,
      scale: position.scale,
      y: 0,
      rotate: position.rotation,
    },
    hover: {
      scale: (position.scale ?? 1) * 1.04,
      zIndex: 50,
    },
  }

  return (
    <motion.div
      className="field-item"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width,
        zIndex: 10 + index,
      }}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      whileHover="hover"
      variants={variants}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link href={`/project/${project.slug}`} className="block group">
        <div className="field-item-inner" style={{ opacity: visible ? 0.85 : 0 }}>
          {/* Image — shown for most items */}
          {hasImage && showImage && (
            <div
              style={{
                width: '100%',
                height: isLarge ? 200 : isSmall ? 110 : 150,
                overflow: 'hidden',
                marginBottom: '10px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#1a1a1a',
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={project.coverImage}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'grayscale(20%)',
                    transition: 'filter 0.4s ease, transform 0.4s ease',
                  }}
                  onError={(e) => {
                    // Hide image if not found
                    const el = e.currentTarget.parentElement?.parentElement
                    if (el) el.style.display = 'none'
                  }}
                />
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <p
              className="font-serif"
              style={{
                fontSize: isLarge ? '1.1rem' : isSmall ? '0.8rem' : '0.95rem',
                fontStyle: 'italic',
                color: '#F5F2EB',
                lineHeight: 1.2,
                marginBottom: '4px',
              }}
            >
              {project.title}
            </p>

            {project.subtitle && (
              <p
                className="font-mono"
                style={{
                  fontSize: '10px',
                  color: '#F5FF00',
                  letterSpacing: '0.06em',
                  marginBottom: '4px',
                }}
              >
                {project.subtitle}
              </p>
            )}

            <div
              className="font-mono"
              style={{
                fontSize: '10px',
                color: '#555',
                letterSpacing: '0.04em',
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              <span>{project.year}</span>
              <span style={{ color: '#333' }}>—</span>
              <span>{project.location}</span>
            </div>

            {project.status === 'ongoing' || project.status === 'in-progress' ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '6px',
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: '#F5FF00',
                    display: 'inline-block',
                  }}
                />
                <span
                  className="font-mono"
                  style={{ fontSize: '9px', color: '#F5FF00', letterSpacing: '0.08em' }}
                >
                  {project.status === 'in-progress' ? 'In progress' : 'Ongoing'}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
