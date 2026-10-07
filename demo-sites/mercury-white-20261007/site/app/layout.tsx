import type { Metadata } from 'next';
import './typography.css';
import './globals.css';
import './mercury-sports.css';
import './mercury-white-theme.css';
import './mercury-white.css';

export const metadata: Metadata = {
  title: 'MERCURY · 화이트',
  description: 'MERCURY 스포츠 — 종목과 리그별 경기 일정, 대진, 배당을 확인하세요.',
  icons: { icon: '/favicon.svg' },
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
      <body>{children}</body>
    </html>
  );
}
