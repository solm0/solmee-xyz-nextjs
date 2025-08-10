import ExpandButton from "./atoms/expand-button";
import { Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-8 left-0 px-8 w-full h-8 flex justify-center z-80">
      <div className={`h-8 w-auto flex gap-2 text-sm`}>
        <FilterIcon />
        <LinkButton href="" name="solmee.xyz" />
        <LinkButton href="blog" name="블로그" />
        <LinkButton href="work" name="작업" />
        <SettingsIcon />
      </div>
    </header>
  );
}

// import { Funnel } from "lucide-react";
import EnableButton from "./atoms/enable-button";
import ThemeButton from "./atoms/theme-button";
import LinkButton from "./atoms/link-button";

const filterCmp = {
  value: 'note-inspector',
  name: '노트 탐색기',
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