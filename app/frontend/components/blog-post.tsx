import { Link, usePage } from "@inertiajs/react";
import { ArrowLeftIcon } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import type { SharedProps } from "@/types";

import { Button } from "@/components/ui/button";
import { placeholderImage } from "@/components/blog";

export type BlogPostData = {
  id: number;
  title: string;
  slug: string;
  published_at: string;
  author: string;
  content_html: string;
  description?: string;
  image?: string;
};

type BlogPostProps = {
  post: BlogPostData;
};

const BlogPost = ({ post }: BlogPostProps) => {
  const { t } = useI18n();
  const { locale } = usePage<SharedProps>().props;

  return (
    <article className="bg-background py-16">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground inline-flex items-center justify-center gap-2 px-0 mb-8 transition-all ease-in-out hover:gap-3"
          asChild
        >
          <Link href={`/${locale}/posts`}>
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="text-sm font-medium">{t("posts.back_to_posts")}</span>
          </Link>
        </Button>

        <div className="max-w-4xl">
          <h1 className="text-foreground font-sans text-4xl font-extrabold tracking-tight md:text-6xl">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mt-6">
            <p className="text-muted-foreground text-sm font-semibold uppercase tracking-widest">
              {post.published_at}
            </p>
            <span className="text-muted-foreground">·</span>
            <p className="text-muted-foreground text-sm">By {post.author}</p>
          </div>

          {post.description && (
            <p className="text-muted-foreground text-xl leading-relaxed mt-6">
              {post.description}
            </p>
          )}
        </div>

        <div className="bg-muted flex h-96 w-full items-center justify-center overflow-hidden rounded-3xl mt-12">
          <img
            src={post.image || placeholderImage}
            className="h-full w-full object-cover"
            alt={post.title}
          />
        </div>

        <div
          className="prose prose-neutral dark:prose-invert prose-lg max-w-4xl mt-12 prose-headings:font-extrabold prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />
      </div>
    </article>
  );
};

export { BlogPost };
