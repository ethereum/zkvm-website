"use client";

import { cn } from '@/lib/utils';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <>
      <style jsx>{`
        .markdown-content code {
          background-color: #111827 !important;
          color: #4ade80 !important;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          border: 1px solid #374151;
        }
        .markdown-content pre {
          background-color: #111827 !important;
          color: #4ade80 !important;
          padding: 1.5rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
          overflow-x: auto;
          border: 1px solid #374151;
        }
        .markdown-content pre code {
          background-color: transparent !important;
          color: inherit !important;
          padding: 0;
          border: none;
        }
      `}</style>
      <div
        className={cn(
          'markdown-content prose prose-lg max-w-none dark:prose-invert',
          // General Typography
          'text-foreground',

          // Headings
          'prose-h1:text-4xl prose-h1:font-bold prose-h1:mt-16 prose-h1:mb-8',
          'prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-16 prose-h2:mb-6',
          'prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-12 prose-h3:mb-4',
          'prose-h4:text-xl prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-3',

          // Paragraphs
          'prose-p:text-lg prose-p:leading-relaxed prose-p:text-foreground prose-p:mb-6',

          // Lists
          'prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6',
          'prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6',
          'prose-li:mb-3',
          'prose-li:marker:text-foreground',

          // Links
          'prose-a:text-primary prose-a:no-underline [&_a:hover]:underline',

          // Blockquotes
          'prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:mb-6 prose-blockquote:italic',

          // Tables
          'prose-table:w-full prose-table:border-collapse prose-table:mb-6',
          'prose-th:border-b prose-th:border-border prose-th:bg-secondary prose-th:p-4 prose-th:text-left prose-th:font-semibold',
          'prose-td:border-b prose-td:border-border prose-td:p-4',

          // Images
          'prose-img:rounded-lg prose-img:shadow-lg prose-img:mb-6',

          // Strong/Bold Text
          'prose-strong:font-bold prose-strong:text-foreground',

          // Horizontal Rules
          'prose-hr:border-border prose-hr:my-12',

          className
        )}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
}
