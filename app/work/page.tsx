// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { Metadata } from "next";
import { gql, GraphQLClient } from "graphql-request";
import WorkLists from "../component/work-lists";

const client = new GraphQLClient(process.env.GRAPHQL_API_URL!);

const GET_ALL_POSTS = gql`
  query {
    posts {
      id
      title
      publishedAt
      thumbnail
    }
  }
`;

export const metadata: Metadata = {
  title: "작업",
  description: "작업",
};

export default async function BlogPage() {
  const data = await client.request(GET_ALL_POSTS);
  const posts = data.posts;
  const finalPosts = posts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .filter(post => post.thumbnail);

  return (
    <WorkLists posts={finalPosts} />
  )
}