'use client'

import { useSearchParams } from "next/navigation";
import { Post } from "../lib/type";
import GenerateChron from "../lib/gererate-chron";
import filterPosts from "../lib/filter-posts";
import InspectResultList from "./inspect-result-list";

export default function InspectResult({
  posts,
}: {
  posts: Post[];
}) {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const search = searchParams.get("search");
  const keywords = searchParams.getAll("keyword");

  const finalPosts = filterPosts({ posts: GenerateChron(posts), tag, search, keywords });

  return (
    <div className="flex w-full flex-col gap-2 overflow-hidden">
      <hr className="border-b-0 border-text-700" />
      <InspectResultList posts={finalPosts} />
    </div>
  )

}