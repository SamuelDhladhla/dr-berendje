import type { Metadata } from 'next'
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

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@700&family=Syne:wght@700;800&family=Courier+Prime:ital,wght@0,700;1,400&family=DM+Sans:wght@700&family=Libre+Baskerville:ital,wght@0,700;1,700&family=Archivo+Black&family=IBM+Plex+Sans:wght@700&family=EB+Garamond:ital,wght@0,400;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Big+Shoulders+Display:wght@800;900&family=Jost:wght@400;700&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face {
            font-family: 'Suisse Intl';
            src: url('${BASE}/fonts/suisse-intl.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Suisse Intl';
            src: url('${BASE}/fonts/suisse-intl-medium.woff2') format('woff2');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Or Type';
            src: url('${BASE}/fonts/ortype-display.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Sabon';
            src: url('${BASE}/fonts/sabon.woff2') format('woff2');
            font-weight: 400;
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
