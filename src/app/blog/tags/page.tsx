import Link from "next/link";
import {
  getAllTagsWithStats,
  getBlogPosts,
  sortByName,
} from "@/blog/utils/utils.posts";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layouts";
import { Sidebar } from "@/components/sidebar";

export default async function TagsPage() {
  const tags = getAllTagsWithStats(getBlogPosts()).sort(sortByName);

  return (
    <PageLayout
      content={
        <>
          <h1>Tags</h1>

          <ul className="flex flex-col gap-2">
            {tags.map((t) => (
              <li key={t.name}>
                <Link href={`/blog/tags/${t.name}`}>
                  <Badge variant="secondary">
                    {t.name} ({t.count})
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        </>
      }
      sidebar={<Sidebar />}
    />
  );
}
