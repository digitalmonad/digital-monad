import type { BreadcrumbList, CollectionPage } from "schema-dts";
import { baseUrl } from "@/constants";
import {
  description as siteDescription,
  owner,
  siteConfig,
  title as homeTitle,
} from "@/constants/site";

const personRef = {
  "@id": `${baseUrl.href}#person`,
  "@type": "Person",
} as const;

function JsonLd({ graph }: { graph: object }) {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires inline script content
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
      type="application/ld+json"
    />
  );
}

function makeBreadcrumbs(
  items: { name: string; url: string }[],
): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      item: item.url,
      name: item.name,
      position: i + 1,
    })),
  };
}

function makeGraph(...nodes: object[]) {
  const website = {
    "@id": `${baseUrl.href}#website`,
    "@type": "WebSite",
    name: homeTitle,
    description: siteDescription,
    url: baseUrl.href,
    publisher: personRef,
  };

  const person = {
    ...personRef,
    name: owner,
    description: siteDescription,
    url: baseUrl.href,
    sameAs: [siteConfig.githubUrl],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [website, person, ...nodes],
  };
}

// --- Page helpers ---

interface PageJsonLdProps {
  breadcrumbs?: { name: string; url: string }[];
  description?: string;
  path: string;
  title: string;
}

type WebPageType =
  | "WebPage"
  | "CollectionPage"
  | "ContactPage"
  | "AboutPage"
  | "ProfilePage";

function PageJsonLdBase({
  type,
  props,
  extra,
}: {
  type: WebPageType;
  props: PageJsonLdProps;
  extra?: object;
}) {
  const { title, description, path, breadcrumbs: extraCrumbs } = props;
  const url = new URL(path, baseUrl.href).href;

  const page = {
    "@id": `${url}#webpage`,
    "@type": type,
    name: title,
    ...(description && { description }),
    isPartOf: { "@id": `${baseUrl.href}#website`, "@type": "WebSite" },
    url,
    ...extra,
  };

  const crumbs = extraCrumbs ?? [
    { name: homeTitle, url: baseUrl.href },
    { name: title, url },
  ];

  return <JsonLd graph={makeGraph(page, makeBreadcrumbs(crumbs))} />;
}

// --- Generic web page (fallback) ---

export const WebPageJsonLd = (props: PageJsonLdProps) => (
  <PageJsonLdBase props={props} type="WebPage" />
);

// --- Collection page (listings: blog, work, tags) ---

export const CollectionPageJsonLd = (props: PageJsonLdProps) => (
  <PageJsonLdBase props={props} type="CollectionPage" />
);

// --- Contact page ---

export const ContactPageJsonLd = (props: PageJsonLdProps) => (
  <PageJsonLdBase props={props} type="ContactPage" />
);

// --- About page (colophon, uses) ---

export const AboutPageJsonLd = (props: PageJsonLdProps) => (
  <PageJsonLdBase props={props} type="AboutPage" />
);

// --- Profile page ---

export const ProfilePageJsonLd = (props: PageJsonLdProps) => (
  <PageJsonLdBase
    extra={{
      mainEntity: { "@id": `${baseUrl.href}#person`, "@type": "Person" },
    }}
    props={props}
    type="ProfilePage"
  />
);

// --- Blog tag page ---

export const TagJsonLd = ({ tag }: { tag: string }) => {
  const tagUrl = new URL(`/blog/tags/${tag}`, baseUrl.href).href;
  const tagsUrl = new URL("/blog/tags", baseUrl.href).href;

  const page: CollectionPage = {
    "@id": `${tagUrl}#webpage`,
    "@type": "CollectionPage",
    isPartOf: { "@id": `${baseUrl.href}#website`, "@type": "WebSite" },
    name: `Posts tagged "${tag}"`,
    url: tagUrl,
  };

  const breadcrumbs = makeBreadcrumbs([
    { name: homeTitle, url: baseUrl.href },
    { name: "Tags", url: tagsUrl },
    { name: `Posts tagged "${tag}"`, url: tagUrl },
  ]);

  return <JsonLd graph={makeGraph(page, breadcrumbs)} />;
};
