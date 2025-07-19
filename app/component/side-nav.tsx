'use client'

import { Suspense, useState } from 'react';
import GlobalNav from './global-nav';
import NoteInspector from './note-inspector';
import { Tag, KeywordsByTag } from '../lib/type';
import { Menu, Undo2 } from 'lucide-react';
import clsx from 'clsx';

export default function SideNav({
  tags,
  kwByTag
}: {
  tags: Tag[];
  kwByTag: KeywordsByTag;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`fixed top-0 left-0 md:p-0 md:top-8 md:left-8 w-84 shrink-0 z-80 md:pointer-events-none ${isOpen ? `h-full`: `h-auto w-auto`}`}>
      <div className={`top-0 pt-8 pl-8 md:pt-0 md:pl-0 flex flex-col gap-8 bg-background rounded-sm ${isOpen ? `pb-8` : `pb-0`}`}>
        <button
          className='bg-button-100 w-8 text-sm h-8 text-text-900 flex items-center justify-center px-3 rounded-sm hover:brightness-97 transition-[filter, colors] duration-300 md:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <Undo2 className='w-4 h-4 shrink-0' /> : <Menu className='w-4 h-4 shrink-0' />}
        </button>

        <div className={clsx('flex-col gap-8 md:gap-24 md:flex', isOpen ? 'flex' : 'hidden')}>
          <Suspense>
            <GlobalNav />
          </Suspense>
          <NoteInspector tags={tags} kwByTag={kwByTag} />
        </div>
      </div>

      {isOpen &&
        <div className='fixed top-0 left-0 w-screen h-screen bg-button-200 opacity-50 md:hidden -z-10'></div>
      }
    </aside>
  )
}