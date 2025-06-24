'use client'

import { useSearchParams } from "next/navigation";
import RandSectionWrapper from "@/app/component/rand-section-wrapper";
import NoteSection from "@/app/component/note-section";

export default function MainLayout({
  children,
  posts,
}: {
  children: React.ReactNode;
  posts: { title: string; id: string; preview: string, meta: boolean }[];
}) {
  const newParams = new URLSearchParams(useSearchParams().toString());
  const menu = newParams.get("menu");

  const metaPosts = posts.filter((post) => post.meta === true);
  
  switch(menu) {

    case 'rand': 
      return (
        <>
          <RandSectionWrapper posts={posts} />
          <NoteSection>
            {children}
          </NoteSection>
        </>
      );
      break;

    case 'chron':
      return (
        <div>
          {children}
        </div>
      );
      break;
      
    case 'graphic':
      return (
        <div>
          {children}
        </div>
      );
      break;

    case 'meta':
      return (
        <>
          <RandSectionWrapper posts={metaPosts} />
          <NoteSection>
            {children}
          </NoteSection>
        </>
      );
      break
  }

}