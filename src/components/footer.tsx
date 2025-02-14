import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold">
              ModernBlog
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              © {new Date().getFullYear()} ModernBlog. All rights reserved.
            </p>
          </div>
          <nav className="flex space-x-4">
            <Link href="/" className="text-sm hover:underline">
              Home
            </Link>
            <Link href="/about" className="text-sm hover:underline">
              About
            </Link>
            <Link href="/create" className="text-sm hover:underline">
              Create Post
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
