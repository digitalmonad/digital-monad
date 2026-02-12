import { getBlogPosts, sortPostsByDateDesc } from "@/blog/utils/utils.posts";
import { formatDate } from "@/blog/utils/utils.date";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: { categoryName: string };
}) {
  const { categoryName } = await params;

  const postsForCategory = getBlogPosts().filter((post) =>
    post.metadata.categories?.includes(categoryName),
  );

  if (!postsForCategory.length) {
    notFound();
  }

  const sortedPosts = sortPostsByDateDesc(postsForCategory);

  return (
    <div className="container mx-auto max-w-4xl">
      <header className="mb-6">
        <h1>Category: {categoryName}</h1>
        <p className="text-muted-foreground">{sortedPosts.length} posts</p>
      </header>

      <section className="space-y-4">
        {sortedPosts.map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/posts/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-24 tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
