'use client'

import { useState } from 'react';
import Inspector from './inspector';
import { Tag, KeywordsByTag, Post } from '../lib/type';
import { Menu, Undo2 } from 'lucide-react';
import clsx from 'clsx';

export default function SideNav({
  posts,
  tags,
  kwByTag
}: {
  posts: Post[];
  tags: Tag[];
  kwByTag: KeywordsByTag;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className={`fixed top-0 left-0 h-screen md:p-0 md:pt-16 md:left-8 w-84 md:w-80 shrink-0 z-80 md:pointer-events-none ${isOpen ? `h-full`: `h-auto w-auto`}`}>
      <div className={`mt-4 ml-4 h-full md:mt-0 md:ml-0 pt-4 pl-4 md:pt-0 md:pl-0 flex flex-col gap-8 bg-background md:bg-transparent rounded-sm ${isOpen ? `pb-8` : `pb-0`}`}>
        <button
          className='bg-button-100 w-8 text-sm h-8 text-text-900 flex items-center justify-center px-3 rounded-sm hover:brightness-97 transition-[filter, colors] duration-300 md:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <Undo2 className='w-4 h-4 shrink-0' /> : <Menu className='w-4 h-4 shrink-0' />}
        </button>

        <div className={clsx('h-full flex-col gap-8 md:gap-24 md:flex', isOpen ? 'flex' : 'hidden')}>
          <Inspector posts={posts} tags={tags} kwByTag={kwByTag} />
        </div>
      </div>

      {isOpen &&
        <div
          className='fixed top-0 left-0 w-screen h-screen bg-button-200 opacity-50 md:hidden -z-10'
          onClick={() => setIsOpen(false)}
        ></div>
      }
    </aside>
  )
}