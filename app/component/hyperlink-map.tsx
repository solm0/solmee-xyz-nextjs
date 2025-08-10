'use client'

import { useEffect } from "react";
import { useToggleStore } from "../lib/use-enabled";
import { pretendard } from "../lib/localfont";
import clsx from "clsx";

export default function HyperlinkMap({
  children,
}: {
  children: React.ReactNode;
}) {
  const initializeToggles = useToggleStore((s) => s.initializeToggles);

  useEffect(() => {
    initializeToggles();
  }, [initializeToggles]);

  const isEnabled = useToggleStore((s) => s.toggles['hyperlinkMap']);

  return (
    <nav className={clsx (
      `${pretendard.className} fixed top-19 right-8 md:flex flex-col gap-1 text-text-900 text-sm w-auto h-auto transition-all duration-200 ease-[cubic-bezier(0.75,0.05,0.45,0.95)] z-10 hidden`,
      isEnabled ? 'translate-x-0' : 'translate-x-96',
    )}>
      {children}
    </nav>
  )
}