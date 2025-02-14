import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About ModernBlog</h1>
      <Card>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
          <CardDescription>
            Empowering voices in the digital age
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            ModernBlog is a cutting-edge platform designed to provide a seamless
            and engaging experience for both writers and readers. Our mission is
            to create a space where ideas can flourish, knowledge can be shared,
            and communities can grow.
          </p>
          <p className="mb-4">
            Founded in 2025, we&apos;ve been at the forefront of blogging
            technology, constantly innovating to meet the evolving needs of our
            users. We believe in the power of words to inspire, educate, and
            connect people from all walks of life.
          </p>
          <p>
            Whether you&apos;re a seasoned writer or just starting your blogging
            journey, ModernBlog provides the tools and platform you need to make
            your voice heard. Join us in shaping the future of online content
            creation and consumption.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
