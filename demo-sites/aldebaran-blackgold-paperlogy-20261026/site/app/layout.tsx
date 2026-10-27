import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AURORA · GoldFlow · Paperlogy',
  description: 'Figma 1303:11608 로컬 디자인 미리보기',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
