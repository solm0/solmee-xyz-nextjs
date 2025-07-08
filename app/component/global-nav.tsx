'use client'

import ExpandButton from './atoms/expand-button';
import ParamButton from './atoms/param-button';
import EnableButton from './atoms/enable-button';
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from 'react';
import ThemeButton from "./atoms/theme-button";

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
    newParams.set("menu", '무작위');
    router.push(`${pathname}?${newParams.toString()}`);
  }, [])

  return (
    <nav className="h-auto w-full flex flex-col gap-1 items-start text-sm">
      <ExpandButton name="solmee.xyz" >
        <ParamButton name="무작위" />
        <ParamButton name="최신순" />
        <ParamButton name="그래픽" />
      </ExpandButton>

      <ParamButton name="대해서" backbutton={true} />

      <ThemeButton />

      {components.map((cmp, idx) =>
        <EnableButton key={idx} value={cmp} />
      )}
    </nav>
  )
}