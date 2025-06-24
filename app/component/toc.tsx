'use client'

import { useState } from "react";
import { Post } from "../lib/type"
import clsx from "clsx";
import { pretendard } from "../lib/localfont";

export default function Toc({
  post,
}: {
  post: Post;
}) {
  // heading 뽑아내서 매핑하기
  const headings: string[] = [];

  post.content?.document.map((doc) => {
    if (doc.type === "heading") {
      headings.push(doc.children?.[0]?.text || 'undefined heading')
    }
  })

  // 근데 링크를 할려면 heading마다 id를 만들어줘야 하는데 text, level, type밖에 없으니...
  // keystone으로 heading에 id를 만들어줄 수 있나? 아니지 노트 컴포넌트에서 상태 이용해 id 달아주면 되지

  // active heading 감지, 적용

  // hover 감지, 적용

  const [isVisible, setIsVisible] = useState(false);

  return (
    <nav
      className={clsx(
        `${pretendard.className} text-sm`,
        "w-auto h-auto fixed top-[calc(50vh+3rem)] right-3 z-90",
      )}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {headings.map((heading, idx) => (
        <div key={idx} className="flex items-center gap-4 justify-end">
          <p
            className={clsx(
              "transition-opacity duration-300 leading-8 truncate bg-background rounded-sm px-2",
              isVisible ? "opacity-100" : 'opacity-0'
            )}
          >
            {heading}
          </p>
          <div
            className="w-2 h-2 bg-button-200 rounded-full"
            
          ></div>
        </div>
      ))}
    </nav>
  )
}