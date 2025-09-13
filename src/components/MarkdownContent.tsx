import { cn } from '@/lib/utils';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div 
      className={cn(
        "prose prose-lg max-w-none dark:prose-invert",
        "prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-code:bg-secondary prose-code:text-secondary-foreground prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm",
        "prose-pre:bg-secondary prose-pre:text-secondary-foreground prose-pre:p-4 prose-pre:rounded-lg",
        "prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-2",
        "prose-table:border-border prose-th:bg-secondary prose-th:text-secondary-foreground",
        "prose-img:rounded-lg prose-img:shadow-md",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
