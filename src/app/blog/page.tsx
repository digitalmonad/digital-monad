import { BlogPosts } from "@/blog/components/posts";

import { PageLayout } from "@/components/layouts";
import { Sidebar } from "@/components/sidebar";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <PageLayout
      content={
        <>
          <h1>My Blog</h1>
          <BlogPosts />
        </>
      }
      sidebar={<Sidebar />}
    />
  );
}
