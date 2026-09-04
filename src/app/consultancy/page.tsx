'use client'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import HoverList from '@/components/HoverList'
import Placeholder from '@/components/Placeholder'
import { CONSULTANCY } from '@/data/sections'

export default function ConsultancyPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <SiteHeader active="/consultancy" />

      {/* This section has no layout reference from the client — the pattern here
          is extrapolated from Writing/Education and needs her confirmation. */}
      <div style={{ padding: '40px 40px 0', textAlign: 'center' }}>
        <Placeholder note="layout extrapolated — client gave no reference for this section" />
      </div>

      <HoverList items={CONSULTANCY} titleSize="clamp(40px, 5.5vw, 92px)" />
      <SiteFooter />
    </main>
  )
}
