"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import type React from "react";

type Blog = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  imgUrl: string;
};

const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
      <Card key={blog.id} className="flex flex-col h-full">
        <CardHeader>
          <Image
            src={blog.imgUrl || "/placeholder.svg"}
            alt={blog.title}
            width={800}
            height={400}
            className="rounded-t-lg object-cover h-48"
          />
        </CardHeader>
        <CardContent className="flex-grow">
          <CardTitle className="mb-2">{blog.title}</CardTitle>
          <p className="text-muted-foreground mb-4">{blog.description}</p>
          <p className="text-sm text-muted-foreground">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href={`/blogs/${blog.id}`}>Read More</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
