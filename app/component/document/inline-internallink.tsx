'use client'

import { RelationshipNode } from "@/app/lib/type";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function InlineInternalLink({
  internalLink,
}: {
  internalLink: RelationshipNode;
}) {
  const pathname = usePathname();
  console.log(internalLink)

  return (
    <span>
      <Link
        href={`${pathname}/${internalLink.data.id}`}
        target="_self"
        className="underline underline-offset-6 decoration-text-900 decoration-[1px] hover:text-text-700 hover:decoration-text-700 transition-colors duration-300"
      >
        {internalLink.data.label}
      </Link>
    </span>
  )
}