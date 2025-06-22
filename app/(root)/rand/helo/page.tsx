'use client'

import clsx from "clsx"
import { usePathname } from "next/navigation"
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "solmee.xyz",
//   description: "홈",
// };

export default function Rand() {
  const subPath = usePathname().split('/').slice(2, 3).toString();

  return (
    <div className={clsx(
      "absolute right-8 h-1/2 top-1/2 w-[calc(100%-25rem)] overflow-hidden border-t border-text-700",
      subPath ? 'block' : 'hidden'
    )}>
      hello
    </div>
  )
}