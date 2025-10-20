import { getFeaturedPosts } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';

const BlogSection = async () => {
  const featuredPosts = await getFeaturedPosts();

  return (
    <section id="blog" className="section">
      <div className="section-title">
        <h2>Latest Updates & Insights</h2>
      </div>
      <div className="blog-grid">
        {featuredPosts.slice(0, 2).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="text-center mt-12">
        <Link 
          href="/blog" 
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          View All Posts
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;