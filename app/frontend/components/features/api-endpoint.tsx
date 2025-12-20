import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Play, Globe, Code } from "lucide-react";
import type { SharedProps } from "@/types";

type Post = {
  id: number;
  title: string;
  slug: string;
  published_at: string;
  author: string;
  description?: string;
};

export default function ApiEndpoint() {
  const { locale } = usePage<SharedProps>().props;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/${locale}/posts.json`);
      const data = await response.json();
      setPosts(data);
      setFetched(true);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-16 text-center">
        <p className="mb-4 text-sm font-medium text-primary uppercase tracking-wider">
          API Ready
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Inertia + JSON API in one controller
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Serve both your web UI and API from the same Rails controller with a simple respond_to block
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                GET
              </Badge>
              <code className="rounded bg-muted px-2 py-1 text-sm font-mono">
                /{locale}/posts.json
              </code>
            </div>
            <p className="text-muted-foreground">
              The same controller action serves both the Inertia page and JSON API.
              Add <code className="rounded bg-muted px-1.5 py-0.5 text-sm">.json</code> to
              any route to get the API response.
            </p>
          </div>

          <Button
            onClick={fetchPosts}
            disabled={loading}
            size="lg"
            className="gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Fetching...
              </>
            ) : (
              <>
                <Play className="size-4" />
                Fetch Posts
              </>
            )}
          </Button>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Globe className="size-4" />
              <span>Same controller</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Code className="size-4" />
              <span>respond_to block</span>
            </div>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Response</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <pre className="max-h-80 overflow-auto p-4 text-sm">
              <code className="text-muted-foreground">
                {fetched ? (
                  JSON.stringify(posts, null, 2)
                ) : (
                  <span className="italic">Click "Fetch Posts" to see the API response</span>
                )}
              </code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
