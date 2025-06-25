// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { gql, GraphQLClient } from 'graphql-request';
import Note from '@/app/component/note';
import Footer from '@/app/component/footer';
import Toc from '@/app/component/toc';
import Metadata from '@/app/component/metadata';
import { maruburi_bold } from '@/app/lib/localfont';

const client = new GraphQLClient(process.env.GRAPHQL_API_URL);

const GET_POST_BY_ID = gql`
  query PostById($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      publishedAt
      meta
      content {
        document
      }
      tags {
        id
        name
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
      <h1 className={`text-3xl ${maruburi_bold.className}`}>{post?.title}</h1>
      <Metadata post={post} />
      <Note post={post} />
      <Toc post={post} />
      <div className='h-[500px]'>댓글</div>
      <Footer />
    </article>
  )
}