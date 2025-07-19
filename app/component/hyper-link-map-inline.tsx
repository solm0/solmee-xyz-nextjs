'use client'

import { useEffect } from "react";
import { useToggleStore } from "../lib/use-enabled";
import { pretendard } from "../lib/localfont";
import clsx from "clsx";

export default function HyperlinkMapInline({
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
      `${pretendard.className} md:hidden relative top-0 flex flex-col gap-1 text-text-900 text-sm w-auto max-w-80 h-auto`,
      isEnabled ? 'block' : 'hidden',
    )}>
      {children}
    </nav>
  )
}