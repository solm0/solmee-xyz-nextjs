'use client'

import clsx from 'clsx';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useHoveredLiquidStore } from '../lib/use-hovered-liquid-store';
import { useEffect, useState } from 'react';

export default function InspectTag({
  tags
}: {
  tags: {value: string; name: string}[]
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const hoveredTag = useHoveredLiquidStore((state) => state.value)
  const offsetX = useHoveredLiquidStore((state) => state.offsetX)
  const width = useHoveredLiquidStore((state) => state.width)
  const setHoveredTag = useHoveredLiquidStore((state) => state.setValue);

  // optimistic ui
  const [tag, setTag] = useState<string | null>(null);

  const handleClick = (tag: string) => {
    setTag(tag);
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set("tag", tag);
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const updateHandlePosition = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetX = Math.floor(rect.left);
    const width = rect.width;
    setHoveredTag(value, offsetX, width)
  };

  useEffect(() => {
    if (!hoveredTag && tag) {
      const el = document.getElementById(tag);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      setHoveredTag(tag, Math.floor(rect.left), rect.width);
    } else return;
  }, [hoveredTag]);

  return (
    <div
      id='tag-input'
      className='h-auto w-auto px-1 py-1 border border-text-700 rounded-sm flex gap-1'
      onMouseLeave={() => setHoveredTag(null, null, null)}
    >
      {tags.map((tag, idx) => (
        <div
          key={idx}
          id={tag.value}
          className='h-8 px-3 flex items-center justify-center rounded-sm text-text-900 font-medium'
          onClick={() => handleClick(tag.value)}
          onMouseOver={(e) => updateHandlePosition(e, tag.value)}
        >
          <label htmlFor={`${tag.value}-input`}>{tag.name}</label>
          <input
            id={`${tag.value}-input`}
            type='radio'
            value={tag.value}
            className='opacity-0 hidden'
          />
        </div>
      ))}
      <span
        className={clsx(
          'absolute h-8 rounded-sm bg-selected-500 -z-10 pl-1 transition-all duration-300 ease-in-out',
          hoveredTag ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          left: `${offsetX!-32}px`,
          width: `${width}px`,
        }}
      >
      </span>
    </div>
  )
}