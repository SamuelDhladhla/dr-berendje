'use client'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import HoverList from '@/components/HoverList'
import { WRITING } from '@/data/sections'

export default function WritingPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <SiteHeader active="/writing" />
      <HoverList items={WRITING} titleSize="clamp(40px, 5.5vw, 92px)" showBackgroundImage />
      <SiteFooter />
    </main>
  )
}
