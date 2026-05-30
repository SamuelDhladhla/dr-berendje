'use client'
import { Lens } from '@/types'

interface LensFilterProps {
  active: Lens
  onChange: (lens: Lens) => void
  counts: Record<Lens, number>
}

const lenses: { key: Lens; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'studio', label: 'Studio' },
  { key: 'archive', label: 'Archive' },
  { key: 'gallery', label: 'Gallery' },
]

export default function LensFilter({ active, onChange, counts }: LensFilterProps) {
  return (
    <div className="flex items-center gap-6">
      {lenses.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`lens-btn ${active === key ? 'active' : ''}`}
        >
          <span>{label}</span>
          <span
            style={{
              marginLeft: '4px',
              color: active === key ? '#F5FF00' : '#444',
              fontSize: '10px',
            }}
          >
            ({counts[key]})
          </span>
        </button>
      ))}
    </div>
  )
}
