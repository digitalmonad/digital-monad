import Link from "next/link";
import {
  getAllCategoriesWithStats,
  getBlogPosts,
  sortByName,
} from "@/blog/utils/utils.posts";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layouts";
import { Sidebar } from "@/components/sidebar";

export default async function CategoriesPage() {
  const categories = getAllCategoriesWithStats(getBlogPosts()).sort(sortByName);

  return (
    <PageLayout
      content={
        <>
          <h1>Categories</h1>

          <ul className="flex flex-col gap-2">
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
        </>
      }
      sidebar={<Sidebar />}
    />
  );
}
