import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
type Blog = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  imgUrl: string;
};

export default async function BlogPost({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.BACKEND_API_URL}/posts/${params.id}`);
  if (!res.ok) {
    return notFound();
  }

  const resposne = await fetch(`${process.env.BACKEND_API_URL}/posts`);
  const blogPosts: Blog[] = await resposne.json();

  //make three blog in relatedPosts
  const relatedPosts = blogPosts.slice(0, 3);

  //take just thre blog from resopse

  const post = await res.json();

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
              {/* <CardContent>
                <CardTitle className="mb-2">{relatedPost.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date(relatedPost.publishedAt).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/blog/${relatedPost.id}`}>Read More</Link>
                </Button>
              </CardFooter> */}
            </Card>
          ))}
        </div>
      </section>
    </article>
  );
}
