'use client'

import ParamKwButton from "./atoms/param-kw-button";

const keywords = ['nextjs', 'astro', '에러', 'rich text', '독일',
  '교환학생', 'headlesscms', 'chatgpt', '웹', 'vps', '타이포그래피', '여행',
]

export default function InspectKeyword() {
  return (
    <>
      <div className="w-72 flex gap-1 flex-wrap py-1 pointer-events-auto">
        <ParamKwButton keywords={keywords} />
      </div>
    </>
  )
}