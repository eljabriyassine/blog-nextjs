// app/page.tsx

import BlogCard from "@/components/BlogCard";

type Blog = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  imgUrl: string;
};

export default async function Profile() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/posts`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch posts. Status: ${res.status}`);
  }

  const data = await res.json();
  const blogPosts: Blog[] = Array.isArray(data) ? data : [];

  return (
    <div className="space-y-8">
      <section id="latest-posts">
        <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
}
