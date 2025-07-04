// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { gql, GraphQLClient } from 'graphql-request';
import Note from '@/app/component/note';
import HyperlinkMap from '@/app/component/hyperlink-map';
import GraphController from '@/app/component/graph-controller';

const client = new GraphQLClient(process.env.GRAPHQL_API_URL);

const GET_POST_BY_ID = gql`
  query PostById($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      publishedAt
      meta
      order
      content {
        document(hydrateRelationships: true)
      }
      tags {
        id
        name
      }
      links {
        id
        title
        order
        tags {
          id
          name
        }
      }
      backlinks {
        id
        title
        links {
          id
          title
          order
          tags {
            id
            name
          }
        }
      }
    }
  }
`;

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  if (!slug) throw new Error("Missing ID param");

  const data = await client.request(GET_POST_BY_ID, { id: slug });
  const post = data.post;

  return {
    title: `${post?.title} | solmee.xyz`,
    description: `${post?.title}`,
  };
}

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
  const { slug } = await params;
  if (!slug) throw new Error("Missing ID param");

  const data = await client.request(GET_POST_BY_ID, { id: slug });
  const post = data.post;

  return (
    <article className='flex flex-col gap-12 max-w-[45rem] text-text-900 leading-8 break-keep'>
      <Note post={post} />
      <HyperlinkMap>
        <GraphController post={post} />
      </HyperlinkMap>
    </article>
  )
}