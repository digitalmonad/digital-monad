import { createGetUrl } from "fumadocs-core/source";

export const appName = "digitalmonad";
export const blogRoute = "/blog";
export const blogImageRoute = "/og/blog";
export const blogContentRoute = "/llms.mdx/blog";

const getContentUrl = createGetUrl(blogContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, "content.md"];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(blogImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, "image.png"];

  return { segments, url: getImageUrl(segments, page.locale) };
}
