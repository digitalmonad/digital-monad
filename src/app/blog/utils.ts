import fs from "fs";
import path from "path";
import graymatter from "gray-matter";

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  categories?: string[];
  tags?: string[];
};

export type Post = {
  metadata: Metadata;
  slug: string;
  content: string;
};

function getMDXFiles(dir: fs.PathLike): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: fs.PathOrFileDescriptor): {
  metadata: Metadata;
  content: string;
} {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const parsed = graymatter(rawContent);

  const data = parsed.data ?? {};
  const content: string = parsed.content ?? "";

  const metadata: Metadata = {
    title: data.title ? String(data.title) : "",
    publishedAt: data.publishedAt ? String(data.publishedAt) : "",
    summary: data.summary ? String(data.summary) : "",
    image: data.image ? String(data.image) : undefined,
    categories: undefined,
    tags: undefined,
  };

  // Normalize categories to string[] | undefined
  if (Array.isArray(data.categories)) {
    metadata.categories = data.categories.map((c: unknown) => String(c));
  } else if (typeof data.categories === "string") {
    // allow comma-separated string or single value
    metadata.categories = data.categories
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  // Normalize tags to string[] | undefined
  if (Array.isArray(data.tags)) {
    metadata.tags = data.tags.map((t: unknown) => String(t));
  } else if (typeof data.tags === "string") {
    metadata.tags = data.tags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  // Basic validation for required fields
  if (!metadata.title || !metadata.publishedAt || !metadata.summary) {
    throw new Error(`Missing required frontmatter fields in ${filePath}`);
  }

  return { metadata, content };
}

function getMDXData(dir: string): Post[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts(): Post[] {
  return getMDXData(path.join(process.cwd(), "src", "app", "blog", "contents"));
}

function buildCategoryIndex(posts: Post[]) {
  const map: Record<string, Post[]> = {};

  for (const post of posts) {
    if (post.metadata.categories) {
      for (const category of post.metadata.categories) {
        if (!map[category]) {
          map[category] = [];
        }

        map[category].push(post);
      }
    }
  }

  return map;
}

export function getAllCategories(): string[] {
  const posts = getBlogPosts();
  const categories = new Set<string>();

  posts.forEach((post) => {
    if (post.metadata.categories) {
      post.metadata.categories.forEach((category) => categories.add(category));
    }
  });

  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const posts = getBlogPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    if (post.metadata.tags) {
      post.metadata.tags.forEach((tag) => tags.add(tag));
    }
  });

  return Array.from(tags).sort();
}

export type CategoryWithCount = {
  name: string;
  count: number;
};

export function getCategoriesWithCount(): CategoryWithCount[] {
  const posts = getBlogPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    if (post.metadata.categories) {
      post.metadata.categories.forEach((category) => {
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
      });
    }
  });

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function formatDate(date: string, includeRelative = false): string {
  const currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
