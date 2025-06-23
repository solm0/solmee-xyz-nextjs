// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { gql, GraphQLClient } from "graphql-request";
import Link from "next/link";

const client = new GraphQLClient(process.env.GRAPHQL_API_URL);

const GET_ALL_POSTS = gql`
  query {
    posts {
      id
      title
    }
  }
`;

// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "solmee.xyz",
//   description: "홈",
// };



export default async function Rand() {
  const data = await client.request(GET_ALL_POSTS);
  const posts = data.posts;

  return (
    <div className="absolute top-0 left-52">
      <h2>All Posts</h2>
      <ul className="list-disc ml-5">
        {posts.map((post: { id: string; title: string }) => (
          <li key={post.id}>
            <Link href={`/rand/${post.id}`}>
              {post.title}{post.id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}