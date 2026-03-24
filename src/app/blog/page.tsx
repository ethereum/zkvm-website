import { getAllBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Latest developments in zkEVM technology, community updates, and technical insights from our team.
            </p>
            <a
              href="/feed.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="6.18" cy="17.82" r="2.18"/>
                <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z"/>
              </svg>
              RSS Feed
            </a>
          </div>

          <div className="divide-y divide-border">
            {posts.map((post) => (
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
                <span className="text-sm text-muted-foreground mt-2 block">By {post.author}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: 'Blog | zkEVM',
    description: 'Latest updates and insights about L1-zkEVM developments.',
  };
}
