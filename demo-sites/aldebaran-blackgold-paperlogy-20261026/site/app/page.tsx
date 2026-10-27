import { redirect } from 'next/navigation';

export default async function Page({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const { view } = await searchParams;
  const page = view === 'white' || view === 'black-video' || view === 'white-video' ? view : 'black';
  redirect(`/${page}`);
}
