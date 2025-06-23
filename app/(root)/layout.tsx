// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { gql, GraphQLClient } from "graphql-request";
import MainLayout from "../component/main-layout";
import { Suspense } from "react";

const client = new GraphQLClient(process.env.GRAPHQL_API_URL);

const GET_ALL_POSTS = gql`
  query {
    posts {
      id
      title
      content {
        document
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
  
  // meta를 위한 필터링 -> path가 meta면 posts={metaPosts}
  // const metaPosts = posts.filter((post) => ... )

  return (
    <Suspense>
      <MainLayout posts={posts}>
        {children}
      </MainLayout>
    </Suspense>
  )
}