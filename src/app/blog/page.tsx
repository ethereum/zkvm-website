import { getAllBlogPosts, getAllTags } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const tags = await getAllTags();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Latest Updates & Insights</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay up to date with the latest developments in ZK-EVM technology, 
              community updates, and technical insights from our team.
            </p>
          </div>

          {/* Tags Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm font-medium text-muted-foreground mr-2">Filter by topic:</span>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-secondary/80 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Posts */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {posts
                .filter((post) => post.featured)
                .slice(0, 2)
                .map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
            </div>
          </div>

          {/* All Posts */}
          <div>
            <h2 className="text-2xl font-bold mb-6">All Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              ← Back to Home
            </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: 'Blog | ZK-EVM',
    description: 'Latest updates and insights about ZK-EVM technology, community updates, and technical developments.',
  };
}
