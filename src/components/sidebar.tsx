import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import {
  getAllTagsWithStats,
  getAllCategoriesWithStats,
  getBlogPosts,
  sortByCount,
} from "@/blog/utils/utils.posts";

export function Sidebar() {
  const posts = getBlogPosts();
  const categories = getAllCategoriesWithStats(posts).sort(sortByCount);
  const tags = getAllTagsWithStats(posts).sort(sortByCount);

  return (
    <div className="flex flex-col space-y-8 max-lg:mt-12">
      <div>
        <Link
          href={"/blog/categories"}
          className="flex text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowUpRight />
          <h2 className="font-semibold text-lg mb-2 tracking-tight">
            Categories
          </h2>
        </Link>
        <div className="flex flex-wrap gap-1">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category.name}
                href={`/blog/categories/${category.name}`}
              >
                <Badge
                  variant={"secondary"}
                  className="text-md lg:text-xs hover:bg-foreground/20"
                >
                  {category.name} ({`${category.count}`})
                </Badge>
              </Link>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No categories yet</p>
          )}
        </div>
      </div>

      <div className="">
        <Link
          href={"/blog/tags"}
          className="flex text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowUpRight />
          <h2 className="font-semibold text-lg mb-2 tracking-tight">Tags</h2>
        </Link>
        <div className="flex flex-wrap gap-2 lg:gap-1">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <Link key={tag.name} href={`/blog/tags/${tag.name}`}>
                <Badge
                  variant={"secondary"}
                  className="text-md lg:text-xs hover:bg-foreground/20"
                >
                  {tag.name} ({`${tag.count}`})
                </Badge>
              </Link>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No tags yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
