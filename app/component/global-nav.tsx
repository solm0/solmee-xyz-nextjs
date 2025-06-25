'use client'

import ExpandButton from "./expand-button";
import ParamButton from './param-button';
import EnableButton from "./enable-button";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from 'react';
import ThemeButton from "./theme-button";

const components = [
  {
    value: 'note-inspector',
    name: '노트 탐색기',
  },
  {
    value: 'hyperlink-map',
    name: '하이퍼링크 지도',
  }
]
export default function GlobalNav() {
  const newParams = new URLSearchParams(useSearchParams().toString());
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    newParams.set("menu", 'rand');
    router.push(`${pathname}?${newParams.toString()}`);
  }, [])

  return (
    <nav className="h-auto w-full flex flex-col gap-1 items-start text-sm">
      <ExpandButton name="solmee.xyz">
        <ParamButton param="rand" name="무작위" />
        <ParamButton param="chron" name="작성일 순서" />
        <ParamButton param="graphic" name="그래픽" />
      </ExpandButton>

      <ParamButton param="meta" name="대해서" backbutton={true} />

      <ThemeButton />

      {components.map((cmp, idx) =>
        <EnableButton key={idx} value={cmp} />
      )}
    </nav>
  )
}