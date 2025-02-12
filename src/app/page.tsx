// src/app/page.tsx

import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Blog = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  imgUrl: string;
};

export default async function Home() {
  let blogPosts: Blog[] = [];

  console.log("Fetching blog posts...");
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/posts`, {
      method: "GET",
    });

    if (res.ok) {
      const data = await res.json();
      blogPosts = Array.isArray(data) ? data : [];
    } else {
      console.error(`Failed to fetch posts. Status: ${res.status}`);
    }
  } catch (e) {
    console.error("Error fetching blog posts:", e);
  }

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
          {blogPosts.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>

      <div className="text-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}
