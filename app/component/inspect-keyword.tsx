'use client'

import ParamKwButton from "./atoms/param-kw-button";

const keywords = ['Next.js', 'Astro', '에러', 'Rich Text', '독일',
  '교환학생', 'HeadlessCMS', 'chatGPT', '웹', 'VPS', '타이포그래피'
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