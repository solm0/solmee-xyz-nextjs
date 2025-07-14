'use client'

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation";
import ListSection from "./list-section";
import ListThumbnailSection from "./list-thumbnail-section";
import PostList from "./post-list";
import PostListThumbnail from "./post-list-thumbnail";
import { Suspense } from "react";
import { Post } from "../lib/type";

export default function ListSectionWrapper({
  posts,
  menu
}: {
  posts: Post[] | null;
  menu: string;
}) {
  const [goUp, setGoUp] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  const rootPath = pathname.split('/').slice(1, 2).toString();

  useEffect(() => {
    if (rootPath) {
      setGoUp(true);
    } else {
      setGoUp(false);
    }
  }, [rootPath]);

  if (menu === '그래픽') return (
    <ListThumbnailSection goUp={goUp}>
      <Suspense>
        {posts && posts.map((note) => (
          <PostListThumbnail
            key={note.id}
            note={note}
            goUp={goUp} setGoUp={setGoUp}
            hovered={hovered} setHovered={setHovered}
          />
        ))}
      </Suspense>
    </ListThumbnailSection>
    
  )
  return (
    <ListSection goUp={goUp}>
      <Suspense>
        {posts && posts.map((note) => (
          <PostList
            menu={menu}
            key={note.id}
            note={note}
            goUp={goUp} setGoUp={setGoUp}
            hovered={hovered} setHovered={setHovered}
          />
        ))}
      </Suspense>
    </ListSection>
  )
}