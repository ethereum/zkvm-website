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
            className="block py-8 px-4 -mx-4 rounded-lg group hover:bg-muted/50 transition-colors"
          >
            <span className="text-sm text-muted-foreground">{post.date}</span>
            <h3 className="text-3xl font-bold text-foreground group-hover:text-[#0C9FDE] transition-colors mt-1">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2 max-w-[700px]">{post.excerpt}</p>
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
