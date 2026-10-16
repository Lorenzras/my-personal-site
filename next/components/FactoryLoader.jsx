'use client';

import dynamic from 'next/dynamic';

const Factory = dynamic(() => import('./Factory'), {
  ssr: false,
  loading: () => <div className="loading">Starting the factory…</div>,
});

export default function FactoryLoader() {
  return <Factory />;
}
