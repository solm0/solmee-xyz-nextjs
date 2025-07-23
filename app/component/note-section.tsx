'use client'

import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { maruburi } from "@/app/lib/localfont";
import { useEffect, useMemo } from "react";

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

  const tags = useMemo(() => searchParams.get('tag'), [searchParams]);
  const search = useMemo(() => searchParams.get('search'), [searchParams]);
  const keywords = useMemo(() => searchParams.getAll('keywords'), [searchParams]);

  useEffect(() => {
    const wrapper: HTMLElement | null = document.getElementById('note_wrapper');
    wrapper?.scrollTo({
      top: 0,
    })
  }, [tags, search, keywords.join(',')]);

  useEffect(() => {
    const wrapper = document.getElementById('note_wrapper');
    if (!wrapper) return;
  
    const enableScroll = () => wrapper.classList.add('overflow-y-scroll');
    const disableScroll = () => wrapper.classList.remove('overflow-y-scroll');
  
    // Desktop
    wrapper.addEventListener('mouseenter', enableScroll);
    wrapper.addEventListener('mouseleave', disableScroll);
  
    // Mobile
    wrapper.addEventListener('touchstart', enableScroll);
    wrapper.addEventListener('touchend', disableScroll);
    wrapper.addEventListener('touchcancel', disableScroll); // fallback for interrupted gestures
  
    return () => {
      wrapper.removeEventListener('mouseenter', enableScroll);
      wrapper.removeEventListener('mouseleave', disableScroll);
      wrapper.removeEventListener('touchstart', enableScroll);
      wrapper.removeEventListener('touchend', disableScroll);
      wrapper.removeEventListener('touchcancel', disableScroll);
    };
  }, []);
  
  return (
    <div
      id="note_wrapper"
      className="absolute top-0 w-full h-screen overflow-y-hidden pointer-events-none"
    >
      <section
        id="note_section"
        className={clsx(
          `${maruburi.className}`,
          "absolute left-0 right-8 w-full mt-[50vh] border-b border-t border-text-600 pt-8 md:pl-8 md:pr-8 bg-background transition-all duration-1000 ease-in-out pointer-events-auto",
          rootPath ? 'block' : 'hidden',
        )}
      >
        {children}
      </section>
    </div>
  )
}