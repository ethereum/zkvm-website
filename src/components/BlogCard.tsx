import Link from 'next/link';
import { BlogPostSummary } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  post: BlogPostSummary;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link 
      href={`/blog/${post.slug}`} 
      className="block bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm text-muted-foreground">{post.date}</span>
          {post.featured && (
            <Badge variant="default" className="text-xs">
              Featured
            </Badge>
          )}
        </div>
        <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">By {post.author}</span>
          <div className="flex gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
