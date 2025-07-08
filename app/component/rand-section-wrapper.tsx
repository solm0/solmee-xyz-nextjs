'use client'

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation";
import RandSection from "./rand-section";
import RandList from "./rand-list";
import ChronList from "./chron-list";
import { Suspense } from "react";
import { Post } from "../lib/type";

export default function RandSectionWrapper({
  posts,
  menu
}: {
  posts: Post[];
  menu?: string;
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

  return (
    <RandSection goUp={goUp}>
      <Suspense>
        {posts.map((note) => {
          if (menu === '최신순') return (
            <ChronList
              key={note.id}
              note={note}
              goUp={goUp} setGoUp={setGoUp}
              hovered={hovered} setHovered={setHovered}
            />
            )
          else return (
            <RandList
                key={note.id}
                note={note}
                goUp={goUp} setGoUp={setGoUp}
                hovered={hovered} setHovered={setHovered}
              />
          )
        })}
      </Suspense>
    </RandSection>
  )
}