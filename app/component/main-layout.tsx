'use client'

import { useSearchParams } from "next/navigation";
import ListSectionWrapper from "@/app/component/list-section-wrapper";
import NoteSection from "@/app/component/note-section";
import { Post } from "../lib/type";
import GenerateChron from "../lib/gererate-chron";
import filterPosts from "../lib/filter-posts";

export default function MainLayout({
  children,
  posts,
}: {
  children: React.ReactNode;
  posts: Post[];
}) {
  const searchParams = useSearchParams();
  const menu = searchParams.get("menu") || '메뉴없음';
  const tag = searchParams.get("tag");
  const search = searchParams.get("search");
  const keywords = searchParams.getAll("keyword");

  let finalPosts;

  switch(menu) {
    case '무작위':
    case '최신순':
      finalPosts = filterPosts({ posts: GenerateChron(posts), tag, search, keywords });
      break;
    case '그래픽':
      finalPosts = filterPosts({ posts, tag: '시각', search, keywords });
      break;
    case '대해서':
      finalPosts = posts.filter(post => post.meta === true);
      break;
    default:
      finalPosts = posts;
  }

  return (
    <>
      <ListSectionWrapper posts={finalPosts} menu={menu} />
      <NoteSection>
        {children}
      </NoteSection>
    </>
  )

}