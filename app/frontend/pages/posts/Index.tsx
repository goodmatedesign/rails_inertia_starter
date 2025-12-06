import { Head } from '@inertiajs/react'
import { Layout } from '@/components/layout'
import { Blog, type BlogPost } from '@/components/blog'
import type { SharedProps } from '@/types'

type Props = SharedProps & {
  posts: BlogPost[]
}

export default function PostsIndex({ posts }: Props) {
  return (
    <Layout>
      <Head title="Posts" />
      <Blog posts={posts} />
    </Layout>
  )
}
