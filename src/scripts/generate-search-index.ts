import fs from "fs";
import path from "path";
import { getBlogPosts } from "@/blog/utils/utils.posts";

type SearchIndexEntry = {
  slug: string;
  title: string;
  publishedAt: string;
  categories?: string[];
  tags?: string[];
};

function generateSearchIndex() {
  console.log("🔍 Generating search index...");

  const posts = getBlogPosts();

  const searchIndex: SearchIndexEntry[] = posts.map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    publishedAt: post.metadata.publishedAt,
    categories: post.metadata.categories,
    tags: post.metadata.tags,
  }));

  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const indexPath = path.join(publicDir, "search-index.json");
  fs.writeFileSync(indexPath, JSON.stringify(searchIndex, null, 2));

  const minIndexPath = path.join(publicDir, "search-index.min.json");
  fs.writeFileSync(minIndexPath, JSON.stringify(searchIndex));

  const size = (fs.statSync(minIndexPath).size / 1024).toFixed(2);
  console.log(
    `✅ Search index generated: ${searchIndex.length} posts (${size} KB)`,
  );
}

generateSearchIndex();
