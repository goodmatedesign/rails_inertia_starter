import { Head, Link } from '@inertiajs/react'
import type { SharedProps } from '@/types'

type Post = {
  id: number
  title: string
  slug: string
  published_at: string
  author: string
}

type Props = SharedProps & {
  posts: Post[]
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

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Posts</h1>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.id} className="border-b pb-8">
                <Link href={`/posts/${post.slug}`}>
                  <h2 className="text-2xl font-semibold hover:underline">{post.title}</h2>
                </Link>
                <p className="text-sm text-muted-foreground mt-2">
                  By {post.author} on {new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
