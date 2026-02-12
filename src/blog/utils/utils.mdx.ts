import fs from "fs";
import path from "path";
import graymatter from "gray-matter";

export function getMDXFiles(dir: fs.PathLike): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export function parseMDXFile(filePath: fs.PathOrFileDescriptor): {
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

export function getMDXData(
  mdxFilesNames: string[],
  mdxFilesPath: string,
): Post[] {
  return mdxFilesNames.map((fileName) => {
    const { metadata, content } = parseMDXFile(
      path.join(mdxFilesPath, fileName),
    );
    const slug = path.basename(fileName, path.extname(fileName));

    return {
      metadata,
      slug,
      content,
    };
  });
}
