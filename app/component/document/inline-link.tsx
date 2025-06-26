import { LinkNode } from "@/app/lib/type";
import Link from "next/link";
import InlineText from "./inline-text";

export default function InlineLink({
  link,
}: {
  link: LinkNode;
}) {
  return (
    <span className="inline">
      <Link
        href={link.href || ''}
        target="_blank" // 내부 외부 링크 차이
        className="underline underline-offset-6 decoration-text-900 decoration-[1px] hover:text-text-700 hover:decoration-text-700 transition-colors duration-300"
      >
        {link.children?.map((child, idx) => 
          <InlineText key={idx} text={child} />
        )}
      </Link>
    </span>
  )
}