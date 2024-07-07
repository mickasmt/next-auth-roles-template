import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

import { constructMetadata } from "@/lib/utils";
import { BlogPosts } from "@/components/content/blog-posts";

export const metadata = constructMetadata({
  title: "Blog – Next Template",
  description: "Latest news and updates from Next Auth Roles Template.",
});

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return <BlogPosts posts={posts} />;
}
