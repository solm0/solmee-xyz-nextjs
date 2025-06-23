'use client'

import { useSearchParams } from "next/navigation";
import RandSectionWrapper from "@/app/component/rand-section-wrapper";
import NoteSection from "@/app/component/note-section";

export default function MainLayout({
  children,
  posts,
}: {
  children: React.ReactNode;
  posts: { title: string; id: string; preview: string }[];
}) {
  const newParams = new URLSearchParams(useSearchParams().toString());
  const view = newParams.get("view");
  console.log(view)
  
  switch(view) {

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
  }

}