// import Header from "@/components/header";
import { getBlogPosts } from "@/app/blog/utils";
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

  return (
    <>
      <div>
        <div className="container mx-auto">
          <h1 className="title font-semibold text-2xl tracking-wider mt-4 uppercase">
            {categoryName}
          </h1>
        </div>
      </div>
      <div className="">
        <div className="gap-4 mt-10">
          <ul>
            {postsForCategory
              .sort((a, b) => {
                if (
                  new Date(a.metadata.publishedAt) >
                  new Date(b.metadata.publishedAt)
                ) {
                  return -1;
                }
                return 1;
              })
              .map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/posts/${post.slug}`}>{post.slug}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
