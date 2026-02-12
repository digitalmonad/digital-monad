import Link from "next/link";
import {
  getAllTagsWithStats,
  getBlogPosts,
  sortByName,
} from "@/blog/utils/utils.posts";
import { Badge } from "@/components/ui/badge";

export default async function TagsPage() {
  const categories = getAllTagsWithStats(getBlogPosts()).sort(sortByName);

  return (
    <div>
      <h1>Tags</h1>

      <ul className="flex gap-2 flex-wrap">
        {categories.map((c) => (
          <li key={c.name}>
            <Link href={`/blog/categories/${c.name}`}>
              <Badge variant="secondary">
                {c.name} ({c.count})
              </Badge>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
