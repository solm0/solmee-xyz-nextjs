'use client'

import { usePathname } from "next/navigation";
import clsx from "clsx";
import { maruburi } from "@/app/lib/localfont";

export default function NoteSection({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const rootPath = pathname.split('/').slice(1, 2).toString();

  let subPath = false;

  if (rootPath === 'meta') {
    if (pathname.split('/').slice(2, 3).toString()) {
      subPath = true;
    }
  } else if (rootPath === 'graph') {
    return;
  } else if (rootPath) {
    subPath = true;
  } else return;

  return (
    // isFull -> 스크롤여부, 높이
    <section className={clsx(
        `${maruburi.className}`,
        "absolute right-8 h-1/2 top-1/2 w-[calc(100%-25rem)] overflow-hidden border-t border-text-700 pt-8 pl-8",
        subPath ? 'block' : 'hidden',
      )}>
        {children}
    </section>
  )
}