import type { Metadata } from 'next';
import './typography.css';
import './globals.css';
import './match-list.css';
import './sirius-left-rail.css';
import './sirius-right-rail.css';

export const metadata: Metadata = {
  title: 'SIRIUS · 스포츠',
  description: 'SIRIUS 스포츠 — 종목과 리그별 경기 일정, 대진, 배당을 확인하세요.',
  icons: { icon: '/branding/sirius-symbol.png' },
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
