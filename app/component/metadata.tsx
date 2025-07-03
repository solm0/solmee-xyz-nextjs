'use client'

import { Post } from "../lib/type";
import { pretendard } from '@/app/lib/localfont';
import { Calendar, Tag, Key } from 'lucide-react';
import clsx from "clsx";
import ParamKwButton from "./atoms/param-kw-button";

const tempKeywords = ['임시', '키워드', '입니다', 'this', 'is', 'temp', 'keywords', 'Next.js']

export default function Metadata({
  post
}: {
  post: Post;
}) {
  const year = post.publishedAt.toString().slice(0,4);
  const month = post.publishedAt.toString().slice(5,7);
  const day = post.publishedAt.toString().slice(8, 10);

  return (
    <section className={clsx (
      `relative ${pretendard.className} flex flex-col w-full h-auto items-start text-text-900 text-sm px-4 py-3 rounded-sm -left-4`,
      post.meta === true ? 'hidden' : 'block',
    )}>
      <div className="flex gap-3 h-8 items-center">
        <Calendar className='w-3 h-3' />
        <div className="flex gap-1 h-full items-center">
          <p>{year}년</p>
          <p>{month}월</p>
          <p>{day}일</p>
        </div>
      </div>
      <div className="flex gap-3 h-8 items-center">
        <Tag className='w-3 h-3' />
        {post.tags.name}
      </div>
      <div className="flex gap-3 items-start">
        <Key className='w-3 h-8 shrink-0' />
        <div className="flex gap-1 flex-wrap h-auto">
          <ParamKwButton keywords={tempKeywords} />
        </div>
      </div>
    </section>
  )
}