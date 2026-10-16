import FactoryLoader from '@/components/FactoryLoader';
import { profile } from '@/content/site';

export default function Home() {
  return (
    <>
      {/* Plain-text fallback for crawlers and no-JS visitors */}
      <noscript>
        <h1>{profile.name}</h1>
        <p>{profile.role}. {profile.intro}</p>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </noscript>
      <FactoryLoader />
    </>
  );
}
