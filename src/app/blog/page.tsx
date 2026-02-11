import { BlogPosts } from "@/components/posts";
import { getAllCategories, getAllTags } from "./utils";
import Link from "next/link";
import { BlogPageLayout } from "@/components/layouts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <BlogPageLayout
      main={
        <section>
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
            My Blog
          </h1>
          <BlogPosts />
        </section>
      }
      right={
        <aside className="space-y-8">
          <div>
            <h2 className="font-semibold text-lg mb-4 tracking-tight">
              Categories
            </h2>
            <div className="flex flex-col space-y-2">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Link
                    key={category}
                    href={`/blog/category/${category}`}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors capitalize"
                  >
                    {category}
                  </Link>
                ))
              ) : (
                <p className="text-sm text-neutral-500">No categories yet</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-4 tracking-tight">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 text-sm rounded-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <p className="text-sm text-neutral-500">No tags yet</p>
              )}
            </div>
          </div>
        </aside>
      }
    />
  );
}
