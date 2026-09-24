import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const gitConfig = {
  user: "digitalmonad",
  repo: "digital-monad",
};

export const siteConfig = {
  url: "https://digitalmonad.cz",
  links: {
    about: "/about",
    contact: "/contact",
    blog: "/blog",
    rss: "/rss.xml",
    sitemap: "/sitemap.xml",
    work: "/work",
  },
  githubUrl: `https://github.com/${gitConfig.user}`,
} as const;

export const title = "digitalmonad";
export const description =
  "Design engineer and full-stack developer who blends design and code to build beautiful, functional web experiences with Next.js, React, and TypeScript.";
export const owner = "Pavel Kocman";

export const baseOptions: BaseLayoutProps = {
  githubUrl: siteConfig.githubUrl,
  nav: {
    title,
  },
};
