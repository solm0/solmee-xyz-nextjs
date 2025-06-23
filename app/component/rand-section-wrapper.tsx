'use client'

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation";
import RandSection from "./rand-section";
import RandList from "./rand-list";
import { Suspense } from "react";

export default function RandSectionWrapper({
  posts
}: {
  posts: { title: string; id: string; preview: string }[]
}) {
  const [goUp, setGoUp] = useState(false);
  const subPath = usePathname().split('/').slice(2, 3).toString();
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (subPath) {
      setGoUp(true)
    }
  }, [])

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