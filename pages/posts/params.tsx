import { useRouter } from 'next/dist/client/router';
import React from 'react';

export interface ParamsPageProps {
}

export default function ParamsPage (props: ParamsPageProps) {

  const router = useRouter();

  return (
    <div>
      <h1>ParamsPage</h1>
      <p>{JSON.stringify(router.query)}</p>
    </div>
  );
}
