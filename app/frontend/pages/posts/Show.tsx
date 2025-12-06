import { Head, Link } from '@inertiajs/react'
import type { SharedProps } from '@/types'

type Post = {
  id: number
  title: string
  slug: string
  published_at: string
  author: string
  content_html: string
}

type Props = SharedProps & {
  post: Post
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

      <main className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          <Link href="/posts" className="text-sm text-muted-foreground hover:underline mb-4 inline-block">
            &larr; Back to Posts
          </Link>

          <h1 className="text-4xl font-bold mt-4">{post.title}</h1>

          <p className="text-sm text-muted-foreground mt-4">
            By {post.author} on {new Date(post.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>

          <div
            className="prose prose-neutral dark:prose-invert max-w-none mt-8"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        </article>
      </main>
    </div>
  )
}
