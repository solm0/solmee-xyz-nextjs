'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import clsx from 'clsx';

export default function ParamKwButton({
  keywords,
}: {
  keywords: string[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentKeywords = searchParams.getAll("keyword");

  const handleClick = (kw: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (currentKeywords.includes(kw)) {
      const updated = currentKeywords.filter(keyword => keyword !== kw);
      newParams.delete("keyword");
      updated.forEach(keyword => newParams.append("keyword", keyword));
    } else {
      newParams.append("keyword", kw);
    }

    router.push(`${pathname}?${newParams.toString()}`);
  }

  return (
    keywords.map((kw, idx) => (
      <button
      key={idx}
      className={clsx(
        "w-auto h-8 text-text-900 font-medium px-3 flex items-center rounded-sm hover:brightness-97 transition-[filter, colors] duration-300",
        currentKeywords.includes(kw) ? "bg-green-500" : "bg-button-100",
      )}
      onClick={() => handleClick(kw)}
    >
      {kw}
    </button>
    ))
  )
}