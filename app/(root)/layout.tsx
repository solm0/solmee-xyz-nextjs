// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { gql, GraphQLClient } from "graphql-request";
import MainLayout from "../component/main-layout";
import { Suspense } from "react";

const client = new GraphQLClient(process.env.GRAPHQL_API_URL!);

const GET_ALL_POSTS = gql`
  query {
    posts {
      id
      title
      publishedAt
      meta
      tags {
        name
      }
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

  return (
    <Suspense>
      <MainLayout posts={posts}>
        {children}
      </MainLayout>
    </Suspense>
  )
}