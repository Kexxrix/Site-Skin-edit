import type { Metadata } from 'next';
import './typography.css';
import './globals.css';
import './sirius-sports.css';
import './sirius-white-skin.css';
import './sirius-left-menu.css';
import './sirius-left-refinement.css';
import './sirius-visual-depth.css';
import './sirius-deepblue-skin.css';
import './sirius-right-banners.css';

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
