import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'dr Berendje — Studio / Archive / Gallery',
  description: 'dr Berendje — Design researcher, Linda Valkeman. Material, Environmental & Social Healing.',
  openGraph: {
    title: 'dr Berendje',
    description: 'Broken Can Be Fixed — Material, Environmental & Social Healing.',
    type: 'website',
  },
}

// ── UI face: Inter. 400 + 500 for body/nav, 700 for the Variant B display list
//    (spec'd font-weight:700 — without a real cut the browser fakes it). ──
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ui',
  display: 'swap',
})

// ── Landing Variant D index face. preload:false so the woff2 is only fetched
//    when something actually renders in it — never on variants a/b/c. ──
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-serif-d',
  display: 'swap',
  preload: false,
})

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Per-project display faces for the archive. EB Garamond and Cormorant
            Garamond are no longer sourced here — Cormorant comes from next/font. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@700&family=Syne:wght@700;800&family=Courier+Prime:ital,wght@0,700;1,400&family=DM+Sans:wght@700&family=Libre+Baskerville:ital,wght@0,700;1,700&family=Archivo+Black&family=IBM+Plex+Sans:wght@700&family=Big+Shoulders+Display:wght@800;900&family=Jost:wght@400;700&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
        {/* Linda — client-licensed Or Type display cut. Wordmark only. */}
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: 'Linda';
            src: url('${BASE}/fonts/linda-bold.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
        ` }} />
      </head>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
