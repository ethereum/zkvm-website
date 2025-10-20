import Link from 'next/link';
import { BlogPostSummary } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface BlogCardProps {
  post: BlogPostSummary;
  isHighlighted?: boolean;
}

export default function BlogCard({ post, isHighlighted = false }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card className="overflow-hidden hover:scale-[1.02] transition-transform duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm text-muted-foreground">{post.date}</span>
            {post.featured && (
              <Badge variant="default" className="text-xs">
                Featured
              </Badge>
            )}
          </div>
          <h3 className={`${isHighlighted ? 'text-2xl' : 'text-xl'} font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors`}>
            {post.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">By {post.author}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
