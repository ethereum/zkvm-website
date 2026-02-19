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
            <a
              href="/feed.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="6.18" cy="17.82" r="2.18"/>
                <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/>
              </svg>
              RSS Feed
            </a>
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
    description: 'Latest updates and insights about L1-zkEVM developments.',
  };
}
