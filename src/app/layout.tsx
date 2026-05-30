import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'dr. Berendje — Studio / Archive / Gallery',
  description: 'doc. Berendje — Design researcher, Linda Valkeman. Material, Environmental & Social Healing. Broken Can Be Fixed.',
  openGraph: {
    title: 'dr. Berendje',
    description: 'Material, Environmental & Social Healing. In no particular order.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap"
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
