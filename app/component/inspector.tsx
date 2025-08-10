'use client'

import { Tag as TagIcon, Search, Key } from 'lucide-react';
import InspectTag from './inspect-tag';
import InspectSearch from './inspect-search';
import InspectKeyword from './inspect-keyword';
import { Suspense, useEffect } from 'react';
import clsx from 'clsx';
import { useToggleStore } from '../lib/use-enabled';
import { Tag, KeywordsByTag, Post } from '../lib/type';
import GenerateChron from "../lib/gererate-chron";
import InspectResultList from "./inspect-result-list";
import { useSearchParams } from "next/navigation";
import filterPosts from "../lib/filter-posts";

export function FilterComponents({
  icon,
  cmp,
  children
}: {
  icon?: React.ReactNode,
  cmp: {value?: string, name: string},
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col gap-1 w-full items-start select-none'>
      <label
        className='flex items-center gap-2 text-text-800'
        htmlFor={`${cmp.value}-input`}
      >
        {icon}
        {cmp.name}
      </label>
      {children}
    </div>
  )
}

export default function Inspector({
  posts,
  tags,
  kwByTag
}: {
  posts: Post[];
  tags: Tag[];
  kwByTag: KeywordsByTag;
}) {
  const initializeToggles = useToggleStore((s) => s.initializeToggles);

  useEffect(() => {
    initializeToggles();
  }, [initializeToggles]);

  const isEnabled = useToggleStore((s) => s.toggles['noteInspector'])

  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const search = searchParams.get("search");
  const keywords = searchParams.getAll("keyword");

  const finalPosts = filterPosts({ posts: GenerateChron(posts), tag, search, keywords });

  return (
    <section
      className={clsx(
      "h-full w-full flex flex-col gap-8 items-start text-sm transition-transform duration-200 ease-[cubic-bezier(0.75,0.05,0.45,0.95)]",
      isEnabled ? 'translate-x-0 block' : '-translate-x-88 hidden md:block'
    )}>
      <Suspense>
        <FilterComponents
          icon={<TagIcon className='w-3 h-3' />}
          cmp={{ value: 'tag', name: '태그' }}
        >
          <InspectTag tags={tags} />
        </FilterComponents>

        <FilterComponents
          icon={<Search className='w-3 h-3' />}
          cmp={{ value: 'search', name: '문자열' }}
        >
          <InspectSearch />
        </FilterComponents>

        <FilterComponents
          icon={<Key className='w-3 h-3' />}
          cmp={{ value: 'keyword', name: '키워드' }}
        >
          <InspectKeyword kwByTag={kwByTag} />
        </FilterComponents>

        <div className='flex flex-col gap-1 w-full overflow-hidden items-start select-none'>
          <label
            className='flex items-center gap-2 text-text-800'
          >
            결과: {finalPosts.length}건
          </label>
            <div className="flex w-full flex-col gap-2 overflow-hidden">
              <InspectResultList posts={finalPosts} />
            </div>
        </div>

      </Suspense>
    </section>
  )
}