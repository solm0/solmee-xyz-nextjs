'use client'

import { InternalLinkNode } from "@/app/lib/type";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useHoveredLink } from "@/app/lib/use-hovered-link";

export default function InlineInternalLink({
  internalLink,
}: {
  internalLink: InternalLinkNode;
}) {
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  const setHoveredId = useHoveredLink((state) => state.setId);

  return (
    <span>
      <Link
        href={`${internalLink.id}/?${newParams}`}
        target="_self"
        className="inline underline underline-offset-6 decoration-text-900 decoration-[1px] hover:text-text-700 hover:decoration-text-700 hover:cursor-ne-resize transition-colors duration-300"
        onMouseEnter={() => setHoveredId(internalLink.children?.[0].title || null, internalLink.id || null, true)}
        onMouseLeave={() => setHoveredId(null, null)}
        onClick={() => setHoveredId(null, null)}
        style={{ display: 'inline' }}
      >
        {internalLink.children?.[0].text}
      </Link>
    </span>
  )
}