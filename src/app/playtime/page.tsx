import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { INSTAGRAM_URL } from '@/data/site'

/*
  Playtime by B — a heading and a link to Instagram, nothing else.

  The three print and textile items that were listed here have been removed at
  the client's request; the work lives on Instagram. The nav label stays
  "PLAYTIME".
*/

export default function PlaytimePage() {
  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <SiteHeader active="/playtime" />

      <div style={{ padding: '96px 40px 160px' }}>
        <h1 style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(44px, 5.8vw, 80px)',
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: '#000',
          margin: 0,
        }}>
          Playtime by B
        </h1>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            marginTop: 32,
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: '#000',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
          }}
        >
          Instagram
        </a>
      </div>

      <SiteFooter />
    </main>
  )
}
