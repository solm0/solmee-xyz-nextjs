'use client'

import { useState } from "react"
import PostList from "./post-list";
import { Post } from "../lib/type";
import { maruburi } from "@/app/lib/localfont";

export default function BlogLists({
  posts,
}: {
  posts: Post[] | null;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className={`${maruburi.className} font-semibold relative w-full pt-[40%] pb-8 overflow-y-scroll focus:outline-hidden`}>
      {posts && posts.map((note) => (
        <PostList
          key={note.id}
          note={note}
          hovered={hovered} setHovered={setHovered}
        />
      ))}
    </section>
  )
}