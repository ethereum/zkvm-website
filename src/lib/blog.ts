import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import type { Plugin } from 'unified';
import type { Root, Parent, Content, Link, Image } from 'mdast';
import { BlogPost, BlogPostSummary } from './types';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

type ParentNode = Root | (Parent & { children: Content[] });
type Properties = Record<string, unknown>;

const toClassString = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string').join(' ');
  }
  return typeof value === 'string' ? value : '';
};

const mergeClassNames = (...values: unknown[]): string => {
  const classes = values
    .flatMap((value) => toClassString(value).split(' '))
    .map((value) => value.trim())
    .filter(Boolean);

  return Array.from(new Set(classes)).join(' ');
};

const isParentNode = (node: Root | Content): node is ParentNode =>
  typeof (node as Parent).children !== 'undefined' &&
  Array.isArray((node as Parent).children);

function wrapImagesInLinks(): Plugin<[], Root> {
  return (tree) => {
    const visitNode = (node: Root | Content, parent: ParentNode | null): void => {
      if (!isParentNode(node)) {
        return;
      }

      const parentNode: ParentNode = node;

      parentNode.children = parentNode.children.map((child) => {
        if (child.type === 'image' && parent?.type !== 'link') {
          const imageNode: Image = { ...child };
          const existingImageProps = (imageNode.data?.hProperties as Properties | undefined) ?? {};
          const imageClassName = mergeClassNames('cursor-zoom-in', existingImageProps.className);

          imageNode.data = {
            ...(imageNode.data ?? {}),
            hProperties: {
              ...existingImageProps,
              className: imageClassName,
            },
          };

          const linkNode: Link = {
            type: 'link',
            url: child.url,
            title: child.title ?? undefined,
            children: [imageNode],
          };

          const existingLinkProps =
            (linkNode.data?.hProperties as Properties | undefined) ?? {};
          const linkClassName = mergeClassNames(
            'group',
            'block',
            'mx-auto',
            'w-full',
            'sm:w-auto',
            existingLinkProps.className
          );

          linkNode.data = {
            ...(linkNode.data ?? {}),
            hProperties: {
              ...existingLinkProps,
              target: '_blank',
              rel: 'noopener noreferrer',
              className: linkClassName,
            },
          };

          return linkNode as Content;
        }

        visitNode(child, parentNode);
        return child;
      });
    };

    visitNode(tree, null);
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
