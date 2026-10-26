import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'LUNA · 루나',
  description: 'LUNA 블랙·화이트 및 영상 로비',
  icons: { icon: '/assets/branding/luna-icon.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
