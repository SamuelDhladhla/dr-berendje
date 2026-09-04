'use client'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import HoverList from '@/components/HoverList'
import Placeholder from '@/components/Placeholder'
import { PLAYTIME, INSTAGRAM_URL } from '@/data/sections'

export default function PlaytimePage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <SiteHeader active="/playtime" />

      {/* Client note: "link to instagram for other filtered parts of my practice" */}
      <div style={{ padding: '64px 40px 0', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          fontSize: '17px',
          color: '#000',
          opacity: 0.75,
          marginBottom: 14,
        }}>
          Other filtered parts of the practice live on Instagram
        </p>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#000',
          textDecoration: 'none',
          borderBottom: '1px solid #000',
          paddingBottom: 2,
        }}>
          @drberendje →
        </a>
      </div>

      {/* No layout reference from the client for this section either. */}
      <div style={{ padding: '48px 40px 0', textAlign: 'center' }}>
        <Placeholder note="layout extrapolated — client gave no reference for this section" />
      </div>

      <HoverList items={PLAYTIME} titleSize="clamp(40px, 5.5vw, 92px)" showBackgroundImage />
      <SiteFooter />
    </main>
  )
}
