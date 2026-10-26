import { RaisedHome } from './raised/raised-home';
import './raised/raised.css';

export default async function Page({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const { view } = await searchParams;
  return <RaisedHome initialView={view} />;
}
