'use client'
import { useState } from 'react'
import Link from 'next/link'
import SiteHeader, { navText } from '@/components/SiteHeader'
import ImageSlot from '@/components/ImageSlot'
import SiteFooter from '@/components/SiteFooter'
import HoverList, { type HoverListItem } from '@/components/HoverList'
import Placeholder from '@/components/Placeholder'
import { getOrderedProjects, PROJECT_META, formatYears } from '@/data/projects'


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
    date: formatYears(p),
    image: p.coverImage || undefined,
    titleFont: p.titleFont,
  }))

  const toggle = (label: string, on: boolean, fn: () => void) => (
    <button onClick={fn} style={{
      ...navText,
      background: 'none', border: 'none', padding: 0,
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
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#000' }}>/</span>
            {toggle('Grid', view === 'grid', () => setView('grid'))}
          </>
        }
      />

      {/* ══ LIST — centred, everything revealed beneath the title on hover ══ */}
      {view === 'list' && <HoverList items={items} showHoverImage />}

      {/* ══ GRID — contain, not crop. B&W, colour on hover. Okra-scale space. ══ */}
      {view === 'grid' && (
        <>
          {/*
            Greyscale at rest, full colour on hover.

            Scoped to `.gi img` rather than a class on ImageSlot, because
            ImageSlot puts its className on the missing-image placeholder too —
            and greying that out would mute the red marker that exists precisely
            to be noticed. A bare `img` selector can only ever match a real
            photograph.
          */}
          <style>{`
            .gi img { filter: grayscale(100%); transition: filter 600ms ease; }
            .gi:hover img { filter: grayscale(0%); }
          `}</style>
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
                style={{ display: 'block', textDecoration: 'none', textAlign: 'left' }}>
                {/* Image sits flush left in its cell so the caption beneath can
                    line up with the image's own left edge — the images are
                    contained at their natural proportions, so a centred image
                    would leave the caption floating against nothing. */}
                <div style={{
                  width: '100%',
                  height: 420,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginBottom: 10,
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
                {/* Caption block — belongs to the image above it. No margins
                    inside: the white space on this page sits BETWEEN blocks
                    (the grid's row gap), never within one. Sizes are fixed, so
                    they are identical whatever the image's size or shape. */}
                <p style={{
                  fontFamily: p.titleFont?.family ?? 'var(--font-body)',
                  fontWeight: p.titleFont?.weight ?? 400,
                  fontStyle: p.titleFont?.style ?? 'normal',
                  fontSize: '16px', color: '#000', lineHeight: 1.25, margin: 0,
                }}>
                  {p.title}
                </p>
                {/* Category and year. The title is NOT repeated here, and a
                    single-year project shows no dash. */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: '#000',
                  lineHeight: 1.3,
                  margin: '3px 0 0',
                }}>
                  {[PROJECT_META[p.slug]?.category, formatYears(p)].filter(Boolean).join(', ')}
                </p>
                {/* Subline — same source as the List page's subline. */}
                <div style={{ marginTop: 3 }}>
                  {p.contentStatus === 'placeholder' ? (
                    <Placeholder note="subline" />
                  ) : p.excerpt ? (
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: '#000',
                      lineHeight: 1.35,
                      margin: 0,
                    }}>
                      {p.excerpt}
                    </p>
                  ) : null}
                </div>
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
