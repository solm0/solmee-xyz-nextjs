'use client'

import { useSearchParams } from "next/navigation";
import RandSectionWrapper from "@/app/component/rand-section-wrapper";
import NoteSection from "@/app/component/note-section";
import { Post } from "../lib/type";

export default function MainLayout({
  children,
  posts,
}: {
  children: React.ReactNode;
  posts: Post[];
}) {
  const newParams = new URLSearchParams(useSearchParams().toString());
  const menu = newParams.get("menu");

  const metaPosts = posts.filter((post) => post.meta === true);
  
  
  switch(menu) {

    case 'rand': 
    case 'chron':
      return (
        <>
          <RandSectionWrapper posts={posts} menu={menu} />
          <NoteSection>
            {children}
          </NoteSection>
        </>
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