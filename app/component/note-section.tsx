'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { maruburi } from "@/app/lib/localfont";
import { useEffect, useRef, useState } from "react";

export default function NoteSection({
  children,
}: {
  children: React.ReactNode,
}) {
  const router = useRouter();
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

  // 현재 스크롤 위치가 끝임 && 아래쪽으로 사용자가 끌어내리려 함 -> router.push(뒤로)
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isEnd, setIsEnd] = useState(false);
  
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      const validScroll = scrollEl.scrollHeight > scrollEl.clientHeight;
      if (!validScroll) return;

      const atBottom = scrollEl.scrollHeight - scrollEl.scrollTop <= scrollEl.clientHeight;
      // console.log(scrollEl.scrollHeight, scrollEl.scrollTop, scrollEl.clientHeight)

      if (atBottom) {
        // console.log('setIsEnd to true')

        setTimeout(() => {
          setIsEnd(true);
        }, 1000);
      } else {
        setIsEnd(false);
      }
    };

    if (rootPath === '') {
      // console.log('rootPath no');
      return;
    }

    const timeout = setTimeout(() => {
      // console.log('add event after wating')
      scrollEl.addEventListener('scroll', handleScroll);
      handleScroll();
    }, 3000);

    return () => {
      clearTimeout(timeout);
      scrollEl.removeEventListener('scroll', handleScroll);
    };
  }, [rootPath]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // console.log(isEnd);
    if (e.deltaY > 0 && isEnd) {
      const newParams = new URLSearchParams(window.location.search);
      router.push(`/?${newParams.toString()}`);
      setIsEnd(false)
    }
  }
  
  return (
    <div
      id="note_wrapper"
      ref={scrollRef}
      onWheel={(e) => handleWheel(e)}
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