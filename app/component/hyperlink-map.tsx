'use client'

import { useEffect } from "react";
import { useToggleStore } from "../lib/use-enabled";
import { ChevronLeft, ChevronRight, Expand, Locate } from 'lucide-react';
import { pretendard } from "../lib/localfont";
import clsx from "clsx";

export default function HyperlinkMap() {
  const initializeToggles = useToggleStore((s) => s.initializeToggles);

  useEffect(() => {
    initializeToggles();
  }, [initializeToggles]);

  const isEnabled = useToggleStore((s) => s.toggles['hyperlinkMap']);

  return (
    <nav className={clsx (
      `${pretendard.className} fixed top-15 right-8 flex flex-col gap-1 text-text-900 text-sm w-auto h-auto transition-all duration-200 ease-[cubic-bezier(0.75,0.05,0.45,0.95)] z-80`,
      isEnabled ? 'translate-x-0' : 'translate-x-96',
    )}>
      <div className="w-80 h-80 border text-text-800 border-text-600 flex items-center justify-center rounded-sm backdrop-blur-md">
        아직 그래프가 없습니다ㅠ<br/>
        아래 버튼도 가짜예요ㅠ
      </div>
      <div className="flex w-full justify-between">
        <div className="flex gap-1 items-center">
          <button className="px-2 py-2 rounded-sm hover:brightness-97 transition-filter duration-300 backdrop-blur-sm">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <p className="px-2">2</p>
          <button className="px-2 py-2 rounded-sm hover:brightness-97 transition-filter duration-300 backdrop-blur-sm">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-1 items-center">
          <button className="px-2 py-2 rounded-sm hover:brightness-97 transition-filter duration-300 backdrop-blur-sm">
            <Locate className="w-4 h-4"/>
          </button>
          <button className="px-2 py-2 rounded-sm hover:brightness-97 transition-filter duration-300 backdrop-blur-sm">
            <Expand className="w-4 h-4"/>
          </button>
        </div>
      </div>
    </nav>
  )
}