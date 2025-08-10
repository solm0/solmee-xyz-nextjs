import ExpandButton from "./atoms/expand-button";
import { Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-8 left-[50%] backdrop-blur-2xl flex items-center justify-center -translate-x-[50%] px-3 rounded-sm w-auto h-8 z-70">
      <div className={`h-4 w-auto flex gap-4 text-sm items-center`}>
        <FilterIcon />
        <LinkButton href="" name="solmee.xyz" />
        <LinkButton href="blog" name="블로그" />
        <LinkButton href="work" name="작업" />
        <SettingsIcon />
      </div>
    </header>
  );
}

import { Funnel } from "lucide-react";
import EnableButton from "./atoms/enable-button";
import ThemeButton from "./atoms/theme-button";
import LinkButton from "./atoms/link-button";

const filterCmp = {
  value: 'note-inspector',
  name: <Funnel className="w-4 h-4" />
}

export function FilterIcon(){
  return (
    <EnableButton value={filterCmp} />
  )
}

const cmp = {
  value: 'hyperlink-map',
  name: '하이퍼링크 지도',
}

export function SettingsIcon() {
  return (
    <ExpandButton name={<Settings className="w-4 h-4 shrink-0"/>}>
      <ThemeButton />
      <EnableButton value={cmp} />
    </ExpandButton>
  )
}