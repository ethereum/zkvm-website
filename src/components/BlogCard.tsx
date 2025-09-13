import Link from 'next/link';
import { BlogPostSummary } from '@/lib/types';

interface BlogCardProps {
  post: BlogPostSummary;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card group">
      <div className="blog-card-content">
        <div className="blog-meta">
          <span className="blog-date">{post.date}</span>
          {post.featured && (
            <span className="blog-featured">Featured</span>
          )}
        </div>
        <h3 className="blog-title group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <div className="blog-footer">
          <span className="blog-author">By {post.author}</span>
          <div className="blog-tags">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="blog-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
