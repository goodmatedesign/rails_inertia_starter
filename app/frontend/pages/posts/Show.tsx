import { Head } from '@inertiajs/react'
import { Layout } from '@/components/layout'
import { BlogPost, type BlogPostData } from '@/components/blog-post'
import type { SharedProps } from '@/types'

type Props = SharedProps & {
  post: BlogPostData
}

export default function PostShow({ post }: Props) {
  return (
    <Layout>
      <Head title={post.title} />
      <BlogPost post={post} />
    </Layout>
  )
}
