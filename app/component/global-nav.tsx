'use client'

import { Settings } from 'lucide-react'
import ExpandButton from "./expand-button";
import LinkButton from "./link-button";
import SwitchField from "./switch-button";
import EnableButton from "./enable-button";

const settings = [
  {
    value: 'theme',
    name: '테마',
    options: [
      {
        value: "day",
        name: '낮',
      },
      {
        value: "night",
        name: '밤',
      }
    ]
  },
  {
    value: 'music',
    name: '음악',
    options: [
      {
        value: "on",
        name: '켬',
      },
      {
        value: "off",
        name: '끔',
      }
    ]
  },
]

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
  return (
    <nav className="mt-1 h-auto w-full flex flex-col gap-1 items-start text-sm">
      <ExpandButton name="solmee.xyz">
        <LinkButton href="/" name="무작위" />
        <LinkButton href="/chron" name="작성일 순서" />
        <LinkButton href="/graphic" name="그래픽만" />
      </ExpandButton>

      <LinkButton href="/meta" name="대해서" backbutton={true} />

      <ExpandButton name={<Settings className="w-4 h-4" />}>
        {settings.map((field, idx) => (
          <SwitchField key={idx} value={field} />
        ))}
      </ExpandButton>

      {components.map((cmp, idx) =>
        <EnableButton key={idx} value={cmp} />
      )}
    </nav>
  )
}