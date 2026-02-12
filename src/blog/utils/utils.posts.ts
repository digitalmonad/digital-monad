import path from "path";

import { getMDXData, getMDXFiles } from "@/blog/utils/utils.mdx";

const MDX_POSTS_PATH = path.join(process.cwd(), "src/blog/contents");

export function getBlogPosts(): Post[] {
  const existingFiles = getMDXFiles(MDX_POSTS_PATH);
  const posts = getMDXData(existingFiles, MDX_POSTS_PATH);

  return posts;
}

export type TagWithCount = {
  name: string;
  count: number;
};

export function getAllTagsWithStats(posts: Post[]): TagWithCount[] {
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    if (post.metadata.tags) {
      post.metadata.tags.forEach((tag) => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    }
  });

  return Array.from(tagMap.entries()).map(([name, count]) => ({ name, count }));
}

export type CategoryWithCount = {
  name: string;
  count: number;
};

export function getAllCategoriesWithStats(posts: Post[]): CategoryWithCount[] {
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    if (post.metadata.categories) {
      post.metadata.categories.forEach((category) => {
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
      });
    }
  });

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    count,
  }));
}

export function sortPostsByDateDesc(posts: Post[]) {
  return posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );
}

export function sortByCount(
  a: TagWithCount | CategoryWithCount,
  b: TagWithCount | CategoryWithCount,
) {
  return b.count - a.count;
}

export function sortByName(
  a: TagWithCount | CategoryWithCount,
  b: TagWithCount | CategoryWithCount,
) {
  return a.name.localeCompare(b.name);
}
