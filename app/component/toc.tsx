'use client'

import { useEffect, useRef, useState } from "react";
import { Post, FormattedText } from "../lib/type"
import clsx from "clsx";
import { pretendard } from "../lib/localfont";
import { slugify } from "../lib/slugify";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type Heading = {
  slug: string;
  text: string;
};

export function useIntersectionObserver(
  headings: Heading[] | undefined,
  setActiveHeading: (id: string | null) => void
) {
  const headingRef = useRef<Record<string, IntersectionObserverEntry>>({});

  useEffect(() => {
    if (!headings) return;
    const headingElements: HTMLElement[] = headings
      .map(({ slug }) => document.getElementById(slug))
      .filter((el): el is HTMLElement => el !== null); // Type narrowing

    const callback: IntersectionObserverCallback = (entries) => {
      headingRef.current = entries.reduce((map, entry) => {
        map[entry.target.id] = entry;
        return map;
      }, {} as Record<string, IntersectionObserverEntry>);

      const visibleHeadings = entries.filter((entry) => entry.isIntersecting);

      if (visibleHeadings.length >= 1) {
        setActiveHeading(visibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px -40% 0px",
    });

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [headings, setActiveHeading]);
}

export default function Toc({
  post,
}: {
  post: Post;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // heading 뽑아내서 매핑하기
  const headings: Heading[] | undefined = post.content?.document
  .filter(doc => doc.type === "heading" && [2, 3].includes(doc.level))
  .map(doc => {
    const text = (doc.children?.[0] as FormattedText).text || 'undefined-heading';
    return {
      slug: slugify(text),
      text: text
    };
  });

  const [isVisible, setIsVisible] = useState(false);
  const [hoverHeading, setHoverHeading] = useState<string | null>();

  // active heading 감지, 스크롤
  const [activeHeading, setActiveHeading] = useState<string | null>();
  
  useIntersectionObserver(headings, setActiveHeading);

  return (
    <nav
      className={clsx(
        `${pretendard.className} text-xs`,
        "w-20 overflow-visible flex flex-col h-auto fixed top-[calc(50vh+3rem)] right-3 z-90 text-text-90",
      )}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {headings && headings.map(({ slug, text }, idx) => (
        <div
          key={idx}
          className="absolute right-0 w-auto flex items-center gap-4 justify-end cursor-pointer"
          style={{ top: `calc(2rem * ${idx})` }}
          onMouseEnter={() => setHoverHeading(slug)}
          onMouseLeave={() => setHoverHeading(null)}
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById(slug);
            const page = document.getElementById('note_wrapper');

            if (el && page) {
              const containerTop = page.getBoundingClientRect().top;
              const elementTop = el.getBoundingClientRect().top;

              const offset = elementTop - containerTop + page.scrollTop - 80;

              page.scrollTo({
                top: offset,
                behavior: 'smooth',
              });

              router.replace(`${pathname}?${searchParams}#${text.replace(/ /g, "-")}`, { scroll: false });
            }
          }}
        >
          <p
            className={clsx(
              "leading-8 truncate bg-background rounded-sm px-2 transition-all duration-300",
              !isVisible ? 'opacity-0' : 
              slug === hoverHeading ? 'opacity-100': 'text-text-700'
            )}
          >
            {text}
          </p>
          <div className="flex items-center justify-center w-3 h-3">
            <div
              className={clsx(
                "rounded-full transition-all duration-300",
                slug === hoverHeading ? 'bg-green-500' : 'bg-button-200',
                slug === activeHeading ? 'w-[12px] h-[12px]': 'w-[5px] h-[5px]'
              )}
            ></div>
          </div>
        </div>
      ))}
    </nav>
  )
}