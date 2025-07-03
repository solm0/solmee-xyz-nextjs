'use client'

import { Post } from "../lib/type";
import { maruburi_bold } from '@/app/lib/localfont';
import { useSearchParams } from "next/navigation";
import { useHoveredLink } from "@/app/lib/use-hovered-link";
import Link from "next/link";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function RingLinks({
  id,
  links,
  backlink,
}: {
  id: string;
  links: Post[] | null;
  backlink: Post;
}) {
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  const setHoveredId = useHoveredLink((state) => state.setId);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className={`text-sm relative flex flex-col gap-3 w-full h-auto items-start text-text-900 bg-button-50 border border-text-600 px-4 py-4 rounded-sm -left-4`}>
      <div className="flex gap-3 items-center">
        <ChevronDown
          className={clsx(
            "w-5 h-5",
            isOpen && '-scale-100'
          )}
          onClick={() => setIsOpen(!isOpen)}
        />
        <Link
          href={`${backlink.id}/?${newParams}`}
          target="_self"
          onMouseEnter={() => {
            if (backlink.id === id) {
              setHoveredId(null, null);
            } else {
              setHoveredId(backlink.title || null, backlink.id || null, false);
            }
          }}
          onMouseLeave={() => setHoveredId(null, null)}
          onClick={() => setHoveredId(null, null)}
          className={clsx(
            backlink.id === id ? `${maruburi_bold.className} pointer-events-none` : 'pointer-events-auto text-text-800 hover:text-text-700 transition-colors duration-300'
          )}
        >
          {backlink.title}
        </Link>
      </div>

      {isOpen &&
        <div className="flex flex-col ml-8">
          {links && links.map((link) => (
              <Link
                key={link.id}
                href={`${link.id}/?${newParams}`}
                target="_self"
                onMouseEnter={() => {
                  if (link.id === id) {
                    setHoveredId(null, null);
                  } else {
                    setHoveredId(link.title || null, link.id || null, false);
                  }
                }}
                onMouseLeave={() => setHoveredId(null, null)}
                onClick={() => setHoveredId(null, null)}
                className={clsx(
                  'leading-7 flex items-center',
                  link.id === id ? `${maruburi_bold.className} pointer-events-none` : 'pointer-events-auto text-text-800 hover:text-text-700 transition-colors duration-300'
                )}
              >
                {link.title}
              </Link>
          ))}
        </div>
      }
      
    </section>
  )
}