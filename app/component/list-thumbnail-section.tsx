'use client'

import clsx from "clsx"

export default function ListThumbnailSection({
  goUp,
  children
}: {
  goUp: boolean,
  children: React.ReactNode,
}) {
  return (
    <section className={clsx (
      'relative h-1/2 w-full border-t border-text-600 pt-8 pb-8 overflow-y-scroll transition-all duration-700 ease-[cubic-bezier(0.75,0.05,0.45,0.95)] focus:outline-hidden',
      'flex gap-3 flex-wrap',
      goUp ? 'top-0' : 'top-1/2'
    )}>
      {children}
    </section>
  )
}