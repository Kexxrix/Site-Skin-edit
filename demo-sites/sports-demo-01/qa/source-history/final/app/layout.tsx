import type { Metadata } from 'next';
import './typography.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'COBALT · 스포츠 데모 01',
  description: '가상 경기와 배당으로 체험하는 스포츠 디자인 데모. 실제 거래는 제공하지 않습니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
