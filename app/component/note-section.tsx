'use client'

import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { maruburi } from "@/app/lib/localfont";
import { useEffect } from "react";

export default function NoteSection({
  children,
}: {
  children: React.ReactNode,
}) {
  const rootPath = usePathname().split('/').slice(1, 2).toString();
  const searchParams = useSearchParams();

  useEffect(() => {
    const page: HTMLElement | null = document.getElementById('note_section');
    const wrapper: HTMLElement | null = document.getElementById('note_wrapper');

    if (!page) return;
    
    page.scrollTo({
      top: 0,
    });
    wrapper?.scrollTo({
      top: 0,
    })
  }, [rootPath]);

  const tags = searchParams.get('tag');
  const search = searchParams.get('search');
  const keywords = searchParams.getAll('keywords');

  useEffect(() => {
    const wrapper: HTMLElement | null = document.getElementById('note_wrapper');
    
    wrapper?.scrollTo({
      top: 0,
    })
  }, [tags, search, keywords]);
  
  return (
    <div
      id="note_wrapper"
      className="absolute top-0 w-full h-screen overflow-y-scroll pointer-events-none"
    >
      <section
        id="note_section"
        className={clsx(
          `${maruburi.className}`,
          "absolute left-0 right-8 w-full mt-[50vh] border-b border-t border-text-600 pt-8 pl-8 pr-8 bg-background transition-all duration-1000 ease-in-out pointer-events-auto",
          rootPath ? 'block' : 'hidden',
        )}
      >
        {children}
      </section>
    </div>
  )
}