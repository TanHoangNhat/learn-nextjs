import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

export interface PostPageProps {
  post: any
}

export default function PostDetailPage({ post }: PostPageProps) {
  const router = useRouter()

  if (!post) return null

  return (
    <div>
      <h1>PostDetailPage</h1>
      <p>{post.title}</p>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // console.log('\ngetStaticPaths')
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
  const data = await response.json()
  data.data.map((post: any) => ({ params: { postId: post.id } }))
  return {
    paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async (
  context: GetStaticPropsContext
) => {
  // console.log('\ngetStaticProps', context.params?.postId)
  const postId = context.params?.postId
  if (!postId) return { notFound: true }
  // run on server-side
  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
  const data = await response.json()

  return {
    props: {
      post: data,
    },
  }
}
