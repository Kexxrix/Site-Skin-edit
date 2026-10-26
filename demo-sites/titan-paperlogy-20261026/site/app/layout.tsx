import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { paperlogy } from '@/lib/fonts/paperlogy'
import './globals.css'

export const metadata: Metadata = {
  title: 'Titan Solution — B2B 베팅 플랫폼',
  description:
    '자체 개발 스포츠북, 카지노·슬롯, 통합머니·정산, 백오피스를 하나의 체계로 제공하는 B2B 베팅 플랫폼.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`dark ${paperlogy.variable}`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
