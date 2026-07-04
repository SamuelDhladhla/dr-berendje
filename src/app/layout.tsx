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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@700&family=Syne:wght@700;800&family=Courier+Prime:ital,wght@0,700;1,400&family=DM+Sans:wght@700&family=Libre+Baskerville:ital,wght@0,700;1,700&family=Playfair+Display:ital,wght@0,700;1,700&family=Archivo+Black&family=Source+Serif+4:ital,opsz,wght@0,8..60,600;1,8..60,600&family=IBM+Plex+Sans:wght@700&family=EB+Garamond:ital,wght@0,400;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
