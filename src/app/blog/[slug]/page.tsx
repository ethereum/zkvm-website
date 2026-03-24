import { getBlogPost, getBlogPostSlugs } from '@/lib/blog';
import MarkdownContent from '@/components/MarkdownContent';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAuthorTwitterUrl } from '@/lib/author-mapping';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-48 pb-36">
          <div className="max-w-[1200px] mx-auto px-4">
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
              <header className="mb-16">
                <span className="text-sm text-muted-foreground">{post.date}</span>
                <h1 className="text-7xl font-black text-[#0C9FDE] mb-4 tracking-tight mt-2">{post.title}</h1>
                <p className="text-lg text-muted-foreground">By <AuthorLink author={post.author} /></p>
              </header>

              {/* Article Content */}
              <div className="max-w-4xl">
                <MarkdownContent content={post.content} />
              </div>
            </article>

            {/* Article Footer */}
            <footer className="border-t pt-8 max-w-4xl">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Published on {post.date} by <AuthorLink author={post.author} />
                </p>
                <div className="flex gap-4">
                  <Link href="/blog" className="text-sm text-[#0C9FDE] hover:underline">
                    View All Posts
                  </Link>
                  <Link href="/" className="text-sm text-[#0C9FDE] hover:underline">
                    Back to Home
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </main>
        <Footer />
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
