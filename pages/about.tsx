import Header from '@/components/common/header'
import { useRouter } from 'next/dist/client/router'
import React, { useState, useEffect } from 'react'
// import dynamic from 'next/dynamic'

// const Header = dynamic(() => import('@/components/common/header'), { ssr: true })

export interface AboutProps {}

export default function About(props: AboutProps) {
  const router = useRouter()

  const [postList, setPostList] = useState([])
  const page = router.query?.page
  useEffect(() => {
    if (!page) return
    ;(async () => {
      const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`)
      const data = await response.json()
      setPostList(data.data)
    })()
  }, [page])

  function handleNextClick() {
    router.push(
      {
        pathname: '/about',
        query: {
          page: (Number(page) || 1) + 1,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  return (
    <div>
      <h1>About</h1>

      <Header />

      <ul>
        {postList.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <button onClick={handleNextClick}>Next Page</button>
    </div>
  )
}
