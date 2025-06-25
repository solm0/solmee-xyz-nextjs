'use client'

import clsx from 'clsx';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useHoveredLiquidStore } from '../lib/use-hovered-liquid-store';
import { useEffect, useState } from 'react';
import { Tag } from '../lib/type';

export default function InspectTag({
  tags
}: {
  tags: Tag[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const hoveredTag = useHoveredLiquidStore((state) => state.value)
  const offsetX = useHoveredLiquidStore((state) => state.offsetX)
  const width = useHoveredLiquidStore((state) => state.width)
  const setHoveredTag = useHoveredLiquidStore((state) => state.setValue);

  const currentTag = searchParams.get("tag");

  // 클릭한 태그 저장
  const [tag, setTag] = useState<string | null>(null);

  const handleClick = (tag: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (tag === currentTag) {
      setTag(null);
      newParams.delete("tag");
      router.push(`${pathname}?${newParams.toString()}`);
    } else {
      setTag(tag);
      newParams.set("tag", tag);
      router.push(`${pathname}?${newParams.toString()}`);
    }
  }

  // 호버한 태그
  const updateHandlePosition = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetX = Math.floor(rect.left);
    const width = rect.width;
    setHoveredTag(value, offsetX, width)
  };

  // 현재 호버중인 태그 없으면 직전에 클릭했던 태그
  useEffect(() => {
    if (!hoveredTag && tag) {
      const el = document.getElementById(tag);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      setHoveredTag(tag, Math.floor(rect.left), rect.width);
    } else return;
  }, [hoveredTag]);

  // 그것도 없으면 url에 있는 태그
  useEffect(() => {
    if (!hoveredTag && !tag) {
      setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        const currentTag = params.get("tag");
        if (!currentTag) return;
  
        const el = document.getElementById(currentTag);
        if (!el) return;
  
        const rect = el.getBoundingClientRect();
        setHoveredTag(currentTag, Math.floor(rect.left), rect.width);
      }, 30);
    }
  }, [hoveredTag, setHoveredTag]);

  

  return (
    <div
      id='tag-input'
      className='h-auto w-auto px-1 py-1 border border-text-700 rounded-sm flex gap-1'
      onMouseLeave={() => setHoveredTag(null, null, null)}
    >
      {tags.map((tag, idx) => (
        <div
          key={idx}
          id={tag.name}
          className='h-8 px-3 flex items-center justify-center rounded-sm text-text-900 font-medium'
          onClick={() => handleClick(tag.name)}
          onMouseOver={(e) => updateHandlePosition(e, tag.name)}
        >
          <label htmlFor={`${tag.name}-input`}>{tag.name}</label>
          <input
            id={`${tag.name}-input`}
            type='radio'
            value={tag.name}
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