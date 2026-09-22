import { defineCollections } from "fumadocs-mdx/macro";
import { pageSchema } from "fumadocs-core/source/schema";
import { z } from "zod";
import { loader } from "fumadocs-core/source";
import { siteConfig } from "@/constants/site";

const work = defineCollections({
  type: "doc",
  dir: "content/work",
  schema: pageSchema.extend({
    date: z.coerce.date(),
    github: z.string().optional(),
    image: z.string().optional(),
    order: z.number().optional(),
    website: z.string().optional(),
  }),
  postprocess: { includeProcessedMarkdown: true },
});

export const workSource = loader(work.toFumadocsSource(), {
  baseUrl: "/work",
});

export const {
  getPage: getWork,
  getPages: getWorkPages,
  pageTree: workPageTree,
} = workSource;

export type WorkPage = ReturnType<typeof getWorkPages>[number];

const workPages = getWorkPages().map((page) => ({
  ...page,
  url: `${siteConfig.url}${page.url}`,
}));

/**
 * Pinned projects lead, in `order`; everything else follows, newest first.
 */
export const getSortedWork = () =>
  workPages.toSorted((a, b) => {
    const aOrder = a.data.order;
    const bOrder = b.data.order;

    if (aOrder !== undefined && bOrder !== undefined) {
      return aOrder - bOrder;
    }
    if (aOrder !== undefined) {
      return -1;
    }
    if (bOrder !== undefined) {
      return 1;
    }

    return b.data.date.getTime() - a.data.date.getTime();
  });
