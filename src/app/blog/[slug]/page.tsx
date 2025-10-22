import { getBlogPost, getBlogPostSlugs } from '@/lib/blog';
import MarkdownContent from '@/components/MarkdownContent';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAuthorTwitterUrl } from '@/lib/author-mapping';

interface BlogPostPageParams {
  slug: string;
}

type BlogPostPageProps = {
  params: Promise<BlogPostPageParams>;
};

function AuthorLink({ author }: { author: string }) {
  const twitterUrl = getAuthorTwitterUrl(author);
  
  if (twitterUrl) {
    return (
      <a 
        href={twitterUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="underline text-foreground hover:text-primary transition-colors"
      >
        {author}
      </a>
    );
  }
  
  return <span>{author}</span>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mt-4">
            {/* Back Navigation */}
            <div className="mb-8">
              <Link 
                href="/blog" 
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Blog
              </Link>
            </div>

            {/* Article Header */}
            <article className="mb-12">
              <header className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                  {post.featured && (
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">By <AuthorLink author={post.author} /></p>
                </div>
              </header>

              {/* Article Content */}
              <MarkdownContent content={post.content} />
            </article>

            {/* Article Footer */}
            <footer className="border-t pt-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Published on {post.date} by <AuthorLink author={post.author} />
                  </p>
                </div>
                <div className="flex gap-4">
                  <Link 
                    href="/blog" 
                    className="text-sm text-primary hover:underline"
                  >
                    View All Posts
                  </Link>
                  <Link 
                    href="/" 
                    className="text-sm text-primary hover:underline"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
    );
  } catch {
    notFound();
  }
}

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    
    return {
      title: `${post.title} | zkEVM Blog`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
      },
    };
  } catch {
    return {
      title: 'Post Not Found | zkEVM Blog',
      description: 'The requested blog post could not be found.',
    };
  }
}
