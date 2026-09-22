import type { Metadata } from "next";
import { owner, siteConfig, title } from "@/constants/site";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
  : process.env.NODE_ENV === "development"
    ? new URL("http://localhost:3000")
    : new URL(siteConfig.url);

export function getSimpleOgImage(
  ogTitle: string,
  description?: string,
): string {
  const params = new URLSearchParams({ title: ogTitle });
  if (description) {
    params.set("description", description);
  }
  return `/og?${params}`;
}

export function createMetadata(override: Metadata): Metadata {
  const ogTitle =
    typeof override.title === "string" ? override.title : undefined;
  const ogDesc =
    typeof override.description === "string" ? override.description : undefined;
  const defaultImage = ogTitle
    ? getSimpleOgImage(ogTitle, ogDesc)
    : "/banner.png";

  return {
    ...override,
    metadataBase: baseUrl,
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": "/blog/rss.xml",
      },
      ...override.alternates,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
    },
    creator: owner,
    formatDetection: {
      telephone: false,
      ...override.formatDetection,
    },
    openGraph: {
      description: override.description ?? undefined,
      images: defaultImage,
      siteName: title,
      title: override.title ?? undefined,
      url: baseUrl.href,
      ...override.openGraph,
    },
    publisher: owner,
  };
}
