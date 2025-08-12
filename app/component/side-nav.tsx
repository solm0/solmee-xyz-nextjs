'use client'

import { Suspense } from 'react';
import Inspector from './inspector/inspector';
import { Tag, KeywordsByTag, Post } from '../lib/type';

export default function SideNav({
  posts,
  tags,
  kwByTag
}: {
  posts: Post[];
  tags: Tag[];
  kwByTag: KeywordsByTag;
}) {
  return (
    <aside className={`fixed h-screen top-0 pt-16 md:top-0 md:pt-16 left-0 w-80 shrink-0 z-80 pointer-events-none`}>
      <Suspense>
        <Inspector posts={posts} tags={tags} kwByTag={kwByTag} />
      </Suspense>
    </aside>
  )
}