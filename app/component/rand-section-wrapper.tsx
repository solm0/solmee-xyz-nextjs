'use client'

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation";
import RandSection from "./rand-section";
import RandList from "./rand-list";
import { Suspense } from "react";

export default function RandSectionWrapper({
  posts
}: {
  posts: { title: string; id: string; preview: string; meta: boolean }[]
}) {
  const [goUp, setGoUp] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  const rootPath = pathname.split('/').slice(1, 2).toString();

  let subPath = false;

  if (rootPath === 'meta') {
    if (pathname.split('/').slice(2, 3).toString()) {
      subPath = true;
    }
  } else if (rootPath === 'graph') {
    subPath = false;
  } else if (rootPath) {
    subPath = true;
  } else {
    subPath = false;
  }

  useEffect(() => {
    if (subPath) {
      setGoUp(true)
    }
  }, [subPath]);

  return (
    <RandSection goUp={goUp}>
      <Suspense>
        {posts.map((note) => (
          <RandList
            key={note.id}
            note={note}
            goUp={goUp} setGoUp={setGoUp}
            hovered={hovered} setHovered={setHovered}
          />
        ))}
      </Suspense>
    </RandSection>
  )
}