import { Head, Link } from '@inertiajs/react'
import { BlogPost, type BlogPostData } from '@/components/blog-post'
import type { SharedProps } from '@/types'

type Props = SharedProps & {
  post: BlogPostData
}

export default function PostShow({ post }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Head title={post.title} />

      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">SaaS Starter</Link>
          <nav>
            <Link href="/posts" className="text-sm font-medium">Posts</Link>
          </nav>
        </div>
      </header>

      <BlogPost post={post} />
    </div>
  )
}
