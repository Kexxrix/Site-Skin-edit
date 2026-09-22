import type { Metadata } from 'next';
import './typography.css';
import './globals.css';
import './aldebaran.tokens.css';
import './aldebaran.surfaces.css';
import './aldebaran-wog-r5.css';

export const metadata: Metadata = {
  title: 'ALDEBARAN · 스포츠',
  description: 'ALDEBARAN 스포츠',
  icons: { icon: '/assets/branding/aldebaran-emblem.png' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/aqm4sxy.css" />
      </head>
      <body className="aldebaran-site">{children}</body>
    </html>
  );
}
