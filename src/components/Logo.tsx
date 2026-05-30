'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'lg'
  animate?: boolean
}

export default function Logo({ size = 'sm', animate = false }: LogoProps) {
  const isLarge = size === 'lg'

  if (animate) {
    return (
      <motion.div
        className="flex items-baseline gap-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="font-mono"
          style={{ fontSize: isLarge ? '4rem' : '1rem', color: '#F5F2EB', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          dr
        </motion.span>
        <motion.span
          style={{ color: '#F5FF00', fontSize: isLarge ? '4rem' : '1rem', fontFamily: 'DM Mono, monospace' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.3, type: 'spring' }}
        >
          .
        </motion.span>
        <motion.span
          className="font-serif"
          style={{
            fontSize: isLarge ? '4rem' : '1rem',
            color: '#F5F2EB',
            fontStyle: 'italic',
            letterSpacing: '-0.01em',
          }}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          Berendje
        </motion.span>
      </motion.div>
    )
  }

  return (
    <Link href="/" className="flex items-baseline gap-0 group">
      <span
        className="font-mono transition-colors duration-200"
        style={{ fontSize: isLarge ? '3rem' : '0.875rem', color: '#F5F2EB', letterSpacing: '-0.02em' }}
      >
        dr
      </span>
      <span
        style={{
          color: '#F5FF00',
          fontSize: isLarge ? '3rem' : '0.875rem',
          fontFamily: 'DM Mono, monospace',
          transition: 'transform 0.2s ease',
        }}
      >
        .
      </span>
      <span
        className="font-serif"
        style={{
          fontSize: isLarge ? '3rem' : '0.875rem',
          color: '#F5F2EB',
          fontStyle: 'italic',
          letterSpacing: '-0.01em',
        }}
      >
        Berendje
      </span>
    </Link>
  )
}
