'use client'

import { useSearchParams } from "next/navigation";
import RandSectionWrapper from "@/app/component/rand-section-wrapper";
import NoteSection from "@/app/component/note-section";
import { FormattedText, Post } from "../lib/type";
import GenerateChron from "../lib/gererate-chron";
import filterPosts from "../lib/filter-posts";

export default function MainLayout({
  children,
  posts,
}: {
  children: React.ReactNode;
  posts: Post[];
}) {
  const newParams = new URLSearchParams(useSearchParams().toString());
  const menu = newParams.get("menu");
  const tag = newParams.get("tag");
  const search = newParams.get("search");
  const keywords = newParams.getAll("keyword");

  // insert preview
  posts.map(post => {
    try {
      const doc = post?.content?.document;
      post["preview"] = (doc?.[0]?.children?.[0] as FormattedText)?.text || "";
    } catch {
      return "";
    }
  })

  // insert date
  const chronPosts = GenerateChron(posts);

  // filter
  const metaPosts = posts.filter((post) => post.meta === true);
  const filteredPosts = filterPosts({
    posts: chronPosts,
    tag: tag,
    search: search,
    keywords: keywords,
  })
  
  switch(menu) {
    case '무작위': 
    case '최신순':
      return (
        <>
          <RandSectionWrapper posts={filteredPosts} menu={menu} />
          <NoteSection>
            {children}
          </NoteSection>
        </>
      );
      break;
      
    case '그래픽':
      return (
        <div>
          {children}
        </div>
      );
      break;

    case '대해서':
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