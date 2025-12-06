import { Head, Link } from '@inertiajs/react'
import { Blog, type BlogPost } from '@/components/blog'
import type { SharedProps } from '@/types'

type Props = SharedProps & {
  posts: BlogPost[]
}

export default function PostsIndex({ posts }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Head title="Posts" />

      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">SaaS Starter</Link>
          <nav>
            <Link href="/posts" className="text-sm font-medium">Posts</Link>
          </nav>
        </div>
      </header>

      <Blog posts={posts} />
    </div>
  )
}
