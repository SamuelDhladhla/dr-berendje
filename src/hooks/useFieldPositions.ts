'use client'

// Seeded pseudo-random — same output every call for same seed
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

export interface FieldPosition {
  x: number   // % from left
  y: number   // % from top
  rotation: number
  scale: number
}

export function getFieldPosition(index: number, total: number): FieldPosition {
  const s = index * 7 + 13

  // Distribute across the field in a loose grid with randomness
  const col = index % 4
  const row = Math.floor(index / 4)
  const cols = 4
  const rows = Math.ceil(total / 4)

  const baseX = (col / cols) * 80 + 5
  const baseY = (row / rows) * 80 + 5

  const offsetX = (seededRandom(s) - 0.5) * 18
  const offsetY = (seededRandom(s + 1) - 0.5) * 18
  const rotation = (seededRandom(s + 2) - 0.5) * 3

  return {
    x: Math.max(2, Math.min(88, baseX + offsetX)),
    y: Math.max(2, Math.min(85, baseY + offsetY)),
    rotation,
    scale: 0.95 + seededRandom(s + 3) * 0.1,
  }
}
