'use client'

import { usePathname } from "next/navigation";
import clsx from "clsx";
import { maruburi } from "@/app/lib/localfont";
import HyperlinkMap from "./hyperlink-map";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function NoteSection({
  children,
}: {
  children: React.ReactNode,
}) {
  const rootPath = usePathname().split('/').slice(1, 2).toString();
  const [isFullPage, setIsFullPage] = useState(false);
  
  return (
    <section
      className={clsx(
        `${maruburi.className}`,
        "absolute right-8 w-[calc(100%-25rem)] border-t border-text-700 overflow-y-scroll overflow-visible pt-8 pl-8 bg-background transition-all duration-1000 ease-in-out",
        rootPath ? 'block' : 'hidden',
        isFullPage ? 'h-[calc(100%-8rem)] top-[8rem]' : 'h-1/2 top-1/2',
      )}
    >
      <HyperlinkMap isFullPage={isFullPage} />
      {children}
      <button
        className={clsx(
          "fixed right-16 w-10 h-10 flex items-center justify-center bg-background border-t border-l border-r border-text-700 rounded-t-sm transition-all duration-1000 ease-in-out",
          isFullPage ? 'top-[6rem]' : 'top-[calc(50vh-2rem)]'
        )}
        onClick={() => setIsFullPage(!isFullPage)}
      >
        {isFullPage ?
          <ChevronDown  className="text-text-800 hover:text-text-700 w-5 h-5 transition-color duration-300" />
          :
          <ChevronUp  className="text-text-800 hover:text-text-700 w-5 h-5 transition-color duration-300" />
        }
      </button>
    </section>
  )
}