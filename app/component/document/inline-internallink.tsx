'use client'

import { RelationshipNode } from "@/app/lib/type";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useHoveredLink } from "@/app/lib/use-hovered-link";

export default function InlineInternalLink({
  internalLink,
}: {
  internalLink: RelationshipNode;
}) {
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  const setHoveredId = useHoveredLink((state) => state.setId);

  return (
    <span>
      <Link
        href={`${internalLink.data.id}/?${newParams}`}
        target="_self"
        className="underline underline-offset-6 decoration-text-900 decoration-[1px] hover:text-text-700 hover:decoration-text-700 hover:cursor-ne-resize transition-colors duration-300"
        onMouseEnter={() => setHoveredId(internalLink.data.data?.title || null, internalLink.data.data?.id || null, true)}
        onMouseLeave={() => setHoveredId(null, null)}
        onClick={() => setHoveredId(null, null)}
      >
        {internalLink.data.label}
      </Link>
    </span>
  )
}