"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

type Blog = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  imgUrl: string;
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const Home = () => {
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);
  const [featuredPost, setFeaturedPost] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blogs", {
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          const posts = Array.isArray(data) ? data : [];

          setBlogPosts(posts.reverse());
          setFeaturedPost(posts[0]); // Set the first post as featured
        } else {
          console.error(`Failed to fetch posts. Status: ${res.status}`);
        }
      } catch (e) {
        console.error("Error fetching blog posts:", e);
      }
    };

    fetchPosts();
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={stagger}
      className="space-y-16 max-w-7xl mx-auto"
    >
      {/* Hero Section */}
      <motion.section
        variants={fadeInUp}
        className="text-center py-20 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white rounded-lg shadow-lg"
      >
        <h1 className="text-5xl font-extrabold mb-4">Welcome to ModernBlog</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Discover insightful articles on various topics. Stay updated and
          inspired.
        </p>
        <Button asChild>
          <Link href="#latest-posts" className="text-white hover:text-gray-300">
            Read Latest Posts
          </Link>
        </Button>
      </motion.section>
      {/* Featured Post Section */}
      {featuredPost && (
        <motion.section variants={fadeInUp}>
          <h2 className="text-4xl font-bold text-center mb-6">Featured Post</h2>
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <Image
              src={featuredPost.imgUrl || "/placeholder.svg"}
              alt={featuredPost.title}
              width={1200}
              height={600}
              className="object-cover w-full h-[400px]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {featuredPost.title}
              </h3>
              <p className="text-white mb-4">{featuredPost.description}</p>
              <Button asChild variant="secondary">
                <Link href={`/blogs/${featuredPost.id}`} className="text-white">
                  Read More
                </Link>
              </Button>
            </div>
          </div>
        </motion.section>
      )}
      {/* Popular Posts Section */}
      <motion.section variants={fadeInUp}>
        <h2 className="text-4xl font-bold text-center mb-6">Popular Posts</h2>
        <motion.div
          variants={stagger}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.slice(1, 4).map((blog) => (
            <motion.div key={blog.id} variants={fadeInUp}>
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      {/* Categories Section */}
      <motion.section variants={fadeInUp}>
        <h2 className="text-4xl font-bold text-center mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Technology", "Design", "Business", "Lifestyle"].map((category) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-center p-6 bg-gradient-to-r from-[#1a1818] to-[#535350] rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <Link
                href={`/category/${category.toLowerCase()}`}
                className="text-white text-lg font-semibold cursor-pointer"
              >
                {category}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* Latest Posts Section */}
      <motion.section variants={fadeInUp} id="latest-posts">
        <h2 className="text-4xl font-bold text-center mb-6">Latest Posts</h2>
        <motion.div
          variants={stagger}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.map((blog) => (
            <motion.div key={blog.id} variants={fadeInUp}>
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      <motion.div variants={fadeInUp} className="text-center">
        <Button variant="outline">Load More</Button>
      </motion.div>
      {/* Team Section */}

      <motion.section variants={fadeInUp}>
        <h2 className="text-4xl font-bold text-center mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["john", "john", "john"].map((name) => (
            <motion.div
              key={name}
              whileHover={{ scale: 1.05 }}
              className="bg-white shadow-lg rounded-lg p-6 text-center"
            >
              <Image
                src={`/images/team/${name}.jpg`}
                alt={name}
                width={150}
                height={150}
                className="mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-muted-foreground">Content Writer</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* Newsletter Section */}
      <motion.section
        variants={fadeInUp}
        className="bg-gray-100 p-8 rounded-lg text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-grow p-3 rounded-lg"
          />
          <Button type="submit" className="mt-2 sm:mt-0">
            Subscribe
          </Button>
        </form>
      </motion.section>
    </motion.div>
  );
};

export default Home;
