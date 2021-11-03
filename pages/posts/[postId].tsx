import { useRouter } from 'next/dist/client/router';
import React from 'react';

export interface PostDetailPageProps {
}

export default function PostDetailPage (props: PostDetailPageProps) {

  const router = useRouter();

  return (
    <div>
      <h1>PostDetailPage</h1>
      <p>{JSON.stringify(router.query)}</p>
    </div>
  );
}
