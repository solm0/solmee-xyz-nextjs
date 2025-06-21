'use client'

import clsx from "clsx"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import SwitchField from "./switch-button";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentKeywords = searchParams.getAll("keyword");

  const handleClick = (kw: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (currentKeywords.includes(kw)) {
      const updated = currentKeywords.filter(keyword => keyword !== kw);
      newParams.delete("keyword");
      updated.forEach(keyword => newParams.append("keyword", keyword));
    } else {
      newParams.append("keyword", kw);
    }

    router.push(`${pathname}?${newParams.toString()}`);
  }

  return (
    <>
      <div className="w-72 flex gap-1 flex-wrap py-1">
        {keywords.map((kw, idx) => (
          <button
            key={idx}
            className={clsx(
              "w-auto h-8 text-text-900 font-medium px-3 flex items-center rounded-sm hover:brightness-97 transition-[filter, colors] duration-300",
              currentKeywords.includes(kw) ? "bg-selected-500" : "bg-button-100",
            )}
            onClick={() => handleClick(kw)}
          >
            {kw}
          </button>
        ))}
      </div>
      
      <div className="flex w-full h-8 gap-1 text-text-800 items-center">
        <SwitchField value={keyword_base} />
      </div>
    </>
  )
}