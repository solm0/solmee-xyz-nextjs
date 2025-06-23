'use client'

import { usePathname } from "next/navigation";
import RandSectionWrapper from "@/app/component/rand-section-wrapper";
import NoteSection from "@/app/component/note-section";

export default function MainLayout({
  children,
  posts,
}: {
  children: React.ReactNode;
  posts: { title: string; id: string; preview: string }[];
}) {
  const path = usePathname().split('/').slice(1, 2).toString();
  
  switch(path) {

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