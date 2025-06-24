'use client'

import { maruburi_bold } from "../lib/localfont"
import { Post } from "../lib/type"
import clsx from "clsx"

export default function Note({
  post
}: {
  post: Post
}) {
  return (
    <>
      <h1 className={`text-3xl ${maruburi_bold.className}`}>{post?.title}</h1>
      <div>
        <div>{post.content?.document.map((document, idx) => (
          <div
            key={idx}
            className={clsx(
              "text-[17px]",
              document.type === "heading" && document.level === 2 && `!text-xl mb-2 ${maruburi_bold.className}`,
            )}
          >
            {document.children?.[0]?.text}
          </div>
        ))}</div>
      </div>
    </>
  )
}

// post.content?.document?.[0]?.children?.[0]?.text