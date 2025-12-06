import { Link } from "@inertiajs/react";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  published_at: string;
  author: string;
  description?: string;
  image?: string;
};

type BlogProps = {
  posts: BlogPost[];
  title?: string;
};

const placeholderImage =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80";

const Blog = ({ posts, title = "Discover Our Fresh Content" }: BlogProps) => {
  return (
    <section className="bg-background py-32">
      <div className="container mx-auto px-4">
        <h1 className="text-foreground mb-12 max-w-lg font-sans text-5xl font-extrabold tracking-tight md:text-7xl">
          {title}
        </h1>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <div className="flex flex-col">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="flex flex-col items-center gap-16 md:flex-row"
              >
                <div className="bg-muted md:w-140 flex h-80 w-full items-center justify-center overflow-hidden rounded-3xl">
                  <img
                    src={post.image || placeholderImage}
                    className="h-full w-full object-cover"
                    alt={post.title}
                  />
                </div>
                <Card className="border-none shadow-none">
                  <CardContent className="p-0">
                    <div
                      className={cn(
                        "h-90 mb-5 flex items-start border-b py-10 md:mb-0 lg:gap-32",
                        index === 0 && "md:border-t",
                      )}
                    >
                      <div className="flex h-full w-full flex-col items-start justify-between pr-8">
                        <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground mt-2 text-sm font-semibold uppercase tracking-widest">
                          {post.published_at}
                        </p>
                      </div>
                      <div className="flex h-full w-full flex-col items-start justify-between gap-6">
                        <p className="text-muted-foreground text-lg font-normal leading-relaxed tracking-tight md:text-xl">
                          {post.description || "Read more about this topic..."}
                        </p>
                        <Button
                          variant="ghost"
                          className="text-primary hover:text-accent-foreground inline-flex items-center justify-center gap-4 px-0 transition-all ease-in-out hover:gap-6"
                          asChild
                        >
                          <Link href={`/posts/${post.slug}`}>
                            <span className="text-lg font-semibold tracking-tight">
                              Read
                            </span>
                            <ArrowRightIcon />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export { Blog, placeholderImage };
