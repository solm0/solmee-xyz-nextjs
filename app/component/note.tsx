'use client'

import { Post } from "../lib/type"
import clsx from "clsx"
import { maruburi_bold } from '@/app/lib/localfont';

export default function Note({
  post
}: {
  post: Post
}) {
  function slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')     // remove special chars
      .replace(/\s+/g, '-')         // replace spaces with -
  }

  return (
    <div className="flex flex-col">
      {post.content?.document.map((document, idx) => {
        const text = document.children?.[0]?.text || '';
        const id = document.type === "heading" ? slugify(text) : undefined;

        return (
          <div
            id={id}
            key={idx}
            className={clsx(
              document.type === "heading" && document.level === 2 && `!text-xl mb-2 ${maruburi_bold.className}`,
              document.type === "paragraph" && 'pb-8'
            )}
          >
            {text}
          </div>
        );
      })}
    </div>
  )
}