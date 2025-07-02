'use client'

import { Post } from "../lib/type";
import { pretendard } from '@/app/lib/localfont';
import { useSearchParams } from "next/navigation";
import { useHoveredLink } from "@/app/lib/use-hovered-link";
import Link from "next/link";
import clsx from "clsx";

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

  return (
    <section className={`relative ${pretendard.className} flex flex-col gap-1 w-full h-auto items-start text-text-900 text-sm bg-button-50 px-4 py-3 rounded-sm border border-text-600 -left-4`}>
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
          backlink.id === id ? 'pointer-events-none text-text-700' : 'pointer-events-auto text-text-800 hover:text-text-700'
        )}
      >
        {backlink.title}
      </Link>
      <ul>
        {links && links.map((link) => (
          <li key={link.id} className="list-disc list-inside">
            <Link
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
                link.id === id ? 'pointer-events-none text-text-700' : 'pointer-events-auto text-text-800 hover:text-text-700'
              )}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
      
    </section>
  )
}