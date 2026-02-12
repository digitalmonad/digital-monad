import { BlogPosts } from "@/components/posts";
import { getAllCategories, getAllTags } from "./utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div>
      <section>
        <h1>My Blog</h1>
        <BlogPosts />
      </section>
      <aside className="w-full mt-8 lg:absolute md:w-72 xl:w-80 lg:right-0 lg:top-26 lg:pr-4 space-y-10">
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
                <Link key={category} href={`/blog/categories/${category}`}>
                  <Badge variant={"secondary"}>{category}</Badge>
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
          <div className="flex flex-wrap gap-1">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <Link key={tag} href={`/blog/tags/${tag}`}>
                  <Badge variant={"secondary"}>{tag}</Badge>
                </Link>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No tags yet</p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
