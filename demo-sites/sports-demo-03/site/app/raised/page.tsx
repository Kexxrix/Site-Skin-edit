import type { Metadata } from 'next';
import { RaisedHome } from './raised-home';
import './raised.css';

export const metadata: Metadata = {
  title: 'ALDEBARAN · Gold Flow',
  description: 'ALDEBARAN 블랙·화이트 및 영상 로비',
};

export default async function RaisedPage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const { view } = await searchParams;
  return <RaisedHome initialView={view} />;
}
