import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import { BlogPost, BlogPostSummary } from './types';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

function wrapImagesInLinks() {
  return (tree: any) => {
    const visit = (node: any, parent?: any) => {
      if (!node || !Array.isArray(node.children)) {
        return;
      }

      node.children = node.children.map((child: any) => {
        if (child?.type === 'image' && parent?.type !== 'link') {
          const imageNode = { ...child };
          imageNode.data = imageNode.data ?? {};
          const existingImageClasses =
            imageNode.data.hProperties?.className ||
            imageNode.data.hProperties?.class ||
            '';

          imageNode.data.hProperties = {
            ...(imageNode.data.hProperties ?? {}),
            className: ['cursor-zoom-in', existingImageClasses].filter(Boolean).join(' '),
          };

          const linkNode: any = {
            type: 'link',
            url: child.url,
            title: child.title,
            children: [imageNode],
          };

          linkNode.data = linkNode.data ?? {};
          const existingLinkClasses =
            linkNode.data.hProperties?.className || linkNode.data.hProperties?.class || '';

          linkNode.data.hProperties = {
            ...(linkNode.data.hProperties ?? {}),
            target: '_blank',
            rel: 'noopener noreferrer',
            className: [
              'group',
              'block',
              'mx-auto',
              'w-full',
              'sm:w-auto',
              existingLinkClasses,
            ]
              .filter(Boolean)
              .join(' '),
          };

          return linkNode;
        }

        visit(child, node);
        return child;
      });
    };

    visit(tree);
  };
}

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
    .use(wrapImagesInLinks)
    .use(remarkHtml, { sanitize: false })
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
