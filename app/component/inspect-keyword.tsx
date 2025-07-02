'use client'

import SwitchField from "./atoms/switch-button";
import ParamKwButton from "./atoms/param-kw-button";

const keywords = ['Next.js', 'Astro', '에러', 'Rich Text', '독일',
  '교환학생', 'HeadlessCMS', 'chatGPT', '웹', 'VPS', '타이포그래피'
]

const keyword_base = {
  value: 'base',
  name: '추천 기준',
  options: [
    {
      value: "tag",
      name: '태그와 문자열'
    },
    {
      value: 'note',
      name: '현재 노트'
    }
  ]
}

export default function InspectKeyword() {
  return (
    <>
      <div className="w-72 flex gap-1 flex-wrap py-1">
        <ParamKwButton keywords={keywords} />
      </div>
      
      <div className="flex w-full h-8 gap-1 text-text-800 items-center">
        <SwitchField value={keyword_base} />
      </div>
    </>
  )
}