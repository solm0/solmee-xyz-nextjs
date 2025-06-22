// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { gql, GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.GRAPHQL_API_URL || 'http://localhost:3000/api/graphql');

const GET_POST_BY_ID = gql`
  query PostById($id: ID!) {
    post(where: { id: $id }) {
      id
      title
    }
  }
`;

export async function generateStaticParams() {
  const data = await client.request(gql`
    query {
      posts {
        id
      }
    }
  `);

  return data.posts.map((post: { id: string }) => ({ slug: post.id }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = params;

  if (!slug) throw new Error("Missing ID param");

  const data = await client.request(GET_POST_BY_ID, { id: slug });
  const post = data.post;

  return <div>My Post: {post?.title}</div>
}