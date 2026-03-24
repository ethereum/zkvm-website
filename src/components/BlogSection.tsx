import { getAllBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const BlogSection = async () => {
  const posts = await getAllBlogPosts();
  const latestPosts = posts.slice(0, 4);

  return (
    <section id="blog" className="section">
      <div className="section-title">
        <h2>Latest Updates</h2>
      </div>
      <div className="divide-y divide-border">
        {latestPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex items-baseline justify-between gap-6 py-6 group"
          >
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-[#0C9FDE] transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap flex-shrink-0">
              {post.date}
            </span>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#0C9FDE] hover:underline"
        >
          View all posts <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;
