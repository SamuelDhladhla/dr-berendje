import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
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
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CustomCursor />
        <Nav />
        {children}
      </body>
    </html>
  )
}
