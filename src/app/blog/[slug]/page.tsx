import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { blogPosts } from "@/lib/data";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.id === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <article className="max-w-3xl mx-auto">
      <Button asChild variant="outline" className="mb-8">
        <Link href="/">← Back to Home</Link>
      </Button>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center space-x-4 text-muted-foreground mb-8">
        <span>{post.author}</span>
        <span>•</span>
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString()}
        </time>
      </div>

      <Image
        src={post.imgUrl || "/placeholder.svg"}
        alt={post.title}
        width={1200}
        height={600}
        className="rounded-lg mb-8 object-cover"
      />

      <div
        className="prose prose-lg dark:prose-invert max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <section>
        <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {relatedPosts.map((relatedPost) => (
            <Card key={relatedPost.id}>
              <CardHeader>
                <Image
                  src={relatedPost.imgUrl || "/placeholder.svg"}
                  alt={relatedPost.title}
                  width={400}
                  height={200}
                  className="rounded-t-lg object-cover h-32"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2">{relatedPost.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date(relatedPost.publishedAt).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/blog/${relatedPost.id}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </article>
  );
}
