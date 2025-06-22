'use client'

import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect } from "react";

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



export default function Rand() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);
  useEffect(() => {
    fetch('http://temp.solmee.xyz:3000/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            posts {
              id
              title
            }
          }
        `
      })
    })
      .then(res => res.json())
      .then(console.log)
      .catch(console.error);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <div className="absolute top-0 left-52">
      <h2>All Posts</h2>
      <ul className="list-disc ml-5">
        {data.posts.map((post: { id: string; title: string }) => (
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