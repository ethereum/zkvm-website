import { getAllBlogPosts } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Latest Updates & Insights</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay up to date with the latest developments in zkEVM technology, 
              community updates, and technical insights from our team.
            </p>
          </div>


          {/* All Posts */}
          <div>
            <h2 className="text-2xl font-bold mb-6">All Posts</h2>
            <div className="space-y-6">
              {posts.map((post, index) => (
                <BlogCard key={post.slug} post={post} isHighlighted={index === 0} />
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
    title: 'Blog | zkEVM',
    description: 'Latest updates and insights about zkEVM technology, community updates, and technical developments.',
  };
}
