'use client'
import { useState } from 'react'
import Link from 'next/link'
import SiteHeader, { navText } from '@/components/SiteHeader'
import ImageSlot from '@/components/ImageSlot'
import SiteFooter from '@/components/SiteFooter'
import HoverList, { type HoverListItem } from '@/components/HoverList'
import Placeholder from '@/components/Placeholder'
import { getOrderedProjects, PROJECT_META } from '@/data/projects'


export default function ArchivePage() {
  const [view, setView] = useState<'list' | 'grid'>('list')

  const ordered = getOrderedProjects()

  const items: HoverListItem[] = ordered.map(p => ({
    key: p.slug,
    title: p.title,
    href: `/archive/${p.slug}`,
    category: PROJECT_META[p.slug]?.category,
    description: p.excerpt || undefined,
    descriptionMissing: p.contentStatus === 'placeholder',
    date: p.year,
    image: p.coverImage || undefined,
    titleFont: p.titleFont,
  }))

  const toggle = (label: string, on: boolean, fn: () => void) => (
    <button onClick={fn} style={{
      ...navText,
      background: 'none', border: 'none', padding: 0,
      opacity: on ? 1 : 0.35,
      borderBottom: on ? '1px solid #000' : '1px solid transparent', paddingBottom: 1,
    }}>{label}</button>
  )

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <SiteHeader
        active="/archive"
        right={
          <>
            {toggle('List', view === 'list', () => setView('list'))}
            <span style={{ opacity: 0.2, fontSize: 12 }}>/</span>
            {toggle('Grid', view === 'grid', () => setView('grid'))}
          </>
        }
      />

      {/* ══ LIST — centred, everything revealed beneath the title on hover ══ */}
      {view === 'list' && <HoverList items={items} showHoverImage />}

      {/* ══ GRID — contain, not crop. Always full colour. Okra-scale white space. ══ */}
      {view === 'grid' && (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            columnGap: '96px',
            rowGap: '140px',
            padding: '120px 80px 80px',
            maxWidth: 1600,
            margin: '0 auto',
          }}>
            {ordered.map(p => (
              <Link key={p.slug} href={`/archive/${p.slug}`} className="gi"
                style={{ display: 'block', textDecoration: 'none' }}>
                {/* Sized container, image contained inside it — portrait and
                    landscape both sit whole, neither is cropped to fill. */}
                <div style={{
                  width: '100%',
                  height: 420,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  marginBottom: 24,
                }}>
                  <ImageSlot
                    src={p.coverImage}
                    alt={p.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: p.coverImage ? 'auto' : '100%',
                      height: p.coverImage ? 'auto' : '100%',
                      objectFit: 'contain',
                      }}
                  />
                </div>
                <p style={{
                  fontFamily: p.titleFont?.family ?? 'var(--font-body)',
                  fontWeight: p.titleFont?.weight ?? 400,
                  fontStyle: p.titleFont?.style ?? 'normal',
                  fontSize: '21px', color: '#000', lineHeight: 1.25, marginBottom: 7,
                }}>
                  {p.title}
                </p>
                {/* Caption: title, medium, year — italic Sabon.
                    Sizing is a judgement call; exact scale still pending the
                    client's A4 Arts reference. */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'italic',
                  fontSize: '15px',
                  color: '#000',
                  opacity: 0.55,
                  lineHeight: 1.5,
                  marginBottom: 8,
                }}>
                  {p.title}, {PROJECT_META[p.slug]?.category}, {p.year}
                </p>
                {/* Subline — same source as the List page's subline. */}
                {p.contentStatus === 'placeholder' ? (
                  <Placeholder note="subline" />
                ) : p.excerpt ? (
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: '#000',
                    opacity: 0.75,
                    lineHeight: 1.6,
                    maxWidth: 460,
                  }}>
                    {p.excerpt}
                  </p>
                ) : null}
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Content status note — visible while any project lacks client copy */}
      {ordered.some(p => p.contentStatus === 'placeholder') && (
        <div style={{ padding: '0 40px 40px', textAlign: 'center' }}>
          <Placeholder note={`${ordered.filter(p => p.contentStatus === 'placeholder').length} of ${ordered.length} projects have no client-supplied description`} />
        </div>
      )}

      <SiteFooter />
    </main>
  )
}
