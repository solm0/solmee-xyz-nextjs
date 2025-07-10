// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { Metadata } from "next";
import GlobalGraphRenderer from "../component/graph-global-renderer";
import { gql, GraphQLClient } from "graphql-request";
import { Suspense } from "react";

const client = new GraphQLClient(process.env.GRAPHQL_API_URL!);

const GET_ALL_POSTS_GRAPH = gql`
  query {
    posts {
      id
      title
      tags {
        name
      }
      keywords {
        name
      }
      links {
        id
        title
      }
      internalLinks {
        id
        title
      }
    }
  }
`;

export const metadata: Metadata = {
  title: "그래프",
  description: "그래프",
};

export default async function GraphPage() {
  const data = await client.request(GET_ALL_POSTS_GRAPH);
  const posts = data.posts;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <Suspense>
        <GlobalGraphRenderer posts={posts} />
      </Suspense>
    </div>
  )
}