// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { Metadata } from "next";
import RandSectionWrapper from "@/app/component/rand-section-wrapper";
import NoteSection from "@/app/component/note-section";
import { gql, GraphQLClient } from "graphql-request";

export const metadata: Metadata = {
  title: "solmee.xyz",
  description: "홈",
};

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

export default async function RandLayout ({
  children
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

  return (
    <>
      <RandSectionWrapper posts={posts} />
      <NoteSection>
        {children}
      </NoteSection>
    </>
  )
}