import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import { BlogPost, BlogPostSummary } from './types';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export async function getAllBlogPosts(): Promise<BlogPostSummary[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        author: data.author || '',
        tags: data.tags || [],
        featured: data.featured || false,
      } as BlogPostSummary;
    });

  // Sort posts by date in descending order
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Process markdown content
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    content: contentHtml,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    author: data.author || '',
    tags: data.tags || [],
    featured: data.featured || false,
  } as BlogPost;
}

export async function getFeaturedPosts(): Promise<BlogPostSummary[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) => post.featured);
}

export async function getBlogPostSlugs(): Promise<string[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}

