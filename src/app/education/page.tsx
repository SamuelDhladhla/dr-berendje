'use client'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import HoverList from '@/components/HoverList'
import { EDUCATION } from '@/data/sections'

export default function EducationPage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <SiteHeader active="/education" />
      <HoverList items={EDUCATION} titleSize="clamp(40px, 5.5vw, 92px)" showBackgroundImage />
      <SiteFooter />
    </main>
  )
}
