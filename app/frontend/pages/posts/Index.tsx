import { Head } from '@inertiajs/react'
import { Layout } from '@/components/layout'
import { Blog, type BlogPost } from '@/components/blog'
import { useI18n } from '@/hooks/use-i18n'
import type { SharedProps } from '@/types'

type Props = SharedProps & {
  posts: BlogPost[]
}

export default function PostsIndex({ posts }: Props) {
  const { t } = useI18n()

  return (
    <Layout>
      <Head title={t("posts.title")} />
      <Blog posts={posts} />
    </Layout>
  )
}
