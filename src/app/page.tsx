import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { blogPosts } from "@/lib/data";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-20 bg-muted rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to ModernBlog</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Discover insightful articles on various topics
        </p>
        <Button asChild>
          <Link href="#latest-posts">Read Latest Posts</Link>
        </Button>
      </section>

      <section id="latest-posts">
        <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <CardHeader>
                <Image
                  src={post.imgUrl || "/placeholder.svg"}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="rounded-t-lg object-cover h-48"
                />
              </CardHeader>
              <CardContent className="flex-grow">
                <CardTitle className="mb-2">{post.title}</CardTitle>
                <p className="text-muted-foreground mb-4">{post.description}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/blog/${post.id}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <div className="text-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}
