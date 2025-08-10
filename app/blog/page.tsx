// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { Metadata } from "next";
import { gql, GraphQLClient } from "graphql-request";
import { Suspense } from "react";
import GenerateChron from "../lib/gererate-chron";
import BlogLists from "../component/blog-lists";

const client = new GraphQLClient(process.env.GRAPHQL_API_URL!);

const GET_ALL_POSTS = gql`
  query {
    posts {
      id
      title
      publishedAt
    }
  }
`;

export const metadata: Metadata = {
  title: "블로그",
  description: "블로그",
};

export default async function BlogPage() {
  const data = await client.request(GET_ALL_POSTS);
  const posts = data.posts;
  const finalPosts = GenerateChron(posts)

  return (
    <Suspense>
      <BlogLists posts={finalPosts} />
    </Suspense>
  )
}