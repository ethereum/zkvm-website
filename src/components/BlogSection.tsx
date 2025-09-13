import { getFeaturedPosts } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';

const BlogSection = async () => {
  const featuredPosts = await getFeaturedPosts();

  return (
    <section id="blog">
      <div className="section-title">
        <h2>Latest Updates & Insights</h2>
      </div>
      <div className="blog-grid">
        {featuredPosts.slice(0, 3).map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div style={{textAlign: 'center', marginTop: '3rem'}}>
        <Link href="/blog" className="btn btn-primary" style={{background: 'var(--dark)'}}>
          View All Posts
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;