// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { gql, GraphQLClient } from "graphql-request";
import MainLayout from "../component/main-layout";
import { Suspense } from "react";
import GenerateChron from "../lib/gererate-chron";

const client = new GraphQLClient(process.env.GRAPHQL_API_URL!);

const GET_ALL_POSTS = gql`
  query {
    posts {
      id
      title
      publishedAt
      meta
      content {
        document(hydrateRelationships: true)
      }
    }
  }
`;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await client.request(GET_ALL_POSTS);
  const posts = data.posts;

  posts.map(post => {
    try {
      const doc = post.content.document;
      post["preview"] = doc?.[0]?.children?.[0]?.text || "";
    } catch {
      return "";
    }
  })

  const chronPosts = GenerateChron(posts);

  return (
    <Suspense>
      <MainLayout posts={chronPosts}>
        {children}
      </MainLayout>
    </Suspense>
  )
}